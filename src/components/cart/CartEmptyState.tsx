// src/components/cart/CartEmptyState.tsx
import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function CartEmptyState() {
  return (
    <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
      <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto" />
      <h2 className="text-lg font-bold text-slate-800">Keranjang Belanja Kosong</h2>
      <p className="text-xs text-slate-500 max-w-sm mx-auto">
        Belum ada produk di dalam keranjang Anda. Yuk jelajahi berbagai template dan source code premium kami!
      </p>
      <div className="pt-2">
        <Link
          href="/products"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider py-3 px-6 rounded-lg transition-colors shadow-xs"
        >
          Jelajahi Produk
        </Link>
      </div>
    </div>
  );
}