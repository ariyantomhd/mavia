// src/services/apiAuth.ts
import { api } from './wrapperAPI';
import { 
  User, 
  RegisterPayload, 
  LoginPayload, 
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

export const apiAuth = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    return await api.post<AuthResponse>('/auth/register', payload);
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    return await api.post<AuthResponse>('/auth/login', payload);
  },

  socialLogin: async (provider: 'google' | 'twitter'): Promise<SocialAuthResponse> => {
    return await api.get<SocialAuthResponse>(`/auth/${provider}`);
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
      }
    }
  },

  resetPassword: async (email: string): Promise<GenericAuthResponse> => {
    return await api.post<GenericAuthResponse>('/auth/reset-password', { email });
  },

  updatePassword: async (payload: UpdateUserPasswordInput): Promise<GenericAuthResponse> => {
    return await api.put<GenericAuthResponse>('/auth/password', payload);
  },

  confirmation: async (token: string): Promise<GenericAuthResponse> => {
    return await api.post<GenericAuthResponse>('/auth/confirmation', { token });
  },

  updateProfile: async (payload: UpdateUserProfileInput): Promise<AuthResponse> => {
    return await api.put<AuthResponse>('/auth/profile', payload);
  },
};