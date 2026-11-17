// src/components/blog/BlogEditorialSidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogArticle } from '../../types';

interface BlogEditorialSidebarProps {
  trendingArticles: BlogArticle[];
}

export default function BlogEditorialSidebar({
  trendingArticles,
}: BlogEditorialSidebarProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <aside className="space-y-5">
      {/* Trending Now Numbered Box */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-slate-900">Trending Now</h3>
          <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-600 text-[10px] font-extrabold uppercase tracking-wider">
            LIVE
          </span>
        </div>

        <div className="space-y-3.5">
          {trendingArticles.slice(0, 5).map((item, idx) => (
            <Link
              key={item.id}
              href={`/blog/${item.slug}`}
              className="flex items-start gap-3 group"
            >
              <span className="text-base font-black text-slate-300 group-hover:text-indigo-600 transition-colors w-4 shrink-0 leading-tight">
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {item.title}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {item.views} • {item.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

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