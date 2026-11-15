// src/components/deals/DealsCategoryPills.tsx
import React from 'react';

interface DealsCategoryPillsProps {
  categories?: string[];
  selectedCategoryTab: string;
  onSelectCategory: (category: string) => void;
}

export default function DealsCategoryPills({
  categories = ['All Deals'],
  selectedCategoryTab,
  onSelectCategory,
}: DealsCategoryPillsProps) {
  const safeCategories =
    Array.isArray(categories) && categories.length > 0 ? categories : ['All Deals'];

  return (
    <div id="deals-catalog" className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
      {safeCategories.map((category) => {
        const isActive = selectedCategoryTab === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
              isActive
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}