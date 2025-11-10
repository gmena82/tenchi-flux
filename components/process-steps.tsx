import { SmartImage } from '@/components/smart-image';

/**
 * ProcessSteps - Three-step process section
 * Emulates Mirage's "How it works" flow
 */
export function ProcessSteps() {
  const steps = [
    {
      number: '01',
      title: 'Script & Sound',
      description:
        'Write cinematic prompts and scripts. Generate or record audio, voiceovers, and soundscapes to set the emotional tone.',
      image: '/placeholders/placeholder-16x9.jpg',
    },
    {
      number: '02',
      title: 'World & Cast',
      description:
        'Design immersive worlds, define visual style, and create AI actors. Build your cinematic universe with consistent characters and environments.',
      image: '/placeholders/placeholder-16x9.jpg',
    },
    {
      number: '03',
      title: 'Compose & Render',
      description:
        'Assemble shots, refine pacing, and iterate on every detail. Render final output and blend AI with real footage for hybrid storytelling.',
      image: '/placeholders/placeholder-16x9.jpg',
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            From idea to film <span className="text-flux">in three steps</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered workflow takes you from concept to final render with creative control at
            every stage.
          </p>
        </div>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className="text-brand font-display text-6xl font-bold opacity-20 mb-2">
                  {step.number}
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <SmartImage
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

