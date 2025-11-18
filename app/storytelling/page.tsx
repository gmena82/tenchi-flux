import { Metadata } from 'next';
import { CTABand } from '@/components/cta-band';

export const metadata: Metadata = {
  title: 'Our Storytelling Philosophy | Tenchi Flux',
  description:
    'Our core four principles—Champion, Empower, Respect, Protect—guide our GenAI filmmaking process, ensuring human creativity and ethical integrity remain central to every project.',
};

/**
 * Storytelling Philosophy Page
 */
export default function StorytellingPage() {
  const principles = [
    {
      number: '01',
      title: 'Champion Original Storytelling',
      description:
        "We partner with brands and artists whose unique vision and core narrative ideas can move the world. Technology amplifies the story, it doesn't create it.",
    },
    {
      number: '02',
      title: 'Empower Human Artists',
      description:
        'We support and empower emerging and seasoned artists alike, building a filmmaking community where the director’s creative control is absolute, augmented by AI.',
    },
    {
      number: '03',
      title: 'Respect the Cinematic Craft',
      description:
        'GenAI is used to expand creative frontiers and enhance the art of filmmaking, not replace it. We merge AI output with high-end editorial, sound, and color to preserve cinematic fidelity.',
    },
    {
      number: '04',
      title: 'Protect Creative Integrity',
      description:
        'We work with full transparency and a clear commitment to intellectual property. Our focus is on delivering high-quality, commercially clear content while respecting artists’ rights.',
    },
  ];

  return (
    <>
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-muted/30">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
            Storytelling <span className="text-flux">Without Limits</span>
          </h1>
          <p className="mt-4 md:mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            We are an entertainment studio built for the GenAI era, reimagining how visionary artists create film,
            series, and high-impact commercial storytelling.
          </p>
        </div>
      </section>

      {/* The Four Principles */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              Our <span className="text-flux">Four Guiding Principles</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These four tenets guide everything we do, ensuring that innovation and artistic integrity move forward
              together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((p) => (
              <div key={p.number} className="p-8 border-t-4 border-flux bg-card shadow-lg rounded-lg">
                <div className="text-flux font-display text-4xl font-bold mb-4">{p.number}</div>
                <h3 className="text-xl font-display font-bold mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Hybrid Synthesis</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We operate with a hybrid workflow, supercharging traditional techniques like VFX, 3D, motion capture, and
              live-action photography with generative AI. This merger ensures maximum visual fidelity while retaining
              the speed of GenAI iteration.
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <CTABand />
    </>
  );
}
