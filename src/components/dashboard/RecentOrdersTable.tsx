// src/components/dashboard/RecentOrdersTable.tsx
import React from 'react';
import { RecentOrder } from '@/types/dashboard';

interface Props {
  orders: RecentOrder[];
  title: string;
  subtitle: string;
}

export function RecentOrdersTable({ orders, title, subtitle }: Props) {
  return (
    <div className="bg-white/45 backdrop-blur-2xl border border-white/70 ring-1 ring-slate-900/5 rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.06)] overflow-hidden">
      <div className="p-6 border-b border-white/60 bg-white/25 backdrop-blur-md">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-600 mt-1">{subtitle}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/30 text-[10px] font-bold text-slate-600 uppercase tracking-wider border-b border-white/60">
              <th className="p-4 font-bold">Invoice</th>
              <th className="p-4 font-bold">Product</th>
              <th className="p-4 font-bold">Total</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/40 transition-colors">
                <td className="p-4 text-xs font-mono text-indigo-600 font-bold">
                  {order.order_number}
                </td>
                <td className="p-4 text-sm font-semibold text-slate-800">
                  {order.product_name}
                </td>
                <td className="p-4 text-sm font-bold text-slate-900">
                  ${order.total_amount.toFixed(2)}
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-emerald-300/60 bg-emerald-500/15 backdrop-blur-md text-emerald-800">
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-xs text-slate-600 font-medium">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 text-xs">
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}