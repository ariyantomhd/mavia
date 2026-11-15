// src/services/wrapperAPI.ts
import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  InternalAxiosRequestConfig, 
  AxiosError 
} from 'axios';
import { useAppStore } from '@/store/useAppStore';

const PROTECTED_ROUTE_PREFIXES = [
  '/dashboard',
  '/orders',
  '/downloads',
  '/profile',
  '/settings',
  '/checkout',
  '/account',
];

function isOnProtectedRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const currentPath = window.location.pathname.toLowerCase();
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => currentPath === prefix || currentPath.startsWith(`${prefix}/`),
  );
}

class ApiWrapper {
  private client: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'https://api.themavia.com/api') {
    this.client = axios.create({
      baseURL,
      timeout: 40000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 1. Request Interceptor: Automatically attach Bearer token to headers if available in localStorage
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // 2. Response Interceptor: Handle response data and global error responses
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          const hadToken =
            typeof window !== 'undefined' && Boolean(localStorage.getItem('token'));

          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }

          const requestUrl = error.config?.url || '';
          const isAuthEndpoint =
            requestUrl.includes('/auth/login') ||
            requestUrl.includes('/auth/register') ||
            requestUrl.includes('/auth/me');

          // Hanya tampilkan modal Session Expired jika sebelumnya memang ada sesi aktif
          // dan user sedang berada di rute terproteksi (bukan saat pertama buka halaman publik)
          if (hadToken && !isAuthEndpoint && isOnProtectedRoute()) {
            useAppStore.getState().setSessionExpired(true);
          }
        }

        const errorResponse = error.response?.data || { 
          message: error.message || 'Server error occurred' 
        };
        console.error('[API Error]:', errorResponse);
        return Promise.reject(errorResponse);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get(url, config);
    return response as unknown as T;
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post(url, data, config);
    return response as unknown as T;
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put(url, data, config);
    return response as unknown as T;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete(url, config);
    return response as unknown as T;
  }
}

export const api = new ApiWrapper();