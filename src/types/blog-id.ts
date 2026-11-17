// src/components/blog-id/types.ts
export interface ArticleDetail {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  leadLocation: string;
  paragraphs: string[];
  subheading: string;
  subParagraph: string;
  bulletPoints: string[];
  likes: number;
  shares: number;
}

export interface CommentItem {
  id: number;
  author: string;
  text: string;
  time: string;
}

export const ARTICLES_DB: ArticleDetail[] = [
  {
    id: '1',
    slug: 'membangun-arsitektur-micro-saas-nextjs-16',
    title: 'Building Scalable Micro-SaaS Architecture with Next.js 16 App Router',
    category: 'SaaS Architecture',
    date: 'October 24, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1100&auto=format&fit=crop',
    author: {
      name: 'Muhammad Ariyanto',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
      role: 'Lead Architect',
    },
    leadLocation: 'Engineering Insights —',
    paragraphs: [
      'Building a resilient multi-tenant SaaS application requires clear separation between routing layers, tenant isolation, and edge authentication. With Next.js 16 App Router, developers can colocate data fetching directly inside server components while keeping interactive widgets lightweight.',
      'Combining Supabase Row-Level Security with typed API repositories ensures every workspace remains strictly isolated without duplicating backend infrastructure across multiple client frontends.',
    ],
    subheading: 'A Modular Blueprint for Production Teams',
    subParagraph:
      'When scaling from an MVP to thousands of active workspaces, adopting predictable conventions early saves weeks of refactoring later.',
    bulletPoints: [
      'Tenant-aware middleware and OAuth callback routing across custom domains',
      'Server-side caching with granular tag revalidation for instant dashboard loads',
      'Automated webhook verification for global digital product checkouts',
    ],
    likes: 42,
    shares: 18,
  },
  {
    id: '2',
    slug: 'mastering-react-server-components',
    title: 'Mastering React Server Components & Streaming SSR Patterns',
    category: 'Frontend',
    date: 'October 22, 2026',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1100&auto=format&fit=crop',
    author: {
      name: 'Sarah Ananda',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      role: 'UI/UX Lead',
    },
    leadLocation: 'Frontend Architecture —',
    paragraphs: [
      'React Server Components represent a major shift in how modern web applications balance interactivity and initial bundle size. By keeping heavy markdown parsers and data transformations on the server, browsers download significantly less JavaScript.',
      'Paired with React Suspense boundaries, slow database queries no longer block the entire page shell from rendering immediately for the user.',
    ],
    subheading: 'Key Principles for Clean Component Boundaries',
    subParagraph:
      'Structuring client and server components intentionally keeps state predictable and avoids unnecessary re-renders.',
    bulletPoints: [
      'Push "use client" leaves as far down the component tree as possible',
      'Stream secondary widgets independently using dedicated Suspense fallbacks',
      'Share strict TypeScript interfaces between API responses and UI cards',
    ],
    likes: 37,
    shares: 14,
  },
  {
    id: '3',
    slug: 'postgresql-performance-guide',
    title: 'The Ultimate Guide to PostgreSQL & Supabase Query Performance',
    category: 'Database',
    date: 'October 19, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1100&auto=format&fit=crop',
    author: {
      name: 'Dev Lead',
      avatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
      role: 'Database Engineer',
    },
    leadLocation: 'Database Engineering —',
    paragraphs: [
      'Database latency is often the primary bottleneck once an application grows past its initial user base. Even well-indexed tables can degrade if connection pooling or N+1 query patterns go unchecked.',
      'Using composite indexes aligned with your most frequent filter and sort clauses keeps query execution times consistently under a few milliseconds.',
    ],
    subheading: 'Practical Optimization Checklist',
    subParagraph:
      'Before scaling up compute tiers, audit your slowest queries and indexing coverage.',
    bulletPoints: [
      'Inspect execution plans with EXPLAIN ANALYZE on high-traffic endpoints',
      'Use transaction-mode connection pooling for serverless deployments',
      'Select only required columns instead of wildcard queries on large tables',
    ],
    likes: 51,
    shares: 23,
  },
  {
    id: '4',
    slug: 'optimasi-performa-web3-dapp',
    title: 'Optimizing Web3 DApp State & Realtime Wallet Sync in Production',
    category: 'SaaS Architecture',
    date: 'October 17, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1100&auto=format&fit=crop',
    author: {
      name: 'Muhammad Ariyanto',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
      role: 'Lead Architect',
    },
    leadLocation: 'Web3 Engineering —',
    paragraphs: [
      'Decentralized applications frequently suffer from sluggish UI states when polling multiple RPC nodes directly from the browser. Caching indexed events and pairing them with realtime database subscriptions creates a near-instant user experience.',
      'Graceful fallback providers and optimistic transaction receipts ensure users always receive clear feedback while confirmations finalize.',
    ],
    subheading: 'Reliability Under High Network Load',
    subParagraph:
      'Decoupling on-chain indexing from frontend rendering dramatically improves reliability.',
    bulletPoints: [
      'Batch read calls via multicall contracts to minimize RPC roundtrips',
      'Synchronize off-chain metadata and user preferences in PostgreSQL',
      'Provide clear transaction status states from pending to confirmed',
    ],
    likes: 29,
    shares: 11,
  },
  {
    id: '5',
    slug: 'panduan-monetisasi-digital-produk',
    title: 'Indie Developer Monetization Playbook: Licensing & Global Pricing',
    category: 'Business & Tips',
    date: 'October 14, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1100&auto=format&fit=crop',
    author: {
      name: 'Sarah Ananda',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      role: 'Product Strategist',
    },
    leadLocation: 'Creator Economy —',
    paragraphs: [
      'Selling starter kits, UI templates, and production source code globally requires clear licensing tiers that match how solo builders and agencies actually purchase software.',
      'Offering transparent Personal and Extended commercial licenses alongside live previews significantly increases buyer confidence and checkout conversion.',
    ],
    subheading: 'Maximizing Long-Term Product Value',
    subParagraph:
      'Treat every digital asset as an evolving product rather than a one-off zip archive.',
    bulletPoints: [
      'Include clear setup documentation and environment templates',
      'Provide live interactive demos so buyers can test before purchasing',
      'Empower affiliates and creators with automated commission tracking',
    ],
    likes: 64,
    shares: 31,
  },
  {
    id: '6',
    slug: 'designing-ui-kits-tailwind-v4',
    title: 'Designing High-Converting UI Kits with Tailwind CSS v4',
    category: 'Frontend',
    date: 'October 11, 2026',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1100&auto=format&fit=crop',
    author: {
      name: 'Dev Lead',
      avatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
      role: 'Design Engineer',
    },
    leadLocation: 'Design Systems —',
    paragraphs: [
      'Tailwind CSS v4 streamlines design token management by bringing CSS-first configuration directly into your stylesheet. Consistent spacing, typography, and surface contrast make multi-page apps feel cohesive out of the box.',
      'Clean visual hierarchy allows users to scan dense dashboards and marketplace catalogs effortlessly across desktop and mobile viewports.',
    ],
    subheading: 'Essentials of a Maintainable Design System',
    subParagraph:
      'Reusable primitives keep your codebase clean as new features ship.',
    bulletPoints: [
      'Centralize brand colors and font scales inside @theme tokens',
      'Maintain accessible contrast across light surfaces and dark hero banners',
      'Keep card borders, radii, and elevation consistent across views',
    ],
    likes: 33,
    shares: 12,
  },
];

// Map alias slugs from landing page carousel to matching articles
export const SLUG_ALIASES: Record<string, string> = {
  'arsitektur-micro-saas-nextjs-supabase': 'membangun-arsitektur-micro-saas-nextjs-16',
};

export const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 1,
    author: 'Alex Rivera',
    text: 'Super clear breakdown—especially the architecture notes on multi-tenant routing.',
    time: '2h ago',
  },
  {
    id: 2,
    author: 'Dina Putri',
    text: 'Applied these patterns to our starter kit this week and response times dropped noticeably.',
    time: '5h ago',
  },
];