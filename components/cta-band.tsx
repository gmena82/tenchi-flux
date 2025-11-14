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
            Ready to create <span className="text-flux">breakthrough cinema</span>?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
            Whether you&rsquo;re exploring AI filmmaking or ready to start production, we&rsquo;re here to bring
            your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="flux" size="lg">
              <Link href="/contact">Start a project</Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a
                href="https://youtube.com/@TenchiFlux"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

