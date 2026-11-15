// src/components/blog/BlogDetailHeader.tsx
'use client';

import React, { useState } from 'react';
import { Calendar, Share2, Bookmark } from 'lucide-react';

interface BlogDetailHeaderProps {
  article: {
    title: string;
    category: string;
    categoryColor: string;
    date: string;
    author: string;
  };
}

export default function BlogDetailHeader({ article }: BlogDetailHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: `Baca artikel menarik: ${article.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-3 py-1 rounded-md text-xs font-extrabold uppercase ${article.categoryColor}`}>
          {article.category}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Calendar className="w-3.5 h-3.5" />
          <span>{article.date}</span>
        </div>
      </div>

      <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
        {article.title}
      </h1>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
        <span>Written by <strong className="text-slate-900">{article.author}</strong></span>
        <div className="flex items-center gap-3 relative">
          <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer">
            <Bookmark className="w-4 h-4" /> Save
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer relative"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
          {copied && (
            <span className="absolute -top-8 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-md animate-fade-in">
              Link copied!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}