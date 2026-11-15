// src/services/apicart.ts
import { api } from './wrapperAPI';
import { Cart, CartItem } from '@/types/cart';

export interface CartItemApiPayload {
  productId: string;
  quantity: number;
  license?: string;
  license_type?: 'regular' | 'extended';
  withSupport?: boolean;
}

export interface CartResponse {
  success: boolean;
  message?: string;
  data?: Cart;
}

/**
 * Modular API service for managing shopping cart operations with the Express backend
 */
export const apiCart = {
  // Fetch user shopping cart items
  getCart: async (): Promise<CartResponse> => {
    return await api.get<CartResponse>('/cart');
  },

  // Add a product to the cart
  addToCart: async (payload: CartItemApiPayload): Promise<CartResponse> => {
    return await api.post<CartResponse>('/cart/add', payload);
  },

  // Update cart item quantity or options
  updateCartItem: async (itemId: string, quantity: number, withSupport?: boolean): Promise<CartResponse> => {
    return await api.put<CartResponse>(`/cart/${itemId}`, { quantity, withSupport });
  },

  // Remove a single item from the cart
  removeCartItem: async (itemId: string): Promise<CartResponse> => {
    return await api.delete<CartResponse>(`/cart/${itemId}`);
  },

  // Clear the entire shopping cart
  clearCart: async (): Promise<CartResponse> => {
    return await api.delete<CartResponse>('/cart/clear');
  },

  // Validate and apply discount coupons
  applyCoupon: async (code: string): Promise<{ success: boolean; discountPercent?: number; message?: string }> => {
    return await api.post('/cart/coupon', { code });
  },

  // Trigger checkout and payment process
  checkout: async (paymentMethod: 'paypal' | 'card', cartItems: CartItem[], couponCode?: string): Promise<CartResponse> => {
    return await api.post<CartResponse>('/cart/checkout', { paymentMethod, cartItems, couponCode });
  }
};