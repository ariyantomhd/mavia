// src/types/payment.ts
import { TransactionStatus, PaymentGateway, LicenseType } from './enums';

export interface CreatePaymentOrderDTO {
  product_id: string;
  license_type: LicenseType;
  gateway: PaymentGateway; // Mendukung PAYPAL, STRIPE, MIDTRANS
}

export interface PaymentOrderResponse {
  order_id: string;
  gateway: PaymentGateway; //[cite: 12]
  checkout_url: string; // URL redirect pembayaran universal (PayPal approval, Stripe session, Midtrans Snap)
  client_secret?: string; // Untuk Stripe Elements jika diperlukan
  status: string;
}

export interface CapturePaymentDTO {
  order_id: string;
  gateway: PaymentGateway; //[cite: 12]
}

export interface TransactionResponse {
  id: string;
  user_id: string;
  order_id: string;
  gateway_transaction_id?: string;
  gateway: PaymentGateway; //[cite: 12]
  amount: number;
  currency: string;
  status: TransactionStatus; //[cite: 12]
  created_at: string;
}

// Kompatibilitas mundur untuk fungsi PayPal yang sudah ada
export type CreatePayPalOrderDTO = Omit<CreatePaymentOrderDTO, 'gateway'>;
export type PayPalOrderResponse = PaymentOrderResponse;
export type CapturePayPalOrderDTO = CapturePaymentDTO;