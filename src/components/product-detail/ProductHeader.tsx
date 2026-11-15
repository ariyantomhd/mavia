// src/components/product-detail/ProductHeader.tsx
import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, ChevronRight, ArrowLeft } from 'lucide-react';

interface ProductHeaderProps {
  categoryName: string;
  framework: string;
  livePreviewUrl?: string;
  title: string;
  rating: number;
  reviewsCount: number;
  salesCount: number;
}

export default function ProductHeader({
  title,
  rating,
  reviewsCount,
  salesCount,
}: ProductHeaderProps) {
  return (
    <div className="mb-8 space-y-4 pb-6 border-b border-slate-200">
      <div>
        <Link
          href="/products"
          className="inline-flex items-center space-x-1 text-orange-500 hover:text-orange-600 font-bold uppercase tracking-wider text-[11px] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Products</span>
        </Link>
      </div>

      <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
        <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
        <Link href="/products" className="hover:text-orange-500 transition-colors">App Templates</Link>
        <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
        <span className="text-slate-800 font-semibold truncate">{title}</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight pt-1">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-t border-slate-200/80">
        <span className="flex items-center text-amber-500 font-semibold">
          <Star className="h-3.5 w-3.5 fill-current mr-1" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-slate-400 font-normal ml-1">({reviewsCount} reviews)</span>
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center">
          <ShoppingCart className="h-3.5 w-3.5 mr-1 text-slate-400" />
          <span>{salesCount} Sales</span>
        </span>
      </div>
    </div>
  );
}