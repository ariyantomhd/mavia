// src/validations/payment.schema.ts
import { z } from 'zod';

export const createPaymentOrderDTOSchema = z.object({
  product_id: z.string().min(1, 'Product ID is required'),
  license_type: z.enum(['REGULAR', 'EXTENDED']),
  gateway: z.enum(['PAYPAL', 'STRIPE', 'MIDTRANS']),
});

export const capturePaymentDTOSchema = z.object({
  order_id: z.string().min(1, 'Order ID is required'),
  gateway: z.enum(['PAYPAL', 'STRIPE', 'MIDTRANS']),
});

export const paymentOrderResponseSchema = z.object({
  order_id: z.string(),
  gateway: z.enum(['PAYPAL', 'STRIPE', 'MIDTRANS']),
  checkout_url: z.string().url('Invalid checkout URL'),
  client_secret: z.string().optional(),
  status: z.string(),
});

export type CreatePaymentOrderInput = z.infer<typeof createPaymentOrderDTOSchema>;
export type CapturePaymentInput = z.infer<typeof capturePaymentDTOSchema>;
export type PaymentOrderResponseInput = z.infer<typeof paymentOrderResponseSchema>;