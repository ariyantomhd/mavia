// src/types/blog-id.ts
export interface ArticleDetail {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  leadLocation: string;
  paragraphs: string[];
  subheading: string;
  subParagraph: string;
  bulletPoints: string[];
  likes: number;
  shares: number;
}

export interface CommentItem {
  id: number;
  author: string;
  text: string;
  time: string;
}

export const ARTICLES_DB: ArticleDetail[] = [];

export const SLUG_ALIASES: Record<string, string> = {};

export const INITIAL_COMMENTS: CommentItem[] = [];