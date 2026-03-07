import type { ReactElement } from "react";

export interface PostFrontmatter {
  title: string;
  tagline: string;
  date: string;
  tags: string[];
  track?: string;
  draft?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readTime: string;
  deepReadTime: string | null;
}

export interface Post extends PostMeta {
  content: ReactElement;
}
