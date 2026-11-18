// src/components/dashboard/DashboardHeader.tsx
import React from 'react';
import { DashboardUser } from '@/types/dashboard';

interface Props {
  user?: DashboardUser | null;
}

export function DashboardHeader({ user }: Props) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 ring-1 ring-slate-900/5 rounded-2xl p-6 shadow-lg shadow-slate-200/50 flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 backdrop-blur-md border border-indigo-200/60 flex items-center justify-center text-indigo-600 text-2xl font-bold uppercase shrink-0 shadow-inner">
        {user?.username?.charAt(0) || 'U'}
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-extrabold text-slate-900">
          Welcome back, {user?.username || 'User'}! 👋
        </h1>
        <p className="text-sm text-slate-600 mt-1 font-medium">{user?.email}</p>
      </div>
      <div className="mt-4 sm:mt-0">
        <span className="px-3.5 py-1.5 bg-emerald-500/10 backdrop-blur-md border border-emerald-300/60 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
          Status: {user?.status || 'Active'}
        </span>
      </div>
    </div>
  );
}