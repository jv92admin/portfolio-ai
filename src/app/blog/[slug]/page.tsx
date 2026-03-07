import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug, getAllSlugs } from "@/lib/blog/content";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Vignesh Jeyaraman`,
    description: post.tagline,
    openGraph: {
      title: `${post.title} — Vignesh Jeyaraman`,
      description: post.tagline,
      url: `https://vignesh.ai/blog/${slug}`,
      siteName: "vignesh.ai",
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <Header />
      <main className="px-6 max-w-[720px] mx-auto">
        <Link
          href="/blog"
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-block mb-8"
          style={{ transitionDuration: "var(--duration-hover)" }}
        >
          &larr; Back to blog
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight">
            {post.title}
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">{post.tagline}</p>
          <div className="flex gap-3 mt-3 text-sm text-[var(--text-muted)]">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <article className="prose prose-invert max-w-none">
          {post.content}
        </article>
      </main>
      <Footer />
    </div>
  );
}
