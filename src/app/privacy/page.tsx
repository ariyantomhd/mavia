// src/app/privacy/page.tsx
import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck} from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Themavia — Data Protection & Security',
  description: 'Official Privacy Policy outlining how Themavia collects, uses, and safeguards your personal data and transactional information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-28 md:pb-24 bg-white border-b border-zinc-200/70">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold tracking-wider uppercase text-zinc-700 mb-6 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-900" />
            Data Protection & Privacy Framework
          </div>
          
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-zinc-900 leading-[1.12] mb-6">
            Privacy Policy.<br className="hidden sm:block" />
            <span className="text-zinc-500">Your Trust & Data Secure.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-8">
            At <strong className="font-semibold text-zinc-900">Themavia</strong>, we respect your privacy and are deeply committed to protecting your personal information. This policy details how we collect, use, and safeguard your data.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500 bg-zinc-50 px-4 py-2 rounded-lg border border-zinc-200/80">
            <span>Effective Date: November 17, 2026</span>
            <span>•</span>
            <span>Version 2.0 (Global Compliance)</span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 bg-zinc-50 border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sticky Navigation Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 mb-4">Table of Contents</h4>
                <nav className="space-y-2 text-sm font-medium">
                  <Link href="#collection" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">1. Information We Collect</Link>
                  <Link href="#usage" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">2. How We Use Your Data</Link>
                  <Link href="#cookies" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">3. Cookies & Tracking Technologies</Link>
                  <Link href="#security" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">4. Data Security & Encryption</Link>
                  <Link href="#sharing" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">5. Data Sharing & Third Parties</Link>
                  <Link href="#rights" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">6. Your Data Rights & Choices</Link>
                  <Link href="#contact" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">7. Privacy Inquiries & Contact</Link>
                </nav>
              </div>
            </aside>

            {/* Detailed Privacy Clauses */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* 1. Information We Collect */}
              <div id="collection" className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 01</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Information We Collect</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    When you create an account, browse digital assets, or make a purchase on <strong className="font-semibold text-zinc-900">Themavia</strong>, we collect specific categories of information to ensure secure platform operation and service delivery:
                  </p>
                  <ul className="list-disc pl-5 space-y-2.5">
                    <li className="text-zinc-700"><strong className="text-zinc-900">Account & Profile Data:</strong> Your full name, registered email address, and encrypted authentication credentials.</li>
                    <li className="text-zinc-700"><strong className="text-zinc-900">Transaction & Billing Data:</strong> Purchase history, license association records, and billing details processed securely via authorized third-party payment gateways. We do not store raw credit card numbers on our servers.</li>
                    <li className="text-zinc-700"><strong className="text-zinc-900">Technical & Log Data:</strong> IP addresses, browser types, device information, operating systems, and diagnostic access logs recorded automatically during your interactions with <code>themavia.com</code>.</li>
                  </ul>
                </div>
              </div>

              {/* 2. How We Use Your Data */}
              <div id="usage" className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 02</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">How We Use Your Data</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    We utilize the information collected strictly for legitimate business, operational, and security purposes, including:
                  </p>
                  <ul className="list-disc pl-5 space-y-2.5">
                    <li className="text-zinc-700">Delivering purchased digital assets, invoices, and managing license authorizations inside your account dashboard.</li>
                    <li className="text-zinc-700">Sending critical transactional notices, security alerts, product updates, and customer support communications.</li>
                    <li className="text-zinc-700">Improving platform performance, analyzing user experience trends, and defending against fraudulent activities, credential stuffing, or automated scraping.</li>
                  </ul>
                </div>
              </div>

              {/* 3. Cookies */}
              <div id="cookies" className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 03</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Cookies & Tracking Technologies</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Themavia uses essential cookies and secure session tokens to maintain your authenticated login session, remember your shopping cart preferences, and secure checkout transactions against malicious tampering.
                  </p>
                  <p>
                    You can configure your browser settings to refuse or delete cookies; however, disabling essential session cookies may impair core marketplace features and prevent you from logging into your account.
                  </p>
                </div>
              </div>

              {/* 4. Data Security */}
              <div id="security" className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 04</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Data Security & Encryption</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    We implement robust industry-standard technical and organizational security measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction.
                  </p>
                  <p>
                    These safeguards include full HTTPS/SSL encryption across all platform pages (enforcing Cloudflare Full Strict TLS), secure encrypted database storage, and strict access controls for platform administration.
                  </p>
                </div>
              </div>

              {/* 5. Data Sharing */}
              <div id="sharing" className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 05</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Data Sharing & Third Parties</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    We do not sell, rent, or trade your personal information to external marketers or advertisers. We share data only with essential trusted service providers under strict confidentiality agreements:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-zinc-900">Payment Processors:</strong> Authorized gateways handling secure credit card and digital transactions.</li>
                    <li><strong className="text-zinc-900">Hosting & Cloud Infrastructure:</strong> Secure cloud providers and CDN networks (such as Vercel and Cloudflare) powering platform delivery.</li>
                  </ul>
                </div>
              </div>

              {/* 6. Your Rights */}
              <div id="rights" className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 06</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Your Data Rights & Choices</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Depending on your jurisdiction, you possess specific rights regarding your personal information, including the right to access, correct, update, or request deletion of your account data.
                  </p>
                  <p>
                    You can manage your profile details directly from your Themavia account settings or submit formal data privacy requests by contacting our compliance team. Note that certain transactional records must be retained for legal, accounting, and tax compliance.
                  </p>
                </div>
              </div>

              {/* 7. Contact */}
              <div id="contact" className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 07</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Privacy Inquiries & Contact</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please reach out to our privacy department at <a href="mailto:privacy@themavia.com" className="text-zinc-900 font-semibold underline underline-offset-4">privacy@themavia.com</a> or via our official Telegram channel[cite: 14].
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
