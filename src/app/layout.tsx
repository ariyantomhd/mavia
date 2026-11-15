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
    <html lang="id">
      <body>
        <QueryProvider>
          {/* Auth Handler */}
          <AuthHandler />

          {/* Global Auth Modal */}
          <AuthModal />

          {/* Global Session Expired Modal */}
          <SessionExpiredModal />

          {/* Global Navbar */}
          <Navbar />

          {/* Main Content - Background dikelola terpusat via globals.css */}
          <main className="flex-1 min-h-screen">
            {children}
          </main>

          {/* Global Footer */}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}