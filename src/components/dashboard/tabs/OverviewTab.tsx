import React from 'react';
import { UserStatsGrid } from '@/components/dashboard/UserStatsGrid';
import { RecentOrdersTable } from '@/components/dashboard/RecentOrdersTable';
import { DashboardStats, RecentOrder } from '@/types/dashboard';

interface OverviewTabProps {
  stats?: DashboardStats;
  recentOrders: RecentOrder[];
}

export function OverviewTab({ stats, recentOrders }: OverviewTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in">
      {stats && <UserStatsGrid stats={stats} />}
      <RecentOrdersTable 
        orders={recentOrders} 
        title="Recent Orders" 
        subtitle="Overview of your latest transactions and software licenses." 
      />
    </div>
  );
}