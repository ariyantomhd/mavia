// src/components/auth/SignInTabs.tsx
'use client';

import React, { useState } from 'react';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FormInput from './FormInput';
import SocialAuthButtons from './SocialAuthButtons';
import type { LoginPayload } from '@/types';

interface SignInTabsProps {
  onSuccess?: () => void;
  onSubmitAction?: (payload: LoginPayload) => Promise<void>;
}

export default function SignInTabs({ onSuccess, onSubmitAction }: SignInTabsProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      if (onSubmitAction) {
        await onSubmitAction({ email, password });
      }
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      let serverError = 'Failed to login. Please check your credentials.';
      if (error instanceof Error) serverError = error.message;
      setErrorMsg(serverError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-4 w-full">
      <FormInput label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" icon={Mail} />

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <Link href="/forgot-password" onClick={() => { if (onSuccess) onSuccess(); }} className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
            Forgot Password?
          </Link>
        </div>
        <FormInput label="" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" icon={Lock} isPasswordToggle />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
      </button>

      {errorMsg && <div className="text-red-500 text-sm font-semibold text-center mt-2">{errorMsg}</div>}

      <SocialAuthButtons label="Or continue with" />
    </form>
  );
}