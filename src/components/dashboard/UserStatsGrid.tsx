// src/components/dashboard/UserStatsGrid.tsx
import React from 'react';
import { DashboardStats } from '@/types/dashboard';
import { DollarSign, Clock, DownloadCloud, Heart } from 'lucide-react';

interface Props {
  stats: DashboardStats;
}

export function UserStatsGrid({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white/45 backdrop-blur-2xl border border-white/70 ring-1 ring-slate-900/5 rounded-2xl p-5 shadow-[0_8px_28px_rgba(15,23,42,0.05)] hover:bg-white/60 transition-all">
        <div className="flex items-center justify-between text-slate-600 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Total Spent</span>
          <div className="p-2 rounded-xl bg-emerald-500/15 backdrop-blur-md border border-white/60">
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900">${stats.total_spent.toFixed(2)}</div>
      </div>

      <div className="bg-white/45 backdrop-blur-2xl border border-white/70 ring-1 ring-slate-900/5 rounded-2xl p-5 shadow-[0_8px_28px_rgba(15,23,42,0.05)] hover:bg-white/60 transition-all">
        <div className="flex items-center justify-between text-slate-600 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Active Orders</span>
          <div className="p-2 rounded-xl bg-amber-500/15 backdrop-blur-md border border-white/60">
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900">{stats.active_orders}</div>
      </div>

      <div className="bg-white/45 backdrop-blur-2xl border border-white/70 ring-1 ring-slate-900/5 rounded-2xl p-5 shadow-[0_8px_28px_rgba(15,23,42,0.05)] hover:bg-white/60 transition-all">
        <div className="flex items-center justify-between text-slate-600 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Downloads</span>
          <div className="p-2 rounded-xl bg-indigo-500/15 backdrop-blur-md border border-white/60">
            <DownloadCloud className="w-4 h-4 text-indigo-600" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900">{stats.downloadable_items}</div>
      </div>

      <div className="bg-white/45 backdrop-blur-2xl border border-white/70 ring-1 ring-slate-900/5 rounded-2xl p-5 shadow-[0_8px_28px_rgba(15,23,42,0.05)] hover:bg-white/60 transition-all">
        <div className="flex items-center justify-between text-slate-600 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Wishlist</span>
          <div className="p-2 rounded-xl bg-rose-500/15 backdrop-blur-md border border-white/60">
            <Heart className="w-4 h-4 text-rose-600" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900">{stats.wishlist_count}</div>
      </div>
    </div>
  );
}