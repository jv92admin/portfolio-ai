# Phase 00: Discovery & Research

**Date:** 2026-03-07
**Status:** Complete

---

## Objective

Investigate all projects featured (or to-be-featured) on the portfolio to understand their current state, key facts, visual assets, and what needs to change on the portfolio site.

## Method

Two-pass research across 5 project repositories:
1. **Step 1:** Doc-level scan (CLAUDE.md, README, docs/ folders) for project state, architecture, key decisions
2. **Step 2:** Targeted codebase investigation for visuals, screenshots, technical details relevant to portfolio content

---

## Findings

### alfred-core (`c:\Projects\alfred-core`)

- **Package:** `alfredagain` on PyPI, v2.4.2, MIT license
- **Install:** `pip install alfredagain`
- **What it is:** Domain-agnostic LLM orchestration engine built on LangGraph
- **Architecture:** 5-stage pipeline (Understand > Think > Act > Reply > Summarize), SessionIdRegistry for deterministic entity refs, DomainConfig protocol (73 methods: 23 abstract + 50 defaults)
- **Tests:** 164 tests across CRUD, pipeline, act node, LLM resilience
- **Quick start code exists** — `register_domain()` + `run_alfred()` pattern
- **No screenshots or demo images** in the repo
- **Docs:** 17 architecture docs, domain implementation guide, injection map, NEW-DOMAIN-START-HERE onboarding guide
- **Gap for portfolio:** Card still frames this as "cooking orchestration." Needs to lead with published package + multi-domain story.

### alfredagain — Kitchen Domain (`c:\Projects\alfredagain`)

- **What it is:** Reference implementation of alfred-core for kitchen management (inventory, recipes, meal planning, shopping lists)
- **Stack:** FastAPI + React + Supabase, deployed on Railway
- **Features shipped:** Onboarding, streaming, session persistence, recipe import from URL, schema-driven CRUD
- **Models:** OpenAI GPT-4.1 / GPT-4.1-mini
- **Status:** Production-ready, actively maintained
- **FPL domain design** in progress within this repo (blocked on spec)
- **Gap for portfolio:** Kitchen is the origin story, but it shouldn't be the headline anymore.

### fpltools — FPL Domain (`c:\Projects\fpltools`)

- **What it is:** Alfred FPL domain — conversational BI tool for Fantasy Premier League
- **Stack:** Alfred Core (alfredagain >= 2.3.0), Supabase, pandas, matplotlib, Pandera
- **Status:** Phase 5 complete. 117 tests passing. 14 DB tables deployed.
- **UI:** Flask/FastAPI chat interface, dark theme (#0f1117), indigo accent (#6366f1), SSE streaming
- **Charts:** matplotlib PNGs rendered inline — heatmaps, bar charts, line charts, comparison charts
- **Example queries:** "show my squad", "who should I captain?", "cheap midfielders under 6m", fixture difficulty heatmaps
- **No screenshots exist** — need to capture from local server
- **Gap for portfolio:** Card says "Coming Soon" and is muted. It's actually working. Needs "Parked" status with real screenshots.

### ryesvp → Lark (`c:\Projects\ryesvp`)

- **What it is:** Social event discovery platform for Austin, TX
- **Rebrand:** RYSVP → Lark. Visual rebrand COMPLETE in code. Internal code still says "Squad" (intentional).
- **Domain:** `lark.show` is live (used in all share links)
- **Tagline:** "nights start here"
- **Brand voice:** "The friend who always knows about the show before you do"
- **Color palette:** Monochrome-first dark UI — #0A0A0A base, #E8E8E8 accent (near-white). Event imagery is the only color source.
- **Scale:** 19 venue scrapers, 700+ events, 500+ performers
- **Stack:** Next.js 16, React 19, Tailwind v4, Supabase, Prisma 7
- **Gap for portfolio:** Card still says "ryesvp" with old branding. Links point to ryesvp.me. Screenshot shows old UI.

### landscaping / Ledge (`c:\Projects\landscaping`) — CAPABILITY ONLY

- **What it is:** Multi-tenant business management CRM for landscaping companies
- **Alfred integration:** Separate Cloud Run service (Python/FastAPI). Deal lookup, pipeline analysis, CRUD with safety model (proposals for cascading writes). SSE streaming with progress visualization. Entity cards in chat UI.
- **Scale:** 54 routes, 50+ API endpoints, 42 migrations, 55+ tables, 706+ tests
- **Owner:** Edgar (PM). Vignesh consulted and integrated Alfred.
- **Screenshots exist:** `docs/archives/screenshots/07-alfred-chat.png`, `08-alfred-read-response.png`
- **Framing rule:** "Alfred powers a production CRM" — no Ledge branding, no client details. Talk about it as a capability, not as "we built the website."

---

## Portfolio Visual Assets (current)

**public/images/ (4 files):**
- `alfred.jpg` — portrait screenshot of Alfred kitchen chat
- `ryesvp.png` — portrait screenshot of old RYSVP UI
- `styleguide.png` — landscape screenshot of style guide page
- `trackviewer_demo.jpg` — landscape screenshot of trackviewer

**screenshots/ (15 files, untracked):**
- QA screenshots from Alfred deep-dive page development (desktop, mobile, various sections)

**Current landing page copy:**
- Hero: "I build things I shouldn't be able to build alone."
- Intro: "I've always had ideas for things I wanted to build. I just couldn't code..."

---

## Recommendations

1. **Phase 1 (Alfred)** is highest priority — the story has fundamentally changed and this is the flagship project
2. **Phase 2 (Lark)** flows naturally after Alfred — similar content restructuring pattern
3. **Phase 3 (FPL)** is partially blocked on screenshots — do the copy update now, image later
4. **Phase 4 (Visual polish)** is independent — can parallel with any phase
5. **Phase 5 (Navigation)** is independent UX work — do last or parallel

## Open Questions

- Alfred deep-dive use-case section: slideshow/carousel or static grid? (decide in Phase 1 planning)
- Hero copy ("I build things I shouldn't be able to build alone") — still accurate? Or does it need updating given Alfred is published? (decide in Phase 4)
- Lark screenshot source — capture from lark.show production or local dev server? (decide in Phase 2)
