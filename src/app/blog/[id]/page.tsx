// src/app/blog/[id]/page.tsx
'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { type ArticleDetail } from '@/types/blog-id';
import { getMarketArticleBySlug, getRelatedArticles } from '@/services/blogApi';
import BlogDetailTopBar from '@/components/blog-id/BlogDetailTopBar';
import BlogArticleBody from '@/components/blog-id/BlogArticleBody';
import BlogEngagementComments from '@/components/blog-id/BlogEngagementComments';
import BlogDetailSidebar from '@/components/blog-id/BlogDetailSidebar';

function BlogDetailContent() {
  const params = useParams();
  const rawSlug = params?.id;
  const slugParam = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || '';

  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shareCount, setShareCount] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadArticleDetail() {
      if (!slugParam) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const [fetchedArticle, fetchedRelated] = await Promise.all([
          getMarketArticleBySlug(slugParam),
          getRelatedArticles(slugParam, 5),
        ]);

        if (!isMounted) return;
        setArticle(fetchedArticle);
        setRelatedArticles(fetchedRelated);
        setShareCount(fetchedArticle?.shares ?? 0);
      } catch (error) {
        console.error('[BlogDetailPage] Failed to load article:', error);
        if (isMounted) {
          setArticle(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadArticleDetail();
    return () => {
      isMounted = false;
    };
  }, [slugParam]);

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
    if (!article) return;
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-semibold text-slate-600 animate-pulse">
        Loading article...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-16 pb-20 px-4 text-center text-slate-900">
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h1 className="text-xl font-bold">Article Not Found</h1>
          <p className="text-sm text-slate-500">
            The article you are looking for may have been unpublished or moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            Back to All Articles
          </Link>
        </div>
      </div>
    );
  }

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