// src/app/custom-development/page.tsx
import React from 'react';
import CustomDevForm from '@/components/CustomDevForm';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Zap, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Custom Development | Themavia Marketplace',
  description: 'Request custom software, dApps, mobile apps, or dedicated web platform architecture tailored specifically for your business.',
};

export default function CustomDevelopmentPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Back Button & Breadcrumb */}
        <div>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Intro Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Custom <span className="text-teal-600">Development</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Have a unique product idea or need advanced system integration? Themavia&apos;s architects and full-stack developers are ready to build your dream digital solution from scratch to launch.
          </p>

          {/* 3 Core Highlights dengan Kombinasi Gradient Pastel & Hover Effect */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <div className="bg-linear-to-br from-purple-50 via-white to-indigo-50 border border-purple-100 p-4 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-600 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Modern Tech Stack</div>
                <div className="text-[11px] text-slate-500">Next.js, Web3, Supabase</div>
              </div>
            </div>

            <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Secure & Scalable</div>
                <div className="text-[11px] text-slate-500">Rate limited & robust DB</div>
              </div>
            </div>

            <div className="bg-linear-to-br from-amber-50 via-white to-orange-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-600 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Fast Delivery</div>
                <div className="text-[11px] text-slate-500">On time & well-structured</div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Development Request Form */}
        <CustomDevForm />

      </div>
    </main>
  );
}