// src/components/auth/SocialAuthButtons.tsx
'use client';

import React, { useState } from 'react';
import { API_BASE_URL } from '@/lib/config';

interface SocialAuthButtonsProps {
  disabled: boolean;
  mode?: 'signin' | 'signup';
}

type ProviderKey = 'google' | 'facebook' | 'x' | 'reddit';

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

  const baseClass =
    'flex w-full items-center justify-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all duration-200';
  const lockedClass =
    'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400';

  return (
    <div className="w-full space-y-2.5">
      <div className="grid grid-cols-2 gap-2.5">
        {/* Google */}
        <button
          type="button"
          disabled={disabled || loadingProvider !== null}
          onClick={() => handleSocialLogin('google')}
          className={`${baseClass} ${
            disabled
              ? lockedClass
              : 'cursor-pointer border-rose-200 bg-white text-slate-800 shadow-2xs hover:border-rose-300 hover:bg-rose-50/40 active:scale-[0.98]'
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
          <span>{loadingProvider === 'google' ? 'Connecting...' : 'Google'}</span>
        </button>

        {/* Facebook */}
        <button
          type="button"
          disabled={disabled || loadingProvider !== null}
          onClick={() => handleSocialLogin('facebook')}
          className={`${baseClass} ${
            disabled
              ? lockedClass
              : 'cursor-pointer border-[#1877F2] bg-[#1877F2] text-white shadow-2xs hover:bg-[#166fe5] active:scale-[0.98]'
          }`}
        >
          <svg
            className="h-4 w-4 shrink-0"
            fill={disabled ? '#94a3b8' : '#ffffff'}
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
          </svg>
          <span>{loadingProvider === 'facebook' ? 'Connecting...' : 'Facebook'}</span>
        </button>

        {/* X */}
        <button
          type="button"
          disabled={disabled || loadingProvider !== null}
          onClick={() => handleSocialLogin('x')}
          className={`${baseClass} ${
            disabled
              ? lockedClass
              : 'cursor-pointer border-slate-900 bg-slate-900 text-white shadow-2xs hover:bg-slate-800 active:scale-[0.98]'
          }`}
        >
          <svg
            className="h-3.5 w-3.5 shrink-0"
            fill={disabled ? '#94a3b8' : '#ffffff'}
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>{loadingProvider === 'x' ? 'Connecting...' : 'X'}</span>
        </button>

        {/* Reddit */}
        <button
          type="button"
          disabled={disabled || loadingProvider !== null}
          onClick={() => handleSocialLogin('reddit')}
          className={`${baseClass} ${
            disabled
              ? lockedClass
              : 'cursor-pointer border-[#FF4500] bg-[#FF4500] text-white shadow-2xs hover:bg-[#e03d00] active:scale-[0.98]'
          }`}
        >
          <svg
            className="h-4 w-4 shrink-0"
            fill={disabled ? '#94a3b8' : '#ffffff'}
            viewBox="0 0 24 24"
          >
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
          </svg>
          <span>{loadingProvider === 'reddit' ? 'Connecting...' : 'Reddit'}</span>
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