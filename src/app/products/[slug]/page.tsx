// src/app/products/[slug]/page.tsx
'use client';

import React, { useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productAPI } from '@/services/apiProducts';
import { Product } from '@/types/product';

// Import komponen modular detail produk
import ProductHeader from '@/components/product-detail/ProductHeader';
import Gallery from '@/components/product-detail/Gallery';
import PriceBox from '@/components/product-detail/PriceBox';
import AffiliateBox from '@/components/product-detail/AffiliateBox';
import ProductTabs from '@/components/product-detail/ProductTabs';
import SimilarProduct from '@/components/product-detail/SimilarProduct';

function ProductDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [selectedLicense, setSelectedLicense] = useState<'regular' | 'extended'>('regular');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Pemanggilan API terpusat di Parent Page
  const { data: response } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => productAPI.getProductBySlug(slug).catch(() => null),
    enabled: Boolean(slug),
  });

  const product: Product | null = React.useMemo(() => {
    if (!response) return null;
    const resAny = response as unknown as { data?: Product };
    return resAny?.data || (response as unknown as Product) || null;
  }, [response]);

  const title = product?.title || 'Loading Product Details...';
  const regularPrice = product?.regular_price || 0;
  const extendedPrice = product?.extended_price || regularPrice * 3;
  const currentPrice = selectedLicense === 'extended' ? extendedPrice : regularPrice;

  const rawProduct = product as unknown as Record<string, unknown> | null;
  const dbImageUrl = 
    (rawProduct && typeof rawProduct.images_url === 'string' && rawProduct.images_url) ||
    (rawProduct && typeof rawProduct.image_url === 'string' && rawProduct.image_url) || '';

  const galleryImages = dbImageUrl ? [dbImageUrl] : [];
  const productTags = product?.tags ?? [];

  const ratingAvg = product?.rating_avg ?? 0;
  const reviewsCount = product?.reviews_count ?? 0;
  const salesCount = product?.sales_count ?? 0;
  const likesCount = product?.likes_count ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 1. PRODUCT HEADER */}
      <ProductHeader
        categoryName={product?.category_id ? String(product.category_id) : 'App Templates'}
        framework={product?.tech_stack?.[0] || 'Next.js'}
        livePreviewUrl={product?.live_preview_url || '#'}
        title={title}
        rating={ratingAvg}
        reviewsCount={reviewsCount}
        salesCount={salesCount}
      />

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Galeri & Tab Detail */}
        <div className="lg:col-span-2 space-y-8">
          <Gallery
            productId={product?.id}
            product={rawProduct}
            images={galleryImages}
            thumbnails={galleryImages}
            activeIndex={activeImageIndex}
            onSelectIndex={setActiveImageIndex}
            title={title}
            demoUrl={product?.live_preview_url || '#'}
            likes={likesCount}
          />

          <ProductTabs
            productId={product?.id}
            longDesc={product?.description || 'No description available yet. Waiting for backend data connection.'}
            tags={productTags}
            rating={ratingAvg}
            reviewsCount={reviewsCount}
            version={product?.current_version || '1.0.0'}
            createdAt={product?.created_at}
            updatedAt={product?.updated_at}
          />
        </div>

        {/* Kolom Kanan: Price Box & Affiliate Box */}
        <div className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <PriceBox
              productId={product?.id || 'temp-id'}
              productName={title}
              currentPrice={currentPrice}
              regularPrice={regularPrice}
              extendedPrice={extendedPrice}
              selectedLicense={selectedLicense}
              onSelectLicense={setSelectedLicense}
              productData={product || undefined}
            />

            <AffiliateBox slug={slug || 'preview'} />
          </div>
        </div>

      </div>

      {/* 6. SIMILAR PRODUCTS */}
      <SimilarProduct />
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="w-full h-96 bg-slate-100 rounded-3xl animate-pulse" />
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}