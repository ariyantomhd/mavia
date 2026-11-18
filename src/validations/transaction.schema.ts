// src/validations/transaction.schema.ts
import { z } from 'zod';

export const checkoutDTOSchema = z.object({
  shipping_address: z.string().max(500, 'Address is too long').optional(),
  notes: z.string().max(300, 'Notes cannot exceed 300 characters').optional(),
});

export const downloadRequestDTOSchema = z.object({
  license_key: z.string().min(10, 'Invalid license key format').max(100),
});

export type CheckoutDTOInput = z.infer<typeof checkoutDTOSchema>;
export type DownloadRequestDTOInput = z.infer<typeof downloadRequestDTOSchema>;