// src/services/apiDashboard.ts
import { api } from './wrapperAPI';
import { UserDashboardData } from '@/types/dashboard';

export interface DashboardApiResponse {
  success: boolean;
  message?: string;
  data: UserDashboardData;
}

export const apiDashboard = {
  getDashboardData: async (): Promise<DashboardApiResponse> => {
    return await api.get<DashboardApiResponse>('/dashboard');
  },
};