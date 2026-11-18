// src/components/auth/AuthModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AuthModal({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
}: AuthModalProps) {
  const router = useRouter();
  const currentUser = useAppStore((state) => state.currentUser);

  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    }
    setInternalIsOpen(false);
  };

  useEffect(() => {
    const handleOpenModal = () => {
      setInternalIsOpen(true);
    };

    window.addEventListener('open-auth-modal', handleOpenModal);
    return () => {
      window.removeEventListener('open-auth-modal', handleOpenModal);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-md overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl shadow-indigo-500/15 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Ikon Shield di Tengah Atas */}
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <ShieldCheck className="h-6 w-6" />
        </div>

        {/* Jika user sudah login */}
        {currentUser ? (
          <div className="mt-4 text-center space-y-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Already Signed In
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                You are already signed in as{' '}
                <strong className="text-slate-900">
                  {currentUser.email || currentUser.username}
                </strong>
                .
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                handleClose();
                router.push('/dashboard');
              }}
              className="w-full cursor-pointer rounded-xl bg-slate-900 py-3 px-4 text-xs font-bold text-white transition-colors hover:bg-slate-800"
            >
              Go to User Dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="mt-3 text-center">
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Sign in to Themavia
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Choose your connected social account to continue
              </p>
            </div>

            {/* Tombol Google & X */}
            <div className="mt-6">
              <div className="mb-2.5">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Continue With
                </span>
              </div>

              <SocialAuthButtons disabled={false} mode="signin" />
            </div>

            {/* Keterangan Otomatis Buat Akun & Link Legal */}
            <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-center">
              <p className="text-[11px] font-medium text-slate-500">
                New to Themavia? Your account is created automatically on first sign-in.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-400">
                By continuing, you agree to our{' '}
                <Link
                  href="/terms"
                  onClick={handleClose}
                  className="font-medium text-slate-600 underline hover:text-indigo-600"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  onClick={handleClose}
                  className="font-medium text-slate-600 underline hover:text-indigo-600"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}