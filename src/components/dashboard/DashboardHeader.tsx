// src/components/dashboard/DashboardHeader.tsx
import React from 'react';
import { DashboardUser } from '@/types/dashboard';

interface Props {
  user?: DashboardUser | null;
}

export function DashboardHeader({ user }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold uppercase shrink-0">
        {user?.username?.charAt(0) || 'U'}
      </div>
      <div className="flex-1">
        {/* Teks diubah jadi text-slate-900 agar terbaca di background putih */}
        <h1 className="text-xl font-extrabold text-slate-900">
          Welcome back, {user?.username || 'User'}! 👋
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">{user?.email}</p>
      </div>
      <div className="mt-4 sm:mt-0">
        <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Status: {user?.status || 'Active'}
        </span>
      </div>
    </div>
  );
}