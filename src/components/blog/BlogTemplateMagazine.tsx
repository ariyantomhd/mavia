// src/components/blog/BlogTemplateMagazine.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface ArticleProps {
  article: {
    id: string;
    title: string;
    category: string;
    date: string;
    author: { name: string; avatar: string };
    content: string[];
  };
}

export default function BlogTemplateMagazine({ article }: ArticleProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs">
        <ArrowLeft className="w-3.5 h-3.5" /> <span>Kembali ke Blog</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs uppercase tracking-wider">
              <BookOpen size={16} /> Daftar Isi Artikel
            </div>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="hover:text-indigo-600 cursor-pointer">1. Pengantar Arsitektur Sistem</li>
              <li className="hover:text-indigo-600 cursor-pointer">2. Analisis Performa & Optimasi</li>
              <li className="hover:text-indigo-600 cursor-pointer">3. Implementasi & Studi Kasus</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded text-xs font-extrabold uppercase">{article.category}</span>
              <span className="text-xs text-slate-400">{article.date}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">{article.title}</h1>
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop" alt="Cover" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              {article.content.map((p, idx) => <p key={idx}>{p}</p>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}