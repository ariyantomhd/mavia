// src/components/CategoriesClientView.tsx
'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { LayoutGrid, Filter } from 'lucide-react';
import { Product } from '@/types';

interface CategoriesClientViewProps {
  initialProducts: Product[];
  selectedCategory: string;
  currentPage: number;
  searchQuery: string;
  selectedFramework: string;
  minPrice: number;
  maxPrice: number;
}

const FRAMEWORKS_LIST = ['ALL', 'Next.js', 'React', 'Tailwind CSS', 'Solidity', 'Vue', 'Laravel', 'Flutter'];

const CATEGORIES_LIST = [
  { label: 'All Categories', value: 'ALL' },
  { label: 'Blog & CMS', value: 'blog-cms' },
  { label: 'Mobile Apps', value: 'mobile-apps' },
  { label: 'DApps & Web3', value: 'defi-web3' },
  { label: 'UI & Web Kits', value: 'ui-kits' },
  { label: 'Custom Development', value: 'custom-development' },
];

export default function CategoriesClientView({
  initialProducts,
  selectedCategory,
  currentPage,
  searchQuery,
  selectedFramework,
  minPrice,
  maxPrice,
}: CategoriesClientViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchQuery);
  const itemsPerPage = 8;

  // Handler to dynamically update URL query parameters without a full reload
  const updateQueryParam = (key: string, value: string) => {
    // Redirect directly to the dedicated page when custom-development is selected
    if (key === 'category' && value === 'custom-development') {
      router.push('/custom-development');
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'ALL') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset to page 1 whenever filters or search queries change
    if (key !== 'page') {
      params.set('page', '1');
    }

    startTransition(() => {
      router.push(`/products?${params.toString()}`, { scroll: false });
    });
  };

  // Client-side filtering based on Search, Framework, and Price range
  const filteredProducts = initialProducts.filter((product) => {
    // Search filter
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(search.toLowerCase()));

    // Framework filter
    const matchesFramework =
      selectedFramework === 'ALL' ||
      product.title.toLowerCase().includes(selectedFramework.toLowerCase()) ||
      (Array.isArray(product.tech_stack) &&
        product.tech_stack.some((tech) => tech.toLowerCase() === selectedFramework.toLowerCase()));

    // Price filter
    const price = product.regular_price ? product.regular_price : 0;
    const matchesPrice = price >= minPrice && price <= maxPrice;

    return matchesSearch && matchesFramework && matchesPrice;
  });

  // Pagination logic
  const totalItems = filteredProducts.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Determine page heading based on the active category
  const displayCategoryTitle =
    selectedCategory && selectedCategory !== 'ALL'
      ? selectedCategory.replace('-', ' ')
      : 'ALL DIGITAL ASSETS';

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              {selectedCategory && selectedCategory !== 'ALL' ? 'CATEGORY: ' : ''}
              {displayCategoryTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Explore premium templates, source codes, and development kits.
            </p>
          </div>
        </div>

        {/* Toolbar Banner: Search & Filter */}
        <div className="bg-linear-to-r from-purple-950 via-indigo-800 to-teal-500 p-4 rounded-2xl shadow-xl mb-8">
          <div className="backdrop-blur-md p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4">
            {/* Search Bar */}
            <div className="w-full md:flex-1">
              <input
                type="text"
                placeholder="Search products by title..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  updateQueryParam('search', e.target.value);
                }}
                className="w-full bg-[#131827] border border-indigo-950 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#583cf0] shadow-inner transition"
              />
            </div>

            {/* Filter Group: Category & Tech */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4 md:gap-6">
              {/* Category Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <LayoutGrid className="w-3.5 h-3.5" />
                  CATEGORY:
                </span>
                <select
                  value={selectedCategory || 'ALL'}
                  onChange={(e) => updateQueryParam('category', e.target.value)}
                  className="bg-[#131827] border border-indigo-950 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#583cf0] transition cursor-pointer"
                >
                  {CATEGORIES_LIST.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tech / Framework Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" />
                  TECH:
                </span>
                <select
                  value={selectedFramework}
                  onChange={(e) => updateQueryParam('framework', e.target.value)}
                  className="bg-[#131827] border border-indigo-950 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#583cf0] transition cursor-pointer"
                >
                  {FRAMEWORKS_LIST.map((fw) => (
                    <option key={fw} value={fw}>
                      {fw === 'ALL' ? 'All Technologies' : fw}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Results Container */}
        <div
          className={`bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm min-h-100 transition-opacity ${
            isPending ? 'opacity-60' : 'opacity-100'
          }`}
        >
          <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing results for:{' '}
              <span className="font-bold uppercase text-teal-600">
                {displayCategoryTitle}
              </span>
              {selectedFramework !== 'ALL' && (
                <span className="text-slate-400">
                  {' '}
                  (Framework: <strong className="text-indigo-600">{selectedFramework}</strong>)
                </span>
              )}
            </p>
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {totalItems} {totalItems === 1 ? 'product' : 'products'} found
            </span>
          </div>

          {/* Empty State */}
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <Filter className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  No instant products found in this category.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Need a tailored solution? Request custom development directly from our engineering team.
                </p>
              </div>
              <button
                type="button"
                onClick={() => router.push('/custom-development')}
                className="mt-4 cursor-pointer px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30"
              >
                Request Custom Development &rarr;
              </button>
            </div>
          ) : (
            <>
              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group border border-slate-200/70 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-white"
                  >
                    <div>
                      <div className="h-32 bg-slate-100 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center text-slate-300 font-bold">
                        {product.images_url ? (
                          <Image
                            src={product.images_url}
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover"
                          />
                        ) : (
                          <span>PREVIEW</span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-teal-600 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                        {product.description || 'No description available for this item.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Price
                        </span>
                        <span className="font-extrabold text-teal-600 text-base">
                          ${product.regular_price ? Number(product.regular_price).toFixed(2) : '0.00'}
                        </span>
                      </div>
                      <Link
                        href={`/products/${product.slug || product.id}`}
                        className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-teal-600 transition-colors shadow-sm"
                      >
                        Details &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-slate-100">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      type="button"
                      key={page}
                      onClick={() => updateQueryParam('page', page.toString())}
                      className={`w-9 h-9 cursor-pointer rounded-xl text-xs font-bold transition-all ${
                        currentPage === page
                          ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}