# Project Updates Roadmap

**Status:** In Progress
**Phases:** 5 / 10

---

## Overview

Projects featured on vignesh.ai have evolved significantly since the portfolio launched. The portfolio content needs to reflect reality — and that means actually reading the source repos before writing about them.

**Pattern per project:** Research repo → Draft content → Plan UI → Execute

The goal: every project card and page tells an honest, accurate story grounded in what the code actually does.

## Phase Summary

| # | Phase | Status | Summary |
|---|-------|--------|---------|
| 0 | Discovery & research | Complete | Surface-level cross-repo investigation — enough to set direction, not enough for content |
| 1a | Alfred content research | Complete | Deep read of alfred-core, alfredagain, landscaping injection map. Output: content brief. |
| 1b | Alfred page rework | Complete | 5-section deep-dive rewrite, card rework with inline ArchitectureDiagram, intro block rewrite |
| 2a | Lark content research | Complete | Research LLM event tagging and Claude Code design skill/agent system. Output: content brief. |
| 2b | Lark card rework | Complete | BeforeAfterSlider component, research-backed card copy, 3 before/after image pairs |
| 3a | FPL content research | Not Started | Read fpltools repo, understand what's built |
| 3b | FPL card rework | Not Started | Card content and UI based on research |
| 4 | TrackViewer + vignesh.ai cards | Not Started | Research + rework remaining project cards |
| 5 | Visual & icon polish | Not Started | SVG stroke consistency, copy review, text refinement |
| 6 | Navigation audit | Not Started | Project anchor IDs, mobile quick-nav, responsive testing |

## Dependencies

| Blocker | Blocks | Resolution |
|---------|--------|------------|
| Alfred research (1a) | Alfred rework (1b) | Must understand the product before writing about it |
| Lark research (2a) | Lark rework (2b) | Same pattern |
| FPL research (3a) | FPL rework (3b) | Same pattern |
| FPL screenshots from local server | Phase 3b (image slot) | Manual: run fpltools locally, capture screenshots |
| Lark screenshot with new branding | Phase 2b (image update) | Capture from lark.show or local dev server |
| Phase 1b complete | Phases 2a+ | Alfred sets the tone; other projects follow its pattern |

## Key Decisions

| Decision | What was decided | Reference |
|----------|-----------------|-----------|
| Research-first pattern | Every project gets deep repo research before any content is written | User direction, session 2 |
| Rework both UI and content | Phase 1 UI code will be reworked alongside content, not just patched | User direction, session 2 |
| All projects get research | Not just deep-dive pages — every card deserves accurate copy | User direction, session 2 |
| FPL card treatment | Keep as slim standalone card, not folded into Alfred | User decision, session 1 |
| CRM framing | Capability mention only — no Ledge/client branding | User direction, session 1 |
| FPL public discussion | Fully public — show it works, show the charts | User direction, session 1 |
| Cut "Why This Exists" closer | Remove the generic motivation section — keep only honest content | User direction, session 2 |

---

## Phase Details

### Phase 0: Discovery & Research (COMPLETE)

Surface-level cross-repo investigation. Five projects researched. Captured method counts, test counts, tech stacks, deployment state. Sufficient for direction-setting but not for writing authentic content.

Full research: `phases/phase-00-discovery/RESEARCH.md`

---

### Phase 1a: Alfred Content Research

**Goal:** Deeply understand how Alfred actually works by reading the source repos. Output is a content brief, not code.

**Repos to read:**
- `alfred-core` — the published package, DomainConfig protocol, graph, agents
- `alfredagain` (Kitchen domain) — reference implementation
- `landscaping` — injection map, how Alfred snaps onto a real DB system
- `fpltools` — second domain validation (lighter read)

**Research questions:**
- How does Alfred actually work? (not marketing — the real flow)
- What is the injection map and how does a domain plug in?
- How does it snap onto DB-based systems?
- What are tools vs skills vs personas?
- What makes this different from "just another agent framework"?
- What's the honest origin story?

**Exit criteria:**
- [ ] Content brief written with honest, research-backed narrative
- [ ] Key architectural concepts explained in plain language
- [ ] Page structure proposed based on what's actually interesting
- [ ] No invented claims — everything traceable to source code

---

### Phase 1b: Alfred Page Rework

**Goal:** Rewrite the Alfred card and deep-dive page with researched content and reworked UI.

**Depends on:** Phase 1a content brief

**Exit criteria:**
- [ ] Hero is explanatory — reader understands what Alfred is
- [ ] Content is honest — origin story, not marketing
- [ ] Technical sections reflect real architecture
- [ ] Domain showcase serves as proof, not headline
- [ ] No "Why This Exists" generic closer (cut)
- [ ] Responsive at 375px and 1440px

---

### Phase 2a: Lark Content Research

**Goal:** Deeply understand how Lark (formerly RYSVP) works by reading the source repo. Focus on two threads: (1) how LLMs assist with event tagging and cleanup, and (2) how design consistency is maintained through a Claude Code skill and agent system.

**Rebrand context:** RYSVP → Lark is a name change only (RYSVP was hard to say). Not a product pivot.

**Repo to read:**
- `ryesvp` at `C:\Projects\ryesvp` — full-stack Next.js + Prisma app, deployed at ryesvp.me

**Research questions:**
- How do LLMs help with event tagging and metadata cleanup? What's the flow?
- How is design consistency maintained via Claude Code skills/agents? What's the system?
- What does the product actually do end-to-end? (social events discovery + RSVP)
- What's the tech stack and architecture? (Next.js, Prisma, Vercel, etc.)
- What makes this more than "another events app"?

**Exit criteria:**
- [ ] Content brief with honest, research-backed narrative
- [ ] LLM tagging system explained in plain language
- [ ] Claude Code design skill/agent system documented
- [ ] Screenshot guidance finalized (subjects, count, placement)
- [ ] No invented claims — everything traceable to source code

---

### Phase 2b: Lark Card Rework

**Goal:** Update card with researched content. RYSVP → Lark rebrand. Add screenshot carousel component.

**Depends on:** Phase 2a content brief + user-provided screenshots (1200×800px, 3–5 images, saved to `public/images/lark/`)

**Exit criteria:**
- [ ] Card renamed to Lark with updated copy
- [ ] Carousel component for screenshot rotation
- [ ] Content reflects real product, not surface-level description
- [ ] Responsive at 375px and 1440px

---

### Phase 3a: FPL Content Research

**Goal:** Read fpltools repo, understand what's built.

---

### Phase 3b: FPL Card Rework

**Goal:** Card content based on research. Screenshots when available.

---

### Phase 4: TrackViewer + vignesh.ai Cards

**Goal:** Research + rework remaining project cards.

---

### Phase 5: Visual & Icon Polish

**Goal:** Fix inconsistent SVG strokes and refine copy across the site.

---

### Phase 6: Navigation Audit

**Goal:** Add project-level navigation for mobile and improve wayfinding.
