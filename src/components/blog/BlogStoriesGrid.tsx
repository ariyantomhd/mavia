// src/components/blog/BlogStoriesGrid.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark } from 'lucide-react';
import { BlogArticle } from '../../types';

interface BlogStoriesGridProps {
  articles: BlogArticle[];
}

export default function BlogStoriesGrid({ articles }: BlogStoriesGridProps) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  if (articles.length === 0) {
    return (
      <div className="bg-white/90 border border-slate-200 rounded-3xl p-12 text-center space-y-2">
        <p className="text-sm font-bold text-slate-800">
          No articles matched your filter.
        </p>
        <p className="text-xs text-slate-500">
          Try selecting another category or clearing your search keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {articles.map((article) => {
        const isSaved = bookmarkedIds.includes(article.id);
        return (
          <article
            key={article.id}
            className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Thumbnail with Category Badge & Bookmark */}
              <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
                <Link href={`/blog/${article.slug}`}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-slate-900/90 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  {article.category}
                </span>

                <button
                  type="button"
                  aria-label="Bookmark article"
                  onClick={() => toggleBookmark(article.id)}
                  className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
                    isSaved
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/90 text-slate-700 hover:bg-white'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card Title */}
              <div className="p-4 pb-2">
                <Link href={`/blog/${article.slug}`}>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {article.title}
                  </h3>
                </Link>
              </div>
            </div>

            {/* Card Footer Meta */}
            <div className="px-4 pb-4 pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>
                {article.date} • {article.readTime}
              </span>
              {article.tag && (
                <span
                  className={`font-bold ${
                    article.tag === 'Trending'
                      ? 'text-rose-500'
                      : 'text-indigo-600'
                  }`}
                >
                  • {article.tag}
                </span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}