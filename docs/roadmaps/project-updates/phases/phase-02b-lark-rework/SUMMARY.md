# Phase 2b: Lark Card Rework — Summary

**Date:** 2026-03-07
**Commits:** uncommitted (ready for commit)
**Why this phase:** The RYSVP card had surface-level copy and a single static screenshot. Phase 2a research uncovered two strong technical stories (LLM enrichment pipeline, Claude Code design enforcement) and a dramatic visual transformation worth showcasing.

---

## What Was Done

- **New component: `BeforeAfterSlider.tsx`** — drag-to-reveal slider with 3 before/after image pairs, dot navigation, pointer events for mouse + touch, "Drag to compare" hint that fades after first interaction
- **Card content rewrite in `ProjectCards.tsx`** — RYSVP → Lark rename, research-backed copy covering LLM enrichment pipeline and Claude Code design system, `customVisual` slot with BeforeAfterSlider
- **Image pipeline** — 3 old RYSVP screenshots copied from ryesvp repo, 3 new Lark screenshots captured, ryesvp_plan cropped to match lark_event height for visual consistency
- **Cleanup** — deleted old `ryesvp.png` single screenshot, removed temporary crop files

## Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Slider clip technique | `clip-path: inset()` on before image, after image behind | Simpler than width-based clipping, no ref needed for inner image width |
| Handle positioning | Siblings of image container, not children | `customVisual` container has `overflow-hidden` which clipped the handle at edges |
| Image fit | `object-contain object-top` | Shows full screenshots without cropping sides — important for comparing UI layouts |
| No standalone /lark page | Card only | User decision — card with before/after slider tells the story sufficiently |
| Brand nod | `titleDisplay` with "(RIP ryesvp)" in muted text | Light humor, acknowledges the rename without dwelling on it |

## Impact on Other Docs

- `docs/roadmaps/project-updates/ROADMAP.md` — Phase 2b status → Complete
- `docs/HANDOFF_SUMMARY.md` — Update current state, next phase

## Open Items

- None — card rework is complete pending user's final visual check
