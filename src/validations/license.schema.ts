// src/validations/license.schema.ts
import { z } from 'zod';

export const licenseItemSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  product_id: z.string(),
  license_key: z.string().min(1, 'License key is required'),
  status: z.string(),
  expires_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  products: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    thumbnail_url: z.string().nullable().optional(),
  }).optional(),
});

export const licenseVerifyResponseSchema = z.object({
  valid: z.boolean(),
  message: z.string(),
  license: licenseItemSchema.optional(),
});

export type LicenseItemInput = z.infer<typeof licenseItemSchema>;
export type LicenseVerifyResponseInput = z.infer<typeof licenseVerifyResponseSchema>;