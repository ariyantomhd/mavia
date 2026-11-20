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
    <aside className="w-full md:w-64 bg-white/45 backdrop-blur-2xl border-b md:border-b-0 md:border-r border-white/70 shadow-[4px_0_24px_-4px_rgba(15,23,42,0.06)] shrink-0">
      <div className="p-6">
        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-600/25">
            T
          </div>
          THEMAVIA
        </h2>
        <div className="mt-2.5 text-[10px] font-bold text-indigo-700 tracking-widest uppercase bg-white/50 backdrop-blur-md border border-white/70 px-2.5 py-1 rounded-md inline-block shadow-2xs">
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
                  ? 'bg-indigo-600/90 backdrop-blur-md text-white border border-indigo-400/50 shadow-md shadow-indigo-600/20'
                  : 'text-slate-700 hover:bg-white/55 hover:text-slate-900 hover:backdrop-blur-md hover:shadow-2xs'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}