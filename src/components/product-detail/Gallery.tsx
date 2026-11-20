// src/components/product-detail/Gallery.tsx
'use client';

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, X, Monitor, Camera, Heart } from "lucide-react";
import { productAPI } from "@/services/apiProducts";
import { useAppStore } from "@/store/useAppStore";

export interface GalleryProps {
  productId?: string;
  product?: Record<string, unknown> | null;
  thumbnails?: string[];
  images?: string[];
  selectedIndex?: number;
  onSelectIndex?: (index: number | ((prev: number) => number)) => void;
  activeIndex?: number;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number>>;
  title?: string;
  demoUrl?: string;
  likes?: number;
}

function extractImageUrl(item: unknown): string | null {
  if (typeof item === 'string' && item.trim()) {
    return item.trim();
  }
  if (item && typeof item === 'object') {
    const obj = item as Record<string, unknown>;
    const candidate = obj.image_url ?? obj.url ?? obj.src;
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim();
    }
  }
  return null;
}

function normalizeGalleryList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];

  const sorted = [...raw].sort((a, b) => {
    const orderA =
      a && typeof a === 'object' && typeof (a as Record<string, unknown>).sort_order === 'number'
        ? ((a as Record<string, unknown>).sort_order as number)
        : 0;
    const orderB =
      b && typeof b === 'object' && typeof (b as Record<string, unknown>).sort_order === 'number'
        ? ((b as Record<string, unknown>).sort_order as number)
        : 0;
    return orderA - orderB;
  });

  return sorted
    .map(extractImageUrl)
    .filter((url): url is string => Boolean(url));
}

export default function Gallery({ 
  productId,
  product,
  thumbnails,
  images, 
  selectedIndex,
  onSelectIndex,
  activeIndex: externalIndex, 
  setActiveIndex: externalSetActiveIndex, 
  title = "Product Image",
  demoUrl, 
  likes = 0 
}: GalleryProps) {
  const queryClient = useQueryClient();
  const currentUser = useAppStore((state) => state.currentUser);
  const resolvedProductId =
    productId ||
    (product && typeof product.id === 'string' ? product.id : undefined);

  const combinedImages: string[] = [];

  const pushUnique = (url: string | null | undefined) => {
    if (url && !combinedImages.includes(url)) {
      combinedImages.push(url);
    }
  };

  if (product) {
    const p = product as Record<string, unknown>;

    const mainImage =
      (typeof p.images_url === 'string' && p.images_url) ||
      (typeof p.image_url === 'string' && p.image_url) ||
      (typeof p.image === 'string' && p.image) ||
      (typeof p.file_source_url === 'string' && p.file_source_url.startsWith('http')
        ? p.file_source_url
        : null) ||
      (typeof p.thumbnail_url === 'string' && p.thumbnail_url) ||
      null;

    pushUnique(mainImage);

    const gallerySources = [p.gallery_images, p.gallery, p.product_galleries];
    for (const source of gallerySources) {
      const urls = normalizeGalleryList(source);
      for (const url of urls) {
        pushUnique(url);
      }
    }
  }

  if (combinedImages.length === 0) {
    const fallbackList = images && images.length > 0 ? images : (thumbnails || []);
    for (const url of fallbackList) {
      pushUnique(url);
    }
  }

  const [internalIndex, setInternalIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Sync product like status from API
  const { data: likesSummary } = useQuery({
    queryKey: ['product-likes', resolvedProductId, currentUser?.id],
    queryFn: () => productAPI.getProductLikes(resolvedProductId!),
    enabled: Boolean(resolvedProductId),
  });

  const [optimisticLiked, setOptimisticLiked] = useState<boolean | null>(null);
  const [optimisticDelta, setOptimisticDelta] = useState<number>(0);

  const baseLikesCount = likesSummary?.likes_count ?? likes;
  const baseIsLiked = likesSummary?.is_liked ?? false;

  const displayedLiked = optimisticLiked !== null ? optimisticLiked : baseIsLiked;
  const displayedLikeCount = Math.max(0, baseLikesCount + optimisticDelta);

  const likeMutation = useMutation({
    mutationFn: () => productAPI.toggleProductLike(resolvedProductId!),
    onMutate: () => {
      const nextLiked = !displayedLiked;
      setOptimisticLiked(nextLiked);
      setOptimisticDelta((prev) => prev + (nextLiked ? 1 : -1));
    },
    onSuccess: (data) => {
      setOptimisticLiked(null);
      setOptimisticDelta(0);
      if (data && typeof data.likes_count === 'number') {
        queryClient.setQueryData(
          ['product-likes', resolvedProductId, currentUser?.id],
          data,
        );
      } else {
        queryClient.invalidateQueries({
          queryKey: ['product-likes', resolvedProductId],
        });
      }
    },
    onError: () => {
      // Keep local optimistic state if backend endpoint is unavailable
    },
  });

  const handleLikeClick = () => {
    const isLoggedIn = Boolean(currentUser && currentUser.id);

    if (!isLoggedIn) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('open-auth-modal', { detail: { mode: 'signin' } }),
        );
      }
      return;
    }

    if (!resolvedProductId) {
      const nextLiked = !displayedLiked;
      setOptimisticLiked(nextLiked);
      setOptimisticDelta((prev) => prev + (nextLiked ? 1 : -1));
      return;
    }

    likeMutation.mutate();
  };

  const rawActiveIndex = selectedIndex ?? externalIndex ?? internalIndex;
  const activeIndex =
    combinedImages.length > 0 ? Math.min(Math.max(0, rawActiveIndex), combinedImages.length - 1) : 0;

  const handleIndexChange = (action: number | ((prev: number) => number)) => {
    setImgError(false);
    if (onSelectIndex) {
      onSelectIndex(action);
    } else if (externalSetActiveIndex) {
      externalSetActiveIndex(action);
    } else {
      setInternalIndex(action);
    }
  };

  const emptyPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%2394a3b8'%3ENo Preview Image Available%3C/text%3E%3C/svg%3E";

  const currentImageList = combinedImages.length > 0 ? combinedImages : [emptyPlaceholder];
  const activeImage = imgError ? emptyPlaceholder : (currentImageList[activeIndex] || currentImageList[0]);

  const next = () => {
    handleIndexChange((prev) => (prev + 1) % currentImageList.length);
  };

  const prev = () => {
    handleIndexChange((prev) => (prev - 1 + currentImageList.length) % currentImageList.length);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-2 rounded-sm border border-gray-200 shadow-sm space-y-2.5">
        <div className="relative aspect-video bg-gray-100 overflow-hidden group flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex + activeImage}
              src={activeImage}
              alt={`${title} - Preview ${activeIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full object-cover cursor-zoom-in"
              referrerPolicy="no-referrer"
              onClick={() => setIsZoomed(true)}
              onError={() => setImgError(true)}
            />
          </AnimatePresence>

          {currentImageList.length > 1 && (
            <>
              <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none z-10">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous screenshot"
                  className="p-2.5 bg-black/45 hover:bg-[#00AEEF] text-white rounded-full backdrop-blur-sm transition-all pointer-events-auto cursor-pointer shadow-md group"
                >
                  <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next screenshot"
                  className="p-2.5 bg-black/45 hover:bg-[#00AEEF] text-white rounded-full backdrop-blur-sm transition-all pointer-events-auto cursor-pointer shadow-md group"
                >
                  <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="absolute bottom-3 right-3 z-10 bg-black/60 text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded backdrop-blur-sm">
                {activeIndex + 1} / {currentImageList.length}
              </div>
            </>
          )}
        </div>

        {combinedImages.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 pt-1">
            {combinedImages.map((thumbUrl, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={`${thumbUrl}-${idx}`}
                  type="button"
                  onClick={() => handleIndexChange(idx)}
                  className={`relative aspect-video rounded-sm overflow-hidden border-2 transition-all cursor-pointer bg-gray-100 ${
                    isSelected
                      ? "border-[#00AEEF] ring-2 ring-[#00AEEF]/30 opacity-100"
                      : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={thumbUrl}
                    alt={`${title} thumbnail ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 25vw, 150px"
                    unoptimized
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-stretch gap-3 mt-4">
        <a 
          href={demoUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-2 bg-[#00AEEF] text-white py-4 px-6 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#00AEEF]/90 transition-all shadow-sm"
        >
          <Monitor size={18} />
          Live Demo
        </a>
        
        <button 
          type="button"
          onClick={() => setIsZoomed(true)}
          className="flex-1 bg-white border border-gray-200 text-slate-700 py-4 px-6 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm cursor-pointer"
        >
          <Camera size={18} />
          Screenshot
        </button>
        
        <button 
          type="button"
          onClick={handleLikeClick}
          disabled={likeMutation.isPending}
          title={displayedLiked ? "Remove from Wishlist" : "Like this product"}
          className={`bg-white border py-4 px-6 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-sm min-w-20 cursor-pointer group ${
            displayedLiked
              ? "border-rose-200 bg-rose-50/40 text-rose-600"
              : "border-gray-200 text-slate-700 hover:bg-gray-50"
          }`}
        >
          <Heart 
            size={18} 
            className={`transition-colors ${
              displayedLiked ? "text-rose-500 fill-rose-500" : "text-gray-400 group-hover:text-rose-500"
            }`} 
          />
          <span className={displayedLiked ? "text-rose-500 font-bold" : "text-gray-600"}>
            {displayedLikeCount}
          </span>
        </button>
      </div>

      {isZoomed && (
        <div className="fixed inset-0 z-100 bg-black/95 flex flex-col items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer z-50"
          >
            <X size={28} />
          </button>

          {currentImageList.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 pointer-events-none z-50">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="p-3 md:p-4 bg-white/10 hover:bg-[#00AEEF] text-white rounded-full backdrop-blur-md transition-all pointer-events-auto cursor-pointer shadow-lg group"
              >
                <ChevronLeft size={36} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="p-3 md:p-4 bg-white/10 hover:bg-[#00AEEF] text-white rounded-full backdrop-blur-md transition-all pointer-events-auto cursor-pointer shadow-lg group"
              >
                <ChevronRight size={36} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          <motion.img
            key={activeIndex + activeImage}
            src={activeImage}
            alt={title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="max-w-[85vw] max-h-[72vh] object-contain rounded-md shadow-2xl"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />

          {combinedImages.length > 1 && (
            <div className="mt-4 flex items-center gap-2 overflow-x-auto max-w-[85vw] p-1 z-50">
              {combinedImages.map((thumbUrl, idx) => (
                <button
                  key={`zoom-${thumbUrl}-${idx}`}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIndexChange(idx);
                  }}
                  className={`relative w-16 h-10 rounded overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    idx === activeIndex
                      ? "border-[#00AEEF] scale-105 opacity-100"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={thumbUrl}
                    alt={`Zoom thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    unoptimized
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="mt-3 text-white/70 text-xs font-mono font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full z-50">
            {activeIndex + 1} / {currentImageList.length}
          </div>
        </div>
      )}
    </div>
  );
}