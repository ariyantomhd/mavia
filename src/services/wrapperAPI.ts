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

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') {
    this.client = axios.create({
      baseURL,
      timeout: 40000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 1. Request Interceptor: Otomatis menyematkan Bearer token dari localStorage jika ada
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

    // 2. Response Interceptor: Menangani data respons dan standarisasi error global agar tidak kosong {}
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          const hadToken =
            typeof window !== 'undefined' && Boolean(localStorage.getItem('token'));

          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
          }

          const requestUrl = error.config?.url || '';
          const isAuthEndpoint =
            requestUrl.includes('/auth/login') ||
            requestUrl.includes('/auth/register') ||
            requestUrl.includes('/auth/me');

          // Tampilkan modal Session Expired jika sebelumnya ada sesi aktif dan berada di rute terproteksi
          if (hadToken && !isAuthEndpoint && isOnProtectedRoute()) {
            useAppStore.getState().setSessionExpired(true);
          }
        }

        const responseData: unknown = error.response?.data;
        const responseBody =
          typeof responseData === 'object' && responseData !== null
            ? (responseData as { message?: unknown; error?: unknown; data?: unknown })
            : null;
        let errorMessage = 'Server error occurred';

        if (typeof responseData === 'string') {
          errorMessage = responseData;
        } else if (typeof responseBody?.message === 'string') {
          errorMessage = responseBody.message;
        } else if (typeof responseBody?.error === 'string') {
          errorMessage = responseBody.error;
        } else if (error.message) {
          errorMessage = error.message;
        }

        const errorResponse = {
          success: false,
          message: errorMessage,
          status: error.response?.status || 500,
          data: responseBody?.data || null,
        };

        console.error('[API Error Detail]:', errorResponse);
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