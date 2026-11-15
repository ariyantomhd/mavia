// src/services/apiOrder.ts
import { api } from './wrapperAPI';
import { CheckoutDTO, CheckoutResponse } from '@/types/checkout';
import { LicenseType, PaymentGateway } from '@/types/enums';

export interface CreateOrderPayload extends CheckoutDTO {
  subtotal: number;
  discount_total?: number;
  buyer_fee?: number;
  gateway_fee?: number;
  grand_total: number;
  payment_gateway?: PaymentGateway;
  affiliate_token_used?: string | null;
  items: {
    product_id: string;
    license_type: LicenseType;
    price_at_purchase: number;
    seller_fee_percentage?: number;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const apiOrder = {
  // Disamakan ke endpoint '/' sesuai order.route.ts
  createOrder: async (payload: CreateOrderPayload): Promise<ApiResponse<CheckoutResponse>> => {
    return await api.post('/orders', payload);
  },

  // Disamakan ke endpoint '/' (GET) sesuai order.route.ts untuk mengambil list order
  getMyOrders: async (): Promise<ApiResponse<unknown>> => {
    return await api.get('/orders');
  },
};
