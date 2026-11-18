// src/components/layout/NavbarLinks.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown, Box, FileText, Smartphone, LayoutGrid, Code2 } from 'lucide-react';

export default function NavbarLinks() {
  return (
    <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-200">
      {/* 1. Browse Dropdown */}
      <div className="relative group py-2">
        <button
          type="button"
          className="flex items-center gap-1 hover:text-indigo-400 transition-colors cursor-pointer"
        >
          <span>Browse</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
        </button>

        <div className="absolute top-full left-0 w-56 bg-[#0F1035] border border-slate-800 rounded-2xl shadow-xl py-3 hidden group-hover:block z-50">
          <Link
            href="/products?sort=trending"
            className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
          >
            🔥 Trending Now
          </Link>
          <Link
            href="/products?sort=bestseller"
            className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
          >
            ⭐ Best Sellers
          </Link>
          <Link
            href="/products?filter=new"
            className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
          >
            ✨ New Releases
          </Link>
          <Link
            href="/deals"
            className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
          >
            ⚡ Special Deals
          </Link>
        </div>
      </div>

      {/* 2. Categories Dropdown */}
      <div className="relative group py-2">
        <button
          type="button"
          className="flex items-center gap-1 hover:text-[#583cf0] dark:hover:text-indigo-400 transition-colors cursor-pointer"
        >
          <span>Categories</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-150" />
        </button>

        <div className="absolute top-full left-0 w-68 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-indigo-100 dark:border-slate-800 p-2 hidden group-hover:block z-50">
          <Link
            href="/products?category=defi-web3"
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2.5 cursor-pointer"
          >
            <Box className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">DApps & Web3</div>
              <div className="text-[10px] text-slate-400">DeFi, staking, token dapps</div>
            </div>
          </Link>

          <Link
            href="/products?category=blog-cms"
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2.5 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Blog & CMS</div>
              <div className="text-[10px] text-slate-400">Modern publishing solutions</div>
            </div>
          </Link>

          <Link
            href="/products?category=mobile-apps"
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2.5 cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Mobile Apps</div>
              <div className="text-[10px] text-slate-400">iOS & Android starter kits</div>
            </div>
          </Link>

          <Link
            href="/products?category=ui-kits"
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2.5 cursor-pointer"
          >
            <LayoutGrid className="w-4 h-4 text-cyan-500 shrink-0" />
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">UI & Web Kits</div>
              <div className="text-[10px] text-slate-400">SaaS, admin panels and templates</div>
            </div>
          </Link>

          <Link
            href="/custom-development"
            className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2.5 cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-rose-500 shrink-0" />
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Custom Development</div>
              <div className="text-[10px] text-slate-400">Tailored solutions & services</div>
            </div>
          </Link>
        </div>
      </div>

      <Link href="/products" className="hover:text-indigo-400 transition-colors">
        All Products
      </Link>
      <Link href="/custom-development" className="hover:text-indigo-400 transition-colors">
        Custom Dev
      </Link>
      <Link href="/deals" className="hover:text-indigo-400 transition-colors">
        Deals
      </Link>
      <Link href="/blog" className="hover:text-indigo-400 transition-colors">
        Blog
      </Link>
      <Link href="/affiliate" className="hover:text-indigo-400 transition-colors">
        Become Affiliate
      </Link>
    </nav>
  );
}
