import { Hero } from '@/components/hero';
import { ValueCards } from '@/components/value-cards';
import { ProcessSteps } from '@/components/process-steps';
import { Gallery } from '@/components/gallery';
import { StatementBand } from '@/components/statement-band';
import { AudienceCards } from '@/components/audience-cards';
import { CTABand } from '@/components/cta-band';
import { FAQ } from '@/components/faq';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data';

/**
 * Home Page
 * Matches Mirage studio layout: Hero → Values → Process → Gallery → Statement → Audience → CTA → FAQ
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

      {/* Work Gallery */}
      <Gallery />

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

