// src/app/checkout/success/page.tsx
'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { paymentAPI } from '@/services/paymentAPI';
import { apiCart } from '@/services/apicart';
import { useAppStore } from '@/store/useAppStore';

// Define type for API error response
interface ApiErrorResponse {
  message?: string;
}

// Define type for payment capture payload
interface CapturePayload {
  order_id: string;
  token: string;
}

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setCartCount = useAppStore((state) => state.setCartCount);
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('Processing and verifying your secure payment...');
  
  // Prevent duplicate execution under React Strict Mode
  const hasCaptured = useRef<boolean>(false);

  useEffect(() => {
    const capturePayment = async () => {
      if (hasCaptured.current) return;
      hasCaptured.current = true;

      try {
        // 1. Retrieve token returned from PayPal
        const token = searchParams.get('token');
        
        // 2. Retrieve internal order ID from browser storage
        const orderId = localStorage.getItem('pending_order_id');

        if (!token || !orderId) {
          throw new Error('Payment session data is incomplete or has expired.');
        }

        // 3. Prepare strict capture payload
        const payload: CapturePayload = {
          order_id: orderId,
          token: token,
        };

        // 4. Request backend to capture PayPal payment
        const response = await paymentAPI.capturePayPalOrder(
          payload as unknown as Parameters<typeof paymentAPI.capturePayPalOrder>[0]
        );

        if (response && response.success) {
          setStatus('success');
          setMessage('Payment successful! Your digital license and assets have been issued.');

          // 5. Reset Navbar cart count to 0 & cleanup pending session
          setCartCount(0);
          localStorage.removeItem('pending_order_id');
          apiCart.clearCart().catch(() => {});
        } else {
          throw new Error(response?.message || 'Failed to verify transaction capture.');
        }
      } catch (error: unknown) {
        setStatus('error');
        
        let errMsg = 'An error occurred while confirming your payment.';
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
    <div className="bg-white/90 backdrop-blur-md max-w-md w-full p-8 rounded-3xl shadow-xl text-center border border-slate-200/80 relative overflow-hidden transition-all">
      {status === 'loading' && (
        <div className="space-y-5 py-6 animate-pulse">
          <div className="w-16 h-16 border-4 border-[#FFC439] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-extrabold text-slate-800">Finalizing Order...</h2>
          <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-5 py-2 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce duration-1000">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Thank You!</h2>
          <p className="text-slate-600 text-sm leading-relaxed">{message}</p>
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="mt-4 w-full bg-[#003087] hover:bg-[#001f5c] text-white font-extrabold py-3.5 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            Access My Digital Assets &rarr;
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-5 py-2 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Payment Failed</h2>
          <p className="text-rose-600 font-semibold text-xs sm:text-sm bg-rose-50 p-3.5 rounded-2xl border border-rose-200 leading-relaxed">
            {message}
          </p>
          <button
            type="button"
            onClick={() => router.push('/cart')}
            className="mt-4 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-6 rounded-2xl transition-all cursor-pointer"
          >
            Return to Cart
          </button>
        </div>
      )}
    </div>
  );
}

// Main page wrapper wrapped in Suspense for optimal Next.js rendering
export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-semibold text-sm">Preparing success page...</p>
        </div>
      }>
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}