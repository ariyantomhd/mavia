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
  taxAmount?: number;
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
  taxAmount = 0,
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
    <div className="space-y-6 lg:sticky lg:top-8">
      {/* 1. Coupon Code Box (Above Order Summary) */}
      <div className="bg-white/45 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.06)] border border-white/70 ring-1 ring-slate-900/5 p-6 space-y-3">
        <form onSubmit={handleCouponSubmit} className="space-y-3">
          <label
            htmlFor="cart-coupon-input"
            className="block text-sm font-bold text-slate-900"
          >
            Coupon Code
          </label>
          <input
            id="cart-coupon-input"
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            placeholder="Enter Your Coupon Code"
            disabled={isApplying}
            className="w-full rounded-xl border border-white/70 bg-white/60 backdrop-blur-md px-3.5 py-2.5 text-sm uppercase font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-white/30"
          />
          <button
            type="submit"
            disabled={isApplying || !couponInput.trim()}
            className="w-full bg-white/70 hover:bg-white/90 disabled:opacity-50 text-indigo-600 border border-indigo-200/80 px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center justify-center cursor-pointer shadow-2xs"
          >
            {isApplying ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply Your Coupon'}
          </button>
        </form>

        {appliedCoupon && (
          <div className="flex justify-between items-center text-xs bg-emerald-500/15 backdrop-blur-md border border-emerald-300/60 text-emerald-800 px-3 py-2 rounded-xl">
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
      </div>

      {/* 2. Order Summary Box (Below Coupon Code) */}
      <div className="bg-white/45 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.06)] border border-white/70 ring-1 ring-slate-900/5 p-6 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-white/60 pb-4">
          Order Summary
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})</span>
            <span className="font-medium text-slate-900 font-mono">${formatUSD(subtotal)}</span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>
              Discount
              {appliedCoupon
                ? ` (${appliedCoupon.code}${
                    appliedCoupon.discountType !== 'FIXED' && appliedCoupon.discountPercent
                      ? ` - ${appliedCoupon.discountPercent}%`
                      : ''
                  })`
                : ''}
            </span>
            <span
              className={`font-medium font-mono ${
                discountAmount > 0 ? 'text-emerald-700 font-bold' : 'text-slate-500'
              }`}
            >
              {discountAmount > 0 ? `-$${formatUSD(discountAmount)}` : '$0.00'}
            </span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Tax</span>
            <span className="font-medium text-slate-700 font-mono">
              ${formatUSD(taxAmount)}
            </span>
          </div>

          <div className="border-t border-white/60 pt-3 flex justify-between text-base font-bold text-slate-900">
            <span>Total</span>
            <span className="text-indigo-600 font-mono">${formatUSD(finalTotal)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          type="button"
          onClick={onProceedToCheckout}
          className="w-full bg-indigo-600/95 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-md shadow-indigo-600/20 text-center block cursor-pointer"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
