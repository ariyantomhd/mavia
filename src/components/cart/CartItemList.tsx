// src/components/cart/CartItemList.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, Headphones, Image as ImageIcon } from 'lucide-react';

export interface CartItemDisplay {
  id: string;
  title: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  license: string;
  withSupport?: boolean;
  supportPrice?: number;
  itemSubtotal?: number;
}

interface CartItemListProps {
  cartItems: CartItemDisplay[];
  totalItemsCount: number;
  onQuantityChange: (id: string, delta: number) => void;
  onToggleSupport: (id: string) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartItemList({
  cartItems,
  totalItemsCount,
  onQuantityChange,
  onToggleSupport,
  onRemoveItem,
}: CartItemListProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
          <span>
            ITEM LIST ({totalItemsCount} {totalItemsCount === 1 ? 'ITEM' : 'ITEMS'})
          </span>
          <span>Item Subtotal</span>
        </div>

        <div className="divide-y divide-slate-100">
          {cartItems.map((item) => {
            const safePrice = Number(item.price || 0);
            const safeQuantity = Number(item.quantity || 1);
            const unitSupport = Number(item.supportPrice || 0);
            const itemTotal =
              item.itemSubtotal !== undefined
                ? Number(item.itemSubtotal)
                : (safePrice + (item.withSupport ? unitSupport : 0)) * safeQuantity;

            return (
              <div key={item.id} className="p-6 space-y-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="relative w-20 h-14 bg-slate-100 rounded-md overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title || 'Digital Product'}
                          fill
                          sizes="80px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <ImageIcon size={24} className="text-slate-300" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-slate-400 tracking-wider block">
                        {item.category || 'DIGITAL ASSET'}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                        {item.title || 'Untitled Product'}
                      </h3>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs font-mono font-bold text-slate-700">
                          ${safePrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-slate-400">/ license</span>
                        <span className="bg-slate-100 text-slate-600 font-bold text-[9px] px-1.5 py-0.5 rounded">
                          {item.license || 'Regular'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => onQuantityChange(item.id, -1)}
                        className="p-2 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold font-mono text-slate-800">
                        {safeQuantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onQuantityChange(item.id, 1)}
                        className="p-2 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-right min-w-17.5">
                      <span className="text-sm font-black text-slate-900 font-mono block">
                        ${itemTotal.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ${safePrice} × {safeQuantity}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-rose-500 hover:text-rose-700 p-2 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                      <span className="hidden xl:inline">Remove</span>
                    </button>
                  </div>
                </div>

                {unitSupport > 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={item.withSupport || false}
                        onChange={() => onToggleSupport(item.id)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Headphones size={14} className="text-orange-500 shrink-0" />
                          <span className="text-xs font-bold text-slate-800">
                            Technical Support (3 Months)
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium border border-slate-200">
                            Optional
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Direct installation assistance, priority bug fixes, and code consultation for 3 months.
                        </p>
                      </div>
                    </label>
                    <div className="text-right shrink-0 pl-7 sm:pl-0">
                      <span className="text-xs font-bold font-mono text-slate-800 block">
                        +${(unitSupport * safeQuantity).toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ${unitSupport} × {safeQuantity}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between bg-white border border-slate-200 rounded-xl p-4 gap-4 text-xs text-slate-500 shadow-xs">
        <span>Digital files will be delivered automatically after successful checkout.</span>
        <Link
          href="/products"
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus size={14} />
          <span>Add More Items</span>
        </Link>
      </div>
    </div>
  );
}