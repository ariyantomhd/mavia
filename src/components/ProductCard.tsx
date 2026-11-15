// src/components/ProductCard.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart, Check } from "lucide-react";
import { Product } from "@/types/product";
import { TechIcon } from "@/components/TechIcons";
import AuthToast from "@/components/AuthToast"; // <-- Import Notifikasi Baru

import { apiCart } from "@/services/apicart";
import { useAppStore } from "@/store/useAppStore";

interface ProductCardProps {
  key?: string | number;
  product?: Product;
  className?: string;
  onAddToCart?: (productId: string) => void;
  // Opsional: Callback jika komponen induk ingin menangani pembukaan modal login
  onRequestLogin?: () => void; 
}

export default function ProductCard({ product, className = "", onAddToCart, onRequestLogin }: ProductCardProps) {
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk mengontrol visibilitas AuthToast
  const [showAuthToast, setShowAuthToast] = useState(false);

  const incrementCart = useAppStore((state) => state.incrementCart);
  const isLoggedIn = Boolean(useAppStore((state) => state.currentUser?.id));

  const title = product?.title || "PixelCraft Enterprise Design System";
  const slug = product?.slug || product?.id || "placeholder-product";
  const livePreviewUrl = product?.live_preview_url;
  const productId = product?.id || "placeholder-id";

  const handleCardClick = () => {
    router.push(`/products/${slug}`);
  };

  const handleCartClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Jika belum login, tampilkan pop-up AuthToast yang elegan
    if (!isLoggedIn) {
      setShowAuthToast(true);
      return;
    }

    if (isLoading) return;
    
    try {
      setIsLoading(true);

      if (onAddToCart) {
        onAddToCart(String(productId));
      } else {
        const response = await apiCart.addToCart({
          productId: String(productId),
          quantity: 1,
        });

        if (response.success) {
          setIsAdded(true);
          setTimeout(() => setIsAdded(false), 2000);
          incrementCart();
        } else {
          // Tetap gunakan alert sederhana jika terjadi error logika dari backend (misal: stok habis)
          alert(response.message || "Gagal menambahkan produk ke keranjang.");
        }
      }
    } catch (error: unknown) {
      console.error("[Cart Error]:", error);
      alert("Terjadi kesalahan sistem saat menghubungi server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (livePreviewUrl) {
      window.open(livePreviewUrl, '_blank', 'noopener,noreferrer');
    } else {
      handleCardClick();
    }
  };

  // ... (Sisa logika fallback gambar dan perhitungan harga tetap sama) ...
  const fallbackImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const prodAny = product as Record<string, unknown> | undefined;
  const galleryImagesProp = prodAny?.gallery_images as string[] | undefined;
  const galleryProp = prodAny?.gallery as unknown[] | undefined;

  const firstGalleryImage = Array.isArray(galleryImagesProp) && galleryImagesProp.length > 0
    ? galleryImagesProp[0]
    : (Array.isArray(galleryProp) && galleryProp.length > 0 
        ? (typeof galleryProp[0] === 'string' ? galleryProp[0] : (galleryProp[0] as Record<string, unknown>)?.image_url as string) 
        : null);

  const rawImage = firstGalleryImage;
  const imageSource = (!imgError && rawImage) ? rawImage : fallbackImage;
  
  const techStackProp = prodAny?.tech_stack as string[] | undefined;
  const tagsProp = prodAny?.tags as string[] | undefined;
  const frameworkVersionProp = prodAny?.framework_version as string | undefined;

  const primaryTech = (techStackProp && techStackProp[0]) || frameworkVersionProp || (tagsProp && tagsProp[0]) || "React";

  const discountPriceVal = prodAny?.discount_price as number | null | undefined;
  const regularPriceVal = prodAny?.regular_price as number | undefined;

  const activePrice = discountPriceVal !== null && discountPriceVal !== undefined 
    ? discountPriceVal 
    : (regularPriceVal ?? 0);

  const priceFormatted = activePrice > 0 ? activePrice.toFixed(0) : "FREE";

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`group relative h-full cursor-pointer hover:-translate-y-1 transition-all duration-300 ${className}`}
        onClick={handleCardClick}
      >
        <div className="relative bg-white border border-slate-200 rounded-none flex flex-col h-full overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
          
          <div className="relative w-full aspect-16/10 bg-slate-100 overflow-hidden border-b border-slate-200 shrink-0 flex items-center justify-center">
            {rawImage ? (
              <Image 
                src={imageSource} 
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => setImgError(true)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-xs font-semibold text-slate-400 px-2 text-center">
                [ Belum ada gambar galeri ]
              </span>
            )}

            <div className="absolute top-2.5 left-2.5 bg-white/95 text-slate-900 border border-slate-200 px-2.5 py-0.5 font-extrabold text-[12px] shadow-xs backdrop-blur-xs z-10">
              {priceFormatted === "FREE" ? "FREE" : `$${priceFormatted}`}
            </div>
        
            <button 
              onClick={handleCartClick}
              disabled={isLoading}
              title={isAdded ? "Added to Cart" : "Add to Cart"}
              className={`absolute top-2.5 right-2.5 w-7 h-7 ${
                isAdded 
                  ? "bg-green-500 border-green-600 text-white" 
                  : "bg-white/95 text-slate-700 hover:bg-slate-100 border-slate-200"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""} backdrop-blur-xs border flex items-center justify-center hover:scale-110 transition-transform shadow-xs rounded-none z-10`}
            >
              {isAdded ? (
                <Check size={13} strokeWidth={2.5} />
              ) : (
                <ShoppingCart size={13} strokeWidth={2.5} className={isLoading ? "animate-pulse" : ""} />
              )}
            </button>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between bg-white">
            <div>
              <h3 className="font-bold text-slate-900 text-[14px] leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className="fill-slate-300 text-slate-300" />
                ))}
              </div>
            </div>
          </div>

          <div className="px-3.5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
            <div className="flex items-center shrink-0">
              <span 
                title={primaryTech}
                className="w-7 h-7 rounded-none bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 transition-colors shadow-2xs"
              >
                <TechIcon name={primaryTech} size={15} />
              </span>
            </div>
            <button 
              onClick={handleDemoClick}
              className="bg-[#ffa33b] hover:bg-orange-600 text-white py-1.5 px-3 font-black text-[9px] uppercase tracking-widest rounded-none flex items-center justify-center transition-colors shadow-xs shrink-0"
            >
              DEMO LIVE
            </button>
          </div>

        </div>
      </motion.div>

      {/* Render Notifikasi Pop-up */}
      <AuthToast 
        isVisible={showAuthToast} 
        onClose={() => setShowAuthToast(false)} 
        onLoginClick={() => {
          // Logika untuk membuka modal login.
          // Jika Navbar memiliki state modal global, abang bisa memicu event kustom,
          // atau mengarahkan ke halaman dengan query parameter seperti ini:
          if (onRequestLogin) {
            onRequestLogin();
          } else {
            // Fallback sederhana jika tidak ada callback
            alert("Harap buka menu login di Navbar.");
          }
        }} 
      />
    </>
  );
}