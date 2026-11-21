// src/components/checkout/CheckoutLogo.tsx
'use client';

import React from 'react';
import Image from 'next/image';

export interface CheckoutLogoProps {
  title?: string;
  subtitle?: string;
}

export default function CheckoutLogo({
  title = 'THEMAVIA',
  subtitle = 'Digital Assets',
}: CheckoutLogoProps) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 bg-[#0B1120] text-white">
      <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center border border-slate-700/80 shadow-md shrink-0">
        <Image
          src="/logo.png"
          alt="THEMAVIA Logo"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex items-baseline gap-2 min-w-0">
        <h2 className="text-base font-extrabold tracking-tight text-white truncate">
          {title}
        </h2>
        {subtitle && (
          <span className="text-sm font-medium text-slate-300 truncate">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}