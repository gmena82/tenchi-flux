import { Hero } from '@/components/hero';
import { ValueCards } from '@/components/value-cards';
import { ProcessSteps } from '@/components/process-steps';
import { VideoCarousel } from '@/components/video-carousel';
import { VideoToolsTicker } from '@/components/video-tools-ticker';
import { StatementBand } from '@/components/statement-band';
import { AudienceCards } from '@/components/audience-cards';
import { CTABand } from '@/components/cta-band';
import { FAQ } from '@/components/faq';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data';
import { videoCarouselItems } from '@/lib/video-data';

/**
 * Home Page
 * Matches Mirage studio layout: Hero → Values → Process → Video Carousel → Statement → Audience → CTA → FAQ
 */
export default function HomePage() {
  // Structured data for SEO
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero */}
      <Hero />

      {/* Value Proposition */}
      <ValueCards />

      {/* Process */}
      <ProcessSteps />

      {/* Video tool ticker */}
      <VideoToolsTicker />

      {/* Video Carousel - Mirage style */}
      <VideoCarousel items={videoCarouselItems} />

      {/* Mission Statement */}
      <StatementBand />

      {/* Target Audience */}
      <AudienceCards />

      {/* CTA */}
      <CTABand />

      {/* FAQ */}
      <FAQ />
    </>
  );
}

