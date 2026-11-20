// src/services/apiAuth.ts
import { api } from './wrapperAPI';
import {
  User,
  UpdateUserProfileInput,
  UpdateUserPasswordInput,
} from '@/types';

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  data: User;
}

export interface GenericAuthResponse {
  success: boolean;
  message: string;
}

export interface SocialAuthResponse {
  success: boolean;
  url: string;
}

export type SocialProvider = 'google';

export const apiAuth = {
  // Initiate redirect to backend Google OAuth URL
  socialLogin: async (
    provider: SocialProvider = 'google',
    mode: 'signin' | 'signup' = 'signin'
  ): Promise<SocialAuthResponse> => {
    return await api.get<SocialAuthResponse>(`/auth/${provider}?mode=${mode}`);
  },

  // Fetch authenticated user profile via HttpOnly session cookie
  getMe: async (): Promise<AuthResponse | null> => {
    try {
      return await api.get<AuthResponse>('/auth/me');
    } catch {
      return null;
    }
  },

  signout: async (): Promise<GenericAuthResponse> => {
    try {
      return await api.post<GenericAuthResponse>('/auth/signout', {});
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
      }
    }
  },

  updatePassword: async (
    payload: UpdateUserPasswordInput
  ): Promise<GenericAuthResponse> => {
    return await api.put<GenericAuthResponse>('/auth/password', payload);
  },

  updateProfile: async (
    payload: UpdateUserProfileInput
  ): Promise<AuthResponse> => {
    return await api.put<AuthResponse>('/auth/profile', payload);
  },
};