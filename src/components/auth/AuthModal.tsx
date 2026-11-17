// src/components/auth/AuthModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import TermsCheckbox from '@/components/auth/TermsCheckbox';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultTab?: 'login' | 'signup' | 'signin';
}

export default function AuthModal({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  defaultTab = 'signin',
}: AuthModalProps) {
  const router = useRouter();
  const currentUser = useAppStore((state) => state.currentUser);

  const normalizeMode = (tab?: string): 'signin' | 'signup' =>
    tab === 'signup' ? 'signup' : 'signin';

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>(() =>
    normalizeMode(defaultTab),
  );
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  const isSignUp = mode === 'signup';
  // Pada mode signin, tombol Google & X langsung aktif tanpa perlu centang checkbox
  const isSocialDisabled = isSignUp ? !agreedToTerms : false;

  const handleClose = () => {
    setAgreedToTerms(false);
    if (externalOnClose) {
      externalOnClose();
    }
    setInternalIsOpen(false);
  };

  useEffect(() => {
    const handleOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode?: string }>;
      setMode(normalizeMode(customEvent.detail?.mode));
      setAgreedToTerms(false);
      setInternalIsOpen(true);
    };

    window.addEventListener('open-auth-modal', handleOpenModal as EventListener);
    return () => {
      window.removeEventListener('open-auth-modal', handleOpenModal as EventListener);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl shadow-indigo-500/15 animate-in zoom-in-95 duration-200">
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
                {isSignUp ? 'Create Your Account' : 'Sign in to Themavia'}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {isSignUp
                  ? 'Please review and accept our terms before signing up'
                  : 'Sign in quickly with your Google or X account'}
              </p>
            </div>

            {/* Kotak Scroll Terms & Checkbox (Hanya tampil pada mode Sign Up) */}
            {isSignUp && (
              <>
                <div className="mt-4 max-h-40 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-left text-xs text-slate-600">
                  <h3 className="font-bold text-slate-900">Terms of Service</h3>
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

                <div className="mt-4">
                  <TermsCheckbox
                    checked={agreedToTerms}
                    onChange={setAgreedToTerms}
                  />
                </div>
              </>
            )}

            {/* Status Bar + Tombol Google & X */}
            <div className="mt-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Continue With
                </span>
                {isSignUp && (
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors ${
                      agreedToTerms
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {agreedToTerms ? 'Unlocked • Ready' : 'Locked • Check box above'}
                  </span>
                )}
              </div>

              <SocialAuthButtons disabled={isSocialDisabled} mode={mode} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}