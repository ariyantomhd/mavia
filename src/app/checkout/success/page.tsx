// src/app/checkout/success/page.tsx
'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { paymentAPI } from '@/services/paymentAPI';
import { apiCart } from '@/services/apicart';
import { useAppStore } from '@/store/useAppStore';

// Definisikan tipe untuk error dari API
interface ApiErrorResponse {
  message?: string;
}

// Definisikan tipe untuk parameter yang dibutuhkan endpoint capture
interface CapturePayload {
  order_id: string;
  token: string;
}

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setCartCount = useAppStore((state) => state.setCartCount);
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('Sedang memproses dan memverifikasi pembayaran Anda...');
  
  // Mencegah API terpanggil 2 kali karena Strict Mode React
  const hasCaptured = useRef<boolean>(false);

  useEffect(() => {
    const capturePayment = async () => {
      if (hasCaptured.current) return;
      hasCaptured.current = true;

      try {
        // 1. Ambil token dari URL yang dikembalikan oleh PayPal
        const token = searchParams.get('token');
        
        // 2. Ambil ID order internal dari localStorage
        const orderId = localStorage.getItem('pending_order_id');

        if (!token || !orderId) {
          throw new Error('Data sesi pembayaran tidak lengkap atau sudah kedaluwarsa.');
        }

        // 3. Siapkan payload yang strict secara tipe
        const payload: CapturePayload = {
          order_id: orderId,
          token: token,
        };

        // 4. Tembak backend Express untuk capture pembayaran PayPal
        const response = await paymentAPI.capturePayPalOrder(
          payload as unknown as Parameters<typeof paymentAPI.capturePayPalOrder>[0]
        );

        if (response && response.success) {
          setStatus('success');
          setMessage('Pembayaran berhasil! Lisensi digital Anda telah diterbitkan.');

          // 5. Reset badge cart count di Navbar menjadi 0 & bersihkan sisa sesi
          setCartCount(0);
          localStorage.removeItem('pending_order_id');
          apiCart.clearCart().catch(() => {});
        } else {
          throw new Error(response?.message || 'Gagal memverifikasi pencairan dana.');
        }
      } catch (error: unknown) {
        setStatus('error');
        
        let errMsg = 'Terjadi kesalahan saat mengonfirmasi pembayaran.';
        if (error instanceof Error) {
          errMsg = error.message;
        } else if (typeof error === 'object' && error !== null) {
          const apiError = error as ApiErrorResponse;
          if (apiError.message) {
            errMsg = apiError.message;
          }
        }
        
        setMessage(errMsg);
      }
    };

    capturePayment();
  }, [searchParams, setCartCount]);

  return (
    <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-2xl text-center border border-slate-100 relative overflow-hidden">
      {status === 'loading' && (
        <div className="space-y-5">
          <div className="w-16 h-16 border-4 border-[#FFC439] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-bold text-slate-800">Menyelesaikan Pesanan...</h2>
          <p className="text-slate-500 text-sm">{message}</p>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-5 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-800">Terima Kasih!</h2>
          <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 w-full bg-[#003087] hover:bg-[#001f5c] text-white font-bold py-3.5 rounded-xl transition shadow-lg cursor-pointer"
          >
            Akses Aset Digital Saya
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-5 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-800">Pembayaran Gagal</h2>
          <p className="text-red-500 font-medium text-sm bg-red-50 p-3 rounded-lg border border-red-100">{message}</p>
          <button
            onClick={() => router.push('/cart')}
            className="mt-4 w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3.5 rounded-xl transition cursor-pointer"
          >
            Kembali ke Keranjang
          </button>
        </div>
      )}
    </div>
  );
}

// Komponen utama yang dibungkus Suspense agar build Next.js optimal
export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium text-sm">Menyiapkan halaman...</p>
        </div>
      }>
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}