// src/components/checkout/CheckoutModal.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { apiOrder } from '@/services/apiOrder';
import { paymentAPI } from '@/services/paymentAPI';
import CheckoutLogo from './CheckoutLogo';
import { LicenseType, PaymentGateway } from '@/types/enums';

export interface CartItemPayload {
  product_id: string;
  quantity: number;
  price: number;
  license_type?: string;
  with_support?: boolean;
  support_price?: number;
}

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtotal: number;
  discountAmount?: number;
  finalTotal?: number;
  couponCode?: string | null;
  cartItems?: CartItemPayload[];
}

interface ApiErrorResponse {
  message?: string;
}

interface OrderResponseData {
  id?: string;
}

interface PaymentResponseData {
  checkout_url?: string;
  approvalUrl?: string;
  approval_url?: string;
}

const formatMoney = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function CheckoutModal({
  isOpen,
  onClose,
  subtotal,
  discountAmount = 0,
  finalTotal,
  couponCode = null,
  cartItems = [],
}: CheckoutModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(true);

  if (!isOpen) return null;

  const payableTotal =
    finalTotal !== undefined ? finalTotal : Math.max(0, subtotal - discountAmount);

  const hasSupportIncluded = cartItems.some((item) => Boolean(item.with_support));
  const summaryLabel =
    cartItems.length === 1 && cartItems[0]?.license_type
      ? `Themavia ${cartItems[0].license_type.charAt(0).toUpperCase()}${cartItems[0].license_type.slice(1).toLowerCase()} License`
      : 'Themavia Digital License';

  const handlePayPalCheckout = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);

      // 1. Format cart item payload (including license type and optional support add-on)
      const formattedItems = cartItems.map((item) => {
        const rawLicense = item.license_type || 'REGULAR';
        const licenseType = (
          rawLicense.toUpperCase() === 'EXTENDED' ? 'EXTENDED' : 'REGULAR'
        ) as LicenseType;

        return {
          product_id: item.product_id,
          quantity: item.quantity,
          license_type: licenseType,
          price_at_purchase: item.price,
          with_support: Boolean(item.with_support),
          support_price: item.with_support ? Number(item.support_price || 0) : 0,
        };
      });

      // 2. Retrieve stored affiliate referral code from browser session if available
      const storedAffiliateToken =
        typeof window !== 'undefined'
          ? localStorage.getItem('tmv_affiliate_ref') || localStorage.getItem('affiliate_ref')
          : null;

      // 3. Create internal order record on backend
      const orderPayload = {
        shipping_address: 'Digital Delivery (Dashboard)',
        notes: couponCode ? `Checkout via PayPal (Coupon: ${couponCode})` : 'Checkout via PayPal',
        subtotal: subtotal,
        discount_total: discountAmount,
        grand_total: payableTotal,
        coupon_code: couponCode,
        affiliate_token_used: storedAffiliateToken,
        payment_gateway: PaymentGateway.PAYPAL,
        items: formattedItems,
      };

      const orderResponse = await apiOrder.createOrder(
        orderPayload as unknown as Parameters<typeof apiOrder.createOrder>[0]
      );

      if (!orderResponse || !orderResponse.success || !orderResponse.data) {
        throw new Error(orderResponse?.message || 'Failed to create order on the server.');
      }

      const orderData = orderResponse.data as OrderResponseData;
      const orderId = orderData.id;

      if (!orderId) {
        throw new Error('Order ID was not returned by the server.');
      }

      // 4. Request PayPal checkout session URL from backend
      const paymentResponse = await paymentAPI.createPayPalOrder({
        order_id: orderId,
      });

      if (paymentResponse && paymentResponse.success && paymentResponse.data) {
        const paymentData = paymentResponse.data as PaymentResponseData;
        const approvalUrl =
          paymentData?.checkout_url || paymentData?.approvalUrl || paymentData?.approval_url;

        if (approvalUrl) {
          localStorage.setItem('pending_order_id', orderId);
          window.location.href = approvalUrl;
          return;
        }
      }

      throw new Error('Failed to retrieve PayPal checkout URL from the server.');
    } catch (error: unknown) {
      let msg = 'An unexpected system error occurred. Please try again.';
      if (error instanceof Error) {
        msg = error.message;
      } else if (typeof error === 'object' && error !== null) {
        const apiError = error as ApiErrorResponse;
        if (apiError.message) {
          msg = apiError.message;
        }
      }
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-linear-to-b from-slate-50 via-white to-indigo-50/50 w-full max-w-md rounded-3xl shadow-2xl border border-white/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Top Dark Header */}
        <div className="relative">
          <CheckoutLogo title="THEMAVIA" subtitle="Digital Assets" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white text-lg font-medium w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 sm:p-7 space-y-5">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* Total Payment Due Header */}
          <div className="text-center space-y-2.5">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.14em]">
              TOTAL PAYMENT DUE
            </p>
            <h3 className="text-5xl font-black text-slate-950 tracking-tight font-mono">
              ${formatMoney(payableTotal)}
            </h3>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Secure Payment via PayPal</span>
            </div>
          </div>

          {/* Selected Payment Method Card (PayPal) */}
          <div className="rounded-2xl border-2 border-blue-500 bg-white/90 px-4 py-3.5 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-16 h-6 shrink-0">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="PayPal"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <div className="h-6 w-px bg-slate-200 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 leading-tight">PayPal</p>
                <p className="text-xs text-slate-500 truncate">
                  Pay securely with your PayPal account
                </p>
              </div>
            </div>
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
              ✓
            </span>
          </div>

          {/* Collapsible Order Summary Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-white/85 backdrop-blur-md shadow-2xs overflow-hidden">
            <button
              type="button"
              onClick={() => setIsSummaryOpen((prev) => !prev)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <FileText className="w-4 h-4 text-slate-700" />
                <span>Order Summary</span>
              </span>
              {isSummaryOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {isSummaryOpen && (
              <div className="px-4 pb-4 pt-1 space-y-2.5 border-t border-slate-100 text-sm">
                <div className="flex items-center justify-between text-slate-600 pt-1.5">
                  <span className="truncate pr-3">{summaryLabel}</span>
                  <span className="font-semibold text-slate-800 font-mono">
                    ${formatMoney(subtotal)}
                  </span>
                </div>

                {couponCode && discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-medium">
                    <span>Coupon Discount ({couponCode})</span>
                    <span className="font-mono">-${formatMoney(discountAmount)}</span>
                  </div>
                )}

                <div className="border-t border-slate-200/80 pt-2.5 flex items-center justify-between font-bold text-slate-900">
                  <span>Subtotal</span>
                  <span className="font-mono">${formatMoney(payableTotal)}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-0.5">
                  <span className="text-slate-500">Support &amp; Updates</span>
                  <span className="font-semibold text-indigo-600">
                    {hasSupportIncluded ? 'Included' : 'Dashboard Access'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* PayPal Trigger Button (Unchanged Flow & Action) */}
          <div className="space-y-3.5 pt-0.5">
            <button
              type="button"
              onClick={handlePayPalCheckout}
              disabled={loading}
              className="w-full bg-[#FFC439] hover:bg-[#F4BB33] text-[#003087] font-extrabold py-4 px-6 rounded-2xl transition-all disabled:opacity-50 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              {loading ? (
                'Connecting to Secure Server...'
              ) : (
                <>
                  <span>Pay with</span>
                  <div className="relative w-17.5 h-5 group-hover:scale-105 transition-transform">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                      alt="PayPal"
                      fill
                      className="object-contain"
                    />
                  </div>
                </>
              )}
            </button>

            {/* Security Divider & Back to Cart */}
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              <span>or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <Lock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Your payment is secure and encrypted</span>
            </div>

            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}