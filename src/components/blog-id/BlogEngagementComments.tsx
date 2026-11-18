// src/components/blog-id/BlogEngagementComments.tsx
'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Share2, ThumbsUp } from 'lucide-react';
import { z } from 'zod';
import { CommentItem, INITIAL_COMMENTS } from '@/types/blog-id';
import { sanitizeText } from '@/utils/sanitize';
import { useAppStore } from '@/store/useAppStore';

const commentSchema = z
  .string()
  .trim()
  .min(2, 'Comment must be at least 2 characters.')
  .max(500, 'Comment cannot exceed 500 characters.');

interface BlogEngagementCommentsProps {
  initialLikes: number;
  shareCount: number;
  onQuickShare: () => void;
}

export default function BlogEngagementComments({
  initialLikes,
  shareCount,
  onQuickShare,
}: BlogEngagementCommentsProps) {
  const currentUser = useAppStore((state) => state.currentUser);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [commentInput, setCommentInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);

  const handleToggleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      setLikeCount((count) => (next ? count + 1 : count - 1));
      return next;
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const sanitized = sanitizeText(commentInput.trim());
    const parsed = commentSchema.safeParse(sanitized);

    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message || 'Invalid comment.');
      return;
    }

    setComments((prev) => [
      {
        id: Date.now(),
        author: currentUser?.username || 'Community Reader',
        text: parsed.data,
        time: 'Just now',
      },
      ...prev,
    ]);
    setCommentInput('');
  };

  return (
    <div>
      {/* Bottom Engagement & Comment Input Bar */}
      <div className="mt-8 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-5 text-xs font-semibold text-slate-600 shrink-0">
          <button
            type="button"
            onClick={handleToggleLike}
            className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
              liked ? 'text-indigo-600 font-bold' : 'hover:text-indigo-600'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{likeCount} Likes</span>
          </button>

          <span className="inline-flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-slate-500" />
            <span>{comments.length} Comments</span>
          </span>

          <button
            type="button"
            onClick={onQuickShare}
            className="inline-flex items-center gap-1.5 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            <span>{shareCount} Shares</span>
          </button>
        </div>

        {/* Inline Comment Form */}
        <div className="flex-1 max-w-md">
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => {
                setCommentInput(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="Write a comment..."
              className="w-full px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
            />
            <button
              type="submit"
              aria-label="Post comment"
              className="w-8 h-8 rounded-full bg-slate-900 hover:bg-indigo-600 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          {errorMsg && (
            <p className="mt-1 pl-4 text-[11px] font-medium text-rose-600">{errorMsg}</p>
          )}
        </div>
      </div>

      {/* Recent Comments List */}
      {comments.length > 0 && (
        <div className="mt-6 space-y-3">
          {comments.map((comment: CommentItem) => (
            <div
              key={comment.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60"
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-slate-800">{comment.author}</span>
                <span className="text-slate-400">{comment.time}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}