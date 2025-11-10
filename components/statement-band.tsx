/**
 * StatementBand - Mission statement section
 * Emulates Mirage's statement band
 */
export function StatementBand() {
  return (
    <section className="section-padding-sm bg-gradient-to-br from-brand/10 via-brand-2/5 to-transparent">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-flux">Human-centered</span> AI cinema
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            We believe the future of filmmaking isn't choosing between human creativity and machine
            power—it's blending them. Our emotion-forward approach combines AI tools with real-world
            footage, iterative storytelling, and cinematic pacing that feels authentically human.
            Technology serves the story, not the other way around.
          </p>
        </div>
      </div>
    </section>
  );
}

