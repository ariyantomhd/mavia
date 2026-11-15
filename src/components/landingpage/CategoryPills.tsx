// src/components/landingpage/CategoryPills.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  {
    title: 'Mobile Apps',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/518/518705.png',
    slug: 'mobile-apps',
  },
  {
    title: 'Blog & CMS',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/6863/6863803.png',
    slug: 'blog-cms',
  },
  {
    title: 'Defi & Web3',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/8749/8749219.png',
    slug: 'defi-web3',
  },
  {
    title: 'UI Kits',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1055/1055666.png',
    slug: 'ui-kits',
  },
];

export default function CategoryPills() {
  return (
    <section className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {CATEGORIES.map((cat, idx) => (
          <Link
            key={idx}
            href={`/products?category=${cat.slug}`}
            className="group relative flex flex-col items-center justify-center p-5 rounded-3xl bg-white  text-slate-900 dark:text-white shadow-lg border border-slate-200/80 dark:border-white/10 hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Animasi Garis Border Berjalan saat Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute -inset-full bg-[conic-gradient(from_0deg,#9333ea_0deg,#c084fc_120deg,transparent_180deg)] animate-spin [animation-duration:3s]" />
            </div>

            {/* Layer Putih / Gelap Penutup Tengah */}
            <div className="absolute inset-[1.5px] bg-white rounded-[22px] z-0" />

            {/* Icon Container */}
            <div className="relative z-10 p-3 rounded-2xl bg-slate-100 dark:bg-purple-900/20 group-hover:bg-purple-500/10 mb-3 transition-all duration-300 group-hover:scale-110 shadow-sm flex items-center justify-center h-14 w-14">
              <Image
                src={cat.iconUrl}
                alt={cat.title}
                width={32}
                height={32}
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform group-hover:scale-105"
              />
            </div>

            {/* Title */}
            <span className="relative z-10 font-bold text-xs sm:text-sm text-slate-900 dark:text-black group-hover:text-purple-600 dark:group-hover:text-orange-600 transition-colors text-center">
              {cat.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}