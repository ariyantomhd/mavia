// src/services/apiDeals.ts
import { Product } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface DealProduct extends Product {
  deal_id: string;
  discount_price: number;
  discount_percent: number;
  deal_badge: string;
  is_flash_sale: boolean;
  expires_at: string;
  quota_limit: number | null;
  quota_claimed: number;
}

export interface DealsQueryParams {
  category?: string;
  flashSaleOnly?: boolean;
  maxPrice?: number;
  tech?: string[];
  search?: string;
  sortBy?: string;
}

export interface DealsResponseData {
  items: DealProduct[];
  availableCategories: string[];
  availableTech: string[];
  featuredDeal: DealProduct | null;
}

export interface DealsApiResponse {
  success: boolean;
  message?: string;
  data?: DealsResponseData;
}

export const apiDeals = {
  async getDeals(params: DealsQueryParams = {}): Promise<DealsApiResponse> {
    const query = new URLSearchParams();

    if (params.category && params.category !== 'All Deals') {
      query.set('category', params.category);
    }
    if (params.flashSaleOnly) {
      query.set('flash_sale_only', 'true');
    }
    if (params.maxPrice !== undefined) {
      query.set('max_price', String(params.maxPrice));
    }
    if (params.tech && params.tech.length > 0) {
      query.set('tech', params.tech.join(','));
    }
    if (params.search && params.search.trim() !== '') {
      query.set('search', params.search.trim());
    }
    if (params.sortBy) {
      query.set('sort', params.sortBy);
    }

    const qs = query.toString();
    const url = `${API_BASE_URL}/deals${qs ? `?${qs}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const json = (await response.json()) as DealsApiResponse;
    if (!response.ok || !json.success) {
      throw new Error(json.message || 'Gagal mengambil data deals dari server.');
    }

    return json;
  },
};