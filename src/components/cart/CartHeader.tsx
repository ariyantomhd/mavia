// src/components/cart/CartHeader.tsx
import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface CartHeaderProps {
  totalItemsCount: number;
  totalKindsCount: number;
  cartIsEmpty: boolean;
  onClearCart: () => void;
}

export default function CartHeader({
  totalItemsCount,
  totalKindsCount,
  cartIsEmpty,
  onClearCart,
}: CartHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500 text-white rounded-lg shadow-xs">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Manage your selected items, adjust quantities, and complete checkout seamlessly.
        </p>
      </div>

      {!cartIsEmpty && (
        <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
          <span className="bg-slate-200/70 px-3 py-1.5 rounded-md">
            {totalItemsCount} Total {totalItemsCount === 1 ? 'Item' : 'Items'} ({totalKindsCount}{' '}
            {totalKindsCount === 1 ? 'Product' : 'Products'})
          </span>
          <button
            type="button"
            onClick={onClearCart}
            className="text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}