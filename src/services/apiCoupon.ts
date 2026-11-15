// src/services/apiCoupon.ts
import { api } from './wrapperAPI';

export interface CouponValidationData {
  code: string;
  discount_type: 'PERCENTAGE' | 'FIXED';
  discount_value: number;
  discountPercent: number;
  discountAmount: number;
  finalTotal: number;
  description?: string | null;
}

export interface ApplyCouponResponse {
  success: boolean;
  message?: string;
  discountPercent?: number;
  discountAmount?: number;
  data?: CouponValidationData;
}

export const apiCoupon = {
  async applyCoupon(code: string, subtotal?: number): Promise<ApplyCouponResponse> {
    return await api.post<ApplyCouponResponse>('/coupons/apply', {
      code: code.trim().toUpperCase(),
      subtotal,
    });
  },
};