// src/app/cart/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, X } from 'lucide-react';
import CartHeader from '@/components/cart/CartHeader';
import CartEmptyState from '@/components/cart/CartEmptyState';
import CartItemList, { CartItemDisplay } from '@/components/cart/CartItemList';
import CartSummarySidebar, { AppliedCouponState } from '@/components/cart/CartSummarySidebar';
import CheckoutModal, { CartItemPayload } from '@/components/checkout/CheckoutModal';
import { apiCart } from '@/services/apicart';
import { apiCoupon } from '@/services/apiCoupon';
import { useAppStore } from '@/store/useAppStore';

interface CartPageItem extends CartItemDisplay {
  productId: string;
}

interface ServerCartItem {
  id: string;
  product_id: string;
  quantity: number;
  license_type?: string;
  license?: string;
  withSupport?: boolean;
  with_support?: boolean;
  unit_price?: number;
  support_price?: number;
  item_subtotal?: number;
  products?: {
    id: string;
    title: string;
    regular_price?: number;
    extended_price?: number;
    discount_price?: number;
    support_price?: number;
    thumbnail_url?: string;
  };
}

interface ServerCartPayload {
  items?: ServerCartItem[];
  total_items?: number;
  subtotal?: number;
}

const TAX_RATE = 0;

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartPageItem[]>([]);
  const [serverSubtotal, setServerSubtotal] = useState<number>(0);
  const [serverTotalItems, setServerTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCouponState | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const setCartCount = useAppStore((state) => state.setCartCount);

  const syncCartFromServerResponse = useCallback(
    (payload?: ServerCartPayload | null): number => {
      const rawItems = Array.isArray(payload?.items) ? payload.items : [];

      const mappedItems: CartPageItem[] = rawItems.map((item) => {
        const product = item.products;
        const licenseLabel = (item.license_type || item.license || 'regular').toUpperCase();
        const unitPrice = Number(
          item.unit_price ??
            (licenseLabel === 'EXTENDED'
              ? product?.extended_price
              : product?.discount_price ?? product?.regular_price) ??
            0
        );

        return {
          id: item.id,
          productId: product?.id || item.product_id || '',
          title: product?.title || 'Unknown Product',
          category: 'DIGITAL ASSET',
          price: unitPrice,
          quantity: Number(item.quantity || 1),
          image: product?.thumbnail_url || '',
          license: licenseLabel,
          withSupport: Boolean(item.withSupport ?? item.with_support),
          supportPrice: Number(item.support_price ?? product?.support_price ?? 0),
          itemSubtotal: Number(item.item_subtotal ?? unitPrice * Number(item.quantity || 1)),
        };
      });

      const resolvedTotalItems =
        payload?.total_items !== undefined
          ? Number(payload.total_items)
          : mappedItems.reduce((acc, item) => acc + item.quantity, 0);

      const resolvedSubtotal =
        payload?.subtotal !== undefined
          ? Number(payload.subtotal)
          : mappedItems.reduce((acc, item) => acc + Number(item.itemSubtotal || 0), 0);

      setCartItems(mappedItems);
      setServerTotalItems(resolvedTotalItems);
      setServerSubtotal(resolvedSubtotal);
      setCartCount(resolvedTotalItems);
      return resolvedSubtotal;
    },
    [setCartCount]
  );

  const revalidateActiveCoupon = useCallback(
    async (couponCode: string, currentSubtotal: number): Promise<void> => {
      if (currentSubtotal <= 0) {
        setAppliedCoupon(null);
        setDiscountAmount(0);
        return;
      }
      try {
        const res = await apiCoupon.applyCoupon(couponCode, currentSubtotal);
        if (res.success && res.data) {
          setDiscountAmount(Number(res.data.discountAmount ?? res.discountAmount ?? 0));
        } else {
          setAppliedCoupon(null);
          setDiscountAmount(0);
        }
      } catch {
        setAppliedCoupon(null);
        setDiscountAmount(0);
      }
    },
    []
  );

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const res = await apiCart.getCart();
        if (res.success) {
          syncCartFromServerResponse(res.data as unknown as ServerCartPayload);
        } else {
          syncCartFromServerResponse(null);
        }
      } catch (error) {
        console.error('[Cart Fetch Error]:', error);
        syncCartFromServerResponse(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [syncCartFromServerResponse]);

  const handleQuantityChange = async (id: string, delta: number) => {
    const target = cartItems.find((item) => item.id === id);
    if (!target) return;

    const updatedQty = Math.max(1, target.quantity + delta);
    try {
      const res = await apiCart.updateCartItem(id, updatedQty, target.withSupport);
      if (res.success) {
        const updatedSubtotal = syncCartFromServerResponse(res.data as unknown as ServerCartPayload);
        if (appliedCoupon) {
          await revalidateActiveCoupon(appliedCoupon.code, updatedSubtotal);
        }
      }
    } catch (error) {
      console.error('[Update Quantity Error]:', error);
    }
  };

  const handleToggleSupport = async (id: string) => {
    const target = cartItems.find((item) => item.id === id);
    if (!target) return;

    try {
      const res = await apiCart.updateCartItem(id, target.quantity, !target.withSupport);
      if (res.success) {
        const updatedSubtotal = syncCartFromServerResponse(res.data as unknown as ServerCartPayload);
        if (appliedCoupon) {
          await revalidateActiveCoupon(appliedCoupon.code, updatedSubtotal);
        }
      }
    } catch (error) {
      console.error('[Toggle Support Error]:', error);
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      const res = await apiCart.removeCartItem(id);
      if (res.success) {
        const updatedSubtotal = syncCartFromServerResponse(res.data as unknown as ServerCartPayload);
        if (appliedCoupon) {
          await revalidateActiveCoupon(appliedCoupon.code, updatedSubtotal);
        }
      }
    } catch (error) {
      console.error('[Remove Cart Item Error]:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await apiCart.clearCart();
      syncCartFromServerResponse(null);
      setAppliedCoupon(null);
      setDiscountAmount(0);
      setNotification(null);
    } catch (error) {
      console.error('[Clear Cart Error]:', error);
    }
  };

  const handleApplyCoupon = async (code: string) => {
    setNotification(null);
    try {
      const res = await apiCoupon.applyCoupon(code, serverSubtotal);
      if (res.success && res.data) {
        setAppliedCoupon({
          code: res.data.code,
          discountPercent: res.data.discountPercent,
          discountType: res.data.discount_type,
          discountValue: res.data.discount_value,
        });
        setDiscountAmount(Number(res.data.discountAmount ?? res.discountAmount ?? 0));
      } else {
        setNotification(res.message || 'Invalid or expired promo code.');
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to validate promo code. Please try again.';
      setNotification(message);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setNotification(null);
  };

  const discountedSubtotal = Math.max(0, serverSubtotal - discountAmount);
  const taxAmount = Number((discountedSubtotal * TAX_RATE).toFixed(2));
  const finalTotal = Number((discountedSubtotal + taxAmount).toFixed(2));

  const checkoutPayloadItems: CartItemPayload[] = cartItems.map((item) => ({
    product_id: item.productId,
    quantity: item.quantity,
    price: item.price,
    license_type: item.license.toLowerCase(),
    with_support: Boolean(item.withSupport),
  }));

  return (
    <div className="min-h-screen text-slate-900 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <CartHeader
          totalItemsCount={serverTotalItems}
          totalKindsCount={cartItems.length}
          cartIsEmpty={cartItems.length === 0}
          onClearCart={handleClearCart}
        />

        {/* Dismissible Inline Error Notification */}
        {notification && (
          <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-rose-50/90 backdrop-blur-md border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold shadow-xs">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{notification}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotification(null)}
              aria-label="Dismiss notification"
              className="p-1 rounded-lg hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2].map((skeleton) => (
                <div
                  key={skeleton}
                  className="h-36 rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/70 animate-pulse"
                />
              ))}
            </div>
            <div className="h-80 rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/70 animate-pulse" />
          </div>
        ) : cartItems.length === 0 ? (
          <CartEmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <CartItemList
              cartItems={cartItems}
              totalItemsCount={serverTotalItems}
              onQuantityChange={handleQuantityChange}
              onToggleSupport={handleToggleSupport}
              onRemoveItem={handleRemoveItem}
            />

            <CartSummarySidebar
              totalItemsCount={serverTotalItems}
              subtotal={serverSubtotal}
              discountAmount={discountAmount}
              taxAmount={taxAmount}
              finalTotal={finalTotal}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              onProceedToCheckout={() => setIsCheckoutOpen(true)}
            />
          </div>
        )}
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        subtotal={serverSubtotal}
        discountAmount={discountAmount}
        finalTotal={finalTotal}
        couponCode={appliedCoupon?.code || null}
        cartItems={checkoutPayloadItems}
      />
    </div>
  );
}