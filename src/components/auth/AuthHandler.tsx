// src/components/auth/AuthHandler.tsx
'use client';

import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { apiAuth } from '@/services/apiAuth';
import type { User as UserType } from '@/types';

function AuthHandlerContent() {
  const router = useRouter();
  const loginStore = useAppStore((state) => state.login);

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (typeof window === 'undefined') return;

      const searchParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;

      let accessToken = searchParams.get('access_token');
      let refreshToken = searchParams.get('refresh_token');

      // Fallback jika token dikirim via Hash oleh backend/provider
      if (!accessToken && hash && hash.includes('access_token')) {
        const hashParams = new URLSearchParams(hash.replace('#', '?'));
        accessToken = hashParams.get('access_token');
        refreshToken = hashParams.get('refresh_token');
      }

      if (accessToken) {
        // Simpan token ke localStorage aplikasi
        localStorage.setItem('token', accessToken);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }

        try {
          // Ambil profil user terbaru dari backend Express Anda
          const response = await apiAuth.getMe(); 
          const responseData = response as unknown as { data?: UserType };
          const userData = responseData?.data || (response as unknown as UserType);

          if (userData && userData.id) {
            loginStore(
              {
                id: userData.id,
                username: userData.username || '',
                email: userData.email || '',
                avatar_url: userData.avatar_url || null,
                role: userData.role || 'BUYER',
              },
              accessToken
            );
          }

          // Bersihkan URL dari parameter token agar bersih, lalu refresh
          window.history.replaceState({}, document.title, window.location.pathname);
          router.replace('/');
          router.refresh();
        } catch (err) {
          console.error("Gagal mengambil profil user setelah auth callback:", err);
          // Fallback minimal session jika fetch profil gagal
          loginStore(
            {
              id: 'temp-id',
              username: 'User Themavia',
              email: '',
              role: 'BUYER',
            },
            accessToken
          );
          router.replace('/');
          router.refresh();
        }
      }
    };

    handleAuthCallback();
  }, [router, loginStore]);

  return null;
}

export default function AuthHandler() {
  return (
    <Suspense fallback={null}>
      <AuthHandlerContent />
    </Suspense>
  );
}