/**
 * ValueCards - Three value proposition cards
 * Emulates Mirage's value trio section
 */
export function ValueCards() {
  const values = [
    {
      title: 'Limitless Locations',
      description:
        'From cyberpunk cities to historical battlefields, we "shoot" anywhere without logistical constraints, entirely in the digital studio.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      ),
    },
    {
      title: 'Bespoke Aesthetics',
      description:
        'We train custom models on your brand identity and style guides to ensure consistent characters, environments, and a visual feel that is uniquely yours.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
    },
    {
      title: 'Visual Storytelling',
      description:
        'We don\'t just generate video; we craft narratives that resonate on a deep, human level, with full creative control over pacing, shots, and fidelity.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
      ),
    },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group relative"
              style={{
                animation: 'slide-up 0.6s ease-out forwards',
                animationDelay: `${index * 100}ms`,
                opacity: 0,
              }}
            >
              <div className="text-brand mb-4 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

