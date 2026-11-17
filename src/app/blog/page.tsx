// src/app/blog/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BLOG_CATEGORIES, type BlogArticle } from '@/types/blog';
import { getBlogCategories, getMarketArticles } from '@/services/blogApi';
import BlogBentoHero from '@/components/blog/BlogBentoHero';
import BlogFilterBar from '@/components/blog/BlogFilterBar';
import BlogStoriesGrid from '@/components/blog/BlogStoriesGrid';
import BlogEditorialSidebar from '@/components/blog/BlogEditorialSidebar';

const ITEMS_PER_PAGE = 6;

function parseViewsCount(viewsText: string): number {
  const clean = viewsText.toLowerCase().replace(/views/g, '').trim();
  if (clean.endsWith('k')) {
    return (parseFloat(clean.replace('k', '')) || 0) * 1000;
  }
  return parseInt(clean.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [categories, setCategories] = useState<string[]>(BLOG_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadBlogData() {
      setIsLoading(true);
      try {
        const [fetchedCategories, fetchedArticles] = await Promise.all([
          getBlogCategories(),
          getMarketArticles(),
        ]);

        if (!isMounted) return;
        if (fetchedCategories.length > 0) {
          setCategories(fetchedCategories);
        }
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('[BlogPage] Failed to load blog data:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadBlogData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Urutkan grid utama sebagai Trending (tag Trending diutamakan, lalu views terbanyak)
  const trendingArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const aScore = (a.tag === 'Trending' ? 1_000_000 : 0) + parseViewsCount(a.views);
      const bScore = (b.tag === 'Trending' ? 1_000_000 : 0) + parseViewsCount(b.views);
      return bScore - aScore;
    });
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return trendingArticles.filter((art) => {
      const matchesCat =
        selectedCategory === 'All' ||
        art.category.toLowerCase() === selectedCategory.toLowerCase();
      const keyword = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !keyword ||
        art.title.toLowerCase().includes(keyword) ||
        art.excerpt.toLowerCase().includes(keyword);
      return matchesCat && matchesSearch;
    });
  }, [trendingArticles, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedArticles = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, safeCurrentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    document
      .getElementById('trending-section')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen pt-8 pb-20 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {isLoading ? (
          <div className="py-24 text-center text-slate-500 text-sm font-medium animate-pulse">
            Loading latest engineering articles...
          </div>
        ) : (
          <>
            {/* Top Bento Grid */}
            <BlogBentoHero articles={articles} />

            {/* Trending Section */}
            <section id="trending-section" className="space-y-6 scroll-mt-24">
              <BlogFilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Kolom Kiri: Grid Trending + Pagination */}
                <div className="lg:col-span-8 space-y-8">
                  <BlogStoriesGrid articles={paginatedArticles} />

                  {filteredArticles.length > ITEMS_PER_PAGE && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/80">
                      <p className="text-xs font-medium text-slate-500">
                        Showing{' '}
                        <span className="font-bold text-slate-900">
                          {(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}
                        </span>
                        –
                        <span className="font-bold text-slate-900">
                          {Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredArticles.length)}
                        </span>{' '}
                        of{' '}
                        <span className="font-bold text-slate-900">
                          {filteredArticles.length}
                        </span>{' '}
                        articles
                      </p>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handlePageChange(safeCurrentPage - 1)}
                          disabled={safeCurrentPage === 1}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                          (page) => {
                            const isActive = page === safeCurrentPage;
                            return (
                              <button
                                key={page}
                                type="button"
                                onClick={() => handlePageChange(page)}
                                className={`inline-flex items-center justify-center w-9 h-9 rounded-xl text-xs font-bold transition-colors ${
                                  isActive
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          }
                        )}

                        <button
                          type="button"
                          onClick={() => handlePageChange(safeCurrentPage + 1)}
                          disabled={safeCurrentPage === totalPages}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                          aria-label="Next page"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Kolom Kanan: New Releases + Newsletter */}
                <div className="lg:col-span-4">
                  <BlogEditorialSidebar newReleaseArticles={articles} />
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}