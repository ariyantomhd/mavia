// src/components/blog/BlogEditorialSidebar.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { type BlogArticle } from '@/types/blog';

interface BlogEditorialSidebarProps {
  newReleaseArticles: BlogArticle[];
}

export default function BlogEditorialSidebar({
  newReleaseArticles,
}: BlogEditorialSidebarProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const newReleases = newReleaseArticles.slice(0, 5);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <aside className="space-y-5">
      {/* New Releases Widget (Menggantikan posisi Trending Now di bagian atas sidebar) */}
      {newReleases.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-black tracking-tight text-slate-900">
                New Releases
              </h3>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Fresh
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {newReleases.map((item) => (
              <Link
                key={item.id}
                href={`/blog/${item.slug}`}
                className="group flex items-start gap-3 py-3 first:pt-0 last:pb-0"
              >
                {item.image ? (
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200/80">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="56px"
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200/80 shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    TMV
                  </div>
                )}

                <div className="min-w-0 flex-1 space-y-1">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {item.date} • {item.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Get the Daily Briefing Dark Card */}
      <div className="bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white shadow-md">
        <h3 className="text-base font-black text-white mb-1">
          Get the daily briefing
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Top engineering articles, starter kits, and release notes. No spam.
        </p>

        {subscribed ? (
          <div className="px-3.5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
            Subscribed! Check your inbox for our weekly digest.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex items-center gap-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="w-9 h-9 rounded-full bg-white text-slate-900 hover:bg-indigo-100 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}