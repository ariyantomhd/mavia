// src/components/auth/SessionExpiredModal.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { ShieldAlert, LogIn, X } from 'lucide-react';

export default function SessionExpiredModal() {
  const router = useRouter();
  const isSessionExpired = useAppStore((state) => state.isSessionExpired);
  const currentUser = useAppStore((state) => state.currentUser);
  const logout = useAppStore((state) => state.logout);
  const setSessionExpired = useAppStore((state) => state.setSessionExpired);

  // Silently reset expired flag if there is no active user in state
  useEffect(() => {
    if (!isSessionExpired) return;
    if (!currentUser) {
      logout();
      setSessionExpired(false);
    }
  }, [isSessionExpired, currentUser, logout, setSessionExpired]);

  if (!isSessionExpired) return null;

  const handleSignInAgain = () => {
    logout();
    setSessionExpired(false);
    router.replace('/?login=true');
  };

  const handleContinueAsGuest = () => {
    logout();
    setSessionExpired(false);
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-white border border-slate-200 shadow-2xl shadow-indigo-500/20 rounded-3xl p-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
        <button
          type="button"
          onClick={handleContinueAsGuest}
          aria-label="Close session expired notice"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Session Expired
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Your session has expired due to inactivity or security policies. Please sign in again to continue your activity.
          </p>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleSignInAgain}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In Again</span>
          </button>

          <button
            type="button"
            onClick={handleContinueAsGuest}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Continue Browsing as Guest
          </button>
        </div>
      </div>
    </div>
  );
}