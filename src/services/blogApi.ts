// src/services/BlogAPI.ts
import apiClient, { normalizeApiError } from './apiClient';

export interface MarketArticle {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string[];
  category?: string;
  author?: string;
  image_url?: string | null;
  is_featured?: boolean;
  status: string;
  published_at?: string | null;
  created_at: string;
}

export async function getMarketArticles(): Promise<MarketArticle[]> {
  try {
    const { data } = await apiClient.get<{ success: boolean; data: MarketArticle[] }>(
      '/admin/blog',
      { params: { status: 'PUBLISHED' } }
    );
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function getMarketArticleBySlug(slug: string): Promise<MarketArticle | null> {
  try {
    const { data } = await apiClient.get<{ success: boolean; data: MarketArticle[] }>(
      '/admin/blog',
      { params: { search: slug } }
    );
    const list = Array.isArray(data?.data) ? data.data : [];
    const found = list.find((a) => a.slug === slug);
    return found || null;
  } catch (error) {
    throw normalizeApiError(error);
  }
}