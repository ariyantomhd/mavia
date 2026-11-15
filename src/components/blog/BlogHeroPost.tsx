// src/components/blog/BlogHeroPost.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface Author {
  name: string;
  avatar: string;
}

interface HeroPostProps {
  article: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    image: string;
    date: string;
    readTime: string;
    author: Author;
  };
}

export default function BlogHeroPost({ article }: HeroPostProps) {
  if (!article) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
      <div className="lg:col-span-2 relative h-64 sm:h-80 lg:h-auto min-h-75">
        <Image 
          src={article.image} 
          alt={article.title} 
          fill 
          className="object-cover" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {article.category}
        </div>
      </div>
      <div className="p-8 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Calendar size={14}/> {article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={14}/> {article.readTime}</span>
          </div>
          <Link href={`/blog/${article.id}`}>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 hover:text-indigo-600 transition-colors leading-snug cursor-pointer">
              {article.title}
            </h2>
          </Link>
          <p className="text-xs text-slate-500 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200">
              <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="text-xs font-bold text-slate-700">{article.author.name}</span>
          </div>
          <Link href={`/blog/${article.id}`} className="text-indigo-600 hover:text-indigo-700 text-xs font-extrabold flex items-center gap-1 cursor-pointer">
            Read Article <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}