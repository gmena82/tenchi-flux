import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * CTABand - Call-to-action section
 * Dual CTAs: Start project + Watch YouTube
 */
export function CTABand() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Let's build a <span className="text-flux">world together</span>.
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
            Ready to push the boundaries of what's possible in video production and define the next era of advertising?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <Button asChild variant="flux" size="lg">
              <Link href="/contact">Inquire Now</Link>
            </Button>

            {/* Secondary CTA */}
            <Button asChild variant="outline" size="lg">
              <a
                href="https://youtube.com/@TenchiFlux"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Our Reel
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

