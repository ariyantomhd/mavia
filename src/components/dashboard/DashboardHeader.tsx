// src/components/dashboard/DashboardHeader.tsx
import React from 'react';
import { DashboardUser } from '@/types/dashboard';

interface Props {
  user?: DashboardUser | null;
}

export function DashboardHeader({ user }: Props) {
  return (
    <div className="py-2 flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 backdrop-blur-md border border-white/70 flex items-center justify-center text-indigo-600 text-2xl font-bold uppercase shrink-0 shadow-inner">
        {user?.username?.charAt(0) || 'U'}
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-extrabold text-slate-900">
          Welcome back, {user?.username || 'User'}! 👋
        </h1>
        <p className="text-sm text-slate-600 mt-1 font-medium">{user?.email}</p>
      </div>
      <div className="mt-2 sm:mt-0">
        <span className="px-3.5 py-1.5 bg-emerald-500/15 backdrop-blur-md border border-emerald-300/60 text-emerald-800 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-2xs">
          Status: {user?.status || 'Active'}
        </span>
      </div>
    </div>
  );
}