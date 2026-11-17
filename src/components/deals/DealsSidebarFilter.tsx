// src/components/deals/DealsSidebarFilter.tsx
import React from 'react';
import { SlidersHorizontal, Flame, RotateCcw } from 'lucide-react';

interface DealsSidebarFilterProps {
  categories?: string[];
  techFrameworks?: string[];
  flashSaleOnly: boolean;
  setFlashSaleOnly: (val: boolean) => void;
  categoryDropdown: string;
  setCategoryDropdown: (cat: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  selectedTech?: string[];
  toggleTech: (tech: string) => void;
  handleResetFilter: () => void;
}

export default function DealsSidebarFilter({
  categories = ['All Deals'],
  techFrameworks = [],
  flashSaleOnly,
  setFlashSaleOnly,
  categoryDropdown,
  setCategoryDropdown,
  maxPrice,
  setMaxPrice,
  selectedTech = [],
  toggleTech,
  handleResetFilter,
}: DealsSidebarFilterProps) {
  const safeCategories =
    Array.isArray(categories) && categories.length > 0 ? categories : ['All Deals'];
  const safeTech = Array.isArray(techFrameworks) ? techFrameworks : [];
  const safeSelectedTech = Array.isArray(selectedTech) ? selectedTech : [];

  return (
    <aside className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
          <SlidersHorizontal className="h-4 w-4 text-orange-500" />
          <span>Filter Deals</span>
        </div>
        <button
          type="button"
          onClick={handleResetFilter}
          className="text-[11px] font-bold text-slate-500 hover:text-orange-600 inline-flex items-center gap-1 transition cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Flash Sale Toggle */}
      <div className="flex items-center justify-between bg-orange-50/70 border border-orange-200/70 rounded-xl p-3.5">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-orange-500" />
          <span className="text-xs font-extrabold text-slate-800">Flash Sale Only</span>
        </div>
        <input
          type="checkbox"
          checked={flashSaleOnly}
          onChange={(e) => setFlashSaleOnly(e.target.checked)}
          className="h-4 w-4 accent-orange-500 rounded cursor-pointer"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
          Deal Category
        </label>
        <select
          value={categoryDropdown}
          onChange={(e) => setCategoryDropdown(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-orange-500"
        >
          {safeCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Max Price */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-extrabold">
          <span className="text-slate-700 uppercase tracking-wider">Max Deal Price</span>
          <span className="text-orange-600 font-mono">${maxPrice}</span>
        </div>
        <input
          type="range"
          min={5}
          max={500}
          step={5}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-orange-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>$5</span>
          <span>$500</span>
        </div>
      </div>

      {/* Tech Stack / Framework */}
      {safeTech.length > 0 && (
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <span className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
            Tech &amp; Framework
          </span>
          <div className="flex flex-wrap gap-2">
            {safeTech.map((tech) => {
              const checked = safeSelectedTech.includes(tech);
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                    checked
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}