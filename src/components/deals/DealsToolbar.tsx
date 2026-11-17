// src/components/deals/DealsToolbar.tsx
import React from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

interface DealsToolbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  totalFiltered: number;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function DealsToolbar({
  searchQuery,
  setSearchQuery,
  totalFiltered,
  sortBy,
  setSortBy,
}: DealsToolbarProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products or deals..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Count & Sort Dropdown */}
      <div className="flex items-center justify-between sm:justify-end gap-4">
        <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
          Showing <strong className="text-slate-900">{totalFiltered}</strong>{' '}
          {totalFiltered === 1 ? 'deal' : 'deals'}
        </span>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-orange-500 cursor-pointer"
          >
            <option value="lowest">Lowest Price</option>
            <option value="highest">Highest Price</option>
            <option value="discount">Biggest Discount</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
}