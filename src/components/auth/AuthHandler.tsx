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

      const hash = window.location.hash;
      const search = window.location.search;

      let accessToken: string | null = null;
      let refreshToken: string | null = null;

      // 1. Tangkap token dari URL Hash (#access_token=...) standar Supabase
      if (hash && hash.includes('access_token')) {
        const params = new URLSearchParams(hash.replace('#', '?'));
        accessToken = params.get('access_token');
        refreshToken = params.get('refresh_token');
      } 
      // 2. Fallback tangkap dari Query Params (?access_token=...) jika ada
      else if (search && search.includes('access_token')) {
        const params = new URLSearchParams(search);
        accessToken = params.get('access_token');
        refreshToken = params.get('refresh_token');
      }

      if (accessToken) {
        // Gunakan key 'token' agar sinkron dengan useAppStore.ts & local storage app
        localStorage.setItem('token', accessToken);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }

        try {
          // Ambil profil user terbaru dari backend
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

          // Bersihkan hash dari URL agar bersih, lalu lempar ke dashboard/home
          window.history.replaceState({}, document.title, window.location.pathname);
          router.replace('/?verified=true');
        } catch (err) {
          console.error("Gagal mengambil profil user setelah auth callback:", err);
          // Fallback jika fetch gagal tapi token valid, simpan minimal data session
          loginStore(
            {
              id: 'temp-id',
              username: 'User Themavia',
              email: '',
              role: 'BUYER',
            },
            accessToken
          );
          router.replace('/?verified=true');
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