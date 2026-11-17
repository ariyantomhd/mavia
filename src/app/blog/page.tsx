// src/app/blog/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from '../../types';
import BlogBentoHero from '@/components/blog/BlogBentoHero';
import BlogFilterBar from '@/components/blog/BlogFilterBar';
import BlogStoriesGrid from '@/components/blog/BlogStoriesGrid';
import BlogEditorialSidebar from '@/components/blog/BlogEditorialSidebar';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((art) => {
      const matchesCat =
        selectedCategory === 'All' || art.category === selectedCategory;
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-8 pb-20 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Bento Grid */}
        <BlogBentoHero articles={BLOG_ARTICLES} />

        {/* Top Stories Section */}
        <section className="space-y-6">
          <BlogFilterBar
            categories={BLOG_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <BlogStoriesGrid articles={filteredArticles} />
            </div>

            <div className="lg:col-span-4">
              <BlogEditorialSidebar trendingArticles={BLOG_ARTICLES} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}