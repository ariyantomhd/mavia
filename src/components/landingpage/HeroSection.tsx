// src/components/HeroSection.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Box, Zap, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreProducts: () => void;
  onWatchDemo: () => void;
}

export default function HeroSection({ onExploreProducts, onWatchDemo }: HeroProps) {
  return (
    <section 
      className="relative overflow-hidden py-3 sm:py-4 lg:py-5"
      style={{
        background: ""
      }}
    >
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-5 left-10 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
          
          {/* Left Column: Typography & CTAs (Space diperkecil) */}
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
            {/* Pill Tag: ● Digital Studio */}
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#583cf0]/10 text-[#583cf0] text-[11px] font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#583cf0]"></span>
              <span>Digital Studio & Web3 Ecosystem</span>
            </div>

            {/* Giant Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Digital Products.<br />
              Built with{' '}
              <span className="bg-linear-to-r from-[#583cf0] via-[#9333ea] to-primary bg-clip-text text-transparent animate-pulse">
                Purpose.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xs sm:text-sm md:text-base text-slate-700 max-w-xl font-normal leading-relaxed">
              Premium starter kits, dApps, CMS, and IDHERO crypto assets — crafted for builders, creators, and dreamers.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <button
                onClick={onExploreProducts}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#583cf0] hover:bg-[#4b2fe0] text-white text-xs font-semibold rounded-full shadow-md shadow-indigo-500/25 transition-all transform active:scale-95 cursor-pointer"
              >
                <span>Explore Products</span>
                <span className="text-xs font-bold">→</span>
              </button>

              <button
                onClick={onWatchDemo}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/80 hover:bg-white text-slate-800 text-xs font-semibold rounded-full border border-slate-200/80 shadow-xs transition-all cursor-pointer backdrop-blur-xs"
              >
                <div className="w-3.5 h-3.5 rounded-full border border-slate-700 flex items-center justify-center text-slate-800">
                  <Play className="w-2 h-2 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* 3 Values Checklist underneath */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 pt-1.5 text-[11px] sm:text-xs text-slate-700">
              <div className="flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-[#583cf0]" />
                <span className="font-medium">Open Source Friendly</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#583cf0]" />
                <span className="font-medium">Developer Focused</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#583cf0]" />
                <span className="font-medium">Secure & Reliable</span>
              </div>
            </div>
          </div>

          {/* Right Column: Themavia Official Mascot */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center min-h-60 lg:min-h-70">
            {/* Ambient Purple Glow */}
            <div className="absolute inset-0 m-auto w-52 h-52 sm:w-60 sm:h-60 bg-linear-to-tr from-purple-600/25 via-indigo-500/15 to-pink-500/10 rounded-full blur-3xl pointer-events-none animate-float" />

            {/* Mascot Showcase Container */}
            <div className="relative max-w-60 sm:max-w-70 w-full flex flex-col items-center">
              {/* Main Mascot Image */}
              <div className="relative z-10 w-full flex justify-center animate-float">
                <Image
                  src="/maskot.png"
                  alt="Themavia Official Studio Mascot"
                  width={260}
                  height={260}
                  priority
                  style={{ width: 'auto', height: 'auto' }}
                  className="w-48 sm:w-56 lg:w-60 object-contain drop-shadow-[0_15px_25px_rgba(88,60,240,0.25)] transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>

              {/* Synchronized Soft Pedestal Shadow */}
              <div className="w-32 sm:w-44 h-3 bg-purple-950/20 rounded-full blur-sm -mt-1.5 z-0 animate-glow-pulse" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}