// src/app/license/page.tsx
import React from 'react';
import Link from 'next/link';
import { 
  FileCheck2, 
  UserCheck, 
  Building2, 
  Check, 
  X, 
  ArrowDown, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

export const metadata = {
  title: 'License Terms | Themavia — Regular & Extended License',
  description: 'Comprehensive guide and legal terms of use for Themavia digital assets covering Regular License and Extended License.',
};

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-28 md:pb-24 bg-white border-b border-zinc-200/70">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold tracking-wider uppercase text-zinc-700 mb-6">
            <FileCheck2 className="w-3.5 h-3.5 text-zinc-900" />
            License Agreement & Usage Rights
          </div>
          
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-zinc-900 leading-[1.12] mb-6">
            Transparent Licensing for<br className="hidden sm:block" />
            <span className="text-zinc-500">Every Scale of Digital Project.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Every digital asset, template, UI kit, and source code package on Themavia is protected by copyright. Choose between a <strong className="font-semibold text-zinc-900">Regular License</strong> or an <strong className="font-semibold text-zinc-900">Extended License</strong> based on your business model and end-product distribution.
          </p>

          <div className="inline-flex items-center gap-2 text-xs text-zinc-500 bg-zinc-50 px-4 py-2 rounded-lg border border-zinc-200/80">
            <span>Last Updated: November 17, 2026</span>
            <span>•</span>
            <span>Document Version: 2.1 (Global Marketplace Standard)</span>
          </div>
        </div>
      </section>

      {/* 2. Quick Comparison Summary (Side-by-Side Cards) */}
      <section id="comparison" className="py-20 bg-zinc-50 border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-2">Quick Comparison</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 tracking-tight">
              Choose the Right License for Your Needs
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Regular License Card */}
            <div className="bg-white rounded-3xl border border-zinc-200/90 p-8 sm:p-10 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wider">Standard Projects</span>
                  <UserCheck className="w-6 h-6 text-zinc-400" />
                </div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-900 mb-3">Regular License</h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-8">
                  Ideal for personal projects, corporate websites, portfolios, or single-client builds where end users are <strong className="font-semibold text-zinc-900">not charged</strong> to access the final product.
                </p>

                <div className="space-y-4 border-t border-zinc-100 pt-6">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">Use in <strong className="font-semibold text-zinc-900">1 Single End Product</strong> for yourself or for 1 single client.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">Freely modify, customize, and combine the item with other works to create a derivative project.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">End product may be distributed for <strong className="font-semibold text-zinc-900">free</strong> (e.g., company profile sites, blogs, marketing landing pages).</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">Lifetime usage rights (<em>Perpetual License</em>) for the registered domain or application.</span>
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-500"><strong className="font-semibold text-zinc-700">Not permitted</strong> for paid SaaS applications, subscription platforms, or paywalled products.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-500"><strong className="font-semibold text-zinc-700">Not permitted</strong> to resell or redistribute the item as a raw template or stock asset.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100">
                <Link href="#regular-detail" className="w-full inline-flex items-center justify-center gap-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 font-semibold text-sm py-3.5 px-6 rounded-xl border border-zinc-200 transition-all">
                  Read Detailed Regular Terms
                  <ArrowDown className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Extended License Card */}
            <div className="bg-white rounded-3xl border-2 border-zinc-900 p-8 sm:p-10 shadow-sm flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider">Commercial & SaaS</span>
                  <Building2 className="w-6 h-6 text-zinc-900" />
                </div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-900 mb-3">Extended License</h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-8">
                  Built for commercial products at scale, paid SaaS applications, membership portals, or end products where end users <strong className="font-semibold text-zinc-900">are charged for access</strong>.
                </p>

                <div className="space-y-4 border-t border-zinc-100 pt-6">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">Includes <strong className="font-semibold text-zinc-900">all rights</strong> granted under the Regular License.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">Permitted for <strong className="font-semibold text-zinc-900">Monetized Commercial End Products</strong> (SaaS, subscription apps, paid course platforms, etc.).</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">May be integrated into web/mobile applications monetized via user licenses, in-app purchases, or paywalls.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">Supports internal engineering teams with <em>unlimited developer seats</em> within a single project organization.</span>
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-500"><strong className="font-semibold text-zinc-700">Still prohibited</strong> from reselling the raw asset (template/UI kit) on other marketplaces or offering it as a free download.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-500"><strong className="font-semibold text-zinc-700">Prohibited</strong> from use in <em>on-demand website builders</em> where end users can export raw templates.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100">
                <Link href="#extended-detail" className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm py-3.5 px-6 rounded-xl transition-all">
                  Read Detailed Extended Terms
                  <ArrowDown className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Feature Comparison Matrix */}
      <section className="py-20 bg-white border-b border-zinc-200/70">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-2">Access Rights Matrix</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-900 tracking-tight">
              Detailed Usage Scope Breakdown
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200/90">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="py-4 px-6 font-display font-bold text-sm text-zinc-900 w-1/2">Usage Scenario / Entitlement</th>
                  <th className="py-4 px-6 font-display font-bold text-sm text-zinc-900 text-center w-1/4">Regular License</th>
                  <th className="py-4 px-6 font-display font-bold text-sm text-zinc-900 text-center w-1/4">Extended License</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 text-sm">
                <tr>
                  <td className="py-4 px-6 text-zinc-700 font-medium">Number of End Products per License</td>
                  <td className="py-4 px-6 text-center text-zinc-600">1 End Product</td>
                  <td className="py-4 px-6 text-center text-zinc-900 font-semibold">1 End Product</td>
                </tr>
                <tr className="bg-zinc-50/50">
                  <td className="py-4 px-6 text-zinc-700 font-medium">Personal Website, Portfolio, or Blog</td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-600 inline" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-600 inline" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-700 font-medium">Corporate / Agency Website (Free for Visitors)</td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-600 inline" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-600 inline" /></td>
                </tr>
                <tr className="bg-zinc-50/50">
                  <td className="py-4 px-6 text-zinc-700 font-medium">Single Client Project (Client Does Not Sell App Access)</td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-600 inline" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-600 inline" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-700 font-medium">Subscription-Based End Product / Paid SaaS</td>
                  <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-rose-500 inline" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-600 inline" /></td>
                </tr>
                <tr className="bg-zinc-50/50">
                  <td className="py-4 px-6 text-zinc-700 font-medium">Application with Paid Content (Paywall / Membership)</td>
                  <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-rose-500 inline" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-600 inline" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-700 font-medium">Internal Company Dashboard / Intranet</td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-600 inline" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-600 inline" /></td>
                </tr>
                <tr className="bg-zinc-50/50">
                  <td className="py-4 px-6 text-zinc-700 font-medium">Reselling Raw Templates / UI Kits / Source Code</td>
                  <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-rose-500 inline" /></td>
                  <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-rose-500 inline" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-zinc-700 font-medium">Publishing Asset Code in Public Repositories (Public GitHub)</td>
                  <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-rose-500 inline" /></td>
                  <td className="py-4 px-6 text-center"><XCircle className="w-5 h-5 text-rose-500 inline" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Full Legal Terms & Clauses */}
      <section className="py-24 bg-zinc-50 border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
                <h4 className="font-display font-bold text-sm uppercase tracking-wider text-zinc-400 mb-4">Agreement Clauses</h4>
                <nav className="space-y-2.5 text-sm font-medium">
                  <Link href="#definitions" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">1. Key Definitions & Terms</Link>
                  <Link href="#regular-detail" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">2. Regular License Terms</Link>
                  <Link href="#extended-detail" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">3. Extended License Terms</Link>
                  <Link href="#restrictions" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">4. Strict Restrictions & Prohibitions</Link>
                  <Link href="#third-party" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">5. Third-Party Assets & Dependencies</Link>
                  <Link href="#ip-ownership" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">6. Intellectual Property Ownership</Link>
                  <Link href="#termination" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">7. Breach & License Termination</Link>
                </nav>
              </div>
            </aside>

            {/* Long & Detailed Legal Clauses */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Section 1 */}
              <div id="definitions" className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 01</span>
                <h3 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Key Definitions & Terms</h3>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    To ensure legal clarity between <strong className="font-semibold text-zinc-900">Themavia</strong> (as the platform operator), the <strong className="font-semibold text-zinc-900">Creator/Contributor</strong>, and the <strong className="font-semibold text-zinc-900">Licensee (You)</strong>, the following terms carry the meanings defined below:
                  </p>
                  <ul className="list-disc pl-5 space-y-2.5">
                    <li><strong className="text-zinc-900">Item / Digital Asset:</strong> The digital product downloaded or purchased from the Themavia marketplace, including but not limited to website templates, source code, UI/UX components, design files (Figma/Sketch), icons, and software scripts.</li>
                    <li><strong className="text-zinc-900">End Product:</strong> A completed application, website, or digital work created through the application of your technical and design skills, in which the Item serves as a foundational component rather than the standalone raw product itself.</li>
                    <li><strong className="text-zinc-900">End User:</strong> Any third party or visitor who accesses, views, or interacts with the published End Product.</li>
                    <li><strong className="text-zinc-900">Client:</strong> An individual or business entity that directly contracts your services to build a single customized End Product for their operational needs.</li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div id="regular-detail" className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 02</span>
                <h3 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Detailed Terms: Regular License</h3>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    The <strong className="font-semibold text-zinc-900">Regular License</strong> grants you a non-exclusive, non-transferable, worldwide right to use the Item to create <strong className="font-semibold text-zinc-900">one (1) single End Product</strong> that is accessible free of charge to End Users.
                  </p>
                  <h4 className="font-display font-bold text-zinc-900 text-base pt-2">What is Permitted Under the Regular License:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>You may build one website or application for yourself or for <strong className="font-semibold text-zinc-900">one (1) single Client</strong>. You are permitted to charge your Client for your design and development services.</li>
                    <li>You are free to modify, crop, combine, or rewrite the codebase and visual elements of the Item to match the brand identity of your End Product.</li>
                    <li>You may host the End Product across multiple servers or CDNs provided all instances serve a <strong className="font-semibold text-zinc-900">single domain or unified application identity</strong>.</li>
                    <li>You may use the Item to build internal corporate systems (such as admin panels, internal CRMs, or analytics dashboards) accessed exclusively by employees without external subscription fees.</li>
                  </ul>
                  <h4 className="font-display font-bold text-zinc-900 text-base pt-2">Specific Limitations of the Regular License:</h4>
                  <p>
                    You are <strong className="font-semibold text-zinc-900">not permitted</strong> to use the Item under a Regular License if End Users are required to pay a fee (whether a one-time purchase, recurring subscription, or credit-based system) to access the End Product or its features. If your business model involves monetizing user access, you must acquire an <strong className="font-semibold text-zinc-900">Extended License</strong>.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div id="extended-detail" className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 03</span>
                <h3 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Detailed Terms: Extended License</h3>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    The <strong className="font-semibold text-zinc-900">Extended License</strong> grants you all rights included in the Regular License, plus expanded commercial rights to distribute and operate <strong className="font-semibold text-zinc-900">one (1) monetized End Product</strong> to paying End Users.
                  </p>
                  <h4 className="font-display font-bold text-zinc-900 text-base pt-2">What is Permitted Under the Extended License:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>You may build <em>Software-as-a-Service</em> (SaaS) applications, paid membership platforms, paid mobile applications, or paywalled content portals where End Users pay to use the service.</li>
                    <li>You may sell access to the End Product (as a compiled/deployed finished application) to multiple paying End Users or subscribers.</li>
                    <li>All internal team members or contractors working directly on the End Product project are permitted to access the source code during development.</li>
                    <li>If you build an End Product for a Client who intends to monetize the application to the public, you must purchase the Extended License on behalf of the Client and transfer the license upon project completion.</li>
                  </ul>
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs sm:text-sm text-zinc-700 mt-4">
                    <strong className="font-semibold text-zinc-900">Important Notice:</strong> While the Extended License permits the End Product to be sold or subscribed to as a software service, it is <strong className="font-semibold text-zinc-900">not</strong> a raw asset redistribution license. Your End Users must never be given access to download raw templates, Figma source files, or original Themavia Item source code.
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div id="restrictions" className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 04</span>
                <h3 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Strict Restrictions & Prohibitions (Applies to Both Licenses)</h3>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Under both the Regular License and the Extended License, the following actions are strictly prohibited and constitute copyright infringement:
                  </p>
                  <ul className="list-disc pl-5 space-y-2.5">
                    <li><strong className="text-zinc-900">No Reselling of Raw Assets:</strong> You may not sell, lease, sublicense, or distribute the Item in its original or lightly modified form as a standalone template, theme, UI kit, or stock component on other marketplaces (such as ThemeForest, Creative Market, UI8, Gumroad, or personal storefronts).</li>
                    <li><strong className="text-zinc-900">No Public Repository Hosting:</strong> You must maintain the confidentiality of the Item&apos;s source code. Storing Themavia asset files in public repositories (such as public GitHub, GitLab, or Bitbucket repos) where third parties can clone or download them is strictly prohibited.</li>
                    <li><strong className="text-zinc-900">No Use in On-Demand Site Builders:</strong> You may not integrate the Item into web applications that allow end users to automatically generate, customize, and export websites or templates (<em>white-label website builders</em>), unless you have obtained a separate written enterprise agreement from Themavia.</li>
                    <li><strong className="text-zinc-900">No Claim of Original Authorship:</strong> You may not register trademarks, patents, or copyrights over any part of an original Themavia Item as your own original creation.</li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div id="third-party" className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 05</span>
                <h3 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Third-Party Assets & Dependencies</h3>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Digital products on Themavia frequently utilize open-source libraries, fonts, or third-party icon sets (such as Tailwind CSS, Lucide Icons, Google Fonts, or specific npm packages) to deliver modern functionality.
                  </p>
                  <p>
                    Such third-party components remain governed by their respective original open-source licenses (such as MIT, Apache 2.0, or SIL Open Font License) as specified in the documentation or <code>package.json</code> within the download package. Preview media (<em>stock photos</em> or demo illustrations) shown on live demo pages are for illustrative purposes only and may not be included in the main download archive unless explicitly stated.
                  </p>
                </div>
              </div>

              {/* Section 6 & 7 */}
              <div id="ip-ownership" className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Sections 06 & 07</span>
                <h3 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Intellectual Property Ownership & Termination</h3>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    <strong className="text-zinc-900">Intellectual Property Ownership:</strong> Purchasing a license does not transfer copyright ownership of the Item to you. All copyrights and intellectual property rights in and to the Item remain the sole property of <strong className="font-semibold text-zinc-900">Themavia</strong> and/or its respective <strong className="font-semibold text-zinc-900">Creators</strong>. You are granted only the usage rights specified under your purchased license tier.
                  </p>
                  <p id="termination">
                    <strong className="text-zinc-900">License Termination:</strong> This license takes effect immediately upon completion of your purchase transaction. If you breach any term or restriction outlined in this agreement, your license will automatically terminate without prior notice. Upon termination, you must immediately cease all use of the Item and permanently delete all copies of the associated files from your servers and local storage.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. License FAQ */}
      <section id="faq" className="py-24 bg-white border-b border-zinc-200/70">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-2">Common Scenarios</span>
            <h2 className="font-display font-extrabold text-3xl text-zinc-900 tracking-tight">
              Frequently Asked Questions About Licensing
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 mb-2">
                1. I am building a corporate website for a client and charging them a development fee. Which license do I need?
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                You only need a <strong className="font-semibold text-zinc-900">Regular License</strong>. Even though you are paid by your client for building the website, the resulting End Product is freely accessible to public visitors (there is no subscription fee or paywall required for visitors to browse the site).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 mb-2">
                2. What if I am building a SaaS application with a free tier (Freemium), alongside paid Pro plans?
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                You must purchase an <strong className="font-semibold text-zinc-900">Extended License</strong>. As long as the End Product incorporates user access monetization (including <em>Freemium</em> models with paid upgrades or subscriptions), it is classified as a monetized commercial product.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 mb-2">
                3. Can I purchase 1 Regular License and use it across 3 different client websites?
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                <strong className="font-semibold text-zinc-900">No.</strong> A single license (whether Regular or Extended) covers only <strong className="font-semibold text-zinc-900">one (1) End Product</strong>. If you are building 3 separate client projects, you must purchase 3 separate licenses (one for each End Product).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 mb-2">
                4. Can I upgrade from a Regular License to an Extended License later if my project grows?
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Yes, absolutely! If your project starts under a Regular License and later evolves into a paid service or SaaS product, you can contact Themavia support to upgrade your license by paying the price difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bottom CTA */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-900 mb-4">
            Still Unsure Which License Fits Your Project?
          </h2>
          <p className="text-zinc-600 mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            The Themavia support and community team is happy to clarify custom usage scenarios for your agency or startup build.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://t.me/themavia" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 text-white font-medium px-6 py-3 rounded-xl hover:bg-zinc-800 transition-all text-sm">
              Contact Support Team via Telegram
            </a>
            <Link href="/products" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-zinc-800 font-medium px-6 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-100 transition-all text-sm">
              Back to Asset Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}