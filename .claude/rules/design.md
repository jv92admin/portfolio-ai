# Design Rules

## Mandatory

- Read `.claude/docs/design-system.md` before writing any visual code.
- Never hardcode colors, spacing, typography, or animation values. Use design tokens (CSS custom properties).
- Never improvise animations. Follow the motion choreography specs.
- Test responsive at 375px and 1440px.
- All images use `next/image`. Fonts use `next/font`.

## Token Enforcement

If a value exists as a design token, use the token. Do not write raw values like:
- `#4AE5A0` — use `var(--color-accent)`
- `16px` for spacing — use the spacing scale tokens
- `font-weight: 600` — use typography tokens

## Priority Order

Content first, layout second, animation third. Ship before polish.

## References

- **Motion:** landonorris.com — momentum, choreography, stagger, rhythm
- **Layout:** linear.app — density with clarity, generous whitespace
- **Surfaces:** vercel.com — dark mode depth, card treatments
- **Content:** anthropic.com/docs — technical content with clarity
