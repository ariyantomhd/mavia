// src/components/auth/SocialAuthButtons.tsx
'use client';

import React, { useState } from 'react';
import { API_BASE_URL } from '@/lib/config';

interface SocialAuthButtonsProps {
  disabled: boolean;
  mode?: 'signin' | 'signup';
}

type ProviderKey = 'google';

export default function SocialAuthButtons({
  disabled,
  mode = 'signin',
}: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<ProviderKey | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigateExternal = (destination: string) => {
    const absoluteUrl = new URL(destination, API_BASE_URL).toString();
    window.location.assign(absoluteUrl);
  };

  const handleSocialLogin = async (provider: ProviderKey) => {
    if (disabled || loadingProvider) return;

    try {
      setLoadingProvider(provider);
      setErrorMsg(null);

      const authEndpoint = `${API_BASE_URL}/api/auth/${provider}?mode=${mode}`;

      const response = await fetch(authEndpoint, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (response.redirected && response.url) {
        navigateExternal(response.url);
        return;
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const result = (await response.json()) as {
          url?: string;
          data?: { url?: string };
          message?: string;
        };

        const targetUrl = result.url || result.data?.url;
        if (!response.ok || !targetUrl) {
          throw new Error(result.message || `Failed to initiate ${provider} login`);
        }

        navigateExternal(targetUrl);
        return;
      }

      navigateExternal(authEndpoint);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : `Failed to connect with ${provider}`;
      setErrorMsg(message);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="w-full space-y-2.5">
      <div className="flex justify-center">
        <button
          type="button"
          disabled={disabled || loadingProvider !== null}
          onClick={() => handleSocialLogin('google')}
          className={`flex h-11 w-full max-w-xs items-center justify-center gap-3 rounded-xl border px-5 text-xs font-bold tracking-tight transition-all duration-200 ${
            disabled
              ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400'
              : 'cursor-pointer border-slate-200/90 bg-white/90 text-slate-800 shadow-sm backdrop-blur-md hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow active:scale-[0.98]'
          }`}
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill={disabled ? '#94a3b8' : '#4285F4'}
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
            />
            <path
              fill={disabled ? '#94a3b8' : '#34A853'}
              d="M12 24c3.3 0 6.08-1.09 8.1-2.96l-3.88-3.05c-1.1.74-2.51 1.18-4.22 1.18-3.25 0-6-2.19-6.98-5.14H1.01v3.14C3.05 21.2 7.24 24 12 24Z"
            />
            <path
              fill={disabled ? '#94a3b8' : '#FBBC05'}
              d="M5.02 14.03c-.25-.74-.39-1.54-.39-2.36 0-.82.14-1.62.39-2.36V6.17H1.01C.37 7.45 0 8.88 0 10.4v2.54c0 1.52.37 2.95 1.01 4.23l4.01-3.14Z"
            />
            <path
              fill={disabled ? '#94a3b8' : '#EA4335'}
              d="M12 4.75c1.79 0 3.41.62 4.68 1.82l3.51-3.51C18.07 1.19 15.3 0 12 0 7.24 0 3.05 2.8 1.01 6.83l4.01 3.14c.98-2.95 3.73-5.22 6.98-5.22Z"
            />
          </svg>
          <span>
            {loadingProvider === 'google' ? 'Connecting...' : 'Continue with Google'}
          </span>
        </button>
      </div>

      {errorMsg && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-center text-[11px] font-medium text-rose-600">
          {errorMsg}
        </p>
      )}
    </div>
  );
}