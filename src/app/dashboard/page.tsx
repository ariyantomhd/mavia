// src/app/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserDashboardData } from '@/types/dashboard';
import { apiDashboard } from '@/services/apiDashboard';
import { useAppStore } from '@/store/useAppStore';

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

// Tab components
import { OverviewTab } from '@/components/dashboard/tabs/OverviewTab';
import { MyOrdersTab } from '@/components/dashboard/tabs/MyOrdersTab';
import { DownloadsTab } from '@/components/dashboard/tabs/DownloadsTab';
import { WishlistTab } from '@/components/dashboard/tabs/WishlistTab';
import { SettingsTab } from '@/components/dashboard/tabs/SettingsTab';

export default function DashboardPage() {
  const router = useRouter();
  const logout = useAppStore((state) => state.logout);
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [dashboardData, setDashboardData] = useState<UserDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        setLoading(true);
        // Verify active HttpOnly cookie session directly against backend
        const response = await apiDashboard.getDashboardData();

        if (response.success && response.data) {
          setDashboardData(response.data);

          // Sync authenticated user profile into global Zustand store
          if (response.data.user) {
            setCurrentUser({
              id: response.data.user.id,
              username: response.data.user.username,
              email: response.data.user.email,
              role: response.data.user.role,
              avatar_url: response.data.user.avatar_url,
            });
          }

          // Clean up ?auth=success query parameter after OAuth redirect
          if (
            typeof window !== 'undefined' &&
            window.location.search.includes('auth=success')
          ) {
            window.history.replaceState({}, '', '/dashboard');
          }

          setLoading(false);
        } else {
          logout();
          router.replace('/?login=true');
        }
      } catch (error: unknown) {
        const errObj = error as { status?: number; message?: string };
        const message = errObj?.message || 'Server error occurred.';

        if (
          errObj?.status === 401 ||
          message.toLowerCase().includes('unauthorized') ||
          message.toLowerCase().includes('authentication') ||
          message.toLowerCase().includes('session')
        ) {
          logout();
          router.replace('/?login=true');
          return;
        }

        setErrorMessage(message);
        setLoading(false);
      }
    };

    initDashboard();
  }, [router, logout, setCurrentUser]);

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
            type="button"
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
    <div className="min-h-screen text-slate-900 flex flex-col md:flex-row">
      <DashboardSidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      <main className="flex-1 py-8 px-6 lg:px-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <DashboardHeader user={user} />

          {/* Render Active Tab Content */}
          {activeTab === 'dashboard' && <OverviewTab stats={stats} recentOrders={recentOrders} />}
          {activeTab === 'orders' && <MyOrdersTab orders={recentOrders} />}
          {activeTab === 'downloads' && <DownloadsTab orders={recentOrders} />}
          {activeTab === 'wishlist' && <WishlistTab />}
          {activeTab === 'settings' && <SettingsTab user={user || undefined} />}
        </div>
      </main>
    </div>
  );
}