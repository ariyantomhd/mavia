// src/components/landingpage/BlogBanner.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMarketArticles } from '@/services/blogApi';
import type { BlogArticle } from '@/types/blog';

interface BannerSlide {
  id: string;
  title: string;
  ctaText: string;
  href: string;
  image: string;
}

const SLIDE_DURATION = 4500;
const MAX_SLIDES = 4;

export default function BlogBanner() {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSlides() {
      try {
        const articles: BlogArticle[] = await getMarketArticles();
        if (!isMounted) return;

        const mappedSlides: BannerSlide[] = articles
          .slice(0, MAX_SLIDES)
          .map((article) => ({
            id: String(article.id),
            title: article.title,
            ctaText: 'Read Now',
            href: `/blog/${article.slug}`,
            image: article.image,
          }));

        setSlides(mappedSlides);
        setActiveIndex(0);
      } catch {
        if (isMounted) setSlides([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadSlides();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  if (loading) {
    return (
      <div className="relative bg-[#251b3d] border border-white/10 rounded-3xl overflow-hidden flex items-stretch justify-between min-h-47.5 sm:min-h-51.25 h-full p-5 sm:p-6 animate-pulse">
        <div className="flex flex-col justify-between w-[56%]">
          <div className="space-y-2.5">
            <div className="h-4 bg-white/15 rounded-lg w-11/12" />
            <div className="h-4 bg-white/15 rounded-lg w-3/4" />
            <div className="h-9 bg-white/15 rounded-2xl w-28 mt-4" />
          </div>
          <div className="flex items-center gap-1.5 pt-4">
            <div className="h-1.5 w-8 rounded-full bg-white/20" />
            <div className="h-1.5 w-8 rounded-full bg-white/10" />
            <div className="h-1.5 w-8 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="w-[42%] flex items-end justify-center">
          <div className="w-full h-28 rounded-t-xl bg-white/10" />
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  const currentBlog = slides[activeIndex] ?? slides[0];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative bg-[#251b3d] border border-white/10 rounded-3xl overflow-hidden flex items-stretch justify-between min-h-47.5 sm:min-h-51.25 h-full group"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 w-56 h-56 rounded-full bg-purple-500/20 blur-2xl" />

      {/* Kiri: Judul Putih, Pill CTA Button, dan Progress Bar Slide */}
      <div className="relative z-10 flex flex-col justify-between p-5 sm:p-6 w-[55%]">
        <div>
          <Link href={currentBlog.href}>
            <h2 className="text-base sm:text-lg font-extrabold text-white leading-snug tracking-tight line-clamp-3 hover:text-purple-200 transition-colors">
              {currentBlog.title}
            </h2>
          </Link>

          <div className="mt-3.5">
            <Link
              href={currentBlog.href}
              className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-[#c4b5fd] hover:bg-white text-[#1e1633] text-xs sm:text-sm font-bold transition-colors"
            >
              {currentBlog.ctaText}
            </Link>
          </div>
        </div>

        {/* Horizontal Progress Bar Indicators */}
        {slides.length > 1 && (
          <div className="flex items-center gap-1.5 pt-4">
            {slides.map((post, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;

              return (
                <button
                  key={post.id}
                  type="button"
                  aria-label={`Slide ${idx + 1}: ${post.title}`}
                  onClick={() => setActiveIndex(idx)}
                  className="relative h-1.5 w-7 sm:w-8 rounded-full bg-white/20 overflow-hidden cursor-pointer"
                >
                  <span
                    className={`block h-full rounded-full bg-[#a78bfa] transition-all duration-300 ${
                      isActive
                        ? 'w-full'
                        : isPast
                          ? 'w-full opacity-50'
                          : 'w-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Kanan: Mockup Frame Laptop / Notebook */}
      <Link
        href={currentBlog.href}
        className="relative z-10 w-[45%] shrink-0 flex items-end justify-center pr-3 sm:pr-5 pl-1 pt-5 pb-3"
      >
        <div className="relative w-full max-w-52 sm:max-w-56 select-none">
          {/* Glow di belakang layar */}
          <div className="absolute -inset-2 bg-indigo-400/20 blur-xl rounded-full opacity-75 group-hover:opacity-100 transition-opacity" />

          {/* Lid / Bezel Layar Laptop */}
          <div className="relative rounded-t-xl bg-slate-900 border-2 border-slate-700/90 shadow-2xl overflow-hidden">
            {/* Bar Kamera Atas */}
            <div className="h-3 bg-slate-900 flex items-center justify-center border-b border-slate-800">
              <span className="w-1 h-1 rounded-full bg-slate-600" />
            </div>

            {/* Layar Preview Artikel */}
            <div className="relative aspect-16/10 w-full bg-slate-950 overflow-hidden">
              {currentBlog.image ? (
                <Image
                  key={currentBlog.id}
                  src={currentBlog.image}
                  alt={currentBlog.title}
                  fill
                  sizes="(max-width: 768px) 180px, 240px"
                  unoptimized
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-slate-400">
                  THEMAVIA
                </div>
              )}

              {/* Kilau kaca layar halus */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-white/10" />
            </div>
          </div>

          {/* Base / Dudukan Bawah Laptop */}
          <div className="relative mx-auto w-[108%] left-[-4%] h-2 bg-linear-to-b from-slate-300 via-slate-400 to-slate-500 rounded-b-md shadow-md flex justify-center">
            <div className="w-8 h-0.5 bg-slate-600/80 rounded-b-sm" />
          </div>
        </div>
      </Link>
    </div>
  );
}