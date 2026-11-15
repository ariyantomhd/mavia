// src/components/product-detail/AffiliateBox.tsx
'use client';

import React, { useState } from 'react';
import { Copy, Check, Share2, Loader2, Sparkles } from 'lucide-react';
import { affiliateProductAPI, CampaignKitData } from '@/services/apiAffiliateProduct';

interface AffiliateBoxProps {
  slug: string;
  commissionRate?: number;
  isAffiliateEnabled?: boolean;
}

export default function AffiliateBox({
  slug,
  commissionRate = 8,
  isAffiliateEnabled = true,
}: AffiliateBoxProps) {
  const [affiliateInput, setAffiliateInput] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [activeRate, setActiveRate] = useState<number>(commissionRate);
  const [campaignKit, setCampaignKit] = useState<CampaignKitData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAffiliateEnabled) {
    return null;
  }

  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setGeneratedLink('');
    setCampaignKit(null);

    const trimmedInput = affiliateInput.trim().replace(/[^a-zA-Z0-9_-]/g, '');
    if (!trimmedInput) {
      setErrorMessage('Please enter a valid Affiliate ID.');
      return;
    }

    const formattedToken = trimmedInput.toLowerCase().startsWith('tmv-')
      ? trimmedInput.toLowerCase()
      : `tmv-${trimmedInput.toLowerCase()}`;

    try {
      setIsLoading(true);

      const response = await affiliateProductAPI.trackAndGetAffiliateUrl({
        productId: slug,
        userAffiliateId: formattedToken,
      });

      const resolvedRate = response?.data?.commission_rate ?? commissionRate;
      const resolvedCode = response?.data?.affiliate_code ?? formattedToken;

      setActiveRate(resolvedRate);
      setCampaignKit(response?.data?.campaign_kit ?? null);

      const trackingUrl = `${window.location.origin}/products/${slug}?ref=${resolvedCode}`;
      setGeneratedLink(trackingUrl);

      await navigator.clipboard.writeText(trackingUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Invalid or unapproved Affiliate ID.';
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-sm rounded-2xl">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-wider font-mono flex items-center space-x-1.5">
          <Share2 className="h-3.5 w-3.5" />
          <span>Affiliate Program</span>
        </span>
        <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 font-bold uppercase rounded">
          Earn {activeRate}%
        </span>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed">
        Enter your approved Affiliate ID to generate a secure tracking link formatted with the{' '}
        <strong>tmv-</strong> prefix and earn a <strong>{activeRate}%</strong> commission per sale.
      </p>

      <form onSubmit={handleGenerateLink} className="space-y-2.5">
        <div>
          <input
            type="text"
            value={affiliateInput}
            onChange={(e) => setAffiliateInput(e.target.value)}
            placeholder="e.g. user123 or tmv-user123"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-mono rounded-xl"
            disabled={isLoading}
          />
          {errorMessage && (
            <span className="text-[10px] text-rose-500 mt-1 block font-medium">
              {errorMessage}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-slate-900 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center space-x-2 uppercase tracking-wider transition-colors cursor-pointer rounded-xl disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span>{isLoading ? 'Validating ID...' : 'Generate & Copy Link'}</span>
        </button>
      </form>

      {generatedLink && (
        <div className="bg-slate-50 border border-slate-200 p-3 text-left space-y-2.5 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-600 font-bold flex items-center space-x-1">
              {isCopied && <Check className="h-3 w-3" />}
              <span>{isCopied ? 'Link Copied to Clipboard!' : 'Affiliate Link Ready'}</span>
            </span>
          </div>
          <code className="text-[10px] font-mono break-all text-slate-800 block bg-white p-2 border border-slate-200 select-all rounded-lg">
            {generatedLink}
          </code>

          {campaignKit && (campaignKit.promo_headline || campaignKit.promo_copy_en) && (
            <div className="pt-2 border-t border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1 uppercase">
                <Sparkles className="h-3 w-3 text-orange-500" />
                <span>Campaign Kit Copy</span>
              </span>
              {campaignKit.promo_headline && (
                <p className="text-[11px] font-semibold text-slate-800">
                  {campaignKit.promo_headline}
                </p>
              )}
              {campaignKit.promo_copy_en && (
                <p className="text-[10px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                  {campaignKit.promo_copy_en}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}