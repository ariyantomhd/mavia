// src/services/apiAuth.ts
import { api } from './wrapperAPI';
import { 
  User, 
  UpdateUserProfileInput, 
  UpdateUserPasswordInput 
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

export type SocialProvider = 'google' | 'facebook' | 'x' | 'discord';

export const apiAuth = {
  // Inisiasi redirect ke URL OAuth backend untuk 4 provider didukung
  socialLogin: async (provider: SocialProvider, mode: 'signin' | 'signup' = 'signin'): Promise<SocialAuthResponse> => {
    return await api.get<SocialAuthResponse>(`/auth/${provider}?mode=${mode}`);
  },

  getMe: async (): Promise<AuthResponse | null> => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }
    }
    return await api.get<AuthResponse>('/auth/me');
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

  updatePassword: async (payload: UpdateUserPasswordInput): Promise<GenericAuthResponse> => {
    return await api.put<GenericAuthResponse>('/auth/password', payload);
  },

  updateProfile: async (payload: UpdateUserProfileInput): Promise<AuthResponse> => {
    return await api.put<AuthResponse>('/auth/profile', payload);
  },
};