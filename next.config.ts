// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pgxslsiwddoqcztfnakq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'api.themavia.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Header CSP dengan izin komunikasi ke backend production, lokal, Supabase, PayPal, Google, dan Cloudflare Insights
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' https://api.themavia.com https://*.themavia.com http://localhost:5000 https://*.supabase.co https://*.paypal.com https://*.paypalobjects.com;",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5000 https://*.paypal.com https://*.paypalobjects.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google.com https://*.google.co.id https://static.cloudflareinsights.com;",
              "connect-src 'self' https://api.themavia.com https://*.themavia.com wss://api.themavia.com http://localhost:5000 ws://localhost:5000 https://*.supabase.co https://*.paypal.com https://*.paypalobjects.com https://*.paypalinc.com https://stats.g.doubleclick.net https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.google.com https://*.google.co.id https://*.googleadservices.com https://adservice.google.com https://cloudflareinsights.com;",
              "frame-src 'self' https://*.paypal.com https://*.sandbox.paypal.com;",
              "img-src 'self' data: blob: https: http:;",
              "style-src 'self' 'unsafe-inline' https://*.paypal.com https://fonts.googleapis.com;",
              "font-src 'self' data: https://fonts.gstatic.com;",
            ].join(' '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;