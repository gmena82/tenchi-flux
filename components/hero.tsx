import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FluxGradient } from '@/components/flux-gradient';

/**
 * Hero - Full-height hero section with FluxGradient background
 * Matches Mirage studio hero structure
 */
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <FluxGradient animate />

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tight animate-fade-in">
          Breakthrough cinema, <br />
          without the bottlenecks.{' '}
          <span className="text-flux">Meet Tenchi Flux Studios.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
          Where storytelling, cinema, and artificial intelligence collide. We craft AI-powered
          films, experimental shorts, and cinematic worlds that blur the line between reality and
          machine.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
          <Button asChild variant="flux" size="lg">
            <a
              href="https://youtube.com/@TenchiFlux"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube
            </a>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Start a project</Link>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}

