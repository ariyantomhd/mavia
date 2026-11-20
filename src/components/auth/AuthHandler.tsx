// src/components/auth/AuthHandler.tsx
'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { apiAuth } from '@/services/apiAuth';
import type { User as UserType } from '@/types';

// Helper to verify valid JWT format (3 dot-separated segments starting with eyJ)
function isValidJwtFormat(token: string | null): token is string {
  if (!token) return false;
  const parts = token.split('.');
  return parts.length === 3 && token.startsWith('eyJ');
}

function AuthHandlerContent() {
  const router = useRouter();
  const pathname = usePathname();
  const loginStore = useAppStore((state) => state.login);

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (typeof window === 'undefined') return;

      const currentPath = window.location.pathname.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;

      // 1. Ignore PayPal checkout/payment callback redirects
      const isPayPalRedirect =
        searchParams.has('PayerID') ||
        searchParams.has('ba_token') ||
        currentPath.includes('/checkout') ||
        currentPath.includes('/payment');

      if (isPayPalRedirect) {
        return;
      }

      // 2. Handle OAuth error by redirecting to home and triggering AuthModal
      const authError = searchParams.get('error');
      if (authError) {
        console.error('OAuth Callback Error:', authError);
        router.replace(`/?login=true&error=${encodeURIComponent(authError)}`);
        return;
      }

      const isAuthSuccess = searchParams.get('auth') === 'success';

      let accessToken =
        searchParams.get('token') || searchParams.get('access_token');
      let refreshToken = searchParams.get('refresh_token');

      if (
        !accessToken &&
        hash &&
        (hash.includes('token=') || hash.includes('access_token='))
      ) {
        const hashParams = new URLSearchParams(hash.replace('#', '?'));
        accessToken =
          hashParams.get('token') || hashParams.get('access_token');
        refreshToken = hashParams.get('refresh_token');
      }

      const hasLegacyToken = Boolean(accessToken && isValidJwtFormat(accessToken));

      // 3. Process HttpOnly cookie session (?auth=success) or legacy JWT callback
      if (isAuthSuccess || hasLegacyToken) {
        if (hasLegacyToken && accessToken) {
          localStorage.setItem('token', accessToken);
          if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken);
          }
        }

        try {
          const response = await apiAuth.getMe();
          const responseData = response as unknown as {
            data?: UserType & { user?: UserType };
            user?: UserType;
          };
          const userData =
            responseData?.data?.user ||
            responseData?.data ||
            responseData?.user ||
            (response as unknown as UserType);

          if (userData && userData.id) {
            loginStore(
              {
                id: userData.id,
                username:
                  userData.username ||
                  userData.email?.split('@')[0] ||
                  'Themavia User',
                email: userData.email || '',
                avatar_url: userData.avatar_url || null,
                role: userData.role || 'BUYER',
              },
              accessToken || 'cookie-session'
            );
          }
        } catch (err) {
          console.error('Failed to fetch user profile after auth callback:', err);
        } finally {
          // Clean query params and land on the homepage with active login state
          window.history.replaceState({}, document.title, '/');
          if (window.location.pathname !== '/') {
            router.replace('/');
          }
          router.refresh();
        }
      }
    };

    handleAuthCallback();
  }, [router, loginStore, pathname]);

  return null;
}

export default function AuthHandler() {
  return (
    <Suspense fallback={null}>
      <AuthHandlerContent />
    </Suspense>
  );
}