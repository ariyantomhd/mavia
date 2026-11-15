// src/components/checkout/CheckoutLogo.tsx
'use client';

import React from 'react';
import Image from 'next/image';

export interface CheckoutLogoProps {
  title?: string;
  subtitle?: string;
}

export default function CheckoutLogo({ 
  title = 'THEMAVIA Checkout', 
  subtitle = 'Complete your digital asset & dApp transaction' 
}: CheckoutLogoProps) {
  return (
    <div className="flex items-center space-x-3 px-6 py-4 border-b border-slate-100 bg-slate-900 text-white">
      <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center border border-slate-700 shadow-md">
        <Image 
          src="/logo.png" 
          alt="THEMAVIA Logo" 
          fill 
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="text-base font-bold tracking-tight">{title}</h2>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}