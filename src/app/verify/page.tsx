// src/app/verify/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiAuth } from '@/services/apiAuth';
import { MailCheck, Loader2, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('Verifying account token with the server...');

  useEffect(() => {
    async function verifyTokenWithBackend() {
      try {
        const token = searchParams.get('token') || searchParams.get('token_hash') || new URLSearchParams(window.location.search).get('token');

        if (!token) {
          setStatus('loading');
          setMessage('Please check your email for confirmation link to activate your account.');
          return;
        }

        const response = await apiAuth.confirmation(token);

        if (response && response.success) {
          setStatus('success');
          setMessage('Email successfully verified! Redirecting to dashboard...');

          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        } else {
          setStatus('error');
          setMessage(response?.message || 'Verification failed.');
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while contacting the server.';
        setStatus('error');
        setMessage(errorMessage);
      }
    }

    verifyTokenWithBackend();
  }, [router, searchParams]);

  return (
    <div className="max-w-md w-full bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-xl shadow-indigo-500/10 text-center space-y-6">
      {status === 'loading' && (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <MailCheck className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Please check your email for confirmation
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {message}
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Verification Successful!
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {message}
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <XCircle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Verification Failed
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {message}
          </p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Suspense fallback={
        <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-bold">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
          <span>Loading verification page...</span>
        </div>
      }>
        <VerifyContent />
      </Suspense>
    </div>
  );
}