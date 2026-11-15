// src/components/deals/DealsGridSection.tsx
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { DealProduct } from '@/services/apiDeals';
import { Tag, RotateCcw } from 'lucide-react';

interface DealsGridSectionProps {
  deals?: DealProduct[];
  isLoading: boolean;
  onResetFilter: () => void;
}

export default function DealsGridSection({
  deals = [],
  isLoading,
  onResetFilter,
}: DealsGridSectionProps) {
  const safeDeals = Array.isArray(deals) ? deals : [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 h-80 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (safeDeals.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-14 text-center shadow-xs space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <Tag className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-extrabold text-slate-800">
            Tidak Ada Promo yang Cocok dengan Filter
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Coba atur ulang batas harga maksimum, kata kunci pencarian, atau kategori promo untuk melihat penawaran aktif lainnya.
          </p>
        </div>
        <button
          type="button"
          onClick={onResetFilter}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Semua Filter</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {safeDeals.map((dealItem) => (
        <div key={dealItem.deal_id || dealItem.id} className="relative group">
          {/* Badge Persentase Diskon dari Tabel Deals */}
          {dealItem.discount_percent > 0 && (
            <div className="absolute top-3 left-3 z-20 bg-rose-600 text-white text-[10px] font-black font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md">
              -{dealItem.discount_percent}% • {dealItem.deal_badge}
            </div>
          )}
          <ProductCard product={dealItem} />
        </div>
      ))}
    </div>
  );
}