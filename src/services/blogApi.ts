// src/services/blogApi.ts
import { api } from './wrapperAPI';
import type { Article, Category, Comment, CreateCommentDTO } from '@/types/blog';

export interface MarketArticle extends Article {
  status?: string;
}

interface ApiListResponse<T> {
  success?: boolean;
  data?: T[];
}

interface ApiSingleResponse<T> {
  success?: boolean;
  data?: T;
}

export async function getBlogCategories(): Promise<Category[]> {
  try {
    const res = await api.get<ApiListResponse<Category> | Category[]>('/blog/categories');
    if (Array.isArray(res)) return res;
    return Array.isArray(res?.data) ? res.data : [];
  } catch {
    return [];
  }
}

export async function getMarketArticles(params?: {
  category_id?: number | string;
  search?: string;
}): Promise<MarketArticle[]> {
  try {
    const res = await api.get<ApiListResponse<MarketArticle> | MarketArticle[]>('/blog', {
      params: {
        status: 'PUBLISHED',
        ...params,
      },
    });
    if (Array.isArray(res)) return res;
    return Array.isArray(res?.data) ? res.data : [];
  } catch {
    return [];
  }
}

export async function getMarketArticleBySlug(slug: string): Promise<MarketArticle | null> {
  try {
    const res = await api.get<ApiSingleResponse<MarketArticle> | MarketArticle>(
      `/blog/${encodeURIComponent(slug)}`
    );
    if (res && typeof res === 'object' && 'data' in res) {
      return res.data ?? null;
    }
    return (res as MarketArticle) ?? null;
  } catch {
    // Fallback cari dari daftar artikel jika endpoint detail slug belum tersedia
    const list = await getMarketArticles({ search: slug });
    return list.find((a: MarketArticle) => a.slug === slug) ?? null;
  }
}

export async function postArticleComment(
  articleId: number | string,
  payload: CreateCommentDTO
): Promise<Comment | null> {
  const res = await api.post<ApiSingleResponse<Comment> | Comment>(
    `/blog/${articleId}/comments`,
    payload
  );
  if (res && typeof res === 'object' && 'data' in res) {
    return res.data ?? null;
  }
  return (res as Comment) ?? null;
}

// Alias kompatibilitas jika komponen lain memanggil nama fungsi lama
export const blogApi = {
  getCategories: getBlogCategories,
  getArticles: getMarketArticles,
  getArticleBySlug: getMarketArticleBySlug,
  postComment: postArticleComment,
};

export default blogApi;