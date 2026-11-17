// src/app/blog/[id]/page.tsx
'use client';

import React, { Suspense, useState } from 'react';
import { useParams } from 'next/navigation';
import { ARTICLES_DB, ArticleDetail, SLUG_ALIASES } from '@/types/blog-id';
import BlogDetailTopBar from '@/components/blog-id/BlogDetailTopBar';
import BlogArticleBody from '@/components/blog-id/BlogArticleBody';
import BlogEngagementComments from '@/components/blog-id/BlogEngagementComments';
import BlogDetailSidebar from '@/components/blog-id/BlogDetailSidebar';

function BlogDetailContent() {
  const params = useParams();
  const rawSlug = params?.id;
  const slugParam = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || '1';
  const resolvedSlug = SLUG_ALIASES[slugParam] || slugParam;

  const article: ArticleDetail =
    ARTICLES_DB.find(
      (item: ArticleDetail) =>
        item.slug === resolvedSlug || item.id === resolvedSlug,
    ) || ARTICLES_DB[0];

  const relatedArticles: ArticleDetail[] = ARTICLES_DB.filter(
    (item: ArticleDetail) => item.id !== article.id,
  ).slice(0, 5);

  const [shareCount, setShareCount] = useState<number>(article.shares);
  const [copied, setCopied] = useState<boolean>(false);

  const getShareUrl = () =>
    typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setShareCount((c: number) => c + 1);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleSocialShare = (
    platform: 'x' | 'whatsapp' | 'linkedin' | 'facebook',
  ) => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(article.title);
    setShareCount((c: number) => c + 1);

    const shareUrls: Record<typeof platform, string> = {
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen pt-6 pb-20 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden">
          <BlogDetailTopBar />

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <article className="lg:col-span-8 p-5 sm:p-8 lg:border-r border-slate-200/80">
              <BlogArticleBody article={article} />
              <BlogEngagementComments
                initialLikes={article.likes}
                shareCount={shareCount}
                onQuickShare={handleCopyLink}
              />
            </article>

            <BlogDetailSidebar
              articleTitle={article.title}
              relatedArticles={relatedArticles}
              copied={copied}
              onCopyLink={handleCopyLink}
              onSocialShare={handleSocialShare}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm font-semibold text-slate-600">
          Loading article...
        </div>
      }
    >
      <BlogDetailContent />
    </Suspense>
  );
}