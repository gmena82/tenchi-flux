import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tenchiflux.com';

/**
 * Default metadata for the site
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tenchi Flux Studios | AI-Powered Cinema & Storytelling',
    template: '%s | Tenchi Flux Studios',
  },
  description:
    'Where storytelling, cinema, and artificial intelligence collide. We craft AI-powered films, experimental shorts, and cinematic worlds that blur the line between reality and machine.',
  keywords: [
    'AI cinema',
    'AI filmmaking',
    'AI video production',
    'generative AI',
    'AI storytelling',
    'Tenchi Flux',
    'Growvia Marketing',
    'AI shorts',
    'cinematic AI',
  ],
  authors: [{ name: 'Tenchi Flux Studios' }],
  creator: 'Tenchi Flux Studios',
  publisher: 'Growvia Marketing',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Tenchi Flux Studios',
    title: 'Tenchi Flux Studios | AI-Powered Cinema & Storytelling',
    description:
      'Where storytelling, cinema, and artificial intelligence collide. We craft AI-powered films, experimental shorts, and cinematic worlds.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tenchi Flux Studios',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tenchi Flux Studios | AI-Powered Cinema & Storytelling',
    description:
      'Where storytelling, cinema, and artificial intelligence collide. We craft AI-powered films and experimental shorts.',
    images: ['/og-image.jpg'],
    creator: '@TenchiFlux',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

/**
 * Generate metadata for a page
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = image || '/og-image.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

