// src/components/blog/BlogFilterBar.tsx
'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface BlogFilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogFilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: BlogFilterBarProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Top Stories
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Curated engineering guides, architecture notes, and indie product insights.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white/85 hover:bg-white text-slate-700 border border-slate-200/80'
              }`}
            >
              {category}
            </button>
          );
        })}

        <div className="relative ml-0 sm:ml-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles..."
            className="pl-8 pr-3 py-1.5 rounded-full bg-white/90 border border-slate-200/80 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 w-44 sm:w-52"
          />
        </div>
      </div>
    </div>
  );
}