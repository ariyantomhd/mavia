// src/app/products/page.tsx
'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { productAPI } from '@/services/apiProducts';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// Import komponen modular
import SearchForm from '@/components/SearchForm';
import CategoryDropdown from '@/components/CategoryDropdown';
import FilterDropdown from '@/components/FilterDropdown';
import PaginationButtons from '@/components/PaginationButtons';
import { Code2, ArrowRight } from 'lucide-react';

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get('category') || 'ALL';
  const techParam = searchParams.get('tech') || 'ALL';
  const tagParam = searchParams.get('tag') || undefined;
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || ''; 
  const filterParam = searchParams.get('filter') || ''; 
  const pageParam = Number(searchParams.get('page')) || 1;

  const ITEMS_PER_PAGE = 8;
  const [searchQuery, setSearchQuery] = useState(searchParam);

  useEffect(() => {
    if (categoryParam === 'custom-development') {
      router.replace('/custom-development');
    }
  }, [categoryParam, router]);

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['products', categoryParam === 'ALL' ? undefined : categoryParam],
    queryFn: () => productAPI.getProducts({ 
      category: categoryParam === 'ALL' ? undefined : categoryParam 
    }),
    enabled: categoryParam !== 'custom-development',
  });

  const products: Product[] = useMemo(() => {
    if (!response) return [];
    if (Array.isArray(response)) return response;
    return (response as unknown as { data?: Product[] })?.data || [];
  }, [response]);

  const availableTechs = useMemo(() => {
    if (!products.length) return [];
    const techs = new Set<string>();
    products.forEach((p: Product) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((t) => techs.add(t));
      }
    });
    return Array.from(techs);
  }, [products]);

  const updateQueryParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 'ALL') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateQueryParams({ search: query, page: '1' });
  };

  const handleCategoryChange = (category: string) => {
    if (category === 'custom-development') {
      router.push('/custom-development');
    } else {
      updateQueryParams({ category, page: '1' });
    }
  };

  const handleTechChange = (tech: string) => {
    updateQueryParams({ tech, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: String(newPage) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    const result = products.filter((p: Product) => {
      // PERBAIKAN: Menggunakan properti 'description' sesuai dengan interface Product yang baru
      const matchesSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const activeTech = techParam !== 'ALL' ? techParam : tagParam;
      const matchesTech = !activeTech || (
        Array.isArray(p.tags) && 
        p.tags.some(t => t.toLowerCase() === activeTech.toLowerCase())
      );

      let matchesFilter = true;
      if (filterParam === 'new') {
        matchesFilter = Boolean(p.id); 
      } else if (filterParam === 'deals') {
        matchesFilter = Boolean(p.regular_price);
      }

      return matchesSearch && matchesTech && matchesFilter;
    });

    if (sortParam === 'trending') {
      result.sort((a: Product, b: Product) => {
        const idA = typeof a.id === 'number' ? a.id : Number(a.id) || 0;
        const idB = typeof b.id === 'number' ? b.id : Number(b.id) || 0;
        return idB - idA;
      }); 
    } else if (sortParam === 'bestseller') {
      result.sort((a: Product, b: Product) => {
        const priceA = typeof a.regular_price === 'number' ? a.regular_price : Number(a.regular_price) || 0;
        const priceB = typeof b.regular_price === 'number' ? b.regular_price : Number(b.regular_price) || 0;
        return priceA - priceB;
      }); 
    }

    return result;
  }, [products, searchQuery, techParam, tagParam, filterParam, sortParam]);

  const paginatedProducts = useMemo(() => {
    const start = (pageParam - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, pageParam]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              {tagParam ? `Tag: #${tagParam}` : categoryParam !== 'ALL' ? `Category: ${categoryParam}` : filterParam ? `Filter: ${filterParam}` : sortParam ? `Sort by: ${sortParam}` : 'All Digital Assets'}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Explore premium templates, source codes, and development kits.
            </p>
          </div>
        </div>

        {/* Toolbar Banner Bersih dengan bg-linear-to-r */}
        <div className="bg-linear-to-r from-purple-950 via-indigo-800 to-teal-500 p-4 rounded-2xl shadow-xl mb-8">
          <div className="backdrop-blur-md p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:flex-1">
              <SearchForm 
                searchQuery={searchQuery} 
                onSearchChange={handleSearchChange} 
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <CategoryDropdown 
                selectedCategory={categoryParam} 
                onCategoryChange={handleCategoryChange} 
              />
              <FilterDropdown 
                selectedTech={techParam} 
                onTechChange={handleTechChange} 
                availableTechs={availableTechs} 
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-slate-100 h-80 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200">
            <p className="text-red-500 font-bold">Failed to load products. Please try again later.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 bg-indigo-50 text-[#583cf0] rounded-full flex items-center justify-center mx-auto">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-700 font-bold">Tidak ada produk instan dalam kategori ini.</p>
              <p className="text-xs text-slate-400 mt-1">Butuh solusi khusus? Anda bisa mengajukan custom development langsung ke tim kami.</p>
            </div>
            <a 
              href="/custom-development" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#583cf0] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#4b2fe0] transition-all"
            >
              <span>Ajukan Custom Development</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <PaginationButtons
              currentPage={pageParam}
              totalItems={filteredProducts.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductsContent />
    </Suspense>
  );
}