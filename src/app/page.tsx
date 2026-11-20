// src/app/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productAPI } from '@/services/apiProducts';
import { Product } from '@/types';

import HeroSection from '@/components/landingpage/HeroSection';
import LandingSections from '@/components/landingpage/LandingSections';

export default function HomePage() {
  const router = useRouter();

  const { data: featuredResponse, isLoading: loadingFeatured } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productAPI.getFeaturedProducts().catch(() => []),
  });

  const { data: popularResponse, isLoading: loadingPopular } = useQuery({
    queryKey: ['popular-products'],
    queryFn: () => productAPI.getPopularProducts().catch(() => []),
  });

  const { data: dealsResponse, isLoading: loadingDeals } = useQuery({
    queryKey: ['best-deals'],
    queryFn: () => productAPI.getBestDeals().catch(() => []),
  });

  const featuredProducts: Product[] = Array.isArray(featuredResponse)
    ? featuredResponse
    : ((featuredResponse as unknown as { data?: Product[] })?.data || []);

  const trendingProducts: Product[] = Array.isArray(popularResponse)
    ? popularResponse
    : ((popularResponse as unknown as { data?: Product[] })?.data || []);

  const newArrivalsProducts: Product[] = Array.isArray(dealsResponse)
    ? dealsResponse
    : ((dealsResponse as unknown as { data?: Product[] })?.data || []);

  const isLoading = loadingFeatured || loadingPopular || loadingDeals;

  const handleExploreProducts = () => {
    router.push('/products');
  };

  const handleWatchDemo = () => {
    router.push('/products');
  };

  return (
    <main className="min-h-screen text-slate-900">
      <HeroSection
        onExploreProducts={handleExploreProducts}
        onWatchDemo={handleWatchDemo}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 -mt-4 sm:-mt-6 pb-16 relative z-10">
        <LandingSections
          featured={featuredProducts.slice(0, 8)}
          trending={trendingProducts.slice(0, 5)}
          newArrivals={newArrivalsProducts.slice(0, 5)}
          loading={isLoading}
        />
      </div>
    </main>
  );
}