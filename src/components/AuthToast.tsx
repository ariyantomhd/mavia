// src/components/ui/AuthToast.tsx
"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, LogIn } from "lucide-react";

interface AuthToastProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export default function AuthToast({ isVisible, onClose, onLoginClick }: AuthToastProps) {
  // Otomatis menutup notifikasi setelah 5 detik
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-start p-4 bg-white border border-rose-200 rounded-xl shadow-xl max-w-sm w-full"
        >
          <div className="shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5 text-rose-500" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-bold text-slate-900">
              Akses Ditolak
            </p>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Silakan login terlebih dahulu untuk menyimpan aset digital ini ke dalam keranjang Anda.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  onClose();
                  onLoginClick();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg transition-colors"
              >
                <LogIn className="w-3 h-3" />
                Login Sekarang
              </button>
            </div>
          </div>
          <div className="ml-4 shrink-0 flex">
            <button
              onClick={onClose}
              className="inline-flex text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}