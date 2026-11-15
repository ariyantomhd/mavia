import React from 'react';
import { Download } from 'lucide-react';
import { RecentOrder } from '@/types/dashboard';

interface DownloadsTabProps {
  orders: RecentOrder[];
}

export function DownloadsTab({ orders }: DownloadsTabProps) {
  const completedOrders = orders.filter(o => o.status === 'COMPLETED');

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-in fade-in space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-600" />
            <span>Digital Downloads & Licenses</span>
          </h2>
          <p className="text-xs text-slate-500">
            Access official ZIP source files and activation keys for your purchased products.
          </p>
        </div>
      </div>

      {completedOrders.length === 0 ? (
        <div className="border border-dashed border-slate-300 rounded-xl p-12 text-center text-slate-500 text-xs bg-slate-50">
          No downloadable files available yet. Complete an order to access digital assets.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {completedOrders.map((order) => (
            <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-800">{order.product_name}</h4>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">Invoice: {order.order_number}</p>
              </div>
              <button
                onClick={() => alert(`Generating secure download link for ${order.product_name}...`)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ZIP & License</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}