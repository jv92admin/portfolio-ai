# Handoff Summary — vignesh.ai

> **What this is:** A snapshot of where the project stands right now. Read this at the start of any session to orient quickly.
>
> **Last updated:** 2026-03-07 (end of Phase 2b session)

---

## Current State

The site is **live on Vercel at vignesh.ai** with two pages:

| Page | Route | Status |
|------|-------|--------|
| Landing | `/` | Updated — Alfred card with ArchitectureDiagram, Lark card with BeforeAfterSlider, rewritten intro block |
| Alfred deep-dive | `/alfred` | **Reworked** — 5-section structure with research-backed content |
| Style guide | `/style-guide` | Exists, optional reference page |

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- Geist font via `next/font/google`
- CSS custom properties for design tokens
- Deployed on Vercel

## What's Been Built

- Full landing page with hero, intro block, project cards (Alfred, Lark, TrackViewer, vignesh.ai, FPL)
- Alfred deep-dive page reworked with 5 sections: Hero, Depth of Customization, Three Domains as Proof, The Graph, How It Keeps LLMs Honest
- Blog infrastructure (MDX, /blog, /blog/[slug], RabbitHole component)
- Design system with tokens for color, spacing, typography, motion

### Recent Changes (Phase 2b, committed + pushed)

- **BeforeAfterSlider.tsx** — New drag-to-reveal slider with 2 before/after pairs, labeled chip navigation
- **ProjectCards.tsx** — RYSVP → Lark rename, research-backed card copy, BeforeAfterSlider as customVisual
- **public/images/lark/** — 3 Lark screenshots + 3 cropped RYSVP screenshots for before/after comparison

## What's Next

**Active roadmap:** `docs/roadmaps/project-updates/ROADMAP.md` — restructured with research-first pattern per project.

**Pattern:** Research repo → Content Draft → UI Plan → Execute

**Current phase:** Phase 2b (Lark card rework) is **complete**.

**Next phase:** Phase 3a — FPL Content Research
- Read fpltools repo, understand what's built
- Research brief output for Phase 3b card rework

**Then:** Phase 3b (FPL card rework), Phase 4 (TrackViewer + vignesh.ai cards), Phase 5 (visual polish), Phase 6 (navigation)

**Also in progress:**
- `docs/roadmaps/blog-v1/ROADMAP.md` — Blog with MDX + RabbitHole sections (Phase 2 complete — track labels, tag pills, dual read time. Next: Phase 3)

## Active Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Research-first pattern | Every project gets deep repo research before content | Surface-level notes produced marketing copy, not honest content |
| All projects get research | Not just deep-dive pages | Every card deserves accurate copy |
| Blog content format | MDX in repo | No external dependency, version-controlled |
| CRM framing | Capability mention only | "Alfred powers a production CRM" — no Ledge/client branding |
| FPL screenshots | Manual handoff to fpltools repo | User will spin up locally and capture screenshots |
| Intro block tone | Positive/creative, no defensive qualifiers | "intelligence on demand" framing |

## Key Files

- `CLAUDE.md` — project instructions and agent pipeline
- `.claude/docs/design-system.md` — all design tokens and component specs
- `docs/roadmaps/project-updates/ROADMAP.md` — active roadmap (project content updates)
- `docs/roadmaps/project-updates/phases/phase-01a-alfred-research/RESEARCH.md` — Alfred content research
- `docs/roadmaps/blog-v1/ROADMAP.md` — active roadmap (blog feature)
- `docs/BACKLOG.md` — idea parking lot

## Sibling Repos (for research)

| Repo | Path | What |
|------|------|------|
| alfred-core | `C:\Projects\alfred-core` | Published PyPI package |
| alfredagain | `C:\Projects\alfredagain` | Kitchen domain (reference) |
| landscaping | `C:\Projects\landscaping` | CRM domain, injection map |
| fpltools | `C:\Projects\fpltools` | FPL domain |
| ryesvp | `C:\Projects\ryesvp` | Lark (next to research) |
| trackviewer | `C:\Projects\trackviewer` | Record player project |
