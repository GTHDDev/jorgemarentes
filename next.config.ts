import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable react compiler with SWC
  reactCompiler: true,
  
  // Enable compression (gzip/brotli)
  compress: true,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // CRITICAL: Allow Next.js to optimize Unsplash images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
        pathname: "/**",
      },
      // Prismic images
      {
        protocol: "https",
        hostname: "**.prismic.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.prismic.io",
        pathname: "/**",
      },
    ],
    // Optimize quality for better compression
    qualities: [80, 85, 90],
  },

  // Headers for caching, compression, and performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Experimental features for performance with Turbopack
  experimental: {
    // Optimize package imports (tree-shaking) - reduces unused JavaScript
    optimizePackageImports: [
      "@prismicio/react",
      "@prismicio/next",
      "motion",
      "lucide-react",
      "@radix-ui/react-icons",
    ],
    // Optimize CSS output
    optimizeCss: true,
    cssChunking: true,
  },

  // Compiler optimizations - CRITICAL for minification
  compiler: {
    // Remove console.log in production (reduces bundle size)
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },

  // Production optimizations
  productionBrowserSourceMaps: false, // Disable source maps for smaller bundles

  // Optimize server components
  serverExternalPackages: ["@prismicio/client"],
};

export default nextConfig;