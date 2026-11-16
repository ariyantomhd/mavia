// src/components/auth/AuthHandler.tsx
'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { apiAuth } from '@/services/apiAuth';
import type { User as UserType } from '@/types';

// Helper untuk memastikan string adalah format JWT asli (3 segmen dipisah titik & diawali eyJ)
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

      // 1. JANGAN proses jika ini adalah redirect callback dari PayPal (mengandung PayerID atau di rute checkout/payment)
      const isPayPalRedirect =
        searchParams.has('PayerID') ||
        searchParams.has('ba_token') ||
        currentPath.includes('/checkout') ||
        currentPath.includes('/payment');

      if (isPayPalRedirect) {
        return;
      }

      const authError = searchParams.get('error');
      if (authError) {
        console.error('OAuth Callback Error:', authError);
        window.history.replaceState({}, document.title, window.location.pathname);
        router.replace('/login?error=' + encodeURIComponent(authError));
        return;
      }

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

      // 2. Hanya proses jika token benar-benar format JWT valid (bukan ID transaksi PayPal)
      if (accessToken && isValidJwtFormat(accessToken)) {
        localStorage.setItem('token', accessToken);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
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
                  'User Themavia',
                email: userData.email || '',
                avatar_url: userData.avatar_url || null,
                role: userData.role || 'BUYER',
              },
              accessToken
            );
          }

          window.history.replaceState({}, document.title, '/dashboard');
          router.replace('/dashboard');
          router.refresh();
        } catch (err) {
          console.error('Gagal mengambil profil user setelah auth callback:', err);
          loginStore(
            {
              id: 'temp-id',
              username: 'User Themavia',
              email: '',
              role: 'BUYER',
            },
            accessToken
          );
          window.history.replaceState({}, document.title, '/dashboard');
          router.replace('/dashboard');
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