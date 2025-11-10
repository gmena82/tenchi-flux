import Link from 'next/link';
import { SmartImage } from '@/components/smart-image';
import { Skeleton } from '@/components/ui/skeleton';

interface GalleryItem {
  slug: string;
  title: string;
  year: string;
  thumbnail: string;
  tags?: string[];
}

interface GalleryProps {
  items?: GalleryItem[];
  loading?: boolean;
}

/**
 * Gallery - Responsive work gallery grid
 * 3×3 grid linking to work detail pages
 */
export function Gallery({ items = [], loading = false }: GalleryProps) {
  // Placeholder items for initial render
  const placeholderItems: GalleryItem[] = [
    {
      slug: 'ai-cinema-experiment',
      title: 'AI Cinema Experiment',
      year: '2024',
      thumbnail: '/placeholders/placeholder-4x3.jpg',
      tags: ['Short Film', 'Experimental'],
    },
    {
      slug: 'neon-noir',
      title: 'Neon Noir',
      year: '2024',
      thumbnail: '/placeholders/placeholder-4x3.jpg',
      tags: ['Music Video', 'Cyberpunk'],
    },
    {
      slug: 'behind-the-prompts',
      title: 'Behind the Prompts',
      year: '2024',
      thumbnail: '/placeholders/placeholder-4x3.jpg',
      tags: ['Tutorial', 'Workflow'],
    },
    {
      slug: 'synthetic-landscapes',
      title: 'Synthetic Landscapes',
      year: '2024',
      thumbnail: '/placeholders/placeholder-4x3.jpg',
      tags: ['World Building'],
    },
    {
      slug: 'character-study',
      title: 'Character Study',
      year: '2024',
      thumbnail: '/placeholders/placeholder-4x3.jpg',
      tags: ['Short Film'],
    },
    {
      slug: 'hybrid-storytelling',
      title: 'Hybrid Storytelling',
      year: '2024',
      thumbnail: '/placeholders/placeholder-4x3.jpg',
      tags: ['Documentary'],
    },
  ];

  const displayItems = items.length > 0 ? items : placeholderItems;

  if (loading) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-12 text-center">
            Made by <span className="text-flux">Tenchi</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Made by <span className="text-flux">Tenchi</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A grid of AI-powered shorts, experiments, and behind-the-scenes pieces.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item, index) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-muted focus-visible-ring"
              style={{
                animation: 'fade-in 0.6s ease-out forwards',
                animationDelay: `${index * 50}ms`,
                opacity: 0,
              }}
            >
              <SmartImage
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-display font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/80">{item.year}</p>
                  {item.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-white/20 text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-brand hover:underline font-medium focus-visible-ring rounded-md px-2 py-1"
          >
            View all work
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

