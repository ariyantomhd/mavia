// src/validations/product.schema.ts
import { z } from 'zod';

export const productCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Category name is required'),
  slug: z.string().min(1, 'Category slug is required'),
  parent_id: z.string().nullable(),
  created_at: z.string(),
});

export const productReviewSchema = z.object({
  id: z.string(),
  product_id: z.string(),
  buyer_id: z.string(),
  rating: z.number().int().min(1).max(5),
  review_text: z.string().nullable(),
  is_verified_purchase: z.boolean(),
  created_at: z.string(),
  userName: z.string().optional(),
  comment: z.string().optional(),
  date: z.string().optional(),
  likes: z.number().int().optional(),
});

export const createProductInputSchema = z.object({
  title: z.string().min(3, 'Product title is required').max(150),
  slug: z.string().min(3, 'Product slug is required'),
  description: z.string().nullable(),
  is_affiliate_product: z.boolean().optional(),
  affiliate_external_url: z.string().url().nullable().optional(),
  affiliate_platform: z.string().nullable().optional(),
  commission_percentage: z.number().min(0).max(100).optional(),
  regular_price: z.number().nonnegative(),
  extended_price: z.number().nonnegative(),
  discount_price: z.number().nonnegative().nullable(),
  discount_ends_at: z.string().nullable(),
  category_id: z.string().nullable(),
  tags: z.array(z.string()).nullable(),
  tech_stack: z.array(z.string()).nullable(),
  current_version: z.string(),
  framework_version: z.string().nullable().optional(),
  images_url: z.string().nullable(),
  live_preview_url: z.string().url().nullable(),
  file_source_url: z.string().min(1, 'File source URL is required'),
  status: z.enum(['DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED']),
  is_featured: z.boolean().optional(),
  is_popular: z.boolean().optional(),
  is_flash_sale: z.boolean().optional(),
  rating_avg: z.number().min(0).max(5),
  reviews_count: z.number().int().nonnegative(),
  sales_count: z.number().int().nonnegative(),
  likes_count: z.number().int().nonnegative(),
});

export const updateProductInputSchema = createProductInputSchema.partial();

export type CreateProductSchemaInput = z.infer<typeof createProductInputSchema>;
export type UpdateProductSchemaInput = z.infer<typeof updateProductInputSchema>;