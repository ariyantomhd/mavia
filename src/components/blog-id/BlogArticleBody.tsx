// src/components/blog-id/BlogArticleBody.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { ArticleDetail } from '@/types/blog-id';

interface BlogArticleBodyProps {
  article: ArticleDetail;
}

export default function BlogArticleBody({ article }: BlogArticleBodyProps) {
  return (
    <div>
      {/* Article Title */}
      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug mb-3">
        {article.title}
      </h1>

      {/* Author & Meta Row */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-200">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <span className="font-semibold text-slate-800">
            {article.author.name}
          </span>
        </div>
        <span>•</span>
        <span className="font-semibold text-indigo-600">
          {article.category}
        </span>
        <span>•</span>
        <span>{article.date}</span>
        <span>•</span>
        <span>{article.readTime}</span>
      </div>

      {/* Featured Image */}
      <div className="relative w-full h-60 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-100 mb-6">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover"
        />
      </div>

      {/* Article Body Copy */}
      <div className="space-y-4 text-sm sm:text-[15px] text-slate-700 leading-relaxed">
        <p className="font-extrabold text-slate-900 text-base">
          {article.leadLocation}
        </p>

        {article.paragraphs.map((para: string, index: number) => (
          <p key={index}>{para}</p>
        ))}

        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 pt-3">
          {article.subheading}
        </h2>

        <p>{article.subParagraph}</p>

        <div className="pt-1">
          <p className="font-semibold text-slate-800 mb-2">
            Key takeaways include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
            {article.bulletPoints.map((point: string, idx: number) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}