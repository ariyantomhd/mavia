// src/components/blog/BlogCommentsSection.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function BlogCommentsSection() {
  const [comments, setComments] = useState([
    {
      id: '1',
      name: 'Jane Kapor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      text: 'Artikel yang sangat luar biasa dan membuka wawasan baru tentang arsitektur sistem.',
      date: '1 Nov, 2026',
      replies: [
        {
          id: '1-1',
          name: 'Jenny Wilson',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
          text: 'Setuju sekali kak Jane!',
          date: '3 Nov, 2026'
        }
      ]
    }
  ]);

  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !commentText.trim()) return;

    setComments([...comments, {
        id: String(Date.now()),
        name: fullName,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
        text: commentText,
        date: 'Just now',
        replies: []
    }]);
    setFullName(''); setEmailAddress(''); setCommentText('');
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
      <h3 className="text-xl font-black text-slate-900 tracking-tight">Comments</h3>
      
      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="space-y-4">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-200">
                <Image src={c.avatar} alt={c.name} fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900">{c.name}</span>
                  <span className="text-[10px] text-slate-400">{c.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">{c.text}</p>
              </div>
            </div>
            {c.replies?.map((r) => (
              <div key={r.id} className="ml-8 sm:ml-12 flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-slate-200">
                  <Image src={r.avatar} alt={r.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900">{r.name}</span>
                    <span className="text-[10px] text-slate-400">{r.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={handleAddComment} className="pt-6 border-t border-slate-100 space-y-4">
        <h4 className="text-base font-black text-slate-900">Write a Comment</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" required className="text-xs px-4 py-3 rounded-xl border border-slate-200 bg-slate-50" />
          <input type="email" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} placeholder="Email Address" required className="text-xs px-4 py-3 rounded-xl border border-slate-200 bg-slate-50" />
        </div>
        <textarea rows={4} value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Type comments here..." required className="w-full text-xs p-4 rounded-xl border border-slate-200 bg-slate-50 resize-none"></textarea>
        <button type="submit" className="bg-[#583cf0] hover:bg-[#4b2fe0] text-white font-extrabold text-xs px-8 py-3.5 rounded-full cursor-pointer shadow-md">Submit</button>
      </form>
    </div>
  );
}