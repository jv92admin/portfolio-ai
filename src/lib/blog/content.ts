import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import type { PostFrontmatter, PostMeta, Post } from "./types";
import RabbitHole from "@/components/RabbitHole";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const mdxComponents = {
  RabbitHole,
};

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllSlugs();
  const isProduction = process.env.NODE_ENV === "production";

  const posts = slugs
    .map((slug) => {
      const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = data as PostFrontmatter;

      if (isProduction && frontmatter.draft) return null;

      return {
        ...frontmatter,
        slug,
        readTime: readingTime(content).text,
      };
    })
    .filter((post): post is PostMeta => post !== null);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent } = matter(raw);

  const { frontmatter, content } = await compileMDX<PostFrontmatter>({
    source: raw,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction && frontmatter.draft) return null;

  return {
    ...frontmatter,
    slug,
    readTime: readingTime(rawContent).text,
    content,
  };
}
