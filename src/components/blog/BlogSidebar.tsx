// src/components/blog/BlogSidebar.tsx
import React from 'react';
import Link from 'next/link';
import { Search, Tag, ChevronRight } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  category: string;
}

interface BlogSidebarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  popularArticles: Article[];
}

export default function BlogSidebar({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  popularArticles,
}: BlogSidebarProps) {
  return (
    <div className="space-y-6">
      
      {/* Search Widget */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-2xs">
        <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Cari Artikel</h4>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ketik kata kunci..." 
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-2xs">
        <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Kategori Artikel</h4>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2"><Tag size={12}/> {cat}</span>
              <ChevronRight size={14} className="text-slate-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Popular / Sidebar Posts */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
        <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Artikel Populer</h4>
        <div className="space-y-3 divide-y divide-slate-100">
          {popularArticles.map((art, idx) => (
            <div key={art.id} className={`flex items-start gap-3 ${idx > 0 ? 'pt-3' : ''}`}>
              <span className="text-lg font-black text-indigo-300 font-mono leading-none">0{idx + 1}</span>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase">{art.category}</span>
                <Link href={`/blog/${art.id}`}>
                  <h5 className="text-xs font-bold text-slate-800 line-clamp-2 hover:text-indigo-600 cursor-pointer transition-colors">
                    {art.title}
                  </h5>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}