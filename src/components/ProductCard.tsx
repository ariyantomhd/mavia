// src/components/ProductCard.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart, Check } from "lucide-react";
import { Product } from "@/types/product";
import { TechIcon } from "@/components/TechIcons";
import AuthToast from "@/components/AuthToast";

import { apiCart } from "@/services/apicart";
import { useAppStore } from "@/store/useAppStore";

interface ProductCardProps {
  product: Product;
  className?: string;
  onAddToCart?: (productId: string) => void;
  onRequestLogin?: () => void;
}

export default function ProductCard({
  product,
  className = "",
  onAddToCart,
  onRequestLogin,
}: ProductCardProps) {
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);
  const [showAuthToast, setShowAuthToast] = useState(false);

  const incrementCart = useAppStore((state) => state.incrementCart);
  const isLoggedIn = Boolean(useAppStore((state) => state.currentUser?.id));

  if (!product) return null;

  const { title, id: productId, live_preview_url: livePreviewUrl } = product;
  const slug = product.slug || product.id;

  const handleCardClick = () => {
    router.push(`/products/${slug}`);
  };

  const handleCartClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setCartError(null);

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
          setCartError(response.message || "Failed to add item to cart.");
          setTimeout(() => setCartError(null), 3500);
        }
      }
    } catch (error: unknown) {
      console.error("[Cart Error]:", error);
      setCartError("Unable to connect to server.");
      setTimeout(() => setCartError(null), 3500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (livePreviewUrl) {
      window.open(livePreviewUrl, "_blank", "noopener,noreferrer");
    } else {
      handleCardClick();
    }
  };

  const prodAny = product as unknown as Record<string, unknown>;
  const galleryImagesProp = prodAny.gallery_images as string[] | undefined;

  const firstGalleryImage =
    Array.isArray(galleryImagesProp) && galleryImagesProp.length > 0
      ? galleryImagesProp[0]
      : Array.isArray(product.gallery) && product.gallery.length > 0
        ? product.gallery[0].image_url
        : product.images_url || null;

  const hasValidImage = Boolean(!imgError && firstGalleryImage);

  const primaryTech =
    (product.tech_stack && product.tech_stack[0]) ||
    product.framework_version ||
    (product.tags && product.tags[0]) ||
    "React";

  const activePrice =
    product.discount_price !== null && product.discount_price !== undefined
      ? product.discount_price
      : (product.regular_price ?? 0);

  const priceFormatted = activePrice > 0 ? activePrice.toFixed(0) : "FREE";
  const ratingValue = Math.round(product.rating_avg || 0);

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
            {hasValidImage && firstGalleryImage ? (
              <Image
                src={firstGalleryImage}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => setImgError(true)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-xs font-semibold text-slate-400 px-2 text-center">
                No preview image available
              </span>
            )}

            <div className="absolute top-2.5 left-2.5 bg-white/95 text-slate-900 border border-slate-200 px-2.5 py-0.5 font-extrabold text-[12px] shadow-xs backdrop-blur-xs z-10">
              {priceFormatted === "FREE" ? "FREE" : `$${priceFormatted}`}
            </div>

            <button
              type="button"
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
                <ShoppingCart
                  size={13}
                  strokeWidth={2.5}
                  className={isLoading ? "animate-pulse" : ""}
                />
              )}
            </button>

            {cartError && (
              <div className="absolute inset-x-2 bottom-2 z-20 bg-rose-600/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-md backdrop-blur-xs">
                {cartError}
              </div>
            )}
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between bg-white">
            <div>
              <h3 className="font-bold text-slate-900 text-[14px] leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={12}
                    className={
                      s <= ratingValue
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-200 text-slate-200"
                    }
                  />
                ))}
              </div>
              {product.reviews_count > 0 && (
                <span className="text-[11px] font-medium text-slate-400">
                  ({product.reviews_count})
                </span>
              )}
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
              type="button"
              onClick={handleDemoClick}
              className="bg-[#ffa33b] hover:bg-orange-600 text-white py-1.5 px-3 font-black text-[9px] uppercase tracking-widest rounded-none flex items-center justify-center transition-colors shadow-xs shrink-0"
            >
              DEMO LIVE
            </button>
          </div>
        </div>
      </motion.div>

      <AuthToast
        isVisible={showAuthToast}
        onClose={() => setShowAuthToast(false)}
        onLoginClick={() => {
          if (onRequestLogin) {
            onRequestLogin();
          } else {
            window.dispatchEvent(new Event("open-auth-modal"));
          }
        }}
      />
    </>
  );
}