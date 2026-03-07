import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Vignesh Jeyaraman",
  description: "Writing on AI, building, and technology.",
  openGraph: {
    title: "Blog — Vignesh Jeyaraman",
    description: "Writing on AI, building, and technology.",
    url: "https://vignesh.ai/blog",
    siteName: "vignesh.ai",
    type: "website",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <Header />
      <main className="px-6 max-w-[720px] mx-auto">
        <h1 className="text-3xl font-semibold tracking-tight mb-12">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-[var(--text-secondary)]">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block py-4 -mx-4 px-4 rounded-lg hover:bg-[var(--surface)] transition-colors"
                style={{ transitionDuration: "var(--duration-hover)" }}
              >
                <h2 className="text-xl font-semibold tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-[var(--text-secondary)] mt-1">
                  {post.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-[var(--text-muted)]">
                  {post.track && (
                    <>
                      <span className="text-[var(--accent)] font-medium text-xs uppercase tracking-wider">
                        {post.track}
                      </span>
                      <span>·</span>
                    </>
                  )}
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span>
                    {post.readTime}
                    {post.deepReadTime && (
                      <span className="text-[var(--text-muted)]">
                        {" "}· {post.deepReadTime} with deep dives
                      </span>
                    )}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
