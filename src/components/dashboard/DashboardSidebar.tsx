// src/components/dashboard/DashboardSidebar.tsx
import React from 'react';
import { LayoutGrid, ShoppingBag, Download, Heart, Settings } from 'lucide-react';

interface Props {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export function DashboardSidebar({ activeTab, onSelectTab }: Props) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutGrid },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 bg-white/70 backdrop-blur-xl border-b md:border-b-0 md:border-r border-white/60 ring-1 ring-slate-900/5 shrink-0">
      <div className="p-6">
        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-600/25">
            T
          </div>
          THEMAVIA
        </h2>
        <div className="mt-2.5 text-[10px] font-bold text-indigo-700 tracking-widest uppercase bg-indigo-500/10 backdrop-blur-md border border-indigo-200/60 px-2.5 py-1 rounded-md inline-block">
          Buyer Hub
        </div>
      </div>

      <nav className="px-4 py-4 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-600 hover:bg-white/60 hover:text-slate-900 hover:shadow-xs'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}