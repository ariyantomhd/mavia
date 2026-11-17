// src/types/blog.ts
export interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  badgeColor: string;
  tag?: 'Trending' | 'New' | 'Exclusive' | 'Featured';
  image: string;
  date: string;
  readTime: string;
  views: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const BLOG_CATEGORIES: string[] = [
  'All',
  'SaaS Architecture',
  'Frontend',
  'Database',
  'Business & Tips',
];

export const BLOG_ARTICLES: BlogArticle[] = [];