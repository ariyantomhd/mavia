// src/app/login/page.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
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
          className="group mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-all duration-200 hover:text-indigo-600"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Themavia</span>
        </Link>

        {/* Container Card dengan Efek Hover & Gradient Border Halus */}
        <div className="group relative rounded-3xl border border-slate-200/80 bg-white/95 p-7 sm:p-8 shadow-xl shadow-slate-200/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300/80 hover:shadow-2xl hover:shadow-indigo-500/15">
          {/* Garis Gradient Tipis di Bagian Atas Card */}
          <div className="absolute inset-x-8 top-0 h-0.5 bg-linear-to-r from-transparent via-purple-500/70 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Logo Maskot Themavia (public/logo.png) */}
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500/30" />
            <Image
              src="/logo.png"
              alt="Themavia Logo"
              width={64}
              height={64}
              priority
              className="relative z-10 h-14 w-14 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <div className="mt-4 text-center">
            <h1 className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
              Sign in to Themavia
            </h1>
            <p className="mt-1.5 text-xs text-slate-500">
              Choose your connected social account to continue
            </p>
          </div>

          {/* Tombol Sosial (Google & X) */}
          <div className="mt-6">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Continue With
              </span>
            </div>

            <SocialAuthButtons disabled={false} mode="signin" />
          </div>

          {/* Keterangan Pembuatan Akun Otomatis */}
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <p className="text-xs font-medium text-slate-500">
              New to Themavia? Your account is created automatically on first sign-in.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}