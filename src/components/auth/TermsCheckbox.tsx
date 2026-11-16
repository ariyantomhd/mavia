// src/components/auth/TermsCheckbox.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition-colors hover:border-slate-300 select-none">
      <div className="relative flex items-center justify-center shrink-0">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="flex h-4 w-4 items-center justify-center rounded border border-slate-300 bg-white shadow-2xs transition-all peer-checked:border-indigo-600 peer-checked:bg-indigo-600">
          <Check
            className={`h-3 w-3 text-white transition-all duration-150 ${
              checked ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            }`}
            strokeWidth={3}
          />
        </div>
      </div>

      <span className="text-xs leading-relaxed text-slate-600">
        I have read and agree to the{' '}
        <Link
          href="/terms"
          target="_blank"
          onClick={(e) => e.stopPropagation()}
          className="font-bold text-slate-900 hover:text-indigo-600 hover:underline"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          target="_blank"
          onClick={(e) => e.stopPropagation()}
          className="font-bold text-slate-900 hover:text-indigo-600 hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  );
}