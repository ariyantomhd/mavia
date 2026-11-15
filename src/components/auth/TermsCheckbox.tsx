// src/components/auth/TermsCheckbox.tsx
'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
  return (
    <div className="flex items-start gap-2.5 mt-2">
      <label className="group relative flex items-center justify-center cursor-pointer mt-0.5 select-none">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-4 h-4 border border-slate-300 rounded bg-white peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all flex items-center justify-center shadow-sm">
          <Check
            className={`w-3 h-3 text-white transition-opacity duration-150 ${
              checked ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            strokeWidth={3}
          />
        </div>
      </label>

      <p className="text-xs font-semibold text-slate-600 leading-tight">
        By signing up, I agree to the{' '}
        <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>{' '}
        and{' '}
        <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
}