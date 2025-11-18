/**
 * AudienceCards - Who we help section
 * Four audience cards with value propositions
 */
export function AudienceCards() {
  const audiences = [
    {
      title: 'Ad Agencies',
      description:
        'White-label our high-end production to expand your service offerings and win bigger, more ambitious client pitches.',
      icon: '識',
    },
    {
      title: 'Global Brands',
      description:
        'Define your visual legacy with culturally resonant, cutting-edge campaigns that generate buzz and set new industry standards.',
      icon: '召',
    },
    {
      title: 'Music Artists',
      description:
        'Unlock studio-quality production on an ambitious scale; perfect for music videos and short-form artistic concepts.',
      icon: '汐',
    },
    {
      title: 'Labs & Studios',
      description:
        'Utilize our expertise for rapid concept art, pitch visualization, and the integration of full-scale AI production pipelines.',
      icon: '溌',
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Who we <span className="text-flux">elevate</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We partner with visionary teams ready to redefine their creative output and challenge the status quo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <div
              key={audience.title}
              className="p-8 rounded-lg border bg-card hover:shadow-lg transition-shadow duration-300"
              style={{
                animation: 'slide-up 0.6s ease-out forwards',
                animationDelay: `${index * 75}ms`,
                opacity: 0,
              }}
            >
              <div className="text-4xl mb-4">{audience.icon}</div>
              <h3 className="text-xl font-display font-bold mb-3">{audience.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
