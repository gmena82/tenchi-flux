import { MetadataRoute } from 'next';
import { getAllWorkPosts } from '@/lib/mdx';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tenchiflux.com';

/**
 * Generate dynamic sitemap
 * Includes static pages + dynamic work entries
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Dynamic work pages
  const posts = await getAllWorkPosts();
  const workPages = posts.map((post) => ({
    url: `${siteUrl}/work/${post.slug}`,
    lastModified: new Date(post.frontmatter.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...workPages];
}

