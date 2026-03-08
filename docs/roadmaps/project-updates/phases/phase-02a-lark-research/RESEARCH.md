# Phase 2a: Lark Content Research

**Date:** 2026-03-07
**Status:** Complete

---

## Objective

Understand what Lark (formerly RYSVP) actually does, with deep focus on two threads:
1. How LLMs assist with event tagging and metadata cleanup
2. How design consistency is maintained through a Claude Code skill and agent system

Output: content brief for Phase 2b card rework.

---

## What Lark Actually Is

A social events platform for Austin, TX. You follow venues and friends, see what's happening, and make plans together. Think "Instagram meets Ticketmaster" — a social discovery layer on top of local events.

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, PostgreSQL via Supabase, Prisma 7, deployed on Vercel.

**Rebrand:** RYSVP → Lark (name change only — RYSVP was hard to say).

**Scale:** 50+ active users, production app at ryesvp.me.

---

## Finding 1: LLM-Assisted Event Enrichment Pipeline

**Key files:** `src/lib/enrichment/llm.ts`, `src/lib/enrichment/index.ts`, `src/lib/enrichment/spotify.ts`, `src/lib/enrichment/knowledgeGraph.ts`, `src/lib/enrichment/keywords.ts`, `src/app/api/cron/enrich/route.ts`

### How It Works

Events come in raw from scrapers — just a title, venue, and date. The enrichment pipeline adds context automatically:

1. **LLM categorization** (GPT-4o-mini, temperature 0.3) — receives event title, venue name, date, description. Returns: category (one of 7), performer name, 1-2 sentence description, confidence level.
2. **Targeted API lookups** based on LLM category:
   - Concert → Spotify (artist page, genres, popularity)
   - Comedy/Theater → Google Knowledge Graph (bio, Wikipedia link)
   - Sports/Other → LLM description is sufficient, skip API calls
3. **Category update** — if LLM confidence is high, it overwrites the event's category in the database.

### Why It's Interesting

The LLM solves **context blindness** that pure keyword search can't handle:
- "Couch" at Stubb's → Knowledge Graph returns furniture. LLM knows Stubb's is a music venue, categorizes correctly as CONCERT.
- "Texas WBB" → No good API matches. LLM understands "Women's Basketball" from context.
- "Gospel Brunch" → Ambiguous. LLM uses venue metadata to categorize.

The LLM doesn't replace APIs — it **directs** them. It figures out what kind of event it is, then sends targeted queries to the right service. This avoids false positives (furniture wiki pages for band names) and wasted API calls.

### Pipeline Details

- **Trigger:** Nightly cron at 4 AM Central, processes up to 50 events per run
- **Retry logic:** Failed enrichments retry up to 3 times across runs
- **Status lifecycle:** PENDING → PROCESSING → COMPLETED / PARTIAL / FAILED
- **Cost:** ~$0.02 per 250 events (GPT-4o-mini is cheap)
- **Rate limiting:** 200ms between LLM calls, 100ms between API calls
- **Keyword extraction:** Smart title parsing strips venue names, tour names, years, parentheticals. Handles multi-act splitting ("Artist A with Artist B") with protected phrases ("Mumford and Sons" stays together)

### What the UI Gets

After enrichment, event cards can show:
- LLM-generated description (human-readable context)
- Spotify link + genre tags (for concerts)
- Wikipedia link (for comedy/theater)
- Correct category (auto-updated from scraper's guess)

---

## Finding 2: Claude Code Design Skill & Agent System

**Key files:** `.claude/agents/PIPELINE.md`, `.claude/agents/design-director.md`, `.claude/agents/motion-choreographer.md`, `.claude/agents/component-builder.md`, `.claude/agents/qa-reviewer.md`, `.claude/skills/lark-design-system.md`, `.claude/skills/ui-system.md`, `.claude/skills/ux-comms.md`

### The System

Lark uses a **four-agent pipeline** to enforce design consistency:

| Agent | Role | Key Question |
|-------|------|-------------|
| design-director | Visual identity, tokens, component specs | "Does this look like Lark?" |
| motion-choreographer | Animation, spring physics, haptic feedback | "Does this feel good under a thumb?" |
| component-builder | Implementation — reads specs before writing code | "Does this implement the specs faithfully?" |
| qa-reviewer | Structured audits against design system | "Did the builder follow the specs?" |

### The Monochrome Rule (Overrides Everything)

> "The UI is monochrome. Event imagery is the only color. Any color in UI chrome (except need-ticket red) is a violation."

This single rule drives every design decision. White is the accent color. Elevation is achieved through surface color stepping (`#0A0A0A` → `#141414` → `#1E1E1E` → `#2A2A2A`), not drop shadows. The monochrome frame makes event imagery pop like a gallery wall.

### 10 Skills as Knowledge Base

| Skill | Domain |
|-------|--------|
| lark-design-system | All tokens, component specs, elevation model |
| ui-system | Implementation patterns, token migration map |
| ux-comms | Copy authority, brand voice, product vocabulary |
| motion-choreographer | Animation specs, spring configs, haptic map |
| feature-spec | Spec writing guidelines |
| data-model | Database types, access patterns |
| engagement | Toasts, notifications, share text templates |
| ingestion | Scraper pipeline |
| scraper-ops | Scraper inventory, health checks |
| code-quality | Testing, linting, visual compliance grep targets |

### How Enforcement Actually Works

Three layers:

1. **Documentation layer** — Single source of truth per domain. Not "feels clean" — exact token values (`--bg-primary: #0A0A0A`). Not "animated nicely" — spring configs and stagger intervals.
2. **Agent pipeline layer** — Each agent has narrow scope with clear escalation paths. QA reviewer has detailed checklists with severity levels (CRITICAL/BLOCKER/SUGGESTION).
3. **Code layer** — All tokens as CSS custom properties. Primitive components (Button, Chip, Badge) enforce variants — no arbitrary font sizes or colors allowed. Grep targets detect hardcoded values and old tokens.

### Why It Matters for the Portfolio

This is a strong story angle. Most portfolio projects show *what* was built. Lark can show *how quality is maintained at scale* — a systematic approach to design consistency that goes beyond "I used Tailwind."

The system is also self-documenting: skills define what's allowed, agents enforce it, and QA audits catch violations. It's a design system that enforces itself through the development workflow.

---

## Content Brief: Lark Card Rework

### Narrative Arc

**Current card problem:** "I hate texting five group chats" is a fine hook but the card reads like a student project. "My first real project with Claude Code" frames it around the tool, not the product.

**Better framing:** Lark is a production app that solves a real problem (finding things to do with friends), with two genuinely interesting technical stories underneath:
1. LLMs that make raw event data useful (not just "AI-powered" — explain what the LLM actually does)
2. A design system that enforces itself through Claude Code agents (the meta-story: using AI to maintain quality)

### Proposed Card Content

**Title:** Lark (rename from ryesvp)
**Subtitle:** Something like "Nights start here" (actual product tagline) or "Social events discovery"

**Problem/hook:** Focus on the product, not the pain point. What does it feel like to use Lark? You open it, see what's happening tonight, see which friends are going, make a plan. The social layer is the differentiator.

**Technical depth (pick 1-2 for the card, rest for potential deep-dive):**
- LLM enrichment pipeline — raw scraper data → categorized, contextualized events with Spotify links and descriptions. The LLM directs API calls, not replaces them.
- Design enforcement system — 4-agent pipeline, 10 skills, monochrome rule. Design system that audits itself.
- Production operations — nightly cron jobs, retry logic, multi-source scraping

**Visual:** Screenshot carousel (3-5 images, 1200×800px, saved to `public/images/lark/`)

### Screenshot Suggestions

Ideal subjects for the carousel:
1. **Discovery feed** — the main view, events listed with enrichment data visible
2. **Event detail** — showing LLM-generated description, Spotify link, friend avatars
3. **Plan creation / social layer** — making a plan with friends
4. **Mobile view** — show the monochrome design system in action
5. **Before/after enrichment** (optional) — raw event vs enriched event, if this is easy to show

---

## Open Questions for Phase 2b Planning

1. **Deep-dive page for Lark?** Alfred has one. Does Lark warrant a `/lark` page, or is the card sufficient? The design system story alone could fill a page.
2. **Card length** — The two technical stories (LLM enrichment + design enforcement) are both interesting. Show both on the card, or pick one and save the other for a deep-dive?
3. **Naming** — Is the live site still at ryesvp.me, or has it moved to lark.show? The card links need to point somewhere correct.
4. **Screenshots** — User will provide these. Ideal: 1200×800px, PNG or WebP, saved to `public/images/lark/`. Need 3-5 shots.
