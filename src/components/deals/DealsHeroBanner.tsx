// src/components/deals/DealsHeroBanner.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Flame, Sparkles, Clock, Tag, ArrowDownRight } from 'lucide-react';
import { DealProduct } from '@/services/apiDeals';

interface DealsHeroBannerProps {
  featuredDeal?: DealProduct | null;
}

export default function DealsHeroBanner({ featuredDeal }: DealsHeroBannerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: '23',
    minutes: '59',
    seconds: '59',
  });

  useEffect(() => {
    const targetTime = featuredDeal?.expires_at
      ? new Date(featuredDeal.expires_at).getTime()
      : Date.now() + 24 * 60 * 60 * 1000;

    const updateTimer = () => {
      const diff = Math.max(0, targetTime - Date.now());
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [featuredDeal?.expires_at]);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-7 sm:p-10 border border-slate-800 shadow-lg">
      {/* Ambient Accent */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-rose-500/15 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
            <Flame className="h-3.5 w-3.5" />
            <span>Limited-Time Marketplace Deals</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white!">
            Flash Sale &amp; Bundle Deals{' '}
            <span className="text-orange-400! whitespace-nowrap">Save Up to 60%</span>{' '}
            for Developers &amp; Creators
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Grab production-ready Next.js starter kits, Web3 dApp templates, and UI kits at limited-time promotional prices. Apply coupon code{' '}
            <code className="bg-slate-800 border border-slate-700 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
              WELCOME10
            </code>{' '}
            at checkout for an extra discount.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#deals-catalog"
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white! text-xs font-extrabold uppercase tracking-wider px-5 py-3 rounded-xl transition shadow-md shadow-orange-500/20"
            >
              <span>Browse All Deals</span>
              <ArrowDownRight className="h-4 w-4" />
            </a>
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 border border-slate-700 px-3.5 py-2.5 rounded-xl font-mono">
              <Tag className="h-3.5 w-3.5 text-emerald-400" />
              <span>Regular &amp; Extended Licenses Included</span>
            </div>
          </div>
        </div>

        {/* Countdown Box */}
        <div className="bg-slate-950/85 border border-slate-800 rounded-2xl p-5 sm:p-6 min-w-65 space-y-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 font-mono">
            <Clock className="h-4 w-4" />
            <span>Deals End In</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-2">
              <span className="text-2xl font-black text-white! font-mono">{timeLeft.hours}</span>
              <p className="text-[10px] text-slate-400 uppercase mt-0.5">Hours</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-2">
              <span className="text-2xl font-black text-white! font-mono">{timeLeft.minutes}</span>
              <p className="text-[10px] text-slate-400 uppercase mt-0.5">Mins</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-2">
              <span className="text-2xl font-black text-orange-400! font-mono">{timeLeft.seconds}</span>
              <p className="text-[10px] text-slate-400 uppercase mt-0.5">Secs</p>
            </div>
          </div>

          {featuredDeal && (
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 truncate max-w-40">{featuredDeal.title}</span>
              <span className="text-emerald-400 font-black font-mono flex items-center gap-1">
                <Sparkles className="h-3 w-3" />-{featuredDeal.discount_percent}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}