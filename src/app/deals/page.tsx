// src/app/deals/page.tsx
'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiDeals, DealProduct } from '@/services/apiDeals';

// Import komponen modular deals
import DealsHeroBanner from '@/components/deals/DealsHeroBanner';
import DealsCategoryPills from '@/components/deals/DealsCategoryPills';
import DealsSidebarFilter from '@/components/deals/DealsSidebarFilter';
import DealsToolbar from '@/components/deals/DealsToolbar';
import DealsGridSection from '@/components/deals/DealsGridSection';

export default function DealsPage() {
  // State parameter query yang diteruskan langsung ke backend
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('All Deals');
  const [flashSaleOnly, setFlashSaleOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('lowest');

  const { data: response, isLoading } = useQuery({
    queryKey: [
      'deals-list',
      selectedCategoryTab,
      flashSaleOnly,
      maxPrice,
      selectedTech,
      searchQuery,
      sortBy,
    ],
    queryFn: () =>
      apiDeals.getDeals({
        category: selectedCategoryTab,
        flashSaleOnly,
        maxPrice,
        tech: selectedTech,
        search: searchQuery,
        sortBy,
      }),
  });

  const deals: DealProduct[] = Array.isArray(response?.data?.items)
    ? response!.data!.items
    : [];
  const categories: string[] = Array.isArray(response?.data?.availableCategories)
    ? response!.data!.availableCategories
    : ['All Deals'];
  const techFrameworks: string[] = Array.isArray(response?.data?.availableTech)
    ? response!.data!.availableTech
    : [];

  // Handle toggle pilihan framework
  const toggleTech = (techName: string) => {
    setSelectedTech((prev) =>
      prev.includes(techName) ? prev.filter((t) => t !== techName) : [...prev, techName]
    );
  };

  // Reset semua filter
  const handleResetFilter = () => {
    setFlashSaleOnly(false);
    setSelectedCategoryTab('All Deals');
    setMaxPrice(200);
    setSelectedTech([]);
    setSearchQuery('');
    setSortBy('lowest');
  };

  return (
    <div className="min-h-screen  text-slate-800 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 1. HERO FLASH SALE BANNER UTAMA */}
        <DealsHeroBanner />

        {/* 2. CATEGORY FILTER PILLS HORIZONTAL */}
        <DealsCategoryPills
          categories={categories}
          selectedCategoryTab={selectedCategoryTab}
          onSelectCategory={setSelectedCategoryTab}
        />

        {/* 3. MAIN GRID & SIDEBAR FILTER */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* LEFT SIDEBAR FILTER */}
          <DealsSidebarFilter
            categories={categories}
            techFrameworks={techFrameworks}
            flashSaleOnly={flashSaleOnly}
            setFlashSaleOnly={setFlashSaleOnly}
            categoryDropdown={selectedCategoryTab}
            setCategoryDropdown={setSelectedCategoryTab}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedTech={selectedTech}
            toggleTech={toggleTech}
            handleResetFilter={handleResetFilter}
          />

          {/* RIGHT CONTENT AREA */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Toolbar (Search & Sort) */}
            <DealsToolbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalFiltered={deals.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Modular Deals Grid & Empty State */}
            <DealsGridSection
              deals={deals}
              isLoading={isLoading}
              onResetFilter={handleResetFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}