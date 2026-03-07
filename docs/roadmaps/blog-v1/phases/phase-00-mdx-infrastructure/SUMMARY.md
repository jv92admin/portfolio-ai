# Phase 00: MDX Infrastructure — Summary

**Date:** 2026-03-07
**Commits:** (pending commit)
**Why this phase:** Establishes the MDX content pipeline so later phases can focus on components (RabbitHole) and page design without infrastructure concerns.

---

## What Was Done

- Installed `next-mdx-remote`, `gray-matter`, `reading-time`, `@types/mdx`
- Created content directory at `content/blog/` with a test post (`hello-world.mdx`)
- Built content loading utilities in `src/lib/blog/` (types + three exports: `getAllPosts`, `getPostBySlug`, `getAllSlugs`)
- Created blog index page at `/blog` with post listing (title, tagline, date, read time)
- Created dynamic post page at `/blog/[slug]` with `generateStaticParams`, `generateMetadata`, and `notFound()` handling
- Added "Blog" nav link to Header component
- Verified: `npm run build` passes, both routes generate correctly

## Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| MDX compilation | `next-mdx-remote` v5 (`compileMDX` from `next-mdx-remote/rsc`) | Server-side compilation, no client runtime, no webpack config needed, frontmatter extraction built-in |
| Index listing | `gray-matter` for frontmatter parsing | Faster than compiling full MDX for each post just to list them |
| Read time | `reading-time` package on raw markdown body | Standard approach; excludes JSX component tags naturally. May need remark plugin in Phase 1 for RabbitHole content |
| Content location | `content/blog/` at project root | Separates content from source code; filename = slug |
| Blog layout | No blog-specific layout.tsx | Matches existing pattern (alfred page includes Header/Footer directly) |

## Impact on Other Docs

- `docs/roadmaps/blog-v1/ROADMAP.md` — Phase 0 status → Complete
- `docs/HANDOFF_SUMMARY.md` — Update blog roadmap status
- `.claude/docs/design-system.md` — No changes needed (blog typography is Phase 1)

## Open Items

- Blog typography/prose styling is minimal — Phase 1 scope
- MDX components map is empty — RabbitHole component added in Phase 1
- `reading-time` may need refinement in Phase 1 to exclude RabbitHole content from main body read time
