// src/components/blog/BlogBentoHero.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogArticle } from '../../types';

interface BlogBentoHeroProps {
  articles: BlogArticle[];
}

export default function BlogBentoHero({ articles }: BlogBentoHeroProps) {
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides = articles.slice(0, 3);
  const rightTopArticle = articles[1];
  const rightBottomArticle = articles[2];

  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  if (!heroSlides.length) return null;

  const activeHero = heroSlides[heroIndex];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Left Hero Slider Card (7 cols) */}
      <div className="lg:col-span-7 relative rounded-3xl overflow-hidden min-h-85 sm:min-h-102.5 bg-slate-950 shadow-lg group">
        <Image
          key={activeHero.id}
          src={activeHero.image}
          alt={activeHero.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/55 to-transparent" />

        <div className="relative z-10 h-full min-h-85 sm:min-h-102.5 p-6 sm:p-8 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
              {activeHero.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-semibold">
              {activeHero.tag || 'Featured'}
            </span>
          </div>

          <Link href={`/blog/${activeHero.slug}`}>
            <h1 className="text-xl sm:text-3xl font-black text-white leading-tight tracking-tight hover:text-indigo-200 transition-colors mb-2.5">
              {activeHero.title}
            </h1>
          </Link>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-2xl mb-4">
            {activeHero.excerpt}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
              <span>{activeHero.date}</span>
              <span>•</span>
              <span>By {activeHero.author.name}</span>
            </div>

            {/* Carousel Controls & Dots */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Slide ${idx + 1}`}
                    onClick={() => setHeroIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      heroIndex === idx
                        ? 'w-5 bg-white'
                        : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={() =>
                    setHeroIndex(
                      (prev) =>
                        (prev - 1 + heroSlides.length) % heroSlides.length,
                    )
                  }
                  className="w-8 h-8 rounded-full bg-white text-slate-900 hover:bg-indigo-50 flex items-center justify-center shadow transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={() =>
                    setHeroIndex((prev) => (prev + 1) % heroSlides.length)
                  }
                  className="w-8 h-8 rounded-full bg-white text-slate-900 hover:bg-indigo-50 flex items-center justify-center shadow transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right 2 Stacked Feature Cards (5 cols) */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        {[rightTopArticle, rightBottomArticle].filter(Boolean).map((item) => (
          <Link
            key={item.id}
            href={`/blog/${item.slug}`}
            className="relative flex-1 min-h-48.75 rounded-3xl overflow-hidden bg-slate-900 shadow-md group flex flex-col justify-end p-5 sm:p-6"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent" />

            <div className="relative z-10">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-2 ${item.badgeColor}`}
              >
                {item.category}
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-white leading-snug line-clamp-2 group-hover:text-indigo-200 transition-colors mb-1.5">
                {item.title}
              </h2>
              <p className="text-[11px] text-slate-300 font-medium">
                {item.readTime} • {item.tag}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}