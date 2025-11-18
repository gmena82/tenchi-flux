import { Metadata } from 'next';
import { SmartImage } from '@/components/smart-image';
import { CTABand } from '@/components/cta-band';

export const metadata: Metadata = {
  title: 'About Tenchi Flux | AI Cinema Studio',
  description:
    'Learn about the unique vision, military-grade discipline, and artistic passion that drives Tenchi Flux Studios to create next-generation AI cinema and commercials.',
};

/**
 * About Page
 */
export default function AboutPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-muted/30">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
            Built on <span className="text-flux">Discipline & Artistry</span>
          </h1>
          <p className="mt-4 md:mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            We are not a tech company. We are a creative studio founded on the core values of precision,
            excellence, and pushing the boundaries of what's possible.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Placeholder */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-black shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                [IMAGE HOLDER: FOUNDER PORTRAIT]
              </div>
              <SmartImage
                src="/placeholders/placeholder-4x3.jpg" // Placeholder path
                alt="Gerardo Mena, Founder of Tenchi Flux"
                fill
                className="object-cover opacity-0" // Hide placeholder image, show black background
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                From Recon Marine to <span className="text-flux">AI Visionary</span>
              </h2>
              <p className="text-lg leading-relaxed mb-6 text-muted-foreground">
                Tenchi Flux Studios was founded by **Gerardo Mena**, a decorated Iraqi Freedom veteran. His creative
                philosophy is forged from six years of experience in Special Operations with the Reconnaissance
                Marines—a background demanding precision, high-stakes execution, and the mastery of advanced systems.
              </p>
              <ul className="space-y-4 text-base leading-relaxed">
                <li>
                  <span className="font-semibold text-foreground">The Fusion of Worlds:</span> This unique perspective
                  blends military-grade discipline with a profound artistic passion for poetry, composing music, and
                  creating videos.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Mastering the Tech:</span> Having previously created
                  AI imagery for organizations like Army University Press, the studio treats generative AI not as a
                  gimmick, but as a system to be mastered and deployed with strategic intent.
                </li>
                <li>
                  <span className="font-semibold text-foreground">A Mark of Valor:</span> The founder was awarded a Navy
                  Achievement Medal with a V for Valor for multiple acts of heroism while under enemy fire, demonstrating
                  an uncompromising commitment to mission success.
                </li>
              </ul>
              <p className="mt-6 text-lg font-bold text-flux">
                We bring that same level of commitment to your commercial project.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <CTABand />
    </>
  );
}
