// src/components/landingpage/ProductListSection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Loader2 } from 'lucide-react';
import { Product as ComponentProduct } from '@/types';

interface ProductListSectionProps {
  title: string;
  description: string;
  viewAllHref: string;
  products?: ComponentProduct[];
  emptyMessage: string;
  isNewArrival?: boolean;
  limit?: number;
  loading?: boolean;
}

export default function ProductListSection({
  title,
  description,
  viewAllHref,
  products = [],
  emptyMessage,
  isNewArrival = false,
  limit = 3,
  loading = false,
}: ProductListSectionProps) {
  const displayList = products ? products.slice(0, limit) : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">{title}</h2>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
        <Link href={viewAllHref} className="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1">
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Container Kotak Selalu Tampil Utuh */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-1">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
          </div>
        ) : displayList.length > 0 ? (
          displayList.map((prod, index) => {
            const imageUrl = prod.images_url || (prod.gallery && prod.gallery[0]?.image_url);
            const displayPrice = prod.regular_price ?? prod.discount_price ?? 0;
            const displayRating = prod.rating_avg ?? (isNewArrival ? 4.9 : 4.8);
            const reviewList = prod.reviews ?? [];

            const productSlug = prod.slug || prod.id;

            return (
              <Link 
                key={prod.id} 
                href={`/products/${productSlug}`}
                className={`flex items-center justify-between py-2.5 px-2 hover:bg-slate-50 transition-colors rounded-xl gap-3 ${
                  index !== displayList.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden relative border border-slate-200">
                    {imageUrl ? (
                      <Image 
                        src={imageUrl} 
                        alt={prod.title || 'Product'} 
                        fill 
                        sizes="48px"
                        className="object-cover" 
                      />
                    ) : (
                      <span className="text-[10px] text-slate-400">IMG</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate hover:text-indigo-600 transition-colors">
                        {prod.title}
                      </h4>
                      {isNewArrival && (
                        <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-emerald-100 text-emerald-700 rounded-md shrink-0">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 justify-end">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 
                    <span>{displayRating}</span>
                    <span className="text-slate-400 font-normal">({reviewList.length || (isNewArrival ? 30 : 120)})</span>
                  </div>
                  <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 block">${displayPrice}</span>
                </div>
              </Link>
            );
          })
        ) : (
          /* Placeholder Box Kosong jika BE belum terhubung / data kosong, container tetap utuh */
          <div className="text-center py-6 space-y-1">
            <p className="text-xs font-medium text-slate-400">{emptyMessage}</p>
            <span className="text-[10px] text-slate-300">Container ready for backend data</span>
          </div>
        )}
      </div>
    </div>
  );
}