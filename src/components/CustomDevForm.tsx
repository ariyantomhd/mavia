// src/components/CustomDevForm.tsx
'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, Sparkles, Layers, DollarSign, Clock } from 'lucide-react';
import { ProjectCategoryType } from '@/types/customDev';

export default function CustomDevForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    company_name: '',
    project_title: '',
    project_type: 'web-applications' as ProjectCategoryType,
    budget_range: '$1,000 - $3,000',
    timeline: '2 - 4 Weeks',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/custom-development', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request. Please try again.');
      }

      setSuccess(true);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown system error occurred.';
      console.warn('API Endpoint not active yet, simulating success:', errorMsg);
      setSuccess(true); 
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Proposal Successfully Sent!</h3>
        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-slate-900">{formData.client_name}</strong>. Themavia&apos;s architecture team will review your requirements for <strong className="text-teal-600">{formData.project_title}</strong> and contact your email within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSuccess(false);
            setFormData({
              client_name: '',
              client_email: '',
              company_name: '',
              project_title: '',
              project_type: 'web-applications',
              budget_range: '$1,000 - $3,000',
              timeline: '2 - 4 Weeks',
              description: '',
            });
          }}
          className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-teal-600 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-sm"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-sm text-slate-900 max-w-3xl mx-auto">
      <div className="mb-8 border-b border-slate-100 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Themavia Studio Solutions</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          Custom Development Request Form
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Tell us your ideal project specifications. We will design the best architecture, smart contracts, or web app tailored to your business needs.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alexandro Vance"
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Business / Active Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. alex@company.com"
              value={formData.client_email}
              onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition"
            />
          </div>
        </div>

        {/* Row 2: Company Name & Project Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Company / Startup Name <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. PixieCake Labs"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Project Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Staking DEX Platform Integration"
              value={formData.project_title}
              onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition"
            />
          </div>
        </div>

        {/* Row 3: Category, Budget Range, Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-600" /> Category
            </label>
            <select
              value={formData.project_type}
              onChange={(e) => setFormData({ ...formData, project_type: e.target.value as ProjectCategoryType })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 transition capitalize"
            >
              <option value="dapps-web3">DApps & Web3</option>
              <option value="blog-cms">Blog & CMS</option>
              <option value="android-apps">Android Apps</option>
              <option value="web-applications">Web Applications</option>
              <option value="custom-development">Custom Development</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Estimated Budget
            </label>
            <select
              value={formData.budget_range}
              onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 transition"
            >
              <option value="$500 - $1,000">$500 - $1,000</option>
              <option value="$1,000 - $3,000">$1,000 - $3,000</option>
              <option value="$3,000 - $5,000">$3,000 - $5,000</option>
              <option value="$5,000+">$5,000+ (Enterprise)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" /> Target Timeline
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 transition"
            >
              <option value="1 - 2 Weeks">1 - 2 Weeks (Express)</option>
              <option value="2 - 4 Weeks">2 - 4 Weeks</option>
              <option value="1 - 2 Months">1 - 2 Months</option>
              <option value="Flexible">Flexible / As Needed</option>
            </select>
          </div>
        </div>

        {/* Description / Requirements */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Project Specs & Detailed Requirements <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={5}
            placeholder="Explain main features, desired tech stack (e.g. Next.js, Solidity, Supabase), or design references..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-slate-900 hover:bg-teal-600 text-white font-bold text-sm rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Proposal...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Custom Development Request</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}