// src/app/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserDashboardData } from '@/types/dashboard';
import { apiDashboard } from '@/services/apiDashboard';
import { useAppStore } from '@/store/useAppStore';

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

// Import komponen tab yang sudah dipecah
import { OverviewTab } from '@/components/dashboard/tabs/OverviewTab';
import { MyOrdersTab } from '@/components/dashboard/tabs/MyOrdersTab';
import { DownloadsTab } from '@/components/dashboard/tabs/DownloadsTab';
import { WishlistTab } from '@/components/dashboard/tabs/WishlistTab';
import { SettingsTab } from '@/components/dashboard/tabs/SettingsTab';

export default function DashboardPage() {
  const router = useRouter();
  const logout = useAppStore((state) => state.logout);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [dashboardData, setDashboardData] = useState<UserDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const initDashboard = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      if (!token) {
        logout();
        router.replace('/');
        return;
      }

      try {
        setLoading(true);
        const response = await apiDashboard.getDashboardData();

        if (response.success && response.data) {
          setDashboardData(response.data);
          setLoading(false);
        } else {
          localStorage.removeItem('token');
          logout();
          router.replace('/');
        }
      } catch (error: unknown) {
        const remainingToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const errObj = error as { message?: string };
        const message = errObj?.message || 'Server error occurred.';

        if (
          !remainingToken ||
          message.toLowerCase().includes('unauthorized') ||
          message.toLowerCase().includes('token')
        ) {
          localStorage.removeItem('token');
          logout();
          router.replace('/');
          return;
        }

        setErrorMessage(message);
        setLoading(false);
      }
    };

    initDashboard();
  }, [router, logout]);

  // Loading State
  if (loading || (!dashboardData && !errorMessage)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium text-sm">Verifying THEMAVIA Session...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border border-red-200 p-8 rounded-2xl shadow-sm text-center max-w-md">
          <p className="text-red-600 font-semibold mb-4 text-sm">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition shadow-sm cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const user = dashboardData?.user;
  const stats = dashboardData?.stats;
  const recentOrders = dashboardData?.recent_orders || [];

  return (
    // Dihapus bg-slate-50 agar memakai warna global
    <div className="min-h-screen text-slate-900 flex flex-col md:flex-row">
      <DashboardSidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      <main className="flex-1 py-8 px-6 lg:px-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <DashboardHeader user={user} />

          {/* Render Komponen Berdasarkan Tab Aktif */}
          {activeTab === 'dashboard' && <OverviewTab stats={stats} recentOrders={recentOrders} />}
          {activeTab === 'orders' && <MyOrdersTab orders={recentOrders} />}
          {activeTab === 'downloads' && <DownloadsTab orders={recentOrders} />}
          {activeTab === 'wishlist' && <WishlistTab />}
          {/* user || undefined memastikan tidak ada error null */}
          {activeTab === 'settings' && <SettingsTab user={user || undefined} />}

        </div>
      </main>
    </div>
  );
}