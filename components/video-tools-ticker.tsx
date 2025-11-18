import Image from 'next/image';

import { videoTools } from '@/lib/video-tools';

const duplicatedTools = [...videoTools, ...videoTools];

export function VideoToolsTicker() {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container-custom space-y-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            AI Video Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold">
            All the best generation models in one workflow
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-4">
            We actively test every leading diffusion, video, and voice model so our clients get
            cinematic output without juggling a dozen subscriptions.
          </p>
        </div>

        <div className="models-ticker rounded-[32px] border border-white/10 bg-background/40 shadow-[0_10px_50px_rgba(5,5,15,0.35)]">
          <div className="models-ticker-track">
            {duplicatedTools.map((tool, index) => (
              <div className="models-card" key={`${tool.name}-${index}`}>
                <div className="models-card-logo">
                  <Image
                    src={tool.image}
                    alt={`${tool.name} logo`}
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <p className="text-sm font-semibold tracking-wide text-foreground/80">{tool.name}</p>
                {tool.tag && (
                  <span className="models-tag">
                    {tool.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
