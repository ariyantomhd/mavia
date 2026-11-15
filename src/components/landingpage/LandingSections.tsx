// src/components/landingpage/LandingSections.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

import ProductCard from '@/components/ProductCard';
import ProductListSection from '@/components/landingpage/ProductListSection';
import BlogBanner from '@/components/landingpage/BlogBanner';
import AffBanner from '@/components/landingpage/AffBanner';
import { Product as ComponentProduct } from '@/types';

interface LandingSectionsProps {
  featured?: ComponentProduct[];
  trending?: ComponentProduct[];
  newArrivals?: ComponentProduct[];
  loading?: boolean;
}

export default function LandingSections({
  featured = [],
  trending = [],
  newArrivals = [],
  loading = false,
}: LandingSectionsProps) {
  return (
    <div className="space-y-8 py-6">

      {/* ================= 1. FEATURED PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
          <div>
            <div className="flex items-center gap-2 text-purple-600 font-extrabold text-sm tracking-tight mb-1">
              <Sparkles className="w-4 h-4 text-purple-600 fill-purple-600" />
              <span className="text-slate-900 text-lg font-black tracking-tight">Featured Products</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Hand-picked quality items from our top authors.
            </p>
          </div>
          <Link
            href="/products?section=featured"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors group"
          >
            <span>View all featured</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col gap-3 animate-pulse h-64">
                <div className="w-full h-36 bg-slate-100 rounded-xl" />
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
              </div>
            ))
          ) : featured.length > 0 ? (
            featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center text-center h-64 text-slate-400 gap-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                  TMV
                </div>
                <p className="text-xs font-semibold text-slate-500">No Product Available</p>
                <span className="text-[10px] text-slate-400">Container ready for backend data</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ================= 2. TRENDING NOW & NEW ARRIVALS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductListSection
            title="Trending Now"
            description="See what&apos;s popular this week."
            viewAllHref="/products?section=trending"
            products={trending}
            emptyMessage="No trending products."
            loading={loading}
          />

          <ProductListSection
            title="New Arrivals"
            description="Check out our latest items."
            viewAllHref="/products?section=new"
            products={newArrivals}
            emptyMessage="No new items."
            isNewArrival={true}
            loading={loading}
          />
        </div>
      </section>

      {/* ================= 3. BLOG BANNER & AFFILIATE BANNER (PALING BAWAH) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Container 1: Blog & Insights */}
          <BlogBanner />

          {/* Container 2: Join Affiliate Partner */}
          <AffBanner />
        </div>
      </section>

    </div>
  );
}