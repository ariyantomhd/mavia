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
        <div className="flex flex-col justify-between w-[60%]">
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
        <div className="w-[36%] rounded-2xl bg-white/10" />
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
      {/* Kiri: Judul Putih, Pill CTA Button, dan Progress Bar Slide */}
      <div className="relative z-10 flex flex-col justify-between p-5 sm:p-6 w-[60%]">
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

      {/* Kanan: Slot Visual Artikel dari Backend */}
      <Link
        href={currentBlog.href}
        className="relative w-[40%] shrink-0 flex items-end justify-center p-2"
      >
        <div className="relative w-full h-full">
          <Image
            key={currentBlog.id}
            src={currentBlog.image}
            alt={currentBlog.title}
            fill
            sizes="(max-width: 768px) 160px, 220px"
            className="object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
    </div>
  );
}