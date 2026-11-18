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

export default function AuthToast({
  isVisible,
  onClose,
  onLoginClick,
}: AuthToastProps) {
  // Automatically dismiss notification after 5 seconds
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
          role="alert"
          initial={{ opacity: 0, y: 40, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 26,
            mass: 0.8,
          }}
          whileHover={{ scale: 1.02 }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-sm overflow-hidden rounded-2xl border border-rose-200/80 bg-white/95 p-4 shadow-2xl shadow-rose-500/15 backdrop-blur-md"
        >
          <div className="flex items-start">
            {/* Animated Alert Icon */}
            <motion.div
              initial={{ rotate: -15, scale: 0.7 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.08 }}
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500"
            >
              <AlertCircle className="h-4 w-4" />
            </motion.div>

            {/* Content */}
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-bold tracking-tight text-slate-900">
                Authentication Required
              </p>
              <p className="mt-1 text-xs leading-relaxed font-medium text-slate-500">
                Please sign in to save this digital asset to your cart and continue.
              </p>
              <div className="mt-3 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onClose();
                    onLoginClick();
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-linear-to-r from-rose-600 to-rose-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm shadow-rose-500/20 transition-all hover:from-rose-500 hover:to-rose-400"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Sign In Now
                </motion.button>
              </div>
            </div>

            {/* Close Button */}
            <div className="ml-3 flex shrink-0">
              <button
                type="button"
                aria-label="Close notification"
                onClick={onClose}
                className="inline-flex cursor-pointer rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 5-Second Auto-Dismiss Progress Bar */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 5, ease: "linear" }}
            style={{ transformOrigin: "left" }}
            className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-rose-500 to-amber-400"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
