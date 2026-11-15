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
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 shrink-0">
      <div className="p-6">
        {/* Teks Logo diperbaiki jadi text-slate-900 agar terlihat */}
        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            T
          </div>
          THEMAVIA
        </h2>
        <div className="mt-2 text-[10px] font-bold text-indigo-600 tracking-widest uppercase bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-md inline-block">
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
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