// src/app/terms/page.tsx
import React from 'react';
import Link from 'next/link';
import { 
  Scale, 
  UserCog, 
  DownloadCloud, 
  RotateCcw, 
  ShieldAlert 
} from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Themavia — Digital Asset Marketplace',
  description: 'Official Terms of Service governing account usage, digital asset purchases, creator submissions, refund policies, and intellectual property on Themavia.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-28 md:pb-24 bg-white border-b border-zinc-200/70">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold tracking-wider uppercase text-zinc-700 mb-6 shadow-2xs">
            <Scale className="w-3.5 h-3.5 text-zinc-900" />
            Legal Framework & Platform Rules
          </div>
          
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-zinc-900 leading-[1.12] mb-6">
            Terms of Service.<br className="hidden sm:block" />
            <span className="text-zinc-500">Clear Rules for a Trusted Ecosystem.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Please read these Terms of Service carefully before accessing, browsing, or purchasing digital products on <strong className="font-semibold text-zinc-900">Themavia</strong>. By using our platform, you agree to be legally bound by these terms.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500 bg-zinc-50 px-4 py-2 rounded-lg border border-zinc-200/80">
            <span>Effective Date: November 17, 2026</span>
            <span>•</span>
            <span>Version 2.0 (Global Marketplace Agreement)</span>
          </div>
        </div>
      </section>

      {/* 2. Key Highlights Summary (4 Quick Cards) */}
      <section className="py-16 bg-zinc-50 border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                <UserCog className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-zinc-900 mb-1.5">Account Responsibility</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                You are responsible for safeguarding your login credentials and all activity conducted under your account.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                <DownloadCloud className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-zinc-900 mb-1.5">Instant Digital Delivery</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                All products are delivered digitally immediately upon payment confirmation—no physical shipping applies.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-zinc-900 mb-1.5">Fair Refund Policy</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Because digital assets are irrevocable once downloaded, refunds apply strictly to verified technical defects.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-zinc-900 mb-1.5">Copyright Protection</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Unauthorized redistribution, piracy, or public repo uploads will result in immediate account termination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Terms of Service Clauses */}
      <section id="clauses" className="py-24 bg-white border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sticky Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 bg-zinc-50 p-6 rounded-2xl border border-zinc-200/80">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-400 mb-4">Table of Contents</h4>
                <nav className="space-y-2 text-sm font-medium">
                  <Link href="#acceptance" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">1. Acceptance of Terms</Link>
                  <Link href="#accounts" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">2. User Accounts & Security</Link>
                  <Link href="#marketplace" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">3. Marketplace Transactions & Pricing</Link>
                  <Link href="#licensing" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">4. Licensing & Permitted Use</Link>
                  <Link href="#refunds" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">5. Refund & Dispute Policy</Link>
                  <Link href="#prohibited" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">6. Prohibited Conduct & Anti-Piracy</Link>
                  <Link href="#ip" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">7. Intellectual Property Rights</Link>
                  <Link href="#warranty" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">8. Disclaimer of Warranties</Link>
                  <Link href="#liability" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">9. Limitation of Liability</Link>
                  <Link href="#changes" className="block text-zinc-700 hover:text-zinc-900 py-1 transition-colors">10. Modifications & Governing Law</Link>
                </nav>
              </div>
            </aside>

            {/* Full Legal Text */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* 1. Acceptance of Terms */}
              <div id="acceptance" className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 01</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Acceptance of Terms</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Welcome to <strong className="font-semibold text-zinc-900">Themavia</strong> (&quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;Buyer&quot;, or &quot;you&quot;) and Themavia governing your access to and use of the <code>themavia.com</code> website, digital marketplace, and related services.
                  </p>
                  <p>
                    By registering an account, downloading any free or paid digital asset, or browsing our platform, you acknowledge that you have read, understood, and agreed to comply with these Terms, as well as our <strong className="font-semibold text-zinc-900">License Agreement</strong> and <strong className="font-semibold text-zinc-900">Privacy Policy</strong>. If you are entering into these Terms on behalf of a company or legal entity, you represent that you have the legal authority to bind such entity.
                  </p>
                </div>
              </div>

              {/* 2. User Accounts & Security */}
              <div id="accounts" className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 02</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">User Accounts & Security</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    To purchase, download, or manage digital assets on Themavia, you must create a registered account. When creating an account, you agree to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Provide accurate, current, and complete registration information.</li>
                    <li>Be at least <strong className="font-semibold text-zinc-900">18 years of age</strong> or the age of legal majority in your jurisdiction.</li>
                    <li>Maintain the strict confidentiality of your password and authentication credentials.</li>
                    <li>Never share, sell, or transfer your individual account access to third parties or external teams outside your licensed organization.</li>
                  </ul>
                  <p>
                    You are solely responsible for all activities, purchases, and downloads that occur under your account. Themavia reserves the right to suspend or terminate accounts suspected of credential sharing, automated scraping, or fraudulent activity.
                  </p>
                </div>
              </div>

              {/* 3. Marketplace Transactions & Pricing */}
              <div id="marketplace" className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 03</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Marketplace Transactions, Pricing & Taxes</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    All prices displayed on Themavia are listed in US Dollars (USD) unless explicitly stated otherwise. We reserve the right to modify product pricing, introduce promotional discounts, or discontinue items at any time without prior notice.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-zinc-900">Payment Processing:</strong> Transactions are processed securely through authorized third-party payment gateways. Themavia does not store your full credit card or sensitive banking credentials on our servers.</li>
                    <li><strong className="text-zinc-900">Taxes & VAT:</strong> Depending on your billing country, applicable sales tax, Value Added Tax (VAT), or Goods and Services Tax (GST) may be calculated and added at checkout in compliance with international digital tax regulations.</li>
                    <li><strong className="text-zinc-900">Digital Delivery:</strong> Upon verified payment, download links and license certificates become immediately accessible inside your Themavia dashboard.</li>
                  </ul>
                </div>
              </div>

              {/* 4. Licensing & Permitted Use */}
              <div id="licensing" className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 04</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Licensing & Permitted Use</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    When you purchase a digital asset on Themavia, you are not purchasing ownership of the underlying intellectual property or source code; rather, you are purchasing a non-exclusive, non-transferable license to use that asset under specific conditions.
                  </p>
                  <p>
                    Every purchase is governed by the specific license tier selected at checkout—either a <strong className="font-semibold text-zinc-900">Regular License</strong> (for single non-monetized end products) or an <strong className="font-semibold text-zinc-900">Extended License</strong> (for single commercial end products where end users are charged). For complete legal definitions and usage boundaries, please refer to our dedicated <Link href="/license" className="text-zinc-900 font-semibold underline underline-offset-4">License Terms</Link> page.
                  </p>
                </div>
              </div>

              {/* 5. Refund & Dispute Policy */}
              <div id="refunds" className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 05</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Refund & Dispute Policy</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Because digital products (source code, templates, UI kits, and design files) are intangible and cannot be physically returned once downloaded, <strong className="font-semibold text-zinc-900">all sales on Themavia are generally final</strong>.
                  </p>
                  <h4 className="font-display font-bold text-zinc-900 text-base pt-1">When a Refund May Be Granted:</h4>
                  <p>
                    We evaluate refund requests on a case-by-case basis within <strong className="font-semibold text-zinc-900">14 days</strong> of purchase strictly under the following circumstances:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-zinc-900">Materially Defective Item:</strong> The downloaded file is corrupted, broken, or fails to function as demonstrated in the live preview, and our technical team is unable to resolve the issue within a reasonable timeframe.</li>
                    <li><strong className="text-zinc-900">False or Misleading Description:</strong> Core features or technical dependencies explicitly advertised on the product page are completely missing from the package.</li>
                    <li><strong className="text-zinc-900">Undownloaded Duplicate Purchase:</strong> You accidentally purchased the exact same asset twice and have not downloaded the duplicate copy.</li>
                  </ul>
                  <h4 className="font-display font-bold text-zinc-900 text-base pt-1">When Refunds Will Not Be Issued:</h4>
                  <p>
                    Refunds will <strong className="font-semibold text-zinc-900">not</strong> be granted if you simply changed your mind after downloading the files, purchased an asset by mistake after downloading it, lack the technical expertise required to use the specified tech stack (e.g., React, Tailwind CSS, Next.js), or encounter compatibility issues with third-party plugins not officially supported by the item. Initiating an unjustified payment chargeback without contacting Themavia support first will result in permanent account suspension.
                  </p>
                </div>
              </div>

              {/* 6. Prohibited Conduct & Anti-Piracy */}
              <div id="prohibited" className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 06</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Prohibited Conduct & Anti-Piracy Enforcement</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    To protect our engineering team and legitimate customers, you strictly agree not to engage in any of the following activities:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Uploading, sharing, or mirroring Themavia digital assets on torrent sites, file-sharing forums, nulled script websites, or public Git repositories.</li>
                    <li>Using automated bots, crawlers, or scrapers to extract product data, preview assets, or source files from <code>themavia.com</code>.</li>
                    <li>Attempting to bypass payment mechanisms, license verification checks, or CDN access controls.</li>
                    <li>Reselling, sublicensing, or redistributing raw or lightly modified Themavia products as competing templates or UI kits.</li>
                  </ul>
                </div>
              </div>

              {/* 7. Intellectual Property Rights */}
              <div id="ip" className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 07</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Intellectual Property Rights</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    The Themavia brand name, logo, website interface, custom illustrations, documentation copy, and platform architecture are the exclusive intellectual property of <strong className="font-semibold text-zinc-900">Themavia</strong> and are protected by international copyright and trademark laws. All digital products listed on the marketplace remain the exclusive intellectual property of Themavia.
                  </p>
                </div>
              </div>

              {/* 8 & 9. Warranties & Limitation of Liability */}
              <div id="warranty" className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Sections 08 & 09</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Disclaimer of Warranties & Limitation of Liability</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    <strong className="text-zinc-900">As-Is Basis:</strong> While our team rigorously reviews and tests every product before publication, all services and digital assets on Themavia are provided on an <em>&quot;AS IS&quot;</em> and <em>&quot;AS AVAILABLE&quot;</em> basis without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, or uninterrupted availability.
                  </p>
                  <p id="liability">
                    <strong className="text-zinc-900">Limitation of Liability:</strong> To the maximum extent permitted by applicable law, in no event shall Themavia, its founders, developers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages—including loss of profits, data, business interruption, or goodwill—arising out of your use or inability to use any asset downloaded from the platform. In all cases, Themavia’s aggregate liability shall not exceed the total amount paid by you for the specific asset giving rise to the claim.
                  </p>
                </div>
              </div>

              {/* 10. Modifications & Governing Law */}
              <div id="changes" className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 scroll-mt-28">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Section 10</span>
                <h2 className="font-display font-extrabold text-2xl text-zinc-900 mt-1 mb-4">Modifications to Terms & Governing Law</h2>
                <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    <strong className="text-zinc-900">Updates to These Terms:</strong> We reserve the right to revise or update these Terms of Service at any time to reflect platform improvements, new features, or legal requirements. Material changes will be indicated by updating the &quot;Effective Date&quot; at the top of this page. Continued use of Themavia after such updates constitutes your acceptance of the revised Terms.
                  </p>
                  <p>
                    <strong className="text-zinc-900">Governing Law & Dispute Resolution:</strong> These Terms shall be governed by and construed in accordance with applicable commercial and digital commerce laws, without regard to conflict of law principles. Any disputes arising under these Terms shall first be addressed in good faith through direct negotiation with the Themavia support and legal team.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Contact / Legal Inquiry CTA */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-900 mb-4">
            Have Questions About Our Terms of Service?
          </h2>
          <p className="text-zinc-600 mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            If you need clarification regarding enterprise agreements, refund eligibility, or platform terms, reach out to our team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://t.me/themavia" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 text-white font-medium px-6 py-3 rounded-xl hover:bg-zinc-800 transition-all text-sm">
              {/* Ikon Telegram SVG */}
              <svg className="w-4 h-4 text-[#229ED9]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27 0-.12.07-1.99 1.25-5.62 3.69-.53.36-1.01.54-1.44.53-.47-.02-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.08-.78 4.22-1.84 7.03-3.05 8.43-3.62 4.01-1.68 4.84-1.97 5.38-1.98.12 0 .39.03.57.18.15.13.19.31.21.44-.01.06.01.24 0 .38z"/>
              </svg>
              Contact Support via Telegram
            </a>
            <Link href="/license" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-zinc-800 font-medium px-6 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-100 transition-all text-sm">
              View License Terms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}