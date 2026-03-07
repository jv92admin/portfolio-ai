# Blog v1 Roadmap

**Status:** In Progress
**Phases:** 1 / 4

---

## Overview

Add a `/blog` section to vignesh.ai with long-form posts authored in MDX and a signature "rabbit hole" feature — expandable inline sections that let curious readers go deeper without cluttering the default reading experience. The blog should feel native to the existing site, inherit the design system, and make publishing a new post as simple as committing an `.mdx` file.

## Phase Summary

| # | Phase | Status | Summary |
|---|-------|--------|---------|
| 0 | MDX infrastructure | Complete | Next.js MDX setup, content loading utilities, slug-based routing |
| 1 | RabbitHole component + blog typography | Not Started | The core interactive component, long-form reading styles, code blocks |
| 2 | Blog pages (index + post) | Not Started | `/blog` index page, `/blog/[slug]` post page, nav integration, read time |
| 3 | Sample post + polish | Not Started | Write a real test post exercising all features, tag styling, responsive QA |

## Exit Criteria (milestone-level)

- [ ] `/blog` shows a reverse-chronological list of posts with title, tagline, date, read time, track label
- [ ] `/blog/[slug]` renders MDX content with working `<RabbitHole>` expand/collapse sections
- [ ] RabbitHole animation matches site motion language (momentum, not instant)
- [ ] Read time calculated from main body only (excludes rabbit hole content)
- [ ] Blog accessible from site nav, back-link from post to index
- [ ] Responsive at 375px and 1440px
- [ ] At least one real post published as proof of the authoring workflow

## Dependencies

None — the blog is additive to the existing site. No changes to landing page or Alfred page required (nav link addition only).

## Key Decisions

| Decision | What was decided | Reference |
|----------|-----------------|-----------|
| Content format | MDX files in repo | Blog proposal discussion, `docs/HANDOFF_SUMMARY.md` |
| CMS | None — MDX only, migrate later if needed | Blog proposal discussion |
| Routing | App Router (`/blog`, `/blog/[slug]`) | Consistent with existing `/alfred` route |
| RabbitHole UX | Collapsed by default, inline expand, not modal/footnote/sidebar | `docs/ideas/blog-feature-proposal.md` |
| Substack strategy | Strip rabbit holes for cross-posting (future) | Blog proposal discussion |
| Read time | Main body only, or "5 min · 12 min with deep dives" | Blog proposal discussion |
