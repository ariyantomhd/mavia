// src/components/auth/SocialAuthButtons.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SocialAuthButtonsProps {
  label?: string;
}

export default function SocialAuthButtons({
  label = 'Or continue with',
}: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'twitter' | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'twitter') => {
    try {
      setLoadingProvider(provider);
      const response = await fetch(`http://localhost:5000/api/auth/${provider}`);
      const textResponse = await response.text();
      let result;
      
      try {
        result = JSON.parse(textResponse);
      } catch {
        throw new Error(`Server Response Error: ${textResponse}`);
      }

      if (!response.ok || !result.url) {
        throw new Error(result.message || `Gagal mendapatkan URL ${provider} Auth`);
      }

      // Redirect browser ke halaman OAuth resmi dari Supabase / Provider
      window.location.href = result.url;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error(`${provider} Auth Error Detail:`, errorMessage);
      alert(`Gagal autentikasi ${provider}: ` + errorMessage);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="w-full">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-slate-400 font-medium rounded-full">
            {label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Tombol Google */}
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          disabled={loadingProvider !== null}
          className="flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={18}
            height={18}
            className="w-4 h-4"
          />
          <span>{loadingProvider === 'google' ? 'Connecting...' : 'Google'}</span>
        </button>

        {/* Tombol X (Twitter) */}
        <button
          type="button"
          onClick={() => handleSocialLogin('twitter')}
          disabled={loadingProvider !== null}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>{loadingProvider === 'twitter' ? 'Connecting...' : 'X'}</span>
        </button>
      </div>
    </div>
  );
}