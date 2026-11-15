// src/components/cart/LoadingModal.tsx
import React from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';

interface LoadingModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
}

export default function LoadingModal({
  isOpen,
  title = 'Memproses Pembayaran...',
  message = 'Mengarahkan ke gateway pembayaran resmi PayPal Checkout (Sandbox Mode)...'
}: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-5">
        
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-amber-500/25 animate-ping" />
          <div className="relative w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
            <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-base font-black text-slate-900 tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
          <ShieldCheck size={14} />
          <span>Koneksi Terenkripsi 256-bit SSL</span>
        </div>

      </div>
    </div>
  );
}