// src/services/paymentAPI.ts
import { api } from './wrapperAPI';
import { CreatePayPalOrderDTO, PayPalOrderResponse, TransactionResponse, CapturePayPalOrderDTO } from '@/types';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const paymentAPI = {
  async createPayPalOrder(payload: Partial<CreatePayPalOrderDTO> & { order_id: string }): Promise<ApiResponse<PayPalOrderResponse>> {
    return await api.post<ApiResponse<PayPalOrderResponse>>('/payment/paypal/create', payload);
  },

  async capturePayPalOrder(payload: CapturePayPalOrderDTO & { paypalOrderId: string; orderId: string }): Promise<ApiResponse<TransactionResponse>> {
    return await api.post<ApiResponse<TransactionResponse>>('/payment/paypal/capture', payload);
  },
};