// src/components/layout/MobileMenu.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Box,
  FileText,
  Smartphone,
  LayoutGrid,
  Code2,
  Flame,
  Award,
  Sparkles,
  Zap,
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  mounted: boolean;
  isLoggedIn: boolean;
  onClose: () => void;
  logout: () => void;
  openAuthModal?: (tab: 'login' | 'signup') => void;
}

export default function MobileMenu({
  isOpen,
  mounted,
  isLoggedIn,
  onClose,
  logout,
}: MobileMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [browseOpen, setBrowseOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onClose();
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="lg:hidden border-b border-slate-800 bg-[#0F1035] px-4 pt-3 pb-6 flex flex-col gap-4">
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 text-slate-100 placeholder-slate-400 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
      </form>

      <nav className="flex flex-col gap-1 font-medium text-slate-300 text-sm">
        {/* Dropdown Browse Terintegrasi di Mobile */}
        <div>
          <button
            type="button"
            onClick={() => setBrowseOpen(!browseOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-800/60 text-left cursor-pointer"
          >
            <span>Browse</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${browseOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {browseOpen && (
            <div className="pl-4 py-2 flex flex-col gap-1.5 border-l border-slate-800 ml-3 mt-1">
              <Link
                href="/products?sort=trending"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
              >
                <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Trending Now</span>
              </Link>
              <Link
                href="/products?sort=bestseller"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
              >
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Best Sellers</span>
              </Link>
              <Link
                href="/products?filter=new"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>New Releases</span>
              </Link>
              <Link
                href="/deals"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Special Deals</span>
              </Link>
            </div>
          )}
        </div>

        {/* Dropdown Kategori Terintegrasi di Mobile */}
        <div>
          <button
            type="button"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-800/60 text-left cursor-pointer"
          >
            <span>Categories</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {categoriesOpen && (
            <div className="pl-4 py-2 flex flex-col gap-1.5 border-l border-slate-800 ml-3 mt-1">
              <Link
                href="/products?category=dapps-web3"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
              >
                <Box className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>DApps &amp; Web3</span>
              </Link>
              <Link
                href="/products?category=blog-cms"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Blog &amp; CMS</span>
              </Link>
              <Link
                href="/products?category=android-apps"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Android Apps</span>
              </Link>
              <Link
                href="/products?category=web-applications"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Web Applications</span>
              </Link>
              <Link
                href="/custom-development"
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400"
              >
                <Code2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Custom Development</span>
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/products"
          onClick={onClose}
          className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60"
        >
          All Products
        </Link>
        <Link
          href="/deals"
          onClick={onClose}
          className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60"
        >
          Deals
        </Link>
        <Link
          href="/blog"
          onClick={onClose}
          className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60"
        >
          Blog
        </Link>
        <Link
          href="/affiliate"
          onClick={onClose}
          className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60"
        >
          Become Affiliate
        </Link>
      </nav>

      <div className="pt-3 border-t border-slate-800">
        {!mounted ? (
          <div className="w-full h-10 bg-slate-800 rounded-xl animate-pulse" />
        ) : isLoggedIn ? (
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg font-semibold text-slate-200 hover:bg-slate-800/60"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <button
              type="button"
              onClick={() => {
                onClose();
                logout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg font-semibold text-red-400 hover:bg-red-500/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Link
              href="/login"
              onClick={onClose}
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
            >
              Sign In
            </Link>
            <p className="text-[11px] text-center text-slate-400">
              
            </p>
          </div>
        )}
      </div>
    </div>
  );
}