// src/app/blog/page.tsx
'use client';

import React, { useState } from 'react';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogHeroPost from '@/components/blog/BlogHeroPost';
import BlogArticleCard from '@/components/blog/BlogArticleCard';
import BlogSidebar from '@/components/blog/BlogSidebar';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const dummyArticles = [
    {
      id: 1,
      title: 'Membangun Arsitektur Micro-SaaS Skalabel dengan Next.js 16 App Router',
      slug: 'membangun-arsitektur-micro-saas-nextjs-16',
      excerpt: 'Pelajari cara mengoptimalkan performa dan struktur folder untuk aplikasi SaaS berskala besar.',
      category: 'SaaS Architecture',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
      date: '24 Okt 2026',
      readTime: '5 min read',
      author: { name: 'Muhammad Ariyanto', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop' },
    },
    {
      id: 2,
      title: 'Mastering React Server Components',
      slug: 'mastering-react-server-components',
      excerpt: 'React Server Components (RSC) represent a paradigm shift in how we build user interfaces.',
      category: 'Frontend',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
      date: '22 Okt 2026',
      readTime: '4 min read',
      author: { name: 'Sarah Ananda', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop' },
    },
    {
      id: 3,
      title: 'The Ultimate Guide to PostgreSQL Performance',
      slug: 'postgresql-performance-guide',
      excerpt: 'Database performance can make or break an application when user traffic scales exponentially.',
      category: 'Database',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
      date: '19 Okt 2026',
      readTime: '6 min read',
      author: { name: 'Dev Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' },
    }
  ];

  const categories = ['All', 'SaaS Architecture', 'Frontend', 'Database', 'Business & Tips'];

  const filteredArticles = dummyArticles.filter(art => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-20">
      <BlogHeader article={{
        title: '',
        category: '',
        categoryColor: '',
        date: '',
        author: ''
      }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {dummyArticles.length > 0 && <BlogHeroPost article={dummyArticles[0]} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">Artikel Terbaru</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <BlogArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          <BlogSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            popularArticles={dummyArticles}
          />
        </div>
      </div>
    </div>
  );
}