import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Poppins } from 'next/font/google';
import Script from 'next/script';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { defaultMetadata } from '@/lib/seo';
import { analyticsConfig } from '@/lib/analytics';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${poppins.variable}`}>
      <head>
        {/* Plausible Analytics */}
        {analyticsConfig.enabled && (
          <Script
            defer
            data-domain={analyticsConfig.domain}
            src={analyticsConfig.src}
          />
        )}
      </head>
      <body className="dark">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

