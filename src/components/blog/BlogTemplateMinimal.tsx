// src/components/blog/BlogTemplateMinimal.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Share2, Bookmark, ArrowLeft } from 'lucide-react';

interface ArticleProps {
  article: {
    id: string;
    title: string;
    category: string;
    date: string;
    readTime: string;
    author: { name: string; avatar: string; role: string };
    content: string[];
  };
}

export default function BlogTemplateMinimal({ article }: ArticleProps) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs">
        <ArrowLeft className="w-3.5 h-3.5" /> <span>Kembali ke Blog</span>
      </Link>

      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <span className="bg-indigo-50 text-indigo-700 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase">{article.category}</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">{article.title}</h1>
        
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200">
            <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-slate-900">{article.author.name}</h4>
            <span className="text-[10px] text-slate-500">{article.author.role}</span>
          </div>
          <span className="text-slate-300 mx-2">•</span>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Calendar size={13}/> {article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={13}/> {article.readTime}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-12 shadow-xs space-y-6 text-slate-700 text-base leading-relaxed">
        {article.content.map((p, idx) => <p key={idx}>{p}</p>)}
        <div className="border-t border-slate-100 pt-6 flex items-center justify-between">
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(()=>setCopied(false), 3000); }} className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 cursor-pointer">
            <Share2 size={16} /> Bagikan {copied && '(Tersalin!)'}
          </button>
          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 cursor-pointer"><Bookmark size={16} /> Simpan</button>
        </div>
      </div>
    </div>
  );
}