// next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Disable browser source maps in production to prevent source code inspection
  productionBrowserSourceMaps: false,

  // Strip console logs in production builds (keep console.error for critical runtime tracking)
  compiler: {
    removeConsole: isProd ? { exclude: ["error"] } : false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pgxslsiwddoqcztfnakq.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "api.themavia.com",
      },
      {
        protocol: "https",
        hostname: "hub.themavia.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com", // X (Twitter) Avatar
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google Avatar
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com", // Discord Avatar
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com", // Facebook Avatar
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
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

  // Security headers and Content Security Policy (CSP)
  async headers() {
    const devSources = isProd ? "" : " http://localhost:5000 ws://localhost:5000";

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: [
              `default-src 'self' https://api.themavia.com https://hub.themavia.com https://*.themavia.com${devSources} https://*.supabase.co https://*.paypal.com https://*.paypalobjects.com;`,
              `script-src 'self' 'unsafe-inline' 'unsafe-eval'${isProd ? "" : " http://localhost:5000"} https://*.paypal.com https://*.paypalobjects.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google.com https://*.google.co.id https://static.cloudflareinsights.com;`,
              `connect-src 'self' https://api.themavia.com https://hub.themavia.com https://*.themavia.com wss://api.themavia.com${devSources} https://*.supabase.co https://*.paypal.com https://*.paypalobjects.com https://*.paypalinc.com https://stats.g.doubleclick.net https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.google.com https://*.google.co.id https://*.googleadservices.com https://adservice.google.com https://cloudflareinsights.com https://*.privy.io wss://*.privy.io https://*.infura.io https://*.alchemy.com;`,
              "frame-src 'self' https://*.paypal.com https://*.sandbox.paypal.com https://*.privy.io;",
              "img-src 'self' data: blob: https: http:;",
              "style-src 'self' 'unsafe-inline' https://*.paypal.com https://fonts.googleapis.com;",
              "font-src 'self' data: https://fonts.gstatic.com;",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;