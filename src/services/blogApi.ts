// src/services/blogApi.ts
import { fetchApi } from './apiConfig';
import { Article, Category, CreateCommentDTO, ApiResponse } from '@/types';

export const blogApi = {
  async getArticles(params?: { category?: string; search?: string }): Promise<ApiResponse<Article[]>> {
    return fetchApi<ApiResponse<Article[]>>('/blog/articles', { params });
  },

  async getArticleBySlug(slug: string): Promise<ApiResponse<Article>> {
    return fetchApi<ApiResponse<Article>>(`/blog/articles/slug/${slug}`);
  },

  async getCategories(): Promise<ApiResponse<Category[]>> {
    return fetchApi<ApiResponse<Category[]>>('/blog/categories');
  },

  async addComment(articleId: number | string, payload: CreateCommentDTO): Promise<ApiResponse<unknown>> {
    return fetchApi<ApiResponse<unknown>>(`/blog/articles/${articleId}/comments`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};