# vignesh.ai Design System

## Design Philosophy

The site should feel like it was designed by someone who cares deeply about craft. Not flashy for the sake of it — purposeful motion, deliberate typography, and interactions that feel physical and satisfying. The confidence of Linear's interface meets the editorial momentum of landonorris.com. Things don't just appear on this site — they arrive.

### Reference Sites

- **landonorris.com** — The animation standard. Scroll-triggered reveals that feel like the page is unfolding. Staggered timing so elements arrive in sequence. Hover states that feel physical. Extract the *principles* (choreography, rhythm, stagger, momentum), not the specific techniques (WebGL, 3D).
- **linear.app** — The layout and typography standard. Dense information with clarity. Generous whitespace that feels confident, not empty. Type hierarchy that guides the eye without shouting. Monochromatic foundation with a single accent color doing surgical work.
- **vercel.com** — The surface and elevation standard. Dark backgrounds create depth through subtle surface differentiation. Card treatments that feel like physical objects. Crisp type on dark backgrounds. Precision.
- **anthropic.com/docs** — The content standard. Technical content with clarity and breathing room. Section spacing. Diagrams integrated with prose.

---

## Color Tokens

```
Background:         #0A0A0A    /* near-black, the canvas */
Surface:            #141414    /* cards, elevated elements */
Surface-hover:      #1A1A1A    /* card hover state background */
Border:             #222222    /* subtle card borders, dividers */
Border-hover:       [accent color at 40% opacity]

Text-primary:       #EDEDED    /* headings, body text */
Text-secondary:     #888888    /* subtitles, metadata, dates */
Text-muted:         #555555    /* placeholders, disabled states */

Accent:             TBD        /* developer chooses — see options below */
Accent-muted:       [accent at 60% opacity]    /* subtle uses */
Accent-glow:        [accent at 15% opacity]    /* card hover glow, diagram pulse */
```

### Accent Color Options

Implement all three as CSS custom property sets that can be swapped with a single variable change. Present them on the style guide page for developer review.

| Option | Name | Value | Character |
|--------|------|-------|-----------|
| A | Muted blue | `#4A9EE5` | Professional, dev/Anthropic-adjacent, familiar |
| B | Warm amber | `#E5A04A` | Distinctive, warm, memorable. Stands out from every other dark dev portfolio |
| C | Soft green | `#4AE5A0` | Calm, different, nods to terminal aesthetics |

### Accent Usage Rules

Accent is a precise instrument, not paint. Use it only for:
- Links (text color on hover)
- Card hover border shifts (border-hover token)
- "Built with Claude Code" footer text
- Diagram highlights and flow lines
- Active/selected states

Never use accent for: backgrounds, large text blocks, decorative elements, or anything that isn't interactive or informational.

---

## Typography

### Font

Inter or Geist (Vercel's font). Evaluate which renders better for this use case during build. Load via `next/font` for performance — no external stylesheet requests.

### Type Scale

| Role | Size | Weight | Line Height | Color |
|------|------|--------|-------------|-------|
| Hero text (one-liner) | 36-48px (viewport-dependent) | 500 | 1.3 | text-primary |
| Section headings | 24-28px | 600 | 1.3 | text-primary |
| Card titles | 20px | 600 | 1.3 | text-primary |
| Body / paragraphs | 17-18px | 400 | 1.6 | text-primary |
| Metadata / labels | 14px | 400 | 1.6 | text-secondary |

### Restraint Rule

Bold (weight 600) is for headings and card titles ONLY. Body text is always weight 400. If something needs emphasis in body text, use the accent color — never bold.

### Max Content Width

- Prose: ~720px
- Cards area: can span wider, up to 1200px max

---

## Spacing System

Base unit: **4px**. All spacing uses multiples of 4px.

| Element | Spacing | Units |
|---------|---------|-------|
| Section vertical padding | 96-128px | 24-32 units |
| Card internal padding | 32-40px | 8-10 units |
| Between cards | 24-32px | 6-8 units |
| Between text elements within a card | 16px | 4 units |
| Page horizontal padding (mobile) | 24px | 6 units |
| Page horizontal padding (desktop) | scales to max-width container | — |

Sections should BREATHE. When in doubt, add more vertical space between sections, not less.

---

## Card Specifications

- **Background:** `var(--surface)` (#141414)
- **Border:** 1px solid `var(--border)` (#222222)
- **Border radius:** 12px
- **Internal padding:** 32-40px
- **Hover state:**
  - Border color transitions to `var(--accent-muted)`
  - Subtle scale: `transform: scale(1.015)`
  - Faint glow: `box-shadow` using `var(--accent-glow)`
  - Background shifts to `var(--surface-hover)` (#1A1A1A)
  - Transition: 200-250ms ease-out
- **Internal structure:** Consistent across all project cards — title, subtitle, problem/built/learned sections, links
- **Image placeholder:** `var(--surface-hover)` background, dashed border in `var(--border)` color, centered text "Screenshot coming soon" in `var(--text-muted)`. Must look intentional, not broken.

### Card Variants

- **Hero card (Alfred):** Can span full width on desktop to signal hero status. Visually distinguished from other cards.
- **Coming Soon card (FPL):** Small badge using accent color text or subtle accent border. Content uses "Building" and "Will prove" instead of "Built" and "Learned".
- **Standard card (RYESVP, Record Player):** Default treatment above.

---

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|-----------|-------|-------|
| Mobile minimum | 375px | Single column, 24px horizontal padding |
| Tablet | 768px | Transition zone |
| Desktop | 1024px+ | 2-column card grid, max-width containers |

- **Max content width (cards):** 1200px
- **Max content width (prose):** 720px
- **Cards layout:** Single column on mobile, 2-column grid on desktop
- **Alfred card:** Can span full width to signal hero status
- **No horizontal scroll at any breakpoint**

---

## Animation Language

> Full animation specs are owned by the motion-choreographer agent. This section defines the principles and parameters.

### Entrance Choreography
- Scroll-triggered reveals via Intersection Observer
- Staggered timing: 80-120ms delay between grouped elements (e.g., project cards)
- Direction: subtle upward motion (`translateY` from 20-30px) combined with opacity fade. NOT from the sides.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — sharp initial movement that settles gently
- Duration: 500-700ms for reveals

### Hover Interactions
- **Cards:** subtle scale (1.015-1.02), border color shifts to accent, slight shadow/glow increase. The card should feel like it lifts toward you.
- **Links:** color transition to accent, optional subtle underline animation (width expands from left)
- **All hover transitions:** 200-250ms ease-out

### Page Transitions
- Content fades in on initial page load with a short stagger sequence
- Navigation between `/` and `/alfred`: smooth crossfade or shared layout transition

### Scroll Behavior
- `scroll-behavior: smooth` for anchor navigation
- NO scroll hijacking. NO parallax. User controls their scroll.
- Consider: subtle scroll-linked opacity on hero text (fades slightly as user scrolls past)

### Prohibited
- No parallax
- No scroll-jacking or custom scroll physics
- No bouncing/elastic animations
- No loading spinners or skeleton screens (static site = instant)
- No particle effects or background animations
- No cursor effects
- Nothing that feels like showing off tech for tech's sake

### Reduced Motion
All animations must respect `prefers-reduced-motion`. Reduced-motion users get: instant reveals (opacity: 1, no transform), no transitions. This is not optional.

---

## Component Registry

> Populated during build. Tracks all shared components with their design system compliance status.

### Planned Components

| Component | Page(s) | Purpose |
|-----------|---------|---------|
| Header | Both | Name + nav links (LinkedIn, GitHub, Instagram) |
| Hero | Landing | Centered one-liner with breathing room |
| IntroBlock | Landing | Body text, max-width prose |
| ProjectCard | Landing | Title, subtitle, problem/built/learned, links, image placeholder |
| Footer | Both | Links + "Built with Claude Code" |
| ScrollReveal | Both | Animation wrapper for scroll-triggered entrance |
| StaggerGroup | Both | Container for staggered animation of child elements |
| ArchitectureDiagram | Alfred | SVG/CSS flow diagram — five agents, connections, flow path |
| TechnicalSection | Alfred | Section with heading, prose, and supporting visual |
