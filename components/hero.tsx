import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { VideoBackground } from '@/components/video-background';

/**
 * Hero - Full-height hero section with video background
 * Matches Mirage studio hero structure with looping video
 */
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 md:pt-24 lg:pt-20">
      {/* Video Background - Desktop only, image fallback for mobile */}
      <VideoBackground
        sources={{
          mp4: '/videos/Hero-video-US2.mp4',
        }}
        fallbackImage="/images/hero-fallback.jpg"
        fallbackAlt="Tenchi Flux Studios - AI Cinema"
        className="absolute inset-0 -z-10"
      />

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4">
        {/* H1 and paragraph with shader background rectangle */}
        <div className="inline-block relative max-w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl" />
          <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-6 lg:py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight tracking-tight animate-fade-in">
              Cinema at Your Fingertips{' '}
              <span className="text-flux">Welcome to Tenchi Flux Studios</span>
            </h1>
            
            <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-foreground font-bold max-w-3xl mx-auto animate-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
              Where storytelling, cinema, and artificial intelligence merge. We craft AI-powered
              films, experimental shorts, and engaging ads that get win hearts and earn eyeballs.
            </p>
          </div>
        </div>
      </div>

      {/* Buttons at bottom, above ticker */}
      <div className="absolute bottom-20 md:bottom-24 left-0 right-0 z-20 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
          <Button asChild variant="flux" size="lg" className="w-full sm:w-auto max-w-xs">
            <a
              href="https://youtube.com/@TenchiFlux"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube
            </a>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto max-w-xs">
            <Link href="/contact">Start a project</Link>
          </Button>
        </div>
      </div>

      {/* Press/Logo Ticker */}
      <div className="press-ticker">
        <div className="press-track">
          {/* First set of logos */}
          <div className="logo-placeholder">NCO JOURNAL</div>
          <div className="logo-placeholder">ARMY UNIVERSITY PRESS</div>
          <div className="logo-placeholder">MILITARY REVIEW</div>
          <div className="logo-placeholder">GREATER HEIGHTS WRESTLING</div>
          <div className="logo-placeholder">TEAM HAMMER WRESTLING ACADEMY</div>
          <div className="logo-placeholder">DARK HORSE ELITE</div>
          <div className="logo-placeholder">AESTHETIC TILE</div>
          <div className="logo-placeholder">FLEITZ FAMILY TILE</div>
          <div className="logo-placeholder">US ARMY</div>
          <div className="logo-placeholder">TRADOC</div>
          <div className="logo-placeholder">VERSATILE FLEET SOLUTION</div>
          
          {/* Duplicate set for seamless loop */}
          <div className="logo-placeholder" aria-hidden="true">NCO JOURNAL</div>
          <div className="logo-placeholder" aria-hidden="true">ARMY UNIVERSITY PRESS</div>
          <div className="logo-placeholder" aria-hidden="true">MILITARY REVIEW</div>
          <div className="logo-placeholder" aria-hidden="true">GREATER HEIGHTS WRESTLING</div>
          <div className="logo-placeholder" aria-hidden="true">TEAM HAMMER WRESTLING ACADEMY</div>
          <div className="logo-placeholder" aria-hidden="true">DARK HORSE ELITE</div>
          <div className="logo-placeholder" aria-hidden="true">AESTHETIC TILE</div>
          <div className="logo-placeholder" aria-hidden="true">FLEITZ FAMILY TILE</div>
          <div className="logo-placeholder" aria-hidden="true">US ARMY</div>
          <div className="logo-placeholder" aria-hidden="true">TRADOC</div>
          <div className="logo-placeholder" aria-hidden="true">VERSATILE FLEET SOLUTION</div>
        </div>
      </div>

      {/* Press/Logo Ticker */}
      <div className="press-ticker">
        <div className="press-track">
          {/* First set of logos */}
          <div className="logo-placeholder">NETFLIX</div>
          <div className="logo-placeholder">SONY PICTURES</div>
          <div className="logo-placeholder">UNIVERSAL</div>
          <div className="logo-placeholder">A24</div>
          <div className="logo-placeholder">PARAMOUNT</div>
          <div className="logo-placeholder">HBO MAX</div>
          <div className="logo-placeholder">DISNEY+</div>
          <div className="logo-placeholder">APPLE TV+</div>
          
          {/* Duplicate set for seamless loop */}
          <div className="logo-placeholder" aria-hidden="true">NETFLIX</div>
          <div className="logo-placeholder" aria-hidden="true">SONY PICTURES</div>
          <div className="logo-placeholder" aria-hidden="true">UNIVERSAL</div>
          <div className="logo-placeholder" aria-hidden="true">A24</div>
          <div className="logo-placeholder" aria-hidden="true">PARAMOUNT</div>
          <div className="logo-placeholder" aria-hidden="true">HBO MAX</div>
          <div className="logo-placeholder" aria-hidden="true">DISNEY+</div>
          <div className="logo-placeholder" aria-hidden="true">APPLE TV+</div>
        </div>
      </div>
    </section>
  );
}

