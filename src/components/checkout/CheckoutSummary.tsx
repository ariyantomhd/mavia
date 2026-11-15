// src/components/checkout/CheckoutSummary.tsx
'use client';

import React from 'react';

export interface CheckoutSummaryProps {
  subtotal: number;
  discountAmount?: number;
  finalTotal?: number;
  couponCode?: string | null;
}

const formatUSD = (amount: number): string => {
  return Number.isInteger(amount)
    ? amount.toLocaleString('en-US')
    : amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function CheckoutSummary({
  subtotal,
  discountAmount = 0,
  finalTotal,
  couponCode = null,
}: CheckoutSummaryProps) {
  const payableTotal = finalTotal !== undefined ? finalTotal : Math.max(0, subtotal - discountAmount);

  return (
    <div className="border-t border-slate-100 pt-4 space-y-2 bg-slate-50 p-4 rounded-xl">
      {discountAmount > 0 && (
        <>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Subtotal</span>
            <span className="font-medium text-slate-700 font-mono">
              ${formatUSD(subtotal)}
            </span>
          </div>

          <div className="flex justify-between text-xs text-emerald-600 font-medium">
            <span>Discount {couponCode ? `(${couponCode})` : ''}</span>
            <span className="font-mono">-${formatUSD(discountAmount)}</span>
          </div>

          <div className="border-t border-slate-200/80 my-1.5" />
        </>
      )}

      <div className="flex justify-between items-center text-xs text-slate-600">
        <span className="font-semibold">Total Payment Due</span>
        <span className="font-bold text-slate-900 text-sm font-mono">
          ${formatUSD(payableTotal)}
        </span>
      </div>
    </div>
  );
}