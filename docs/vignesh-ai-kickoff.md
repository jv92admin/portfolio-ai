# vignesh.ai — Claude Code Kickoff

> **What this is:** A bootstrap guide for Claude Code to build vignesh.ai from an empty directory. It contains the project spec, agent architecture, design philosophy, and a step-by-step build sequence. Read the entire document before doing anything.
>
> **How to use:** The developer shares this at the start of a new Claude Code session. Follow the sequence, pausing at 🟡 marks to discuss with the developer.

---

## Part 1: What We're Building

A personal site at vignesh.ai. Two pages. Static content. Deployed on Vercel.

**The job:** When someone clicks vignesh.ai from a resume, they should think "this person builds things and thinks clearly" within 5 seconds.

**The bar:** This site should feel like it was designed by someone who cares deeply about craft. Not flashy for the sake of it — purposeful motion, deliberate typography, and interactions that feel physical and satisfying. Think the confidence of Linear's interface meets the editorial momentum of landonorris.com. Things don't just appear on this site — they arrive.

**Stack:** Next.js (app router), deployed to Vercel. No database, no CMS, no auth. Pure static.

---

## ⚡ Ship Priority — Read This First

This doc describes the ideal version. If time runs short, ship in this order:

1. **Landing page with all content, clean cards, basic scroll reveals.** This is the site. If only this exists and it looks polished, the job is done.
2. **Alfred page with a static diagram and technical sections.** A clean, well-styled static SVG diagram is better than a half-broken animated one.
3. **Animation polish** — stagger timing, physical hover states, diagram animation sequence. This is what elevates it from good to great, but only AFTER 1 and 2 are solid.
4. **Style guide page.** Useful for iteration but it's an extra deliverable. If cutting it means shipping the real pages faster, cut it and review design tokens in-browser instead.

**Rules for Claude Code:**
- Do not spend more than 30 minutes on any single animation before moving on. Clean fade-ins with stagger are perfectly fine. Don't let perfect block done.
- The Alfred architecture diagram animation (sequential build, pulse/glow) is a stretch goal. Attempt it, but if it's eating time, fall back to a clean static SVG that uses the design system colors and looks great without motion.
- The three accent color options are nice-to-have. If implementing the swappable system takes too long, pick the one that looks best, ship it, and the developer can request changes later.
- When in doubt: content first, layout second, animation third. A fully-built site with basic transitions will always beat a half-built site with incredible animations.

---

## Part 2: Design Philosophy — "The Zip"

This section is critical. The developer is not a designer. These agents ARE the design team. Everything below should inform the `design-director` and `motion-choreographer` agents deeply.

### Reference Sites & What to Extract From Each

**landonorris.com** — The animation standard. Study how this site creates *momentum*: scroll-triggered reveals that feel like the page is unfolding, not loading. Staggered timing so elements arrive in sequence, not all at once. Hover states that feel physical — things shift, glow, respond. The site never feels static even when you stop scrolling. Extract the *principles* (choreography, rhythm, stagger, momentum), not the specific techniques (WebGL, 3D helmets).

**linear.app** — The layout and typography standard. Dense information presented with clarity. Generous whitespace that feels confident, not empty. Type hierarchy that guides the eye without shouting. Subtle gradients and glows that add depth without clutter. Monochromatic foundation with a single accent color doing surgical work.

**vercel.com** — The surface and elevation standard. How dark backgrounds create depth through subtle surface differentiation. Card treatments that feel like physical objects (soft borders, slight elevation). Crisp type on dark backgrounds. The overall feeling of precision.

**anthropic.com/docs** — The content standard. How technical content is presented with clarity and breathing room. Section spacing. How diagrams integrate with prose.

### The Animation Language

This is what separates "nice dark portfolio" from "this site has zip." Define this explicitly in the design system and enforce it in every component.

**Entrance choreography:**
- Elements should reveal on scroll using Intersection Observer
- Staggered timing: when multiple elements enter together (like project cards), they should arrive in sequence with 80-120ms delays between each, not simultaneously
- Direction: elements should enter with a slight upward motion (translate-y from 20-30px) combined with opacity fade. NOT slide in from the sides. Subtle vertical lift.
- Easing: use a custom ease-out curve that decelerates smoothly — not linear, not bouncy. Something like `cubic-bezier(0.16, 1, 0.3, 1)` (sharp initial movement that settles gently)
- Duration: 500-700ms for reveals. Fast enough to feel snappy, slow enough to register.

**Hover interactions:**
- Project cards: subtle scale (1.015-1.02), border color shifts to accent, slight shadow/glow increase. The card should feel like it lifts toward you.
- Links: color transition to accent, maybe a subtle underline animation (width expands from left)
- All hover transitions: 200-250ms ease-out. Instant enough to feel responsive, smooth enough to feel polished.

**Page transitions:**
- Content should fade in on initial page load with a very short stagger sequence
- Navigation between / and /alfred should feel smooth — consider a subtle crossfade or a shared layout transition

**Scroll behavior:**
- Smooth scroll for anchor navigation (CSS scroll-behavior: smooth)
- NO scroll hijacking. NO parallax. The user controls their scroll.
- Consider a subtle scroll-linked opacity on the hero text — fades slightly as user scrolls past, giving a sense of depth

**The Alfred architecture diagram:**
- This should animate. Not all at once — the flow should build sequentially: agent 1 appears → connection line draws → agent 2 appears → etc.
- On initial view (scroll reveal), play the build sequence once
- Subtle pulse or glow on the active flow path to suggest the system is alive

**What NOT to do:**
- No parallax
- No scroll-jacking or custom scroll physics
- No bouncing/elastic animations
- No loading spinners or skeleton screens (it's static — it should be instant)
- No particle effects or background animations (the content IS the visual interest)
- No cursor effects
- Nothing that makes anyone seasick or feels like it's showing off tech for tech's sake

### Color Tokens

```
Background:         #0A0A0A (near-black, the canvas)
Surface:            #141414 (cards, elevated elements)
Surface-hover:      #1A1A1A (card hover state background)
Border:             #222222 (subtle card borders, dividers)
Border-hover:       [accent color at 40% opacity]

Text-primary:       #EDEDED (headings, body text)
Text-secondary:     #888888 (subtitles, metadata, dates)
Text-muted:         #555555 (placeholders, disabled states)

Accent:             TBD — see accent color options below
Accent-muted:       [accent at 60% opacity] (subtle uses)
Accent-glow:        [accent at 15% opacity] (card hover glow, diagram pulse)
```

#### Accent Color — Developer Chooses

Implement all three as CSS custom property sets that can be swapped with a single variable change. Present them to the developer on the style guide page.

- **Option A — Muted blue:** `#4A9EE5` — Dev/Anthropic-adjacent. Safe, professional, familiar.
- **Option B — Warm amber:** `#E5A04A` — Distinctive, warm, memorable. Stands out from every other dark dev portfolio.
- **Option C — Soft green:** `#4AE5A0` — Calm, different, nods to terminal aesthetics.

Use accent sparingly: links, hover border shifts, the "Built with Claude Code" text, diagram highlights. Accent should feel like a precise instrument, not paint.

### Typography

- **Font:** Inter or Geist (Vercel's font). Claude Code should evaluate which renders better for this use case and recommend one. Load via `next/font` for performance.
- **Scale:**
  - Hero text (the one-liner): 36-48px depending on viewport, weight 500
  - Section headings: 24-28px, weight 600
  - Card titles: 20px, weight 600
  - Body/paragraphs: 17-18px, weight 400
  - Metadata/labels: 14px, weight 400, text-secondary color
- **Line height:** 1.6 for body, 1.3 for headings
- **Max content width:** ~720px for prose. Cards can span wider.
- **Restraint rule:** Bold (600) is for headings and card titles ONLY. Body text is always 400. If something needs emphasis in body text, use accent color, not bold.

### Spacing System

Base unit: 4px. Use multiples.

- Section vertical padding: 96-128px (24-32 units). Sections should BREATHE.
- Card internal padding: 32-40px (8-10 units)
- Between cards: 24-32px (6-8 units)
- Between text elements within a card: 16px (4 units)
- Page horizontal padding: 24px mobile, scales up to max-width container on desktop

### Cards

- Background: surface color (#141414)
- Border: 1px solid #222222
- Border radius: 12px
- On hover: border color transitions to accent-muted, subtle scale (1.015), faint accent-glow box-shadow
- Internal structure: consistent across all project cards (title, subtitle, sections, links)
- Image areas: placeholder treatment (surface-hover background, dashed border in border color, centered muted text "Screenshot coming soon"). Should look intentional, not broken.

### Responsive Breakpoints

- Mobile: 375px minimum
- Tablet: 768px
- Desktop: 1024px+
- Max content width: 1200px (cards area), 720px (prose)
- Cards: single column on mobile, 2-column grid on desktop. Alfred card can span full width to signal hero status.

---

## Part 3: Site Content

### Page 1: Landing (`/`)

#### Header
- "Vignesh Jeyaraman" — understated, left-aligned or centered. Not huge. Weight 500, text-primary color.
- Nav links right-aligned or after name: LinkedIn · GitHub · Instagram
  - LinkedIn: https://www.linkedin.com/in/vigneshj92/
  - GitHub: https://github.com/jv92admin/alfredagain
  - Instagram: # (placeholder)
- Minimal. No logo. No hamburger menu on mobile — just stack the links or use a simple row.

#### Hero One-Liner
> I build things I shouldn't be able to build alone.

Centered. Larger type (hero text scale). Room to breathe above and below. This is the first thing anyone reads — give it presence through spacing and typography, not through being enormous.

Consider: on page load, this text could reveal with a subtle character-by-character or word-by-word stagger. Very fast (the whole line in under 800ms), very subtle. If it feels gimmicky, skip it — a simple fade-up is fine.

#### Intro Block
> Having worked in big tech for the last decade, building was always the thing I couldn't do myself. I had ideas constantly — but between bureaucracy, resourcing fights, and the fact that I simply couldn't code, they stayed ideas. The summer of 2025 changed how I think about what one person can do. I started building — not to prove anything, but because for the first time, I could. This site is where I document what I'm learning.

Regular body text. Max-width ~680-720px. Centered in viewport. Text-primary color. Generous margin below before the projects section.

#### Projects Section

Section heading: "What I'm Building" — section heading scale, text-primary, left-aligned with cards.

**Card 1: Alfred** (hero treatment — visually distinguished, larger or full-width)
- **Title:** Alfred
- **Subtitle:** A domain-agnostic multi-agent orchestration framework
- **Problem:** I love to cook. I hate planning what to cook. What if I could build an AI that handles meal planning, recipe management, and grocery coordination for me?
- **Built:** What started as a kitchen assistant became a five-agent orchestration system with deterministic state management, a three-layer context model, and a pluggable domain protocol — now being extracted into a standalone Python package.
- **Learned:** Why deterministic systems matter when LLMs are nondeterministic. How to design abstraction boundaries that actually hold. That the hardest problem in orchestration isn't the agents — it's the state.
- **Links:** [Learn more →](/alfred) · [GitHub](https://github.com/jv92admin/alfredagain)
- **Image area:** Placeholder for app screenshot

**Card 2: RYESVP**
- **Title:** RYESVP
- **Subtitle:** A social events platform
- **Problem:** I love going to live music and comedy. I hate texting five group chats about it. What if Instagram met Ticketmaster — a social events page where your friends could just see what's happening and show up?
- **Built:** A full-stack production app serving 70+ active users. My first real project with Claude Code.
- **Learned:** Hosting, database architecture, row-level security, AI-as-a-service for metadata tagging, agentic dev workflows, and the fundamentals of Claude Code.
- **Links:** [Visit RYESVP.me →](https://ryesvp.me)
- **Image area:** Placeholder for app screenshot

**Card 3: Record Player Visualizer**
- **Title:** Record Player Visualizer
- **Subtitle:** Hardware meets software
- **Problem:** I wanted my record player to show what's playing and generate visuals in real time. No reason other than it would be cool.
- **Built:** A Raspberry Pi-powered audio fingerprinting and visualization system.
- **Learned:** Debugging hardware with an AI pair programmer is a uniquely humbling experience. Also that the best projects start with "no reason other than it would be cool."
- **Image area:** Placeholder for photo/image

**Card 4: FPL Assistant** (with "Coming Soon" badge)
- **Title:** FPL Assistant
- **Subtitle:** Fantasy Premier League analytics
- **Badge:** "Coming Soon" — small, accent color text or subtle accent border badge
- **Problem:** I've played FPL for 10+ years and I've never cracked the top 100K. Something had to change.
- **Building:** A "pundit on demand" — a BI framework that sits on top of Alfred's orchestration engine, using live FPL data.
- **Will prove:** That Alfred's architecture is genuinely domain-agnostic — not just a kitchen app with abstractions bolted on.
- **Image area:** Placeholder for mockup

**Card 5: vignesh.ai** (OPTIONAL — developer decides during build)
- **Title:** vignesh.ai
- **Subtitle:** This site
- Include only if the site looks polished enough. Developer will decide.

#### Footer
- Links repeated: LinkedIn · GitHub · Instagram
- "Built with Claude Code" — small text, text-secondary color. Quiet acknowledgment, not a badge.
- Minimal. Generous top padding to separate from last card.

---

### Page 2: Alfred Deep-Dive (`/alfred`)

More technical and detailed. This page can feel denser — it's for people who clicked "Learn more" and want substance.

#### Header
- "Alfred" — large, section heading or bigger
- "A domain-agnostic multi-agent orchestration framework" — subtitle, text-secondary
- [GitHub](https://github.com/jv92admin/alfredagain) link

#### Section 1: Architecture Overview

**An animated flow diagram showing the five agents and how a request flows through.**

The five agents in order:
1. **Understand** (Memory Manager) — Retrieves relevant context, resolves references
2. **Think** (Planner) — Analyzes the request, creates an execution plan
3. **Act** (Executor) — Executes the plan by calling domain functions
4. **Reply** (Presenter) — Formats results into a natural response
5. **Summarize** (Compressor) — Compresses the interaction into memory

Include: Quick mode routing — simple queries skip Think and go directly to Act.

**Diagram requirements:**
- Clean horizontal or vertical flow
- Built with SVG or styled HTML/CSS (not an image)
- **Ideal:** Animates on scroll reveal — agents appear sequentially, connection lines draw between them. Subtle pulse or glow on the active flow path.
- **Fallback (if animation eats time):** A clean, static SVG diagram using design system colors. Well-styled static is better than janky animated. Attempt animation first, but timebox it — if it's not working in 30 minutes, ship static and move on.
- Uses design system colors: surface backgrounds for agent boxes, accent for flow lines, text-primary for labels

#### Section 2: Technical Details

**SessionIdRegistry — State Management**
- The core innovation: a deterministic state layer translating human-readable references to UUIDs
- Prevents LLM hallucination by grounding all state references in real data
- **Visual needed:** A flow/table showing: User says "my pasta recipe" → Understand resolves to `recipe_1` → SessionIdRegistry maps to `uuid-abc-123` → Act uses UUID for database operations

**Three-Layer Context Model**
- Entity Context: references, labels, status of active objects
- Conversation Context: message history and dialogue state
- Reasoning Context: execution summaries, decision logs, plan outcomes
- **Visual needed:** A stacked/layered diagram showing what each layer holds

**Domain Protocol — DomainConfig**
- ~50 methods defining how a domain plugs into Alfred
- CRUD middleware pattern for consistent data operations
- **Visual needed:** Interface boundary diagram — Alfred core on one side, domain implementation on the other, DomainConfig as the contract
- Key insight: swap the domain config, keep everything else identical

**Generated Content Lifecycle**
- How AI-generated content moves through states: generated → pending → approved/rejected
- User always has control over what gets persisted
- **Visual needed:** Simple flowchart of the lifecycle

All visuals on this page should follow the same animation language as the rest of the site — reveal on scroll, consistent timing, design system colors.

#### Section 3: What I Learned

Short — 3-4 brief paragraphs, not a bullet list.

Content:
- The hardest problem in LLM orchestration isn't making agents work — it's preventing them from corrupting shared state
- Deterministic systems and nondeterministic models are in constant tension. The SessionIdRegistry was my answer: never let the LLM guess an ID
- Abstraction boundaries only work if you test them by actually swapping domains — which is why FPL exists as a project
- Building with AI taught me that the skill ceiling isn't technical knowledge — it's the ability to decompose problems clearly enough that an LLM can execute them

---

## Part 4: Agent Architecture

This site needs a small, design-focused agent team. Not seven agents — four, each with a clear job.

### Agent 1: `design-director`

**Purpose:** Own the visual identity. This agent IS the designer. It maintains the design system, makes visual decisions, and is the authority on whether something "looks right."

**Responsibilities:**
- Maintain `.claude/docs/design-system.md` with all tokens, usage rules, and component styling specs
- Maintain a component registry within the design system doc (this site is small enough that a separate registry doc is overkill — keep it unified)
- Translate the design philosophy in this kickoff doc into concrete, implementable specs
- When the developer gives visual feedback ("the cards feel too heavy" or "the spacing on mobile is off"), translate that into specific token/style changes
- Audit the codebase for design system violations: hardcoded colors, inconsistent spacing, off-system typography
- Decide component structure: when something should be a shared component vs. page-specific markup
- Define the style guide page that renders tokens visually for developer review
- If browser inspection tools are available (ChromeDevTools MCP), audit rendered output against the design system

**Tool access:** Read-only on source code. Write access to design documentation files only. Browser inspection tools if available.

**Model:** Strongest available. Design judgment is this agent's entire purpose.

**System prompt must emphasize:**
- This agent is opinionated. It makes specific visual decisions and defends them. "Clean and modern" is not an acceptable output.
- Every token has a usage rule, not just a value.
- The animation language defined in this kickoff doc (Part 2) is canon. This agent enforces it.
- When the developer communicates in vibes ("it should feel like X"), this agent translates to tokens and specs.
- The Lando Norris site is the motion reference. Linear is the layout reference. Vercel is the surface reference. This agent knows what to extract from each.

---

### Agent 2: `motion-choreographer`

**Purpose:** Own all animation, transition, and interaction behavior. This agent is what makes the site "zip." It is the specialist responsible for the difference between "nice portfolio" and "wow."

**Why a separate agent?** Animation is a design discipline with its own concerns: timing, easing, sequence, rhythm, performance. Combining it with visual design dilutes both. The `design-director` decides what things look like. The `motion-choreographer` decides how things move.

**Responsibilities:**
- Define the animation system: entrance transitions, hover states, scroll triggers, page transitions, diagram animations
- Specify exact timing values: durations, delays, stagger intervals, easing curves
- Define the Intersection Observer configuration: thresholds, root margins, which elements trigger when
- Design the Alfred architecture diagram animation sequence
- Ensure all animations perform well: prefer CSS transforms and opacity (GPU-composited), avoid animating layout properties, test at 60fps
- Review implementations for animation quality: timing feel, stagger rhythm, easing appropriateness
- Define reduced-motion alternatives (respect `prefers-reduced-motion` media query — motion-reduced users get instant reveals, no transitions)
- Own the animation utility library: reusable hooks/components for scroll reveals, stagger groups, hover transitions

**Tool access:** Read-only on source code. Write access to animation documentation and animation utility files.

**Model:** Strong model. Motion design requires nuanced judgment about timing and feel.

**System prompt must emphasize:**
- The animation language from Part 2 of this doc is the starting point. This agent refines and extends it.
- Less is more. Every animation must earn its place. If removing an animation makes the experience worse, keep it. If removing it makes no difference, cut it.
- Performance is non-negotiable. Janky animations are worse than no animations. Test everything.
- The reference is landonorris.com's sense of MOMENTUM — not its specific techniques (WebGL, 3D). The translation for this portfolio is: choreographed scroll reveals, physical-feeling hover states, sequential diagram builds, and overall rhythm.
- Stagger timing is this agent's most important tool. The difference between "all cards fade in at once" and "cards arrive one by one with 100ms gaps" is the difference between generic and polished.
- Always provide `prefers-reduced-motion` fallbacks.
- **Pragmatism rule:** If an animation is taking more than 30 minutes to get right, simplify. A clean fade-up with stagger will always look good. The site should ship before the animations are perfect. This agent advises on the ideal — but it must also know when to say "ship the simple version."

---

### Agent 3: `page-builder`

**Purpose:** Implement pages and components based on the spec (this doc), the design system, and the motion choreography. This is the hands-on-keyboard agent.

**Responsibilities:**
- Build the landing page and Alfred deep-dive page as specified
- Follow the design system for all visual decisions — no ad-hoc values
- Implement animations as specified by `motion-choreographer` — no improvised motion
- Build responsive layouts that work at 375px and 1440px+
- Use `next/image` for all images, `next/font` for typography
- Write semantic HTML (proper heading hierarchy, landmarks, alt text)
- Build the SVG/CSS architecture diagram for the Alfred page
- Build the style guide page for developer review
- Implement image placeholders per spec (surface-hover background, dashed border, centered muted text)
- Optimize for Lighthouse performance — static site should score 95+

**Tool access:** Full — read, write, edit, bash, glob, grep. This agent builds and runs code.

**Model:** Can use a cost-efficient model (Sonnet) for straightforward implementation. Escalate for the Alfred diagram or complex responsive layouts.

**System prompt must emphasize:**
- Before writing ANY visual code, read the design system document. Before adding ANY motion, read the motion choreography specs.
- Never hardcode colors, spacing, or typography values. Always reference tokens.
- Never improvise animations. If the motion spec doesn't cover a case, flag it — don't invent.
- Semantic HTML matters: proper `<section>`, `<article>`, `<nav>`, heading levels, ARIA labels where needed.
- Test at both 375px and 1440px during development, not as an afterthought.

---

### Agent 4: `qa-reviewer`

**Purpose:** Final quality gate. Reviews code for design compliance, responsiveness, performance, animation quality, and accessibility basics.

**Responsibilities:**
- Check every visual element against the design system: correct tokens, correct spacing, correct typography
- Check every animation against the motion spec: correct timing, correct easing, correct stagger
- Check responsive behavior at 375px and 1440px breakpoints
- Check Lighthouse scores (performance, accessibility, SEO)
- Check that `prefers-reduced-motion` is respected
- Check semantic HTML (heading hierarchy, landmarks, alt text for images)
- Check all links work (correct hrefs, external links open in new tab)
- Check the site renders correctly without JavaScript (graceful degradation for static content)
- Produce a structured report: blockers, suggestions, good practices observed

**Tool access:** Read-only. Read, grep, glob. No code modification.

**Model:** Strong model for nuanced review quality.

**System prompt must emphasize:**
- Design system compliance is the #1 review priority. Every hardcoded color, spacing, or font value is a blocker.
- Animation quality is #2. Wrong timing or missing stagger is a blocker.
- Be specific and constructive. "Line 47: hardcoded `#141414` — use `var(--surface)` instead" not "fix the colors."
- Acknowledge what's done well. This calibrates future builder behavior.

---

### Future Agent Ideas

Not needed now. Add when the site grows or when specific needs emerge:

- **`accessibility`** — Dedicated WCAG compliance reviewer. Add if the site grows beyond two pages or if the developer wants to ensure rigorous a11y.
- **`performance`** — Dedicated performance profiler. Useful if images/assets grow heavy or animation performance degrades.
- **`seo`** — Portfolio sites benefit from good SEO. An agent to manage meta tags, OpenGraph images, structured data, sitemap. Consider adding before launch.
- **`content-editor`** — If the developer wants help refining copy, a dedicated writing/editing agent could review prose for clarity and impact.

---

## Part 5: Build Sequence

> **Time management:** Refer to the Ship Priority section at the top of this doc. Steps 5-6 (page building) are higher priority than Step 3 (animation system) being perfect. If Step 3 is taking too long, ship basic fade-in reveals and move to page building. You can always come back and polish animations after both pages exist.

### Step 1: Initialize

1. `npx create-next-app@latest` — app router, TypeScript, Tailwind (or CSS modules — Claude Code should recommend based on the design token system needs)
2. `git init`, `.gitignore`, verify the scaffold runs
3. `git commit -m "chore: initial scaffold"`

🟡 **PAUSE — Confirm with developer: Tailwind vs CSS modules? Claude Code should recommend what works best for token-based design with the animation requirements.**

---

### Step 2: Design System

1. Create `.claude/docs/design-system.md` — populate with ALL tokens from Part 2 of this doc, plus component specs, plus the component registry section
2. Implement tokens in code (CSS custom properties or Tailwind config extension)
3. Create a style guide page (`/style-guide`) — **OPTIONAL, cut if time-crunched** — that renders:
   - Color palette (all token swatches with labels)
   - All three accent color options side by side
   - Typography scale (each size/weight rendered)
   - Spacing scale (visual blocks)
   - Card component in default and hover state
   - Sample animation (a scroll-reveal demo)
4. `git commit -m "feat: design system and style guide"`

🟡 **PAUSE — Show the developer the style guide page. Get feedback. Specifically: which accent color? Does the typography feel right? Do the cards feel right? Iterate before building pages.**

---

### Step 3: Animation System

1. Create the motion choreography documentation (timing values, easing curves, stagger intervals)
2. Build reusable animation utilities:
   - A scroll-reveal hook/component using Intersection Observer
   - A stagger group wrapper
   - Hover transition CSS/classes
   - Reduced-motion handling
3. Demo the animations on the style guide page
4. `git commit -m "feat: animation system and utilities"`

🟡 **PAUSE — Show the developer the animation demos. Do the scroll reveals feel right? Is the stagger timing satisfying? Too fast? Too slow? Iterate.**

---

### Step 4: Agent Files

1. Create `.claude/agents/` with all four agent files: `design-director.md`, `motion-choreographer.md`, `page-builder.md`, `qa-reviewer.md`
2. System prompts should reference the actual project stack, file structure, and design system implementation
3. Create `.claude/docs/future-agents.md` with the ideas listed above
4. `git commit -m "config: agent definitions"`

🟡 **PAUSE — Show agent files to developer for review.**

---

### Step 5: Build Landing Page

1. `page-builder` implements the full landing page per the spec in Part 3
2. Header, hero one-liner, intro block, project cards, footer
3. All animations wired up per motion specs
4. Responsive at 375px and 1440px
5. `git commit -m "feat: landing page"`

---

### Step 6: Build Alfred Page

1. `page-builder` implements the Alfred deep-dive page per spec
2. The architecture diagram is the centerpiece — invest time here
3. Technical detail sections with supporting visuals
4. "What I Learned" closing section
5. `git commit -m "feat: alfred deep-dive page"`

---

### Step 7: QA Review

1. `qa-reviewer` does a full review of both pages
2. Fix any blockers found
3. Check Lighthouse scores
4. Check responsive behavior
5. Check animation quality and timing
6. `git commit -m "fix: qa review fixes"`

---

### Step 8: Deploy

1. Verify Vercel connection (domain vignesh.ai already purchased and connected)
2. Push to trigger deploy
3. Test on real domain: check SSL, check both pages, check mobile
4. `git commit -m "chore: production deploy"`

---

## Part 6: CLAUDE.md Template

Create this at the project root after stack decisions:

```markdown
# vignesh.ai

## What This Is
Personal portfolio site. Two pages: landing (/) and Alfred deep-dive (/alfred). Static, deployed on Vercel.

## Critical Rules
- Read `.claude/docs/design-system.md` before writing any visual code.
- Never hardcode colors, spacing, typography, or animation values. Use tokens.
- Never improvise animations. Follow the motion choreography in the design system.
- Test responsive at 375px and 1440px.
- All images use next/image. Fonts use next/font.

## Design References
- Motion: landonorris.com (momentum, choreography, stagger)
- Layout: linear.app (density, whitespace, type hierarchy)
- Surfaces: vercel.com (dark mode depth, card treatment)

## Agent Pipeline
design-director → motion-choreographer → page-builder → qa-reviewer
See `.claude/docs/` for full agent architecture and design system.

## Project Structure
[Fill after scaffold]

## Stack
[Fill after Step 1 decisions]
```

---

## Checklist — "Done"

- [ ] Landing page loads fast, looks polished, reads clearly
- [ ] One-liner and intro create curiosity within 5 seconds
- [ ] Project cards tell a story (Problem → Built → Learned)
- [ ] Cards animate in with staggered scroll reveals
- [ ] Hover states feel physical and satisfying
- [ ] Alfred card is visually distinguished and links to /alfred
- [ ] Alfred page has a clean, animated architecture diagram
- [ ] Alfred technical sections have supporting visuals
- [ ] Site is responsive and looks great at 375px and 1440px
- [ ] All animations respect prefers-reduced-motion
- [ ] Design tokens used everywhere — zero hardcoded values
- [ ] Lighthouse performance 95+
- [ ] "Built with Claude Code" sits subtly in the footer
- [ ] Deployed and live at vignesh.ai
- [ ] Developer chose an accent color and is happy with it
