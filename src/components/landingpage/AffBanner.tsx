// src/components/landingpage/AffBanner.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, DollarSign, ShieldCheck, Zap } from 'lucide-react';

export default function AffBanner() {
  return (
    <div className="bg-linear-to-br from-indigo-950 via-slate-900 to-indigo-900 border border-indigo-500/30 rounded-3xl p-5 sm:p-6 shadow-lg text-white flex flex-col justify-between h-full relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute right-0 top-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/40 border border-indigo-400/30 text-amber-300 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold tracking-wide border border-emerald-500/30">
            High Commission 45%
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mb-1.5">
          Join Themavia Affiliate Partner
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-sm mb-4">
          Refer premium source code, starter kits, and web3 apps to your network and earn lucrative commissions on every successful sale.
        </p>

        {/* Benefit Checkpoints */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-200 mb-5">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Instant Payouts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Trusted Tracking</span>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/affiliate"
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group"
        >
          <span>Become an Affiliate</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}