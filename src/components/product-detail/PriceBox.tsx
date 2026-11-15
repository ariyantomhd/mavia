// src/components/product-detail/PriceBox.tsx
'use client';

import React, { useState } from 'react';
import { ShoppingCart, Check, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';
import { Product } from '@/types/product';
import { apiCart } from '@/services/apicart';

interface PriceBoxProps {
  productId: string | number;
  productName?: string;
  currentPrice: number;
  regularPrice: number;
  extendedPrice: number;
  selectedLicense: 'regular' | 'extended';
  onSelectLicense: (license: 'regular' | 'extended') => void;
  productData?: Product;
}

// Definisikan tipe payload yang strict tanpa 'any'
interface CartPayloadWithLicense {
  productId: string;
  quantity: number;
  license_type: 'regular' | 'extended';
}

export default function PriceBox({
  productId,
  productName,
  currentPrice,
  regularPrice,
  extendedPrice,
  selectedLicense,
  onSelectLicense,
  productData,
}: PriceBoxProps) {
  const activeProductId = String(productId);
  const activeProductName = productName || productData?.title || 'Unnamed Product';

  const currentUser = useAppStore((state) => state.currentUser);
  const incrementCart = useAppStore((state) => state.incrementCart);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAddToCart = async () => {
    const isLoggedIn = Boolean(currentUser && currentUser.id);

    if (!isLoggedIn) {
      window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'signin' } }));
      return;
    }

    setIsLoading(true);
    try {
      const payload: CartPayloadWithLicense = {
        productId: activeProductId,
        quantity: 1,
        license_type: selectedLicense,
      };

      // Type-casting aman ke parameter fungsi tanpa melibatkan 'any'
      type AddToCartParam = Parameters<typeof apiCart.addToCart>[0];
      await apiCart.addToCart(payload as unknown as AddToCartParam);

      incrementCart();
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000);
    } catch (error: unknown) {
      console.error('Error adding to cart:', error);
      alert('Terjadi kesalahan saat memasukkan produk ke keranjang.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <select
            value={selectedLicense}
            onChange={(e) => onSelectLicense(e.target.value as 'regular' | 'extended')}
            className="w-full appearance-none bg-white border border-slate-300 px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-orange-500 cursor-pointer pr-8"
          >
            <option value="regular">Regular license (${regularPrice})</option>
            <option value="extended">Extended license (${extendedPrice})</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
        </div>
        <span className="text-3xl font-extrabold text-slate-800 font-mono">
          ${currentPrice}
        </span>
      </div>

      <div>
        <a 
          href="#license-details" 
          onClick={(e) => { e.preventDefault(); alert("Menampilkan detail lisensi..."); }}
          className="text-xs text-blue-600 hover:underline font-medium inline-block"
        >
          View license details
        </a>
      </div>

      <div className="space-y-2.5 pt-1 border-t border-slate-100">
        <div className="flex items-center space-x-2 text-xs text-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 fill-emerald-50" />
          <span>Free support</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 fill-emerald-50" />
          <span>Future product updates</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 fill-emerald-50" />
          <span>Quality checked by Codester</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 fill-emerald-50" />
          <span>Lowest price guarantee</span>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          aria-label={isAdded ? `${activeProductName} added to cart` : `Add ${activeProductName} to cart`}
          title={isAdded ? `${activeProductName} added to cart` : `Add ${activeProductName} to cart`}
          className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs flex items-center justify-center space-x-2 uppercase tracking-wider cursor-pointer shadow-sm disabled:opacity-50 transition-colors"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isAdded ? (
            <>
              <Check className="h-4 w-4" />
              <span>Added </span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-1.5 border-t border-slate-100 pt-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Powered by</span>
        <div className="relative h-6 w-20 opacity-90 hover:opacity-100 transition-opacity">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}