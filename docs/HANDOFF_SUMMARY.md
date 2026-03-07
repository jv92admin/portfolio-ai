# Handoff Summary — vignesh.ai

> **What this is:** A snapshot of where the project stands right now. Read this at the start of any session to orient quickly.
>
> **Last updated:** 2026-03-07 (end of Phase 1 session)

---

## Current State

The site is **live on Vercel at vignesh.ai** with two pages:

| Page | Route | Status |
|------|-------|--------|
| Landing | `/` | Updated — Alfred card rewritten (PyPI narrative, install command, Kitchen Demo link) |
| Alfred deep-dive | `/alfred` | Updated — pip install hero, use-case showcase, Section 5 corrections |
| Style guide | `/style-guide` | Exists, optional reference page |

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- Geist font via `next/font/google`
- CSS custom properties for design tokens
- Deployed on Vercel

## What's Been Built

- Full landing page with hero, intro block, project cards (Alfred, RYSVP, TrackViewer, vignesh.ai, FPL)
- Hamburger nav for mobile
- ScrollReveal and StaggerGroup animation components
- Alfred deep-dive page with ArchitectureDiagram, UseCaseShowcase, and 5 diagram components
- Design system with tokens for color, spacing, typography, motion

### Phase 1 Changes (this session, uncommitted)

- **ProjectCard.tsx** — new `installCommand` prop renders terminal-style `$ pip install` block
- **ProjectCards.tsx** — Alfred card rewritten: problem/built copy leads with PyPI package + 3 domains, links include PyPI + "Kitchen Demo" (renamed from "Try Alfred")
- **UseCaseShowcase.tsx** — **new component**: 3 domain cards (Kitchen/FPL/CRM), grid on desktop, accordion on mobile
- **alfred/page.tsx** — hero: new tagline + pip install block with v2.4.2 badge + PyPI link; new "Three Domains, One Engine" section before The Graph; Section 5 text corrections (73/23/50 methods, "three implementations")
- **DomainBoundaryDiagram.tsx** — protocol counts fixed (23/50), FPL card solidified, CRM card added (desktop + mobile)

## What's Next

**Active roadmap:** `docs/roadmaps/project-updates/ROADMAP.md` — 6 phases, Phase 1 in progress.

Projects have evolved significantly since the portfolio launched. Alfred is now a published PyPI package (`alfredagain` v2.4.2) powering three domains. RYSVP has rebranded to Lark (`lark.show`). FPL tools is a working local experiment. The portfolio needs to reflect all of this.

**Current phase:** Phase 1 — Alfred Card + Deep-Dive Overhaul (code complete, **not committed**, pending visual QA at 375px/1440px)

**Immediate next steps:**
1. `npm run dev` → visually check `/` and `/alfred` at 375px and 1440px
2. Commit Phase 1 changes
3. Write Phase 1 SUMMARY.md (use template at `docs/roadmaps/_templates/SUMMARY_TEMPLATE.md`)
4. Mark Phase 1 complete in ROADMAP.md

**Next phase:** Phase 2 — Lark Rebrand

**Also in progress:**
- `docs/roadmaps/blog-v1/ROADMAP.md` — Blog with MDX + RabbitHole sections (Phase 0 complete — MDX infrastructure, content utilities, `/blog` and `/blog/[slug]` routes working. Next: Phase 1 — RabbitHole component + blog typography)

## Active Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Blog content format | MDX in repo | No external dependency, version-controlled, `<RabbitHole>` maps naturally to MDX components |
| CMS | None (MDX files) | Git workflow is not friction for this author; migrate to headless CMS only if publishing cadence or collaboration demands it |
| Substack strategy | Strip rabbit holes, paste clean HTML | Makes vignesh.ai the canonical deep-dive destination |
| FPL card treatment | Slim "Parked" standalone card | Not folded into Alfred — keeps the projects section varied |
| CRM framing | Capability mention only | "Alfred powers a production CRM" — no Ledge/client branding |
| FPL screenshots | Manual handoff to fpltools repo | User will spin up locally and capture 2-3 chart screenshots |

## Key Files

- `CLAUDE.md` — project instructions and agent pipeline
- `.claude/docs/design-system.md` — all design tokens and component specs
- `docs/roadmaps/project-updates/ROADMAP.md` — active roadmap (project content updates)
- `docs/roadmaps/blog-v1/ROADMAP.md` — active roadmap (blog feature, Phase 0 complete)
- `src/lib/blog/content.ts` — blog content loading utilities
- `content/blog/` — MDX blog posts directory
- `docs/ideas/blog-feature-proposal.md` — full blog feature brief
- `docs/BACKLOG.md` — idea parking lot
