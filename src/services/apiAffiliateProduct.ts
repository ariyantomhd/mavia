// src/services/apiAffiliateProduct.ts
import { api } from './wrapperAPI';

export interface GenerateAffiliateLinkPayload {
  productId: string;
  userAffiliateId: string;
}

export interface CampaignKitData {
  promo_headline?: string | null;
  promo_copy_id?: string | null;
  promo_copy_en?: string | null;
  banner_urls?: string[];
  video_teaser_url?: string | null;
}

export interface GenerateAffiliateLinkResponse {
  success: boolean;
  message?: string;
  data: {
    affiliate_code: string;
    commission_rate: number;
    product_slug: string;
    campaign_kit?: CampaignKitData | null;
  };
}

export const affiliateProductAPI = {
  async trackAndGetAffiliateUrl(
    payload: GenerateAffiliateLinkPayload
  ): Promise<GenerateAffiliateLinkResponse> {
    return await api.post<GenerateAffiliateLinkResponse>('/affiliates/generate-link', payload);
  },

  async trackReferralClick(ref: string): Promise<void> {
    await api.post('/affiliates/track-click', { ref });
  },
};