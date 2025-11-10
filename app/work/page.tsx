import { Metadata } from 'next';
import Link from 'next/link';
import { SmartImage } from '@/components/smart-image';
import { getAllWorkPosts } from '@/lib/mdx';
import { generatePageMetadata } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = generatePageMetadata({
  title: 'Work',
  description:
    'Explore our portfolio of AI-powered films, experimental shorts, and cinematic projects. Behind-the-scenes workflows and creative breakdowns.',
  path: '/work',
});

/**
 * Work Index Page
 * Grid of all work entries from MDX files
 */
export default async function WorkPage() {
  const posts = await getAllWorkPosts();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
  ]);

  return (
    <>
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="pt-24 pb-16">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
              Our <span className="text-flux">Work</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              AI-powered films, experimental shorts, and behind-the-scenes workflows. Explore how
              we're pushing the boundaries of AI cinema.
            </p>
          </div>

          {/* Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No work published yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/work/${post.slug}`}
                  className="group block focus-visible-ring rounded-lg"
                >
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-4">
                    <SmartImage
                      src={post.frontmatter.thumbnail}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <h2 className="text-xl font-display font-bold mb-2 group-hover:text-brand transition-colors">
                    {post.frontmatter.title}
                  </h2>

                  <p className="text-muted-foreground text-sm mb-3">
                    {post.frontmatter.description}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">
                      {post.frontmatter.year}
                    </span>
                    {post.frontmatter.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

