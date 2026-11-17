// src/components/checkout/CheckoutModal.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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

  if (!isOpen) return null;

  const payableTotal = finalTotal !== undefined ? finalTotal : subtotal;

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
        shipping_address: 'Digital Delivery',
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

  const formattedPayable = Number.isInteger(payableTotal)
    ? payableTotal.toLocaleString('en-US')
    : payableTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="relative">
          <CheckoutLogo title="Payment Invoice" subtitle="THEMAVIA Digital Assets" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 text-slate-400 hover:text-white font-bold text-lg px-2 py-1 rounded-lg transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-8">
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-xl text-red-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="text-center pb-5 border-b border-slate-200">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                Total Payment Due
              </p>
              <h3 className="text-4xl font-black text-slate-800 tracking-tight font-mono">
                ${formattedPayable}
              </h3>
              {couponCode && discountAmount > 0 && (
                <p className="text-xs font-semibold text-emerald-600 mt-1.5">
                  Coupon {couponCode} applied (-${discountAmount.toFixed(2)})
                </p>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Product Type</span>
                <span className="text-slate-800 font-bold">Digital Assets</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Delivery</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Instant (Email)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
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

            <button
              type="button"
              onClick={onClose}
              className="w-full text-slate-400 hover:text-slate-700 font-bold py-3 text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Return to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}