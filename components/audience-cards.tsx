/**
 * AudienceCards - Who we help section
 * Four audience cards with value propositions
 */
export function AudienceCards() {
  const audiences = [
    {
      title: 'Agencies',
      description: 'Scale creative output without scaling headcount. Deliver cinematic content at the speed your clients demand.',
      icon: '🎯',
    },
    {
      title: 'Brand Teams',
      description: 'Stand out with original, high-impact video content. Tell brand stories that break through the noise.',
      icon: '🏢',
    },
    {
      title: 'Creators',
      description: 'Unlock studio-quality production on creator budgets. Bring ambitious visions to life without compromise.',
      icon: '🎬',
    },
    {
      title: 'Labs',
      description: "Push the boundaries of what's possible. Partner with us to experiment with cutting-edge AI workflows.",
      icon: '🔬',
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Who we <span className="text-flux">help</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From agencies to indie creators, we partner with teams ready to reimagine what&rsquo;s possible.
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

