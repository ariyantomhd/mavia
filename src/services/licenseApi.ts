// src/services/licenseApi.ts
import { api } from './wrapperAPI';
import { LicenseItem, LicenseVerifyResponse, ApiResponse } from '@/types';

export const licenseApi = {
  async getMyLicenses(): Promise<ApiResponse<LicenseItem[]>> {
    return await api.get<ApiResponse<LicenseItem[]>>('/licenses/my-licenses');
  },

  async verifyLicense(licenseKey: string): Promise<LicenseVerifyResponse> {
    return await api.post<LicenseVerifyResponse>('/licenses/verify', {
      licenseKey,
    });
  },
};