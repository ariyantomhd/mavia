// src/components/CategoryDropdown.tsx
'use client';

import React from 'react';
import { LayoutGrid, ChevronDown } from 'lucide-react';

const CATEGORIES = [
  { title: 'Mobile Apps', slug: 'mobile-apps' },
  { title: 'Web Templates', slug: 'web-templates' },
  { title: 'Scripts & Plugins', slug: 'scripts-plugins' },
  { title: 'eCommerce', slug: 'ecommerce' },
  { title: 'Games', slug: 'games' },
  { title: 'UI Kits', slug: 'ui-kits' },
];

interface CategoryDropdownProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryDropdown({
  selectedCategory,
  onCategoryChange,
}: CategoryDropdownProps) {
  
  // Mencari nama title kategori yang sedang aktif untuk ditampilkan di tombol
  const activeCategoryTitle = selectedCategory === 'ALL' 
    ? 'All Categories' 
    : CATEGORIES.find(c => c.slug === selectedCategory)?.title || 'All Categories';

  return (
    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
      <LayoutGrid className="w-4 h-4 text-slate-100" />
      <span className="text-xs font-bold text-slate-100 uppercase">Category:</span>
      
      {/* Menggunakan 'group' tanpa padding vertikal tambahan agar kursor langsung memicu penutupan */}
      <div className="relative group">
        {/* Tombol Pemicu */}
        <button
          type="button"
          className="flex items-center justify-between gap-2 w-40 sm:w-48 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500 hover:bg-white transition-colors cursor-pointer"
        >
          <span className="truncate">{activeCategoryTitle}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-180 transition-transform duration-150" />
        </button>

        {/* Kontainer Dropdown (Tanpa animate-in fade-in agar langsung muncul & menutup seketika) */}
        <div className="absolute top-full right-0 w-48 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden hidden group-hover:block z-50 py-1">
          <button
            type="button"
            onClick={() => onCategoryChange('ALL')}
            className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${
              selectedCategory === 'ALL' 
                ? 'bg-teal-50 text-teal-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600'
            }`}
          >
            All Categories
          </button>
          
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onCategoryChange(cat.slug)}
              className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-teal-50 text-teal-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
