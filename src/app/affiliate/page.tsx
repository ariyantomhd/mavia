// src/app/become-affiliate/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Share2,
  TrendingUp,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ExternalLink,
  DollarSign,
  Repeat,
  Layers,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Activity,
} from 'lucide-react';

export default function BecomeAffiliatePage() {
  // Pure client-side state for the interactive earnings estimator
  const [monthlySales, setMonthlySales] = useState<number>(25);
  const [avgProductPrice, setAvgProductPrice] = useState<number>(60);
  const [commissionRate, setCommissionRate] = useState<number>(12);

  const estimatedMonthlyIncome = Number(
    ((monthlySales * avgProductPrice * commissionRate) / 100).toFixed(2)
  );
  const estimatedYearlyIncome = Number((estimatedMonthlyIncome * 12).toFixed(2));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. DYNAMIC ANIMATED HERO SECTION */}
      <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        {/* Dynamic Animated Background Layers */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Subtle Architectural Grid */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
          {/* Animated Ambient Glow Orbs */}
          <div className="absolute -top-28 -left-24 h-96 w-96 rounded-full bg-orange-500/30 blur-3xl animate-pulse" />
          <div
            className="absolute top-1/3 right-0 h-112 w-md rounded-full bg-cyan-500/25 blur-3xl animate-pulse"
            style={{ animationDuration: '5s' }}
          />
          <div
            className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl animate-pulse"
            style={{ animationDuration: '7s' }}
          />
          {/* Radial Vignette Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-slate-950/60 to-slate-950" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & Dual CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-mono backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Themavia Product-Based Affiliate Program</span>
              </div>

              {/* Bright, Vivid & Animated Gradient Title */}
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] text-white">
                Build an{' '}
                <span className="bg-linear-to-r from-orange-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent animate-pulse drop-shadow-md">
                  Evergreen Commission Engine
                </span>{' '}
                Without Writing a Single Line of Code.
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
                Share a campaign link to production-ready digital assets on Themavia Market once. As long as your content stays live and drives clicks, dynamic commissions up to{' '}
                <strong className="text-emerald-300 font-bold">20%+ per sale</strong> flow straight into your partner balance every time a buyer checks out.
              </p>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="https://partner.themavia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:scale-[1.02]"
                >
                  <span>Join Partner Portal</span>
                  <ExternalLink className="h-4 w-4" />
                </a>

                <Link
                  href="/products"
                  className="bg-white/15 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl border border-white/30 backdrop-blur-xs transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Browse Product Catalog</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Key Program Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 max-w-lg">
                <div>
                  <span className="text-2xl font-black text-amber-300 font-mono">8% – 20%+</span>
                  <p className="text-[11px] text-slate-300 mt-0.5 font-medium">Dynamic Product Rates</p>
                </div>
                <div>
                  <span className="text-2xl font-black text-emerald-400 font-mono">Evergreen</span>
                  <p className="text-[11px] text-slate-300 mt-0.5 font-medium">Continuous Campaign Yield</p>
                </div>
                <div>
                  <span className="text-2xl font-black text-cyan-300 font-mono">Auto-Track</span>
                  <p className="text-[11px] text-slate-300 mt-0.5 font-medium">Instant PayPal Attribution</p>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Floating Campaign Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-slate-900/90 border border-slate-700 backdrop-blur-md rounded-3xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                      Live Campaign Attribution
                    </span>
                  </div>
                  <Activity className="h-4 w-4 text-emerald-400" />
                </div>

                {/* Simulated Campaign Link Box */}
                <div className="bg-slate-950 border border-slate-700/80 rounded-xl p-3.5 space-y-1.5 shadow-inner">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Your Evergreen Tracking URL
                  </span>
                  <p className="text-xs font-mono text-orange-300 truncate font-semibold">
                    themavia.com/products/defi-staking-kit?ref=tmv-partner
                  </p>
                </div>

                {/* Simulated Commission Stream */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 shadow-sm">
                    <div>
                      <p className="text-xs font-bold text-white">Extended License Sale</p>
                      <p className="text-[10px] text-slate-300 font-mono">DeFi Staking Kit • 15% Rate</p>
                    </div>
                    <span className="text-sm font-black text-emerald-300 font-mono">+$18.00</span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 shadow-sm">
                    <div>
                      <p className="text-xs font-bold text-white">Regular License + Support</p>
                      <p className="text-[10px] text-slate-300 font-mono">SaaS Starter Pro • 12% Rate</p>
                    </div>
                    <span className="text-sm font-black text-emerald-300 font-mono">+$8.64</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-300">
                  <span>Portal Dashboard</span>
                  <a
                    href="https://partner.themavia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-300 hover:text-orange-200 font-bold inline-flex items-center gap-1 transition"
                  >
                    <span>partner.themavia.com</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM VS SOLUTION */}
      <section className="py-16 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest font-mono">
            Why Themavia&apos;s Product Model Wins
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Leave Behind Low-Margin, One-Off Affiliate Grind
          </h2>
          <p className="text-sm text-slate-600">
            We engineered a product-specific affiliate ecosystem so every piece of content you publish becomes a long-term revenue-generating asset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 space-y-5 shadow-xs">
            <div className="inline-flex items-center gap-2 text-rose-700 bg-rose-50 px-3 py-1 rounded-lg text-xs font-bold uppercase border border-rose-200">
              <XCircle className="h-4 w-4" />
              <span>Conventional Affiliate Struggles</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Heavy Promotion Effort with Short-Lived Returns
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  Spending months building software templates from scratch and dealing with endless bug fixes and buyer support tickets.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  Tiny 1%–3% physical e-commerce payouts requiring tens of thousands of clicks just to earn a few dollars.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  Generic homepage links that confuse prospects and leak conversions before checkout.
                </span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="bg-white border-2 border-emerald-500/40 rounded-2xl p-7 space-y-5 shadow-sm relative">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg text-xs font-bold uppercase border border-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              <span>The Themavia Partner Advantage</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Focus on Campaign Reach—Our Platform Handles the Rest
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-800">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Direct Product Campaigns:</strong> Send traffic straight to high-converting product pages complete with Live Demos and feature breakdowns.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Continuous Campaign Income:</strong> A single blog review, YouTube tutorial, or social thread carrying your{' '}
                  <code className="bg-slate-100 text-slate-900 font-semibold px-1.5 py-0.5 rounded font-mono text-xs">?ref=tmv-you</code> link keeps earning every time a new buyer converts.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Support Burden:</strong> Instant digital delivery, automated license key generation, and technical support are fully managed by Themavia.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3 STEPS) */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest font-mono">
              Simple Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Start Earning in 3 Straightforward Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black font-mono text-sm">
                01
              </div>
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                <Layers className="h-4 w-4 text-orange-600" />
                <span>Pick High-Demand Assets</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Explore Web3 dApps, SaaS Starter Kits, Mobile UI Kits, and business templates. Check the dynamic commission badge displayed on each product page.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black font-mono text-sm">
                02
              </div>
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                <Share2 className="h-4 w-4 text-orange-600" />
                <span>Generate Link & Campaign Kit</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Register on{' '}
                <a
                  href="https://partner.themavia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-orange-600 underline"
                >
                  partner.themavia.com
                </a>
                , enter your Affiliate ID (<code className="font-mono font-bold text-slate-900">tmv-username</code>) on any product page, and copy your unique tracking link.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black font-mono text-sm">
                03
              </div>
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                <Repeat className="h-4 w-4 text-emerald-600" />
                <span>Collect Recurring Campaign Payouts</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Every time a visitor purchases a Regular or Extended license through your campaign link, your commission is automatically calculated and credited.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE EARNINGS ESTIMATOR */}
      <section id="earnings-calculator" className="py-16 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
              <TrendingUp className="h-4 w-4" />
              <span>Partner Revenue Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white">
              Estimate Your Ongoing Commission From Product Campaigns
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Adjust the sliders below to see how steady conversions from evergreen tutorials, reviews, and social posts compound into predictable monthly income.
            </p>

            <div className="space-y-5 pt-2">
              {/* Slider 1: Monthly Sales */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-200">Monthly License Conversions</span>
                  <span className="text-orange-400 font-mono">{monthlySales} Licenses</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={200}
                  value={monthlySales}
                  onChange={(e) => setMonthlySales(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              {/* Slider 2: Average Product Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-200">Average License Price</span>
                  <span className="text-orange-400 font-mono">${avgProductPrice} USD</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={250}
                  step={5}
                  value={avgProductPrice}
                  onChange={(e) => setAvgProductPrice(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              {/* Slider 3: Commission Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-200">Product Commission Rate</span>
                  <span className="text-emerald-400 font-mono">{commissionRate}%</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={25}
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Results Display Card */}
          <div className="lg:col-span-5 bg-slate-800/95 border border-slate-700 rounded-2xl p-7 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
                Estimated Monthly Commission
              </span>
              <div className="flex items-baseline gap-1.5">
                <DollarSign className="h-6 w-6 text-emerald-400 self-center" />
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  {estimatedMonthlyIncome.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-xs text-slate-300 font-mono">/ mo</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-200 font-medium">1-Year Campaign Projection</span>
              <span className="text-base font-black text-emerald-400 font-mono">
                $
                {estimatedYearlyIncome.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="space-y-2 text-[11px] text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Applies to both Regular and Extended digital licenses.</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-400 shrink-0" />
                <span>Commissions lock in automatically upon successful checkout.</span>
              </div>
            </div>

            <Link
              href="/products"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>Promote Products & Earn Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase font-mono">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900">
              How do I generate an affiliate link for a specific product?
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Open any product detail page on Themavia Market, locate the <strong>Affiliate Program</strong> box on the right, enter your Affiliate ID (e.g., <code className="font-mono bg-slate-100 text-slate-900 font-semibold px-1 py-0.5 rounded">tmv-username</code>), and click <strong>Generate & Copy Link</strong>.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900">
              Why do commission rates vary across products?
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Themavia applies a dynamic commission rate per product (ranging from 8% to 20%+) tailored to asset categories and active creator/admin campaigns, allowing you to choose products with the highest yield for your audience.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900">
              Do my campaign tracking links ever expire?
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              No. As long as the product remains active in the Themavia Market catalog and your partner account is in good standing, your tracking link <code className="font-mono bg-slate-100 text-slate-900 font-semibold px-1 py-0.5 rounded">?ref=tmv-...</code> will continue recording new sales continuously.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}