import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { SmartImage } from '@/components/smart-image';
import { getWorkPost, getAllWorkPosts } from '@/lib/mdx';
import { generatePageMetadata } from '@/lib/seo';
import { generateBreadcrumbSchema, generateVideoSchema } from '@/lib/structured-data';
import { formatDate } from '@/lib/utils';

type WorkDetailPageProps = {
  params?: Promise<{
    slug: string;
  }>;
};

/**
 * Generate metadata for work detail pages
 */
export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const resolvedParams = (await params) ?? null;
  if (!resolvedParams?.slug) {
    return {
      title: 'Work Not Found',
    };
  }

  const post = await getWorkPost(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Work Not Found',
    };
  }

  return generatePageMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/work/${resolvedParams.slug}`,
    image: post.frontmatter.thumbnail,
  });
}

/**
 * Generate static paths for all work posts
 */
export async function generateStaticParams() {
  const posts = await getAllWorkPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Work Detail Page
 * Renders MDX content with metadata
 */
export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const resolvedParams = (await params) ?? null;
  if (!resolvedParams?.slug) {
    notFound();
  }

  const post = await getWorkPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  // Structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
    { name: frontmatter.title, url: `/work/${resolvedParams.slug}` },
  ]);

  const videoSchema = frontmatter.youtubeId
    ? generateVideoSchema({
        title: frontmatter.title,
        description: frontmatter.description,
        thumbnailUrl: frontmatter.thumbnail,
        uploadDate: frontmatter.publishedAt,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/work/${resolvedParams.slug}`,
      })
    : null;

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      <article className="pt-24 pb-16">
        <div className="container-custom max-w-4xl">
          {/* Back link */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors mb-8 focus-visible-ring rounded-md px-2 py-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Work
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
              {frontmatter.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">{frontmatter.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={frontmatter.publishedAt}>
                {formatDate(frontmatter.publishedAt)}
              </time>
              <span>•</span>
              <span>{frontmatter.year}</span>
            </div>
            {frontmatter.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured image or YouTube embed */}
          {frontmatter.youtubeId ? (
            <div className="aspect-video rounded-lg overflow-hidden mb-12 bg-muted">
              <iframe
                src={`https://www.youtube.com/embed/${frontmatter.youtubeId}`}
                title={frontmatter.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="relative aspect-video rounded-lg overflow-hidden mb-12 bg-muted">
              <SmartImage
                src={frontmatter.thumbnail}
                alt={frontmatter.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          )}

          {/* MDX Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <MDXRemote source={content} />
          </div>
        </div>
      </article>
    </>
  );
}

