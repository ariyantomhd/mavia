// src/components/auth/PasswordStrengthMeter.tsx
'use client';

import React from 'react';

interface PasswordStrengthMeterProps {
  password?: string;
}

export default function PasswordStrengthMeter({ password = '' }: PasswordStrengthMeterProps) {
  const calculateStrength = (pass: string): number => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length >= 8) score += 1;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 1;
    if (/\d/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const score = calculateStrength(password);

  const getStrengthConfig = (strength: number) => {
    switch (strength) {
      case 1: return { label: 'Weak', color: 'bg-red-500', textColor: 'text-red-500' };
      case 2: return { label: 'Fair', color: 'bg-amber-500', textColor: 'text-amber-500' };
      case 3: return { label: 'Good', color: 'bg-blue-500', textColor: 'text-blue-500' };
      case 4: return { label: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-500' };
      default: return { label: '', color: 'bg-slate-200', textColor: 'text-slate-400' };
    }
  };

  const config = getStrengthConfig(score);
  if (!password) return null;

  return (
    <div className="mt-2 w-full flex flex-col gap-1.5">
      <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-full rounded-full transition-all duration-300 ${score >= level ? config.color : 'bg-slate-200'}`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center text-[11px] font-semibold">
        <span className="text-slate-500">Password strength:</span>
        <span className={`transition-colors duration-300 ${config.textColor}`}>{config.label}</span>
      </div>
    </div>
  );
}