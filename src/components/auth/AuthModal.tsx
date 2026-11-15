// src/components/auth/AuthModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { apiAuth } from '@/services/apiAuth';
import SignInTabs from '@/components/auth/SignInTabs';
import RegisterTabs from '@/components/auth/RegisterTabs';
import type { LoginPayload, RegisterPayload } from '@/types';

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultTab?: 'login' | 'signup';
}

export default function AuthModal({ 
  isOpen: externalIsOpen, 
  onClose: externalOnClose, 
  defaultTab = 'login' 
}: AuthModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);
  
  // Global state & router
  const loginStore = useAppStore((state) => state.login);
  const router = useRouter();

  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    }
    setInternalIsOpen(false);
  };

  useEffect(() => {
    const handleOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.mode) {
        const tab = customEvent.detail.mode === 'signin' ? 'login' : 'signup';
        setActiveTab(tab);
      }
      setInternalIsOpen(true);
    };

    window.addEventListener('open-auth-modal', handleOpenModal as EventListener);
    return () => {
      window.removeEventListener('open-auth-modal', handleOpenModal as EventListener);
    };
  }, []);

  // Parent Function: Handle Login API & Token Storage
  const handleParentLogin = async (payload: LoginPayload) => {
    const response = await apiAuth.login(payload);
    
    const resRecord = response as unknown as Record<string, unknown>;
    const resData = (resRecord?.data as Record<string, unknown>) || resRecord;
    const userData = (resData?.user as Record<string, unknown>) || resData;
    const sessionObj = resData?.session as Record<string, unknown> | undefined;

    const accessToken =
      (sessionObj?.access_token as string) ||
      (resData?.access_token as string) ||
      (resData?.token as string) ||
      (resRecord?.token as string) ||
      (resRecord?.access_token as string);

    const userId = (userData?.id as string) || (userData?._id as string) || '';
    const userEmail = (userData?.email as string) || payload.email;
    const username = (userData?.username as string) || (userData?.full_name as string) || payload.email.split('@')[0];
    const avatarUrl = (userData?.avatar_url as string | null) || null;
    const role = (userData?.role as string) || 'BUYER';

    if (accessToken && typeof window !== 'undefined') {
      localStorage.setItem('token', accessToken);
    }

    loginStore({
      id: userId,
      username,
      email: userEmail,
      avatar_url: avatarUrl,
      role,
    }, accessToken || '');

    handleClose();
    router.push('/');
    router.refresh();
  };

  // Parent Function: Handle Register API
  const handleParentRegister = async (payload: RegisterPayload) => {
    // Proses registrasi, lempar ke halaman /verify
    await apiAuth.register(payload);
    handleClose();
    router.push('/verify');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 shadow-2xl shadow-indigo-500/15 rounded-3xl p-8 sm:p-10 transition-all duration-500 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-block group mb-2">
            <div className="relative w-12 h-12 mx-auto overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Image src="/logo.png" alt="Themavia Logo" fill className="object-contain drop-shadow-sm" priority />
            </div>
            <h1 className="text-xl font-black bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Themavia
            </h1>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-2xl mt-4">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'signup' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {activeTab === 'login' ? (
          <div>
            {/* Pass parent login handler to SignInTabs */}
            <SignInTabs onSubmitAction={handleParentLogin} onSuccess={handleClose} />
            <div className="text-center mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                Don&apos;t have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors underline decoration-indigo-500/40 underline-offset-4 cursor-pointer"
                >
                  Sign up now
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Pass parent register handler to RegisterTabs */}
            <RegisterTabs onSubmitAction={handleParentRegister} onSuccess={handleClose} />
            <div className="text-center mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors underline decoration-indigo-500/40 underline-offset-4 cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}