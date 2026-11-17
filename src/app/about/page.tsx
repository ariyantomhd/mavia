// src/app/about/page.tsx
import React from 'react';
import Link from 'next/link';
import { 
  Cpu, 
  Users, 
  CheckCircle2, 
  Globe, 
  ArrowRight, 
  ArrowUpRight, 
  HeartHandshake, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Compass, 
  Sparkles 
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Themavia — Community-Built Digital Products & Modern Assets',
  description: 'Learn how Themavia grew from a passionate community of builders into a modern digital asset marketplace offering production-ready templates, UI kits, and developer tools.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-white border-b border-zinc-200/70">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold tracking-wider uppercase text-zinc-700 mb-8 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            About Themavia
          </div>
          
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-zinc-900 leading-[1.12] mb-6">
            Born from a Community.<br className="hidden sm:block" />
            <span className="text-zinc-500">Engineered with Modern Technology.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Themavia is a next-generation digital asset marketplace built by a collective of designers, developers, and digital architects. We transform shared community expertise into polished, production-ready products designed to accelerate the way modern teams build for the web.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/products" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 text-white font-medium px-7 py-3.5 rounded-xl hover:bg-zinc-800 transition-all shadow-sm"
            >
              Explore Our Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="#story" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-zinc-800 font-medium px-7 py-3.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 transition-all"
            >
              Meet the Community
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Key Highlights / Metrics Bar */}
      <section className="bg-zinc-50 border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-zinc-900 mb-1">100% Modern Stack</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">Built with current industry standards and clean architecture.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-zinc-900 mb-1">Community-Powered</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">Conceptualized, tested, and refined by active builders.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-zinc-900 mb-1">Production-Ready</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">Zero bloat, thoroughly documented, and ready to deploy.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-zinc-900 mb-1">Global Accessibility</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">Designed for solo founders, agencies, and enterprise teams worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Story Section */}
      <section id="story" className="py-24 bg-white border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-3">Our Story</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 tracking-tight leading-tight mb-6">
                From Late-Night Community Discussions to a Global Digital Marketplace
              </h2>
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <p className="text-sm font-medium text-zinc-800 italic leading-relaxed">
                  &ldquo;What if we pooled our collective knowledge to build the exact kind of high-craft, ready-to-use digital products we always wished existed?&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">TC</div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-900">Themavia Collective</div>
                    <div className="text-xs text-zinc-500">Founding Builders & Designers</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base md:text-lg text-zinc-600 leading-relaxed">
              <p>
                Every great product starts with a shared frustration. For us, that frustration was clear: across countless projects, talented developers and designers were spending up to <strong className="font-semibold text-zinc-900">60% of their time</strong> rebuilding the exact same foundational elements—authentication flows, responsive UI systems, boilerplate architectures, and design components—before ever touching the core innovation of their ideas.
              </p>
              <p>
                Themavia did not begin in a sterile corporate boardroom or as a venture-backed experiment. Instead, it grew organically from within a tight-knit, passionate community of builders, UI/UX designers, full-stack engineers, and creative problem-solvers. What started as informal discussions, code reviews, and resource sharing among peers quickly evolved into a unified vision.
              </p>
              <p>
                We realized that most traditional marketplaces prioritized quantity over quality, leaving buyers to sift through outdated codebases, rigid templates, and poorly documented assets. We set out to change that paradigm.
              </p>
              <p>
                By combining the agility and real-world insights of an active tech community with rigorous engineering standards, <strong className="font-semibold text-zinc-900">Themavia was born</strong>—a curated ecosystem where every single asset is crafted with intention, tested in real-world scenarios, and engineered with modern technology from the ground up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product Philosophy */}
      <section className="py-24 bg-zinc-50 border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-3">Our Product Philosophy</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 tracking-tight mb-4">
              Bridging the Gap Between Aesthetic Craft and Technical Excellence
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed">
              At Themavia, we believe a great digital product shouldn&apos;t force you to choose between stunning visual design and rock-solid engineering. Every asset in our marketplace is built on three foundational pillars:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="inline-block font-display font-extrabold text-sm text-zinc-400 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-lg mb-6">01</span>
                <h3 className="font-display font-bold text-xl text-zinc-900 mb-3">Clean, Scalable Architecture</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  We reject spaghetti code and outdated dependencies. Our templates, UI kits, and starter frameworks are structured with modularity, maintainability, and performance in mind—allowing developers to read, customize, and scale the codebase effortlessly as their projects grow.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="inline-block font-display font-extrabold text-sm text-zinc-400 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-lg mb-6">02</span>
                <h3 className="font-display font-bold text-xl text-zinc-900 mb-3">Modern Tech-First Approach</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Technology moves fast, and your tools should keep up. We actively leverage modern frameworks, responsive design systems, and contemporary development workflows so that every product integrates seamlessly into today’s production environments right out of the box.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="inline-block font-display font-extrabold text-sm text-zinc-400 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-lg mb-6">03</span>
                <h3 className="font-display font-bold text-xl text-zinc-900 mb-3">Practical, Real-World Utility</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Because our products are conceived by people who actually build software and digital experiences for a living, nothing is designed in a vacuum. Every component, layout, and workflow is purposefully crafted to solve genuine bottlenecks in modern product development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="py-24 bg-white border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-3">Our Core Values</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 tracking-tight">
              The Principles That Guide Everything We Create
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/70">
              <HeartHandshake className="w-6 h-6 text-zinc-900 mb-4" />
              <h3 className="font-display font-bold text-lg text-zinc-900 mb-2">Community at the Core</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                We are builders serving builders. Our roadmap, product standards, and feature updates are continuously shaped by open dialogue and feedback from our community.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/70">
              <ShieldCheck className="w-6 h-6 text-zinc-900 mb-4" />
              <h3 className="font-display font-bold text-lg text-zinc-900 mb-2">Uncompromising Quality</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Every product undergoes strict curation and quality assurance. If it isn&apos;t clean enough or fast enough for our own production projects, it doesn&apos;t make it onto our platform.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/70">
              <Zap className="w-6 h-6 text-zinc-900 mb-4" />
              <h3 className="font-display font-bold text-lg text-zinc-900 mb-2">Speed Without Shortcuts</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                We empower creators to launch in days rather than months—not by cutting corners, but by providing battle-tested foundations that handle the heavy lifting reliably.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/70">
              <RefreshCw className="w-6 h-6 text-zinc-900 mb-4" />
              <h3 className="font-display font-bold text-lg text-zinc-900 mb-2">Continuous Evolution</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Digital craftsmanship is never static. We are committed to keeping our ecosystem fresh, regularly updating our products to align with evolving web standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Creation Process Workflow */}
      <section className="py-24 bg-zinc-50 border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-3">From Idea to Marketplace</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 tracking-tight">
              Our Collaborative Creation Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 relative">
              <span className="text-xs font-bold text-zinc-400">STEP 01</span>
              <h3 className="font-display font-bold text-base text-zinc-900 mt-2 mb-2">Community Ideation</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">We identify recurring pain points and high-demand workflows directly from real developer and designer experiences.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 relative">
              <span className="text-xs font-bold text-zinc-400">STEP 02</span>
              <h3 className="font-display font-bold text-base text-zinc-900 mt-2 mb-2">Design & Prototyping</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">Our UI/UX specialists craft intuitive, accessible, and visually cohesive interfaces tailored for modern expectations.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 relative">
              <span className="text-xs font-bold text-zinc-400">STEP 03</span>
              <h3 className="font-display font-bold text-base text-zinc-900 mt-2 mb-2">Modern Engineering</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">Our developers translate designs into clean, modular, and high-performance code using up-to-date tech stacks.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 relative">
              <span className="text-xs font-bold text-zinc-400">STEP 04</span>
              <h3 className="font-display font-bold text-base text-zinc-900 mt-2 mb-2">Peer Review & QA</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">Before release, every asset is stress-tested by community peers for responsiveness, code quality, and integration.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 relative">
              <span className="text-xs font-bold text-zinc-400">STEP 05</span>
              <h3 className="font-display font-bold text-base text-zinc-900 mt-2 mb-2">Launch & Support</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">Once published on Themavia, products are backed by clear documentation and ongoing refinements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Mission & Vision */}
      <section className="py-24 bg-white border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80">
              <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 mb-6">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-zinc-900 mb-3">Our Mission</h3>
              <p className="text-zinc-600 leading-relaxed">
                To accelerate global digital creation by transforming collective community expertise into accessible, high-craft, and ready-to-deploy products built with modern technology.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80">
              <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-zinc-900 mb-3">Our Vision</h3>
              <p className="text-zinc-600 leading-relaxed">
                To become the most trusted, community-driven ecosystem where creators, startups, and teams turn first when bringing ambitious digital ideas to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call to Action */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-zinc-200 p-10 md:p-16 text-center shadow-sm">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 tracking-tight mb-4">
              Stop Reinventing the Wheel.<br className="hidden sm:block" /> Start Building What Matters.
            </h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Join forward-thinking creators and developers who rely on Themavia’s community-crafted digital products to ship faster, smarter, and better.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/products" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 text-white font-medium px-7 py-3.5 rounded-xl hover:bg-zinc-800 transition-all"
              >
                Browse Digital Products
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              
              {/* Diarahkan ke Channel/Grup Telegram */}
              <a 
                href="https://t.me/themavia" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-zinc-50 text-zinc-800 font-medium px-7 py-3.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 transition-all"
              >
                {/* Logo / Ikon Telegram SVG */}
                <svg className="w-4 h-4 text-[#229ED9]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27 0-.12.07-1.99 1.25-5.62 3.69-.53.36-1.01.54-1.44.53-.47-.02-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.08-.78 4.22-1.84 7.03-3.05 8.43-3.62 4.01-1.68 4.84-1.97 5.38-1.98.12 0 .39.03.57.18.15.13.19.31.21.44-.01.06.01.24 0 .38z"/>
                </svg>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}