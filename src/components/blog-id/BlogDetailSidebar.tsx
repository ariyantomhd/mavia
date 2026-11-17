// src/components/blog-id/BlogDetailSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Link2 } from 'lucide-react';
import { ArticleDetail } from '@/types/blog-id';

interface BlogDetailSidebarProps {
  articleTitle: string;
  relatedArticles: ArticleDetail[];
  copied: boolean;
  onCopyLink: () => void;
  onSocialShare: (platform: 'x' | 'whatsapp' | 'linkedin' | 'facebook') => void;
}

export default function BlogDetailSidebar({
  relatedArticles,
  copied,
  onCopyLink,
  onSocialShare,
}: BlogDetailSidebarProps) {
  return (
    <aside className="lg:col-span-4 p-5 sm:p-6 space-y-6 bg-slate-50/40">
      {/* Share Section */}
      <div className="pb-6 border-b border-slate-200/80">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-slate-900">Share to</h3>
          {copied && (
            <span className="text-[11px] font-bold text-emerald-600">
              Link copied!
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          {/* Copy Link Button */}
          <button
            type="button"
            onClick={onCopyLink}
            title="Copy article link"
            aria-label="Copy article link"
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-indigo-50 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Link2 className="w-4 h-4" />
            )}
          </button>

          {/* X / Twitter */}
          <button
            type="button"
            onClick={() => onSocialShare('x')}
            title="Share on X"
            aria-label="Share on X"
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-900 text-slate-700 hover:text-white text-xs font-black flex items-center justify-center transition-colors cursor-pointer"
          >
            X
          </button>

          {/* WhatsApp */}
          <button
            type="button"
            onClick={() => onSocialShare('whatsapp')}
            title="Share on WhatsApp"
            aria-label="Share on WhatsApp"
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-emerald-600 text-slate-700 hover:text-white text-xs font-extrabold flex items-center justify-center transition-colors cursor-pointer"
          >
            WA
          </button>

          {/* LinkedIn */}
          <button
            type="button"
            onClick={() => onSocialShare('linkedin')}
            title="Share on LinkedIn"
            aria-label="Share on LinkedIn"
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-sky-700 text-slate-700 hover:text-white text-xs font-extrabold flex items-center justify-center transition-colors cursor-pointer"
          >
            in
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={() => onSocialShare('facebook')}
            title="Share on Facebook"
            aria-label="Share on Facebook"
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-blue-600 text-slate-700 hover:text-white text-xs font-extrabold flex items-center justify-center transition-colors cursor-pointer"
          >
            f
          </button>
        </div>
      </div>

      {/* Related Articles Section */}
      <div>
        <h3 className="text-sm font-extrabold text-slate-900 mb-4">
          Related Articles
        </h3>

        <div className="space-y-4">
          {relatedArticles.map((related: ArticleDetail) => (
            <Link
              key={related.id}
              href={`/blog/${related.slug}`}
              className="flex items-start gap-3 group"
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                <Image
                  src={related.image}
                  alt={related.title}
                  fill
                  sizes="64px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-1">
                  {related.title}
                </h4>
                <span className="text-[11px] font-medium text-slate-400">
                  {related.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}