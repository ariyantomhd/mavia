// src/services/blogApi.ts
import { api } from './wrapperAPI';
import { BLOG_CATEGORIES, type BlogArticle } from '@/types/blog';
import { type ArticleDetail } from '@/types/blog-id';

export interface BackendCategory {
  id?: number | string;
  name: string;
  slug?: string;
  badge_color?: string;
}

export interface BackendComment {
  id?: number | string;
  article_id?: number | string;
  user_id?: string | null;
  author_name?: string;
  content: string;
  created_at?: string;
}

export interface CreateCommentDTO {
  author_name?: string;
  content: string;
}

export interface MarketArticle {
  id: number | string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string | null;
  status?: string;
  category_id?: number | string | null;
  badge_color?: string | null;
  cover_image?: string;
  thumbnail?: string;
  image?: string;
  read_time?: string;
  views_count?: number;
  likes_count?: number;
  shares_count?: number;
  tag?: 'Trending' | 'New' | 'Exclusive' | 'Featured';
  author_name?: string;
  author_avatar?: string;
  author_role?: string;
  lead_location?: string;
  paragraphs?: string[];
  subheading?: string;
  sub_paragraph?: string;
  bullet_points?: string[];
  category_name?: string;
  category?: BackendCategory | string;
  created_at?: string;
  published_at?: string;
  comments?: BackendComment[];
}

interface ApiListResponse<T> {
  success?: boolean;
  data?: T[];
}

interface ApiSingleResponse<T> {
  success?: boolean;
  data?: T;
}

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop';
const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop';

const CATEGORY_BADGES: Record<string, string> = {
  'SaaS Architecture': 'bg-rose-600 text-white',
  Frontend: 'bg-cyan-500 text-slate-950',
  Database: 'bg-indigo-600 text-white',
  'Business & Tips': 'bg-emerald-600 text-white',
};

function formatDate(dateString?: string): string {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function resolveCategoryName(raw: MarketArticle): string {
  if (typeof raw.category === 'string' && raw.category.trim()) return raw.category;
  if (raw.category && typeof raw.category === 'object' && 'name' in raw.category) {
    return raw.category.name;
  }
  if (raw.category_name) return raw.category_name;
  return 'SaaS Architecture';
}

function estimateReadTime(content?: string | null, explicitReadTime?: string): string {
  if (explicitReadTime) return explicitReadTime;
  if (!content) return '5 min read';
  const words = content.replace(/<[^>]+>/g, '').trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function mapToBlogArticle(raw: MarketArticle): BlogArticle {
  const categoryName = resolveCategoryName(raw);
  const viewsNum = typeof raw.views_count === 'number' ? raw.views_count : 0;

  return {
    id: Number(raw.id),
    title: raw.title || 'Untitled Article',
    slug: raw.slug || String(raw.id),
    excerpt:
      raw.excerpt ||
      (raw.content ? `${raw.content.replace(/<[^>]+>/g, '').slice(0, 150)}...` : ''),
    category: categoryName,
    badgeColor:
      raw.badge_color || CATEGORY_BADGES[categoryName] || 'bg-slate-900 text-white',
    tag: raw.tag || 'New',
    image: raw.cover_image || raw.thumbnail || raw.image || DEFAULT_IMAGE,
    date: formatDate(raw.published_at || raw.created_at),
    readTime: estimateReadTime(raw.content, raw.read_time),
    views: viewsNum > 0 ? `${viewsNum.toLocaleString()} views` : '0 views',
    author: {
      name: raw.author_name || 'Muhammad Ariyanto',
      avatar: raw.author_avatar || DEFAULT_AVATAR,
    },
  };
}

export function mapToArticleDetail(raw: MarketArticle): ArticleDetail {
  const categoryName = resolveCategoryName(raw);
  const cleanText = (raw.content || raw.excerpt || '')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .trim();

  const rawParagraphs: string[] = cleanText
    .split(/\n{2,}/)
    .map((p: string) => p.trim())
    .filter(Boolean);

  const dbParagraphs: string[] = Array.isArray(raw.paragraphs)
    ? raw.paragraphs.map((p) => String(p).trim()).filter(Boolean)
    : [];

  const paragraphs =
    dbParagraphs.length > 0
      ? dbParagraphs
      : rawParagraphs.length > 0
        ? rawParagraphs
        : [raw.excerpt || ''];

  const dbBulletPoints: string[] = Array.isArray(raw.bullet_points)
    ? raw.bullet_points.map((b) => String(b).trim()).filter(Boolean)
    : [];

  return {
    id: String(raw.id),
    slug: raw.slug || String(raw.id),
    title: raw.title || 'Untitled Article',
    category: categoryName,
    date: formatDate(raw.published_at || raw.created_at),
    readTime: estimateReadTime(raw.content, raw.read_time),
    image: raw.cover_image || raw.thumbnail || raw.image || DEFAULT_IMAGE,
    author: {
      name: raw.author_name || 'Muhammad Ariyanto',
      avatar: raw.author_avatar || DEFAULT_AVATAR,
      role: raw.author_role || 'Lead Architect',
    },
    leadLocation: raw.lead_location || `${categoryName} —`,
    paragraphs,
    subheading: raw.subheading || 'Key Architecture & Implementation Notes',
    subParagraph:
      raw.sub_paragraph ||
      (paragraphs.length > 1 ? paragraphs[paragraphs.length - 1] : ''),
    bulletPoints: dbBulletPoints,
    likes: typeof raw.likes_count === 'number' ? raw.likes_count : 0,
    shares: typeof raw.shares_count === 'number' ? raw.shares_count : 0,
  };
}

export async function getBlogCategories(): Promise<string[]> {
  try {
    const res = await api.get<ApiListResponse<BackendCategory> | BackendCategory[]>(
      '/blog/categories'
    );
    const list: BackendCategory[] = Array.isArray(res)
      ? res
      : Array.isArray(res?.data)
        ? res.data
        : [];
    if (list.length > 0) {
      return ['All', ...list.map((c: BackendCategory) => c.name)];
    }
    return BLOG_CATEGORIES;
  } catch {
    return BLOG_CATEGORIES;
  }
}

export async function getMarketArticles(params?: {
  category_id?: number | string;
  category?: string;
  search?: string;
}): Promise<BlogArticle[]> {
  try {
    const queryParams: Record<string, string | number> = {
      status: 'PUBLISHED',
    };

    if (params?.category_id) queryParams.category_id = params.category_id;
    if (params?.category && params.category !== 'All') {
      queryParams.category = params.category;
    }
    if (params?.search?.trim()) {
      queryParams.search = params.search.trim();
    }

    const res = await api.get<ApiListResponse<MarketArticle> | MarketArticle[]>('/blog', {
      params: queryParams,
    });

    const list: MarketArticle[] = Array.isArray(res)
      ? res
      : Array.isArray(res?.data)
        ? res.data
        : [];

    return list.map(mapToBlogArticle);
  } catch (error) {
    console.error('[blogApi.getMarketArticles] Failed to fetch articles:', error);
    return [];
  }
}

export async function getMarketArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  try {
    const res = await api.get<ApiSingleResponse<MarketArticle> | MarketArticle>(
      `/blog/${encodeURIComponent(slug)}`
    );
    const raw =
      res && typeof res === 'object' && 'data' in res
        ? res.data ?? null
        : (res as MarketArticle) ?? null;

    if (!raw) return null;
    return mapToArticleDetail(raw);
  } catch (error) {
    console.error('[blogApi.getMarketArticleBySlug] Failed to fetch article:', error);
    return null;
  }
}

export async function getRelatedArticles(
  currentSlug: string,
  limit = 3
): Promise<ArticleDetail[]> {
  try {
    const articles = await getMarketArticles();
    const filtered = articles
      .filter((a: BlogArticle) => a.slug !== currentSlug)
      .slice(0, limit);

    return filtered.map((item: BlogArticle) => ({
      id: String(item.id),
      slug: item.slug,
      title: item.title,
      category: item.category,
      date: item.date,
      readTime: item.readTime,
      image: item.image,
      author: {
        name: item.author.name,
        avatar: item.author.avatar,
        role: 'Contributor',
      },
      leadLocation: `${item.category} —`,
      paragraphs: [item.excerpt],
      subheading: 'Overview',
      subParagraph: item.excerpt,
      bulletPoints: [],
      likes: 0,
      shares: 0,
    }));
  } catch {
    return [];
  }
}

export async function postArticleComment(
  articleId: number | string,
  payload: CreateCommentDTO
): Promise<BackendComment | null> {
  const res = await api.post<ApiSingleResponse<BackendComment> | BackendComment>(
    `/blog/${articleId}/comments`,
    payload
  );
  if (res && typeof res === 'object' && 'data' in res) {
    return res.data ?? null;
  }
  return (res as BackendComment) ?? null;
}

export const blogApi = {
  getCategories: getBlogCategories,
  getArticles: getMarketArticles,
  getArticleBySlug: getMarketArticleBySlug,
  getRelatedArticles,
  postComment: postArticleComment,
  mapToBlogArticle,
  mapToArticleDetail,
};

export default blogApi;