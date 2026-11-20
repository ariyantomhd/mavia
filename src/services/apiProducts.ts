// src/services/apiProducts.ts
import { api } from './wrapperAPI';
import {
  Product,
  ProductCategory,
  ProductGallery,
  ProductQueryParams,
} from '@/types/product';

export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

export interface ProductLikesSummary {
  likes_count: number;
  is_liked: boolean;
}

export interface ProductReviewItem {
  id: string;
  product_id: string;
  user_id?: string;
  reviewer_name: string;
  reviewer_avatar?: string | null;
  rating: number;
  comment: string;
  is_verified_purchase?: boolean;
  admin_reply?: string | null;
  created_at: string;
}

export interface ProductReviewsSummary {
  average_rating: number;
  total_reviews: number;
  reviews: ProductReviewItem[];
}

export interface SubmitReviewPayload {
  rating: number;
  comment: string;
}

export interface PurchaseEligibilityResponse {
  success?: boolean;
  has_purchased: boolean;
  has_license: boolean;
}

export const productAPI = {
  async getProducts(params?: ProductQueryParams): Promise<Product[]> {
    return await api.get<Product[]>('/products', { params });
  },

  async getPopularProducts(): Promise<Product[]> {
    return await api.get<Product[]>('/products', { params: { is_popular: true } });
  },

  async getFeaturedProducts(): Promise<Product[]> {
    return await api.get<Product[]>('/products', { params: { is_featured: true } });
  },

  async getBestDeals(): Promise<Product[]> {
    return await api.get<Product[]>('/products', { params: { is_flash_sale: true } });
  },

  async getNewProducts(): Promise<Product[]> {
    return await api.get<Product[]>('/products', { params: { sort: 'latest' } });
  },

  async getProductBySlug(slug: string): Promise<Product> {
    return await api.get<Product>(`/products/${slug}`);
  },

  async getProductGalleries(productId: string): Promise<ProductGallery[]> {
    return await api.get<ProductGallery[]>(`/products/${productId}/galleries`);
  },

  async getCategories(): Promise<ProductCategory[]> {
    return await api.get<ProductCategory[]>('/categories');
  },

  // --- PURCHASE & LICENSE VERIFICATION ---
  async checkPurchaseEligibility(productId: string): Promise<boolean> {
    try {
      const res = await api.get<PurchaseEligibilityResponse>(
        `/products/${productId}/check-purchase`,
      );
      return Boolean(res?.has_license ?? res?.has_purchased);
    } catch {
      return false;
    }
  },

  // --- LIKES / WISHLIST ---
  async getProductLikes(productId: string): Promise<ProductLikesSummary | null> {
    try {
      const res = await api.get<ApiResponse<ProductLikesSummary> | ProductLikesSummary>(
        `/products/${productId}/likes`,
      );
      if (res && typeof res === 'object' && 'data' in res && res.data) {
        return res.data;
      }
      return res as ProductLikesSummary;
    } catch {
      return null;
    }
  },

  async toggleProductLike(productId: string): Promise<ProductLikesSummary> {
    const res = await api.post<ApiResponse<ProductLikesSummary> | ProductLikesSummary>(
      `/products/${productId}/like`,
      {},
    );
    if (res && typeof res === 'object' && 'data' in res && res.data) {
      return res.data;
    }
    return res as ProductLikesSummary;
  },

  // --- REVIEWS & RATINGS ---
  async getProductReviews(productId: string): Promise<ProductReviewsSummary | null> {
    try {
      const res = await api.get<ApiResponse<ProductReviewsSummary> | ProductReviewsSummary>(
        `/products/${productId}/reviews`,
      );
      if (res && typeof res === 'object' && 'data' in res && res.data) {
        return res.data;
      }
      return res as ProductReviewsSummary;
    } catch {
      return null;
    }
  },

  async submitProductReview(
    productId: string,
    payload: SubmitReviewPayload,
  ): Promise<ApiResponse<ProductReviewItem>> {
    return await api.post<ApiResponse<ProductReviewItem>>(
      `/products/${productId}/reviews`,
      payload,
    );
  },
};