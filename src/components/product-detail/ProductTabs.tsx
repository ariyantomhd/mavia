// src/components/product-detail/ProductTabs.tsx
'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Star,
  CheckCircle2,
  ShieldCheck,
  Send,
  MessageSquareReply,
  LogIn,
  Lock,
  ShoppingBag,
} from 'lucide-react';
import { z } from 'zod';
import { productAPI, ProductReviewItem } from '@/services/apiProducts';
import { useAppStore } from '@/store/useAppStore';
import { sanitizeText } from '@/utils/sanitize';
import { api } from '@/services/wrapperAPI';

const reviewInputSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z
    .string()
    .trim()
    .min(5, 'Review comment must be at least 5 characters long.')
    .max(1000, 'Review comment cannot exceed 1,000 characters.'),
});

interface ProductTabsProps {
  productId?: string;
  longDesc: string;
  tags?: string[];
  rating: number;
  reviewsCount: number;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  hasPurchased?: boolean;
}

export default function ProductTabs({
  productId,
  longDesc,
  tags,
  rating,
  reviewsCount,
  version = '1.0.0',
  createdAt,
  updatedAt,
  hasPurchased: initialHasPurchased,
}: ProductTabsProps) {
  const queryClient = useQueryClient();
  const currentUser = useAppStore((state) => state.currentUser);
  const [activeTab, setActiveTab] = useState<'desc' | 'features' | 'changelog' | 'reviews'>('desc');

  // Review form states
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Verify 1-to-1 product ownership & active license for this specific product
  const { data: purchaseEligibility, isLoading: isCheckingPurchase } = useQuery({
    queryKey: ['product-purchase-check', productId, currentUser?.id],
    queryFn: async () => {
      if (typeof initialHasPurchased === 'boolean') return initialHasPurchased;
      try {
        const res = await api.get<{ has_purchased?: boolean; has_license?: boolean }>(
          `/products/${productId}/check-purchase`
        );
        return Boolean(res?.has_license ?? res?.has_purchased);
      } catch {
        return false;
      }
    },
    enabled: Boolean(productId && currentUser?.id),
  });

  const canWriteReview = Boolean(currentUser && (initialHasPurchased || purchaseEligibility));

  const { data: reviewsSummary, isLoading: isLoadingReviews } = useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: () => productAPI.getProductReviews(productId!),
    enabled: Boolean(productId),
  });

  const displayRating = reviewsSummary?.average_rating ?? rating;
  const displayReviewsCount = reviewsSummary?.total_reviews ?? reviewsCount;
  const reviewItems: ProductReviewItem[] = reviewsSummary?.reviews ?? [];

  const submitReviewMutation = useMutation({
    mutationFn: (validatedPayload: { rating: number; comment: string }) =>
      productAPI.submitProductReview(productId!, validatedPayload),
    onSuccess: (res) => {
      setComment('');
      setSelectedRating(5);
      setFeedbackMsg({
        type: 'success',
        text: res?.message || 'Thank you! Your verified review has been published.',
      });
      queryClient.invalidateQueries({ queryKey: ['product-reviews', productId] });
      queryClient.invalidateQueries({ queryKey: ['product-purchase-check', productId, currentUser?.id] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: (err: unknown) => {
      const errObj = err as { message?: string; error?: { details?: string } };
      setFeedbackMsg({
        type: 'error',
        text:
          errObj?.error?.details ||
          errObj?.message ||
          'Verified license required: Only customers who own an active license for this product can submit a review.',
      });
    },
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);

    if (!currentUser) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('open-auth-modal'));
      }
      return;
    }

    if (!canWriteReview) {
      setFeedbackMsg({
        type: 'error',
        text: 'Verified license required: Only customers with an active license for this product can leave a review.',
      });
      return;
    }

    if (!productId) {
      setFeedbackMsg({ type: 'error', text: 'Product ID is unavailable.' });
      return;
    }

    const sanitizedComment = sanitizeText(comment.trim());
    const parsed = reviewInputSchema.safeParse({
      rating: selectedRating,
      comment: sanitizedComment,
    });

    if (!parsed.success) {
      setFeedbackMsg({
        type: 'error',
        text: parsed.error.issues[0]?.message || 'Please enter a valid review.',
      });
      return;
    }

    submitReviewMutation.mutate(parsed.data);
  };

  const formatDateLabel = (isoDate?: string, fallback = 'Recently') => {
    if (!isoDate) return fallback;
    const parsed = new Date(isoDate);
    if (Number.isNaN(parsed.getTime())) return fallback;
    return parsed.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="border-b border-slate-200">
        <div className="flex space-x-6 text-xs sm:text-sm font-bold uppercase tracking-wider overflow-x-auto">
          {(['desc', 'features', 'changelog', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-4 border-b-2 transition-colors relative whitespace-nowrap cursor-pointer uppercase ${
                activeTab === tab
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab === 'desc'
                ? 'Item Details'
                : tab === 'reviews'
                  ? `Reviews (${displayReviewsCount})`
                  : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-50 text-xs text-slate-600 leading-relaxed space-y-4">
        {activeTab === 'desc' && (
          <>
            <h3 className="text-base font-bold text-slate-900">Product Description</h3>
            <p className="whitespace-pre-line">{longDesc}</p>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200 font-mono text-[11px] mt-4">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">First Released</span>
                <span className="text-slate-800 font-semibold">
                  {formatDateLabel(createdAt, 'Mar 22, 2026')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Last Update</span>
                <span className="text-slate-800 font-semibold">
                  {formatDateLabel(updatedAt, 'Latest Release')}
                </span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200">
                <span className="text-slate-400 block text-[9px] uppercase mb-1">Category Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {(tags && tags.length > 0 ? tags : ['Next.js', 'TypeScript', 'TailwindCSS']).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-white border border-slate-200 text-[10px] text-slate-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'features' && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">Key Technical Capabilities</h3>
            {[
              'Advanced state management integration',
              'Fully responsive modern UI components',
              'Clean, modular architecture',
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-3 bg-slate-50 border border-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'changelog' && (
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-orange-500">
              <span className="font-bold text-orange-500 font-mono">v{version}</span>
              <p className="text-slate-500 text-[11px]">
                Released {formatDateLabel(updatedAt || createdAt, 'Recently')}
              </p>
              <p className="mt-1">Production-ready release with modular source code &amp; documentation.</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Rating Summary */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-black text-slate-900">
                  {Number(displayRating || 0).toFixed(1)}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.round(Number(displayRating || 0))
                            ? 'fill-current text-amber-500'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600 font-medium block mt-1">
                    Based on {displayReviewsCount} {displayReviewsCount === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Verified License Reviews
              </span>
            </div>

            {/* Write Review Access Gate */}
            <div className="border border-slate-200 p-4 bg-white space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Write a Product Review
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Verified License Holders Only
                </span>
              </div>

              {!currentUser ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 border border-slate-200">
                  <p className="text-xs text-slate-600">
                    Sign in with the account that holds an active license for this product to leave a review.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.dispatchEvent(new Event('open-auth-modal'));
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer shrink-0"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In to Review</span>
                  </button>
                </div>
              ) : isCheckingPurchase ? (
                <div className="h-14 bg-slate-50 border border-slate-200 animate-pulse flex items-center justify-center text-xs text-slate-400">
                  Verifying product license ownership...
                </div>
              ) : !canWriteReview ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/70 p-4 border border-amber-200">
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Active Product License Required
                      </p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Only customers who have purchased and hold an active license for this specific product can rate and submit a review.
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-200 text-[10px] font-bold uppercase tracking-wider text-amber-700 shrink-0">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    No License Found
                  </span>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = star <= (hoverRating || selectedRating);
                        return (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setSelectedRating(star)}
                            className="p-0.5 cursor-pointer transition-transform hover:scale-110"
                            aria-label={`Rate ${star} stars`}
                          >
                            <Star
                              className={`w-5 h-5 ${
                                active ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="ml-2 text-xs font-bold text-slate-700">
                        {hoverRating || selectedRating} / 5
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Review Comment
                    </label>
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your feedback about code quality, setup experience, or features..."
                      className="w-full border border-slate-200 p-3 text-xs text-slate-800 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {feedbackMsg && (
                    <div
                      className={`p-2.5 text-xs font-medium border ${
                        feedbackMsg.type === 'success'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-rose-50 border-rose-200 text-rose-700'
                      }`}
                    >
                      {feedbackMsg.text}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submitReviewMutation.isPending}
                      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-5 py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submitReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Reviews List */}
            {isLoadingReviews ? (
              <div className="space-y-3">
                {[1, 2].map((skeleton) => (
                  <div key={skeleton} className="h-20 bg-slate-100 animate-pulse border border-slate-200" />
                ))}
              </div>
            ) : reviewItems.length > 0 ? (
              <div className="space-y-3">
                {reviewItems.map((rev) => (
                  <div key={rev.id} className="border border-slate-200 p-4 bg-slate-50 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{rev.reviewer_name}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">
                          <ShieldCheck className="w-3 h-3" />
                          Verified Purchase
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-amber-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= rev.rating ? 'fill-current text-amber-500' : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {formatDateLabel(rev.created_at, '')}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-700 leading-relaxed">{rev.comment}</p>

                    {rev.admin_reply && (
                      <div className="mt-2 pl-3 border-l-2 border-[#00AEEF] bg-white p-2.5 text-[11px] text-slate-600 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <MessageSquareReply className="w-3.5 h-3.5 text-[#00AEEF]" />
                          <span>Author / Admin Response</span>
                        </div>
                        <p>{rev.admin_reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-slate-200 p-6 text-center text-slate-500">
                No reviews yet for this product. Be the first verified license holder to share your feedback!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}