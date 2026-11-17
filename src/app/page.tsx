// src/app/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productAPI } from '@/services/apiProducts';
import { Product } from '@/types';

import HeroSection from '@/components/landingpage/HeroSection';
import LandingSections from '@/components/landingpage/LandingSections';

export default function HomePage() {
  const router = useRouter();

  // Tangkap token verifikasi Supabase dari URL hash setelah klik email
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        const params = new URLSearchParams(hash.replace('#', '?'));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken) {
          localStorage.setItem('token', accessToken);
          if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken);
          }

          window.history.replaceState({}, document.title, window.location.pathname);
          window.location.reload();
        }
      }
    }
  }, []);

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
    console.log('Watch demo clicked');
  };

  return (
    <main className="min-h-screen text-slate-900">
      <HeroSection
        onExploreProducts={handleExploreProducts}
        onWatchDemo={handleWatchDemo}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 -mt-4 sm:-mt-6 pb-16 relative z-10">
        <LandingSections
          featured={featuredProducts.slice(0, 4)}
          trending={trendingProducts.slice(0, 3)}
          newArrivals={newArrivalsProducts.slice(0, 3)}
          loading={isLoading}
        />
      </div>
    </main>
  );
}