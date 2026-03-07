# Phase 00: MDX Infrastructure — Plan

**Date:** 2026-03-07
**Source:** Claude Code plan mode

---

## Goal

Set up the MDX pipeline so that committing an `.mdx` file produces a working `/blog` index and `/blog/[slug]` post page.

## Tasks

- [x] Install packages (`next-mdx-remote`, `gray-matter`, `reading-time`, `@types/mdx`) — `package.json`
- [x] Create `content/blog/hello-world.mdx` — test post with frontmatter
- [x] Create `src/lib/blog/types.ts` — `PostFrontmatter`, `PostMeta`, `Post` interfaces
- [x] Create `src/lib/blog/content.ts` — `getAllPosts`, `getPostBySlug`, `getAllSlugs`
- [x] Create `src/app/blog/page.tsx` — minimal blog index
- [x] Create `src/app/blog/[slug]/page.tsx` — post page with `generateStaticParams`, `generateMetadata`, `notFound()`
- [x] Update `src/components/Header.tsx` — add "Blog" nav link
- [x] Verify `npm run build` passes

## Exit Criteria

- [x] Build succeeds with `/blog` and `/blog/hello-world` routes
- [x] Blog index lists posts with title, tagline, date, read time
- [x] Post page renders MDX content with back-link to index
- [x] Invalid slugs return 404

## Files Modified

| File | Change |
|------|--------|
| `package.json` | Added next-mdx-remote, gray-matter, reading-time, @types/mdx |
| `content/blog/hello-world.mdx` | New — test post |
| `src/lib/blog/types.ts` | New — type definitions |
| `src/lib/blog/content.ts` | New — content loading utilities |
| `src/app/blog/page.tsx` | New — blog index page |
| `src/app/blog/[slug]/page.tsx` | New — dynamic post page |
| `src/components/Header.tsx` | Added "Blog" to navLinks |

## Notes

- `next-mdx-remote` v5 `compileMDX` from `next-mdx-remote/rsc` — server-side compilation, no client runtime
- `gray-matter` used for fast frontmatter parsing on index (avoids compiling MDX for listings)
- MDX components map is empty — RabbitHole added in Phase 1
- No changes to `next.config.ts` or `tsconfig.json`
