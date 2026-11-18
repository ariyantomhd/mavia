// src/components/layout/Footer.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const exploreAssets = [
  { title: 'DApps & Web3', slug: 'dapps-web3' },
  { title: 'Blog & CMS', slug: 'blog-cms' },
  { title: 'Android Apps', slug: 'android-apps' },
  { title: 'Web Applications', slug: 'web-applications' },
  { title: 'Custom Development', slug: 'custom-development' },
];

export const Footer = () => {
  return (
    <footer className="bg-[#0F1035] text-gray-400 py-5 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-start">
          
          {/* Kolom 1: Logo, Tagline & Status */}
          <div className="lg:col-span-3 space-y-2">
            <Link href="/" className="inline-flex items-center">
              <Image 
                src="/logo.png" 
                alt="Themavia Logo" 
                width={120} 
                height={28} 
                style={{ width: 'auto', height: 'auto' }}
                className="object-contain"
              />
            </Link>
            <p className="text-[11px] text-gray-400 leading-snug">
              &quot;Build for Better.&quot; Premium templates, developer tools, and scalable solutions.
            </p>
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Kolom 2: Explore Assets */}
          <div className="lg:col-span-2 space-y-2">
            <h3 className="text-[11px] font-bold tracking-wider text-gray-200 uppercase">
              Explore Assets
            </h3>
            <ul className="space-y-1 text-xs">
              {exploreAssets.map((asset) => (
                <li key={asset.slug}>
                  <Link 
                    href={`/category/${asset.slug}`}
                    className="hover:text-white transition block leading-snug"
                  >
                    {asset.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Developer Tools */}
          <div className="lg:col-span-2 space-y-2">
            <h3 className="text-[11px] font-bold tracking-wider text-gray-200 uppercase">
              Developer Tools
            </h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/docs" className="hover:text-white transition block leading-snug">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition block leading-snug">
                  Help Center / FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition block leading-snug">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Company */}
          <div className="lg:col-span-2 space-y-2">
            <h3 className="text-[11px] font-bold tracking-wider text-gray-200 uppercase">
              Company
            </h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition block leading-snug">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="hover:text-white transition block leading-snug">
                  Partnership
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition block leading-snug">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition block leading-snug">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/license" className="hover:text-white transition block leading-snug">
                  License
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 5: Join Themavia & Powered by PayPal */}
          <div className="lg:col-span-3 space-y-2">
            <h3 className="text-[11px] font-bold tracking-wider text-gray-200 uppercase">
              Join Themavia
            </h3>
            <p className="text-[11px] text-gray-400 leading-snug">
              Get notified about new assets &amp; exclusive deals.
            </p>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-1.5">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="min-w-0 flex-1 bg-[#131827] border border-gray-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
              />
              <button 
                type="submit"
                className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[11px] px-3 py-1.5 rounded transition shadow-sm shadow-orange-500/20 cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>

            {/* Powered by PayPal sebaris */}
            <div className="flex items-center justify-between border-t border-gray-800/80 pt-2 mt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Powered by
              </span>
              <div className="relative h-5 w-16 opacity-90 hover:opacity-100 transition-opacity">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                  alt="PayPal" 
                  fill 
                  className="object-contain object-right" 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};