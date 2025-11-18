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
            Technology in service of the <span className="text-flux">Soul</span>.
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            AI is the brush, not the artist. We believe the future of cinema lies in the hands of those who can tame the algorithm to reveal the human condition. The world's biggest brands are already leading the way—from high-concept ads for **Netflix** and **Coca-Cola** to groundbreaking AI-driven spots during the NBA Finals, this is the new standard of commercial filmmaking.
          </p>
        </div>
      </div>
    </section>
  );
}

