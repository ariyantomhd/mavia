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
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Total Spent</span>
          <DollarSign className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">${stats.total_spent.toFixed(2)}</div>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Active Orders</span>
          <Clock className="w-4 h-4 text-amber-500" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">{stats.active_orders}</div>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Downloads</span>
          <DownloadCloud className="w-4 h-4 text-indigo-500" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">{stats.downloadable_items}</div>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Wishlist</span>
          <Heart className="w-4 h-4 text-rose-500" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">{stats.wishlist_count}</div>
      </div>
    </div>
  );
}