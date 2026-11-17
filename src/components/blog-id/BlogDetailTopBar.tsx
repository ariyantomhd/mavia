// src/components/blog-id/BlogDetailTopBar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';

export default function BlogDetailTopBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      router.push('/blog');
      return;
    }
    router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div className="px-5 sm:px-8 py-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Blog</span>
      </Link>

      <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-9 pr-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
        />
      </form>
    </div>
  );
}