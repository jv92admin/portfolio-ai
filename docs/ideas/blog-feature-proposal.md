# Blog Feature Proposal — vignesh.ai

## Context

This document is a feature brief for adding a blog to vignesh.ai. It is written for the Claude Code agent that manages the site. The site is built on Next.js with an existing design system and style guide. The blog should feel native to the site — not bolted on.

---

## What We're Building

A `/blog` section on vignesh.ai that hosts long-form writing on AI, building, and technology. Posts range from technical deep dives to accessible essays written for non-technical readers.

The blog needs to support **two types of readers in the same post**:
- A reader who wants the argument in 3–5 paragraphs and nothing more
- A reader who wants to go deeper on specific points — sources, technical detail, code examples, rabbit holes

That dual-reader experience is the defining feature of this blog and the primary reason it lives on a custom site rather than Substack.

---

## Core Feature: Rabbit Hole Sections

### The Idea

Within any blog post, certain paragraphs or sections can have an expandable "rabbit hole" attached. By default, the post reads cleanly — no visual clutter. Where a rabbit hole exists, a small, unobtrusive indicator (a `+` icon or similar) signals that more is available. Clicking it expands an inline block with deeper content: technical explanation, links, videos, code snippets, or extended context.

If a reader never clicks anything, they read a complete, coherent post. If they click everything, they get a substantially richer experience — almost a different document.

### Behavior

- Collapsed by default on page load
- Expand/collapse inline (no navigation away, no modal)
- Rabbit hole content is visually distinct from the main body — differentiated by background, border, or typography — but consistent with the site's design system
- Multiple rabbit holes can exist in a single post, independently expandable
- Rabbit hole content can contain: prose, bullet lists, external links, embedded video, inline code blocks

### What Rabbit Holes Are Not

- They are not footnotes (footnotes are peripheral; rabbit holes are deliberate tangents for curious readers)
- They are not sidebars (they are inline and contextual)
- They are not modal popups (expansion is in-place, preserving reading flow)

---

## Blog Capabilities — Baseline Requirements

### Post Structure
- Title
- Subtitle / tagline (optional)
- Published date
- Estimated read time (auto-calculated)
- Body content with rabbit hole sections (see above)
- Tags / track label (e.g. "AI Literacy", "Builder's Playbook", "Philosophy")

### Index Page (`/blog`)
- List of all posts, reverse chronological
- Each entry shows: title, tagline, date, read time, track label
- Clean, minimal — consistent with the portfolio index aesthetic

### Individual Post Page (`/blog/[slug]`)
- Renders the post with rabbit hole interactivity
- Readable typography, appropriate line length, comfortable for long-form reading
- Consistent header/nav with the rest of the site

### Navigation
- Blog accessible from main site nav
- Back-link from individual posts to the index

---

## Content Management — Open Question

**This is the most important unresolved decision.**

How posts are authored and stored determines the authoring experience. Options to evaluate:

**Option A — MDX files in the repo**
Posts are `.mdx` files committed directly to the codebase. Rabbit holes are implemented as a custom MDX component (`<RabbitHole>`). Simple, no external dependency, version-controlled. Downside: editing requires touching the codebase or a Git-adjacent workflow.

**Option B — Headless CMS (e.g. Sanity, Contentful)**
Posts are authored in a CMS UI, fetched at build time or via API. More editorial flexibility, no Git required for writing. Downside: additional service to maintain, rabbit holes require custom field schema.

**Option C — Notion as CMS (via Notion API)**
Posts are drafted in Notion, synced to the site. Familiar writing environment. Downside: rabbit hole sections are harder to model in Notion's block structure.

**Recommendation pending:** Authoring workflow needs to be confirmed before implementing content management. The site owner drafts in a stream-of-consciousness style and edits iteratively — the CMS choice should minimize friction in that process, not add tooling overhead.

---

## Design Considerations

- The blog should inherit the existing dark mode design system and style guide
- Typography should prioritize readability for long-form content — likely a slightly wider line height and more generous spacing than the portfolio cards
- Rabbit hole sections should feel like a deliberate design choice, not an afterthought — recommend defining the visual treatment as part of the style guide extension
- Track labels / tags as a visual element — worth thinking about how these appear in the index and on post pages

---

## Out of Scope (for Now)

- Email subscription / newsletter functionality
- Comments
- Search
- RSS feed (can add later cheaply)
- Analytics beyond what's already on the site

Distribution via Substack cross-posting is being considered separately and does not affect the site build.

---

## Open Questions for Claude Code

1. What is the cleanest way to implement the `RabbitHole` component in the existing Next.js setup — MDX, a custom React component, or something else?
2. What's the recommended approach to routing — app router or pages router, consistent with how the site is currently structured?
3. How should rabbit hole content be stored if MDX is not the chosen authoring format?
4. Is there an existing animation or transition pattern in the site that the expand/collapse behavior should match?

---

## Summary

The blog is a `/blog` route on vignesh.ai with long-form posts and an expandable rabbit hole feature for deep dives. It should feel native to the existing site, inherit the design system, and be simple enough that adding a new post doesn't require significant developer effort. The rabbit hole feature is the core differentiator and should be treated as a first-class design and engineering problem, not an afterthought.
