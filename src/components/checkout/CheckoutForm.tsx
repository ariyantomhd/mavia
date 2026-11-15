// src/components/checkout/CheckoutForm.tsx
'use client';

import React from 'react';
import { CheckoutDTO } from '@/types/checkout';

export interface CheckoutFormProps {
  formData: CheckoutDTO;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function CheckoutForm({ formData, onChange }: CheckoutFormProps) {
  return (
    <div className="space-y-4">
      {/* Shipping Address / Destination Email */}
      <div>
        <label htmlFor="shipping_address" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
          Shipping Address / License Destination Email
        </label>
        <textarea
          id="shipping_address"
          name="shipping_address"
          rows={3}
          required
          value={formData.shipping_address || ''}
          onChange={onChange}
          placeholder="Enter your complete address or digital product delivery notes..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
        />
      </div>

      {/* Additional Notes */}
      <div>
        <label htmlFor="notes" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
          Additional Notes (Optional)
        </label>
        <input
          type="text"
          id="notes"
          name="notes"
          value={formData.notes || ''}
          onChange={onChange}
          placeholder="Example: Please send download links immediately."
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
        />
      </div>
    </div>
  );
}