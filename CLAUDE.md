# vignesh.ai

## What This Is

Personal portfolio site for Vignesh Jeyaraman. Two pages: landing (`/`) and Alfred deep-dive (`/alfred`). Optionally a style guide (`/style-guide`). Pure static, deployed on Vercel at vignesh.ai. No database, no CMS, no auth.

**The job:** When someone clicks vignesh.ai from a resume, they should think "this person builds things and thinks clearly" within 5 seconds.

## Critical Rules

- Read `.claude/docs/design-system.md` before writing any visual code.
- Never hardcode colors, spacing, typography, or animation values. Use design tokens (CSS custom properties).
- Never improvise animations. Follow the motion choreography specs.
- Test responsive at 375px and 1440px.
- All images use `next/image`. Fonts use `next/font`.
- Content first, layout second, animation third. Ship before polish.
- Do not spend more than 30 minutes on any single animation before simplifying.

## Design References

- **Motion:** landonorris.com — momentum, choreography, stagger, rhythm. Extract principles, not techniques.
- **Layout:** linear.app — density with clarity, generous whitespace, type hierarchy, surgical accent color.
- **Surfaces:** vercel.com — dark mode depth through surface differentiation, card treatments that feel physical, precision.
- **Content:** anthropic.com/docs — technical content with clarity and breathing room.

## Agent Pipeline

```
design-director -> motion-choreographer -> page-builder -> qa-reviewer
```

| Agent | Role | Tool Access |
|-------|------|-------------|
| design-director | Visual identity, design system, token enforcement | Read-only code, write docs |
| motion-choreographer | Animation, transitions, interaction behavior | Read-only code, write animation files |
| page-builder | Page and component implementation | Full access |
| qa-reviewer | Quality gate: design compliance, responsive, performance | Read-only |

See `.claude/agents/` for full agent system prompts.

## Key Documentation

- `.claude/docs/design-system.md` — All design tokens, component specs, and usage rules
- `.claude/docs/future-agents.md` — Planned agent expansions
- `docs/vignesh-ai-kickoff.md` — Full project spec and content

## Ship Priority

1. **Landing page** with all content, clean cards, basic scroll reveals — this IS the site
2. **Alfred page** with static diagram and technical sections
3. **Animation polish** — stagger timing, physical hover states, diagram animation sequence
4. **Style guide page** — useful for iteration, but optional

When in doubt: content first, layout second, animation third.

## Project Structure

<!-- Fill after Next.js scaffold is created -->

## Stack

<!-- Fill after Step 1 decisions: Tailwind vs CSS modules, font choice, etc. -->
