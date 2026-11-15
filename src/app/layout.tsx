// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import AuthHandler from "@/components/auth/AuthHandler";
import AuthModal from "@/components/auth/AuthModal";
import SessionExpiredModal from "@/components/auth/SessionExpiredModal";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Themavia - Discover & Buy Top-Tier Source Code",
  description: "Accelerate your projects with high-quality scripts, mobile apps, and templates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
        <QueryProvider>
          {/* Global Auth Handler untuk menangkap token OAuth / Supabase redirect */}
          <AuthHandler />

          {/* Global Auth Modal */}
          <AuthModal />

          {/* Global Session Expired Modal */}
          <SessionExpiredModal />

          {/* Global Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Global Footer */}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
