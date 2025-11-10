import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/work');

export interface WorkFrontmatter {
  title: string;
  description: string;
  year: string;
  tags: string[];
  thumbnail: string;
  youtubeId?: string;
  publishedAt: string;
}

export interface WorkPost {
  slug: string;
  frontmatter: WorkFrontmatter;
  content: string;
}

/**
 * Get all work posts
 */
export async function getAllWorkPosts(): Promise<WorkPost[]> {
  // Ensure directory exists
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as WorkFrontmatter,
        content,
      };
    })
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
      );
    });

  return posts;
}

/**
 * Get single work post by slug
 */
export async function getWorkPost(slug: string): Promise<WorkPost | null> {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as WorkFrontmatter,
      content,
    };
  } catch (error) {
    return null;
  }
}

