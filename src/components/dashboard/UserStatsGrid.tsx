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
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 ring-1 ring-slate-900/5 rounded-2xl p-5 shadow-lg shadow-slate-200/40 hover:bg-white/80 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Total Spent</span>
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-200/50">
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900">${stats.total_spent.toFixed(2)}</div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/60 ring-1 ring-slate-900/5 rounded-2xl p-5 shadow-lg shadow-slate-200/40 hover:bg-white/80 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Active Orders</span>
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-200/50">
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900">{stats.active_orders}</div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/60 ring-1 ring-slate-900/5 rounded-2xl p-5 shadow-lg shadow-slate-200/40 hover:bg-white/80 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Downloads</span>
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-200/50">
            <DownloadCloud className="w-4 h-4 text-indigo-600" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900">{stats.downloadable_items}</div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/60 ring-1 ring-slate-900/5 rounded-2xl p-5 shadow-lg shadow-slate-200/40 hover:bg-white/80 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Wishlist</span>
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-200/50">
            <Heart className="w-4 h-4 text-rose-600" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900">{stats.wishlist_count}</div>
      </div>
    </div>
  );
}