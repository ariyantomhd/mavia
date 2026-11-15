import React from 'react';
import { Heart } from 'lucide-react';

export function WishlistTab() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-in fade-in space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          <span>Product Wishlist</span>
        </h2>
        <p className="text-xs text-slate-500">
          Saved themes, UI kits, and dApp templates you plan to purchase later.
        </p>
      </div>
      <div className="border border-dashed border-slate-300 bg-slate-50 rounded-xl p-12 text-center text-slate-500 text-xs">
        Your wishlist is currently empty. Explore the store to save items!
      </div>
    </div>
  );
}