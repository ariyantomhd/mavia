// src/app/login/page.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';

export default function LoginPage() {
  const router = useRouter();
  const currentUser = useAppStore((state) => state.currentUser);

  // Jika user sudah login, langsung arahkan ke dashboard
  useEffect(() => {
    if (currentUser) {
      router.replace('/dashboard');
    }
  }, [currentUser, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Themavia</span>
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xl shadow-slate-200/50">
          {/* Ikon Shield */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div className="mt-4 text-center">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              Sign in to Themavia
            </h1>
            <p className="mt-1.5 text-xs text-slate-500">
              Choose your connected social account to continue
            </p>
          </div>

          {/* Grid 2x2 Tombol Sosial (Langsung Aktif) */}
          <div className="mt-6">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Continue With
              </span>
            </div>

            <SocialAuthButtons disabled={false} mode="signin" />
          </div>

          {/* Link pindah ke halaman Sign Up */}
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <p className="text-xs font-medium text-slate-500">
              Don&apos;t have an account yet?{' '}
              <Link
                href="/signup"
                className="font-bold text-indigo-600 underline decoration-indigo-500/40 underline-offset-4 transition-colors hover:text-indigo-500"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}