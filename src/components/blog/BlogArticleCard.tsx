// src/components/blog/BlogArticleCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    image: string;
    date: string;
    readTime: string;
    author: {
      name: string;
    };
  };
}

export default function BlogArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="relative h-48 bg-slate-100">
          <Image src={article.image} alt={article.title} fill className="object-cover" referrerPolicy="no-referrer" />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
            {article.category}
          </span>
        </div>
        <div className="p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <Link href={`/blog/${article.id}`}>
            <h4 className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer">
              {article.title}
            </h4>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
        <span className="text-[11px] font-bold text-slate-600">{article.author.name}</span>
        <Link href={`/blog/${article.id}`} className="text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-1 cursor-pointer">
          Baca <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}