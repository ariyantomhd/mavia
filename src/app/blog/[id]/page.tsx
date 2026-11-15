// src/app/blog/[id]/page.tsx
'use client';

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';

// Import komponen modular utama dan variasi template
import BlogDetailHeader from '@/components/blog/BlogDetailHeader';
import BlogDetailContentBox from '@/components/blog/BlogDetailContentBox';
import BlogCommentsSection from '@/components/blog/BlogCommentsSection';
import BlogTemplateMinimal from '@/components/blog/BlogTemplateMinimal';
import BlogTemplateMagazine from '@/components/blog/BlogTemplateMagazine';

type Author = {
  name: string;
  avatar: string;
  role: string;
};

type Article = {
  id: string;
  template: 'default' | 'minimal' | 'magazine';
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  author: Author;
  content: string[];
};

// NOTE: BlogDetailHeader expects a more minimal article shape than the full article structure.
// Keep the runtime data intact while making the prop type compatible with the component contract.
type BlogDetailHeaderArticle = {
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  author: string;
};

const articlesData: Record<string, Article> = {
  '1': {
    id: '1',
    template: 'default', // Template 1: Immersive / Hero Foto Besar di Atas
    title: 'Building Scalable APIs with Node.js',
    category: 'Backend',
    categoryColor: 'bg-indigo-100 text-indigo-700',
    date: 'Dec 05, 2023',
    readTime: '5 min read',
    author: { name: 'Admin Themavia', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop', role: 'Lead Architect' },
    content: [
      'Building robust and scalable APIs is a foundational requirement for modern web and mobile applications.',
      'In this article, we explore best practices for structuring your Express and Node.js applications.'
    ]
  },
  '2': {
    id: '2',
    template: 'minimal', // Template 2: Minimalist Author Focus
    title: 'Mastering React Server Components',
    category: 'Frontend',
    categoryColor: 'bg-blue-100 text-blue-700',
    date: 'Dec 10, 2023',
    readTime: '4 min read',
    author: { name: 'Sarah Ananda', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop', role: 'UI/UX Lead' },
    content: [
      'React Server Components (RSC) represent a paradigm shift in how we build user interfaces.',
      'By shifting rendering to the server, we drastically reduce client bundle sizes and improve loading speed.'
    ]
  },
  '3': {
    id: '3',
    template: 'magazine', // Template 3: Magazine / Editorial Style
    title: 'The Ultimate Guide to PostgreSQL Performance',
    category: 'Database',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    date: 'Nov 18, 2023',
    readTime: '7 min read',
    author: { name: 'Muhammad Ariyanto', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop', role: 'Fullstack Engineer' },
    content: [
      'Database performance can make or break an application when user traffic scales exponentially.',
      'Proper indexing, connection pooling, and query optimization are mandatory steps for production databases.'
    ]
  }
};

function BlogDetailContent() {
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const article = (id && articlesData[id]) ? articlesData[id] : articlesData['1'];

  // Conditional Rendering berdasarkan template artikel
  if (article.template === 'minimal') {
    return <BlogTemplateMinimal article={article} />;
  }

  if (article.template === 'magazine') {
    return <BlogTemplateMagazine article={article} />;
  }

  // Default Template (Immersive Layout dengan Foto Hero & Komentar Interaktif)
  const headerArticle: BlogDetailHeaderArticle = {
    title: article.title,
    category: article.category,
    categoryColor: article.categoryColor,
    date: article.date,
    author: article.author.name,
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <BlogDetailHeader article={headerArticle} />
        <BlogDetailContentBox articleId={article.id} content={article.content} />
        <BlogCommentsSection />
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Memuat artikel...</div>}>
      <BlogDetailContent />
    </Suspense>
  );
}