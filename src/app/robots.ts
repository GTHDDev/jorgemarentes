import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://marentes-cabd.vercel.app/'

  return {
    rules: [
      {
        // Googlebot - No restrictions
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        // Bingbot - No restrictions
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        // General rule for all bots
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/', // Next.js internal static files
          '/api/', // API routes - should not be indexed
          '/*.json$', // JSON files
          '/preview', // Prismic preview
          '/exit-preview', // Exit preview
          '/admin/', // Admin panel (if exists)
          '/draft/', // Drafts (if exists)
          '/?*', // URLs with parameters (duplicate)
          '/*?*', // URLs with query strings
          '/*utm_', // URLs with UTM parameters
          '/*ref=', // Reference URLs
          '/*sort=', // sorting URLs
          '/?s=', // Searches
          '/?page=*', // Pagination
          '/*?page=', // Pagination with query
        ],
        crawlDelay: 1, // Small delay for low quality bots
      },
      {
        // Block malicious bots and scrapers
        userAgent: ['MJ12bot', 'AhrefsBot', 'SemrushBot', 'DotBot'],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
