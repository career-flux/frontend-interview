import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],
  },

  // Enable React Compiler for automatic memoization
  reactCompiler: true,

  // Enable statically typed links, catches broken routes at compile time
  typedRoutes: true,

  // Enable component-level caching for Server Components
  cacheComponents: true,

  // Remove the "X-Powered-By: Next.js" response header for security
  poweredByHeader: false,

  // Enable gzip/brotli compression for responses
  compress: true,

  // Log full fetch URLs in development for easier debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  experimental: {
    // Enable typed environment variable access via process.env
    typedEnv: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
