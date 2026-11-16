'use client';

import React, { useEffect, useState } from 'react';
import {
  Download,
  Key,
  Copy,
  Check,
  FileText,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { api } from '@/services/wrapperAPI';
import { RecentOrder } from '@/types/dashboard';

interface LicenseItem {
  id: string;
  license_key: string;
  license_type: 'regular' | 'extended';
  status: string;
  created_at: string;
  products?: {
    id: string;
    title?: string;
    name?: string;
    slug?: string;
  };
  order_items?: {
    orders?: {
      order_number?: string;
    };
  };
}

interface DownloadsTabProps {
  orders?: RecentOrder[];
}

export function DownloadsTab({ orders = [] }: DownloadsTabProps) {
  const [licenses, setLicenses] = useState<LicenseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLicenses = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);
        const res = await api.get<{ success: boolean; data: LicenseItem[] }>('/licenses');
        if (isMounted && res?.success && Array.isArray(res.data)) {
          setLicenses(res.data);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message =
            typeof err === 'object' && err !== null && 'message' in err
              ? String((err as { message: unknown }).message)
              : 'Gagal memuat daftar lisensi.';
          setErrorMsg(message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLicenses();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      alert(`License Key: ${key}`);
    }
  };

  const handleDownloadCertificate = (item: LicenseItem) => {
    const productTitle = item.products?.title || item.products?.name || 'Themavia Digital Product';
    const invoiceNumber = item.order_items?.orders?.order_number || '-';
    const content = [
      '====================================================',
      '           THEMAVIA OFFICIAL LICENSE CERTIFICATE     ',
      '====================================================',
      `Product Name   : ${productTitle}`,
      `License Key    : ${item.license_key}`,
      `License Type   : ${item.license_type.toUpperCase()} LICENSE`,
      `Status         : ${item.status}`,
      `Invoice Number : ${invoiceNumber}`,
      `Issued Date    : ${new Date(item.created_at).toUTCString()}`,
      '====================================================',
      'Thank you for purchasing on Themavia Marketplace.',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LICENSE-${item.license_key}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async (item: LicenseItem) => {
    try {
      setDownloadingId(item.id);
      setErrorMsg(null);

      const res = await api.get<{
        success: boolean;
        message?: string;
        data: { download_url: string; file_name: string; license_key: string };
      }>(`/licenses/${item.id}/download`);

      if (res?.success && res.data?.download_url) {
        const link = document.createElement('a');
        link.href = res.data.download_url;
        link.setAttribute('download', res.data.file_name || 'product.zip');
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error(res?.message || 'Tautan unduhan tidak tersedia.');
      }
    } catch (err: unknown) {
      const message =
        typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Gagal mengunduh file ZIP produk.';
      setErrorMsg(message);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-in fade-in space-y-5">
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

      {errorMsg && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="text-xs">Loading your licenses & digital assets...</span>
        </div>
      ) : licenses.length === 0 ? (
        <div className="border border-dashed border-slate-300 rounded-xl p-12 text-center text-slate-500 text-xs bg-slate-50">
          {orders.some((o) => o.status === 'COMPLETED')
            ? 'Your license is being provisioned. Please refresh in a few seconds.'
            : 'No downloadable files available yet. Complete an order to access digital assets.'}
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {licenses.map((item) => {
            const productTitle =
              item.products?.title || item.products?.name || 'Digital Product';
            const invoiceNumber = item.order_items?.orders?.order_number;
            const isDownloading = downloadingId === item.id;
            const isCopied = copiedKey === item.license_key;

            return (
              <div
                key={item.id}
                className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800">{productTitle}</h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <ShieldCheck className="w-3 h-3" />
                      {item.license_type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    {invoiceNumber && (
                      <span className="font-mono">Invoice: {invoiceNumber}</span>
                    )}
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                      <Key className="w-3 h-3 text-slate-500" />
                      <code className="font-mono font-bold text-slate-800">
                        {item.license_key}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopyKey(item.license_key)}
                        title="Copy License Key"
                        className="ml-1 text-slate-500 hover:text-indigo-600 transition cursor-pointer"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadCertificate(item)}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>License (.txt)</span>
                  </button>

                  <button
                    type="button"
                    disabled={isDownloading}
                    onClick={() => handleDownloadZip(item)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Preparing ZIP...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download ZIP</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}