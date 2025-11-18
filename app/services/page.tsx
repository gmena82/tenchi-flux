import { Metadata } from 'next';
import { SmartImage } from '@/components/smart-image';
import { CTABand } from '@/components/cta-band';

export const metadata: Metadata = {
  title: 'Services | High-End AI Commercial Production',
  description:
    'Our services focus on scalable, high-fidelity AI commercial production, including Cinematic Ad Campaigns, Product Visualizations, and Generative VFX integration for major brands.',
};

/**
 * Services Page
 */
export default function ServicesPage() {
  const offerings = [
    {
      title: 'Cinematic Ad Campaigns',
      description:
        'Full-funnel commercial production, from 6-second preroll ads to 90-second brand manifestos. We deliver visual worlds that are impossible to capture with traditional budgets, ensuring your brand narrative is unforgettable.',
      imageAlt: 'AI-generated scene of a futuristic city with product placement.',
    },
    {
      title: 'Generative VFX Integration',
      description:
        'Supercharge your existing live-action footage. We seamlessly blend generative AI visuals—like digital humans, stylized environments, and impossible physics—into your clips to elevate production value far beyond post-production norms.',
      imageAlt: 'A video still showing hybrid AI and live-action footage blending.',
    },
    {
      title: 'Rapid Product Visualization',
      description:
        'Launch products faster than your competitors. We generate high-end product demos, virtual showrooms, and lifestyle ads instantly, allowing for rapid A/B testing across multiple demographics and styles.',
      imageAlt: '3D rendering of a luxury product in a photorealistic AI environment.',
    },
  ];

  return (
    <>
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-brand/10 via-brand-2/5 to-transparent">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
            Tailored <span className="text-flux">AI Ad Production</span>
          </h1>
          <p className="mt-4 md:mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            We deliver the visual impact of a major studio campaign with the speed and flexibility only possible through
            a mastered generative AI workflow.
          </p>
        </div>
      </section>

      {/* Offerings Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-24">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                    <span className="text-flux">{offering.title}</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">{offering.description}</p>
                </div>

                {/* Video/Image Holder */}
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold p-8 text-center">
                      [VIDEO/IMAGE HOLDER: {offering.title.toUpperCase()}]
                    </div>
                    <SmartImage
                      src="/placeholders/placeholder-16x9.jpg" // Placeholder path
                      alt={offering.imageAlt}
                      fill
                      className="object-cover opacity-0" // Hide placeholder image, show black background
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <CTABand />
    </>
  );
}
