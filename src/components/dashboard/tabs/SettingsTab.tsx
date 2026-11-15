import React from 'react';
import { Settings } from 'lucide-react';
import { DashboardUser } from '@/types/dashboard';

interface SettingsTabProps {
  user?: DashboardUser;
}

export function SettingsTab({ user }: SettingsTabProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-in fade-in space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-600" />
          <span>Account Settings</span>
        </h2>
        <p className="text-xs text-slate-500">
          Manage your personal account credentials and profile details.
        </p>
      </div>

      <div className="space-y-4 max-w-xl">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
            Username
          </label>
          <input
            type="text"
            defaultValue={user?.username || ''}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
            readOnly
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            defaultValue={user?.email || ''}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
            readOnly
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
            Account Status
          </label>
          <input
            type="text"
            defaultValue={user?.status || ''}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 uppercase focus:outline-none"
            readOnly
          />
        </div>
        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between items-center">
          <span>User ID: {user?.id}</span>
          <span>
            Member Since:{' '}
            {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
          </span>
        </div>
      </div>
    </div>
  );
}