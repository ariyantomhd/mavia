// src/components/auth/AuthHandler.tsx
'use client';

import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { apiAuth } from '@/services/apiAuth';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { User as UserType } from '@/types';

function AuthHandlerContent() {
  const router = useRouter();
  const loginStore = useAppStore((state) => state.login);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (typeof window === 'undefined') return;

      let accessToken: string | null = null;
      let refreshToken: string | null = null;

      // 1. Prioritas Utama: Ambil sesi langsung dari Supabase Client (Menangkap token OAuth redirect)
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && session.access_token) {
        accessToken = session.access_token;
        refreshToken = session.refresh_token;
      } else {
        // 2. Fallback: Tangkap dari URL Hash (#access_token=...) standar Supabase
        const hash = window.location.hash;
        const search = window.location.search;

        if (hash && hash.includes('access_token')) {
          const params = new URLSearchParams(hash.replace('#', '?'));
          accessToken = params.get('access_token');
          refreshToken = params.get('refresh_token');
        } 
        // 3. Fallback terakhir: Tangkap dari Query Params (?access_token=...) jika ada
        else if (search && search.includes('access_token')) {
          const params = new URLSearchParams(search);
          accessToken = params.get('access_token');
          refreshToken = params.get('refresh_token');
        }
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

          // Bersihkan URL dari sampah parameter token, lalu refresh halaman
          window.history.replaceState({}, document.title, window.location.pathname);
          router.replace('/');
          router.refresh();
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
          router.replace('/');
          router.refresh();
        }
      }
    };

    handleAuthCallback();
  }, [router, loginStore, supabase]);

  return null;
}

export default function AuthHandler() {
  return (
    <Suspense fallback={null}>
      <AuthHandlerContent />
    </Suspense>
  );
}