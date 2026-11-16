// src/app/signup/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import TermsCheckbox from '@/components/auth/TermsCheckbox';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';

export default function SignUpPage() {
  const router = useRouter();
  const currentUser = useAppStore((state) => state.currentUser);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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
              Create Your Account
            </h1>
            <p className="mt-1.5 text-xs text-slate-500">
              Please review and accept our terms before signing up
            </p>
          </div>

          {/* Kotak Scroll Terms of Service */}
          <div className="mt-5 max-h-44 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-left text-xs text-slate-600">
            <h2 className="font-bold text-slate-900">Terms of Service</h2>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Last Updated: November 16, 2026
            </p>
            <p className="mt-2.5 leading-relaxed">
              Welcome to <strong className="text-slate-900">Themavia</strong>.
              By accessing or using our services, you agree to be bound by the
              following terms:
            </p>
            <ol className="mt-2 list-decimal space-y-2 pl-4 leading-relaxed">
              <li>
                <strong className="text-slate-900">Use of Service:</strong> Use
                this service only for lawful purposes and in compliance with
                applicable laws.
              </li>
              <li>
                <strong className="text-slate-900">User Accounts:</strong> You
                are responsible for safeguarding your connected social account
                credentials and all activities under your account.
              </li>
              <li>
                <strong className="text-slate-900">Digital Licenses:</strong>{' '}
                Purchased templates, APIs, and source codes are granted under
                verified commercial licenses and may not be redistributed as
                competing assets.
              </li>
              <li>
                <strong className="text-slate-900">Refund Policy:</strong> Due
                to the instant downloadable nature of digital source code,
                completed orders are non-refundable once files or license keys
                are accessed.
              </li>
            </ol>
          </div>

          {/* Checkbox Persetujuan */}
          <div className="mt-4">
            <TermsCheckbox checked={agreedToTerms} onChange={setAgreedToTerms} />
          </div>

          {/* Status Bar + Grid 2x2 Tombol Sosial */}
          <div className="mt-5">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Continue With
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors ${
                  agreedToTerms
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {agreedToTerms ? 'Unlocked • Ready' : 'Locked • Check box above'}
              </span>
            </div>

            <SocialAuthButtons disabled={!agreedToTerms} mode="signup" />
          </div>

          {/* Link pindah ke halaman Login */}
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <p className="text-xs font-medium text-slate-500">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-bold text-indigo-600 underline decoration-indigo-500/40 underline-offset-4 transition-colors hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}