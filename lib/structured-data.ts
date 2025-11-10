/**
 * Structured data (JSON-LD) generators for SEO
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tenchiflux.com';

/**
 * Organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tenchi Flux Studios',
    description:
      'The creative AI division of Growvia Marketing. We craft AI-powered films, experimental shorts, and cinematic worlds.',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    foundingDate: '2024',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Growvia Marketing',
      url: 'https://growvia.com',
    },
    sameAs: [
      'https://youtube.com/@TenchiFlux',
      'https://twitter.com/TenchiFlux',
      'https://instagram.com/tenchiflux',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@tenchiflux.com',
    },
  };
}

/**
 * WebSite schema with search action
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tenchi Flux Studios',
    description:
      'AI-powered cinema and storytelling. Experimental shorts, cinematic worlds, and behind-the-scenes AI workflows.',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/work?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Video Object schema for work entries
 */
export function generateVideoSchema({
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  url,
}: {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'Tenchi Flux Studios',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };
}

/**
 * Breadcrumb schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

