// src/validations/order.schema.ts
import { z } from 'zod';

export const couponSchema = z.object({
  id: z.string(),
  code: z.string().min(1, 'Coupon code is required'),
  description: z.string().optional(),
  discount_type: z.enum(['percentage', 'fixed']),
  discount_value: z.number().positive('Discount value must be positive'),
  min_purchase: z.number().nonnegative(),
  usage_limit: z.number().int().nonnegative(),
  used_count: z.number().int().nonnegative(),
  expiry_date: z.string().nullable().optional(),
  is_active: z.boolean(),
  affiliate_code: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string().optional(),
});

export const orderItemSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  product_id: z.string(),
  license_type: z.enum(['REGULAR', 'EXTENDED']),
  price_at_purchase: z.number().nonnegative(),
  seller_fee_percentage: z.number().nonnegative(),
  seller_fee_amount: z.number().nonnegative(),
  net_seller_earning: z.number().nonnegative(),
  created_at: z.string(),
});

export const orderSchema = z.object({
  id: z.string(),
  buyer_id: z.string(),
  invoice_number: z.string(),
  subtotal: z.number().nonnegative(),
  discount_total: z.number().nonnegative(),
  buyer_fee: z.number().nonnegative(),
  gateway_fee: z.number().nonnegative(),
  grand_total: z.number().nonnegative(),
  payment_gateway: z.enum(['PAYPAL', 'STRIPE', 'MIDTRANS']),
  paypal_transaction_id: z.string().nullable(),
  payment_status: z.enum(['PENDING', 'PAID', 'EXPIRED', 'FAILED', 'REFUNDED']),
  affiliate_token_used: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  order_items: z.array(orderItemSchema).optional(),
});

export type CouponInput = z.infer<typeof couponSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;