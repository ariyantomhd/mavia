import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { RecentOrdersTable } from '@/components/dashboard/RecentOrdersTable';
import { RecentOrder } from '@/types/dashboard';

interface MyOrdersTabProps {
  orders: RecentOrder[];
}

export function MyOrdersTab({ orders }: MyOrdersTabProps) {
  return (
    <div className="animate-in fade-in space-y-6">
      <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
        <ShoppingBag className="w-5 h-5" />
        <span>Order Management Portal</span>
      </div>
      <RecentOrdersTable
        orders={orders}
        title="My Complete Order History"
        subtitle="Track all your digital asset purchases, payment statuses, and invoice records."
      />
    </div>
  );
}