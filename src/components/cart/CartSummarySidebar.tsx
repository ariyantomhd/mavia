// src/components/cart/CartSummarySidebar.tsx
'use client';

import React, { useState } from 'react';
import { Loader2, Tag, X } from 'lucide-react';

export interface AppliedCouponState {
  code: string;
  discountPercent: number;
  discountType?: 'PERCENTAGE' | 'FIXED';
  discountValue?: number;
}

export interface CartSummarySidebarProps {
  totalItemsCount: number;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  appliedCoupon: AppliedCouponState | null;
  onApplyCoupon: (code: string) => Promise<void>;
  onRemoveCoupon: () => void;
  onProceedToCheckout: () => void;
}

const formatUSD = (amount: number): string => {
  return Number.isInteger(amount)
    ? amount.toLocaleString('en-US')
    : amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function CartSummarySidebar({
  totalItemsCount,
  subtotal,
  discountAmount,
  finalTotal,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout,
}: CartSummarySidebarProps) {
  const [couponInput, setCouponInput] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = couponInput.trim().toUpperCase();
    if (!trimmed || isApplying) return;

    try {
      setIsApplying(true);
      await onApplyCoupon(trimmed);
      setCouponInput('');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6 lg:sticky lg:top-8">
      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Total Items ({totalItemsCount})</span>
          <span className="font-medium text-slate-900">$ {formatUSD(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>
              Discount ({appliedCoupon?.code}
              {appliedCoupon?.discountType !== 'FIXED' && appliedCoupon?.discountPercent
                ? ` - ${appliedCoupon.discountPercent}%`
                : ''}
              )
            </span>
            <span>- $ {formatUSD(discountAmount)}</span>
          </div>
        )}

        <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-bold text-slate-900">
          <span>Final Total</span>
          <span className="text-blue-600">$ {formatUSD(finalTotal)}</span>
        </div>
      </div>

      {/* Coupon Form */}
      <form onSubmit={handleCouponSubmit} className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          Discount Coupon
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            placeholder="e.g. WELCOME10"
            disabled={isApplying}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50"
          />
          <button
            type="submit"
            disabled={isApplying || !couponInput.trim()}
            className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center min-w-19 cursor-pointer"
          >
            {isApplying ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply'}
          </button>
        </div>

        {appliedCoupon && (
          <div className="flex justify-between items-center text-xs bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-2 rounded-lg mt-2">
            <span className="flex items-center gap-1.5 font-semibold">
              <Tag className="h-3.5 w-3.5" />
              <span>Coupon &quot;{appliedCoupon.code}&quot; applied</span>
            </span>
            <button
              type="button"
              onClick={onRemoveCoupon}
              className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-0.5 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              <span>Remove</span>
            </button>
          </div>
        )}
      </form>

      {/* Checkout Button */}
      <button
        type="button"
        onClick={onProceedToCheckout}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-sm text-center block cursor-pointer"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}