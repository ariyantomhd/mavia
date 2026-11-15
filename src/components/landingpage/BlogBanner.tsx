// src/components/landingpage/BlogBanner.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  href: string;
  image: string;
}

export default function BlogBanner() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const dummyBlogs: BlogPost[] = [
    {
      id: '1',
      title: 'Membangun Arsitektur Micro-SaaS Skalabel dengan Next.js & Supabase',
      category: 'Engineering',
      readTime: '4 min read',
      href: '/blog/arsitektur-micro-saas-nextjs-supabase',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: '2',
      title: 'Optimasi Performa Web3 DApp dan Manajemen State Supabase Realtime',
      category: 'Web3 & dApps',
      readTime: '6 min read',
      href: '/blog/optimasi-performa-web3-dapp',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: '3',
      title: 'Panduan Monetisasi Digital Produk untuk Developer Indie di 2026',
      category: 'Business',
      readTime: '5 min read',
      href: '/blog/panduan-monetisasi-digital-produk',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    },
  ];

  // Efek Carousel Otomatis (Auto-scroll)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollInterval: NodeJS.Timeout;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!container) return;
        
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScrollLeft - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 304, behavior: 'smooth' });
        }
      }, 3500);
    };

    startAutoScroll();

    const handleMouseEnter = () => clearInterval(scrollInterval);
    const handleMouseLeave = () => startAutoScroll();

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(scrollInterval);
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Themavia Insights & Blog
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Tips, arsitektur kode, dan strategi developer.
              </p>
            </div>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group shrink-0"
          >
            <span>All articles</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* List Blog Berbentuk Carousel Otomatis */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dummyBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={blog.href}
              className="w-67.5 sm:w-72.5 p-3 rounded-2xl bg-slate-50/80 hover:bg-indigo-50/40 border border-slate-100 hover:border-indigo-100 transition-all group shrink-0 snap-start flex flex-col justify-between"
            >
              <div>
                {/* Perbaikan container gambar agar aman dan tidak meluber */}
                <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-200/60">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 270px, 290px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-indigo-600 font-semibold mb-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50">{blog.category}</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    {blog.readTime}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                  {blog.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1 font-medium text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Curated weekly by authors
        </span>
        <span className="font-bold text-slate-600">Free Access</span>
      </div>
    </div>
  );
}
