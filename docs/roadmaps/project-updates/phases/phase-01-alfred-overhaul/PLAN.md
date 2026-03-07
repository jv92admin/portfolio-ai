# Phase 01: Alfred Card + Deep-Dive Overhaul -- Plan

**Date:** 2026-03-07
**Source:** Claude Code plan mode
**Research:** ../phase-00-discovery/RESEARCH.md

---

## Goal

Reposition Alfred as a published, domain-agnostic orchestration engine with three proven domains -- on both the landing page card and the deep-dive page.

## Tasks

- [x] Add `installCommand` prop to ProjectCard -- `src/components/ProjectCard.tsx`
- [x] Update Alfred hero card content (problem, built, links) -- `src/components/ProjectCards.tsx`
- [x] Create UseCaseShowcase component (grid desktop, accordion mobile) -- `src/components/UseCaseShowcase.tsx`
- [x] Update deep-dive page hero (tagline, pip install block, PyPI link) -- `src/app/alfred/page.tsx`
- [x] Insert UseCaseShowcase section before "The Graph" -- `src/app/alfred/page.tsx`
- [x] Fix Section 5 content (subtitle, DomainConfig numbers, blockquote) -- `src/app/alfred/page.tsx`
- [x] Update DomainBoundaryDiagram (counts, FPL solid, add CRM) -- `src/components/DomainBoundaryDiagram.tsx`

## Exit Criteria

- [x] Alfred hero card leads with "published PyPI package" narrative
- [x] `pip install alfredagain` visible on both card and deep-dive page
- [x] "Try Alfred" renamed to "Kitchen Demo"
- [x] PyPI link added to card and deep-dive page
- [x] Three use cases (Kitchen, FPL, CRM) in showcase section on deep-dive page
- [x] CRM mention is capability-only -- no Ledge branding
- [x] Section 5 says "three implementations" with correct DomainConfig numbers (73/23/50)
- [x] DomainBoundaryDiagram shows 3 solid domain cards with correct counts
- [ ] Responsive at 375px and 1440px (visual check pending)

## Files Modified

| File | Change |
|------|--------|
| `src/components/ProjectCard.tsx` | Added `installCommand` prop + terminal-style render block |
| `src/components/ProjectCards.tsx` | Updated Alfred card: problem, built, links (PyPI + Kitchen Demo), installCommand |
| `src/components/UseCaseShowcase.tsx` | **NEW** -- 3-domain showcase (grid on sm+, accordion on mobile) |
| `src/app/alfred/page.tsx` | Hero: new tagline, pip install + version badge, PyPI link. New use-case section. Section 5 text corrections. |
| `src/components/DomainBoundaryDiagram.tsx` | Fixed protocol counts (23/50), FPL card solidified, CRM card added (desktop + mobile) |

## Notes

- "Try Alfred" renamed to "Kitchen Demo" per user preference
- Use-case showcase uses accordion on mobile per user preference (not stacked cards)
- Existing alfred.jpg portrait image kept for now -- still works as "reference implementation" visual
- FPL card in ProjectCards.tsx (the "Coming Soon" card) not modified in this phase -- separate update planned in Phase 3
