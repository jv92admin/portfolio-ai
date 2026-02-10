# Technical Illustration Guide

> How to build technical diagrams on vignesh.ai. Read this before creating or modifying any diagram component.

---

## Design Tokens

All diagrams inherit the site's token system. Never hardcode colors — use CSS variables or reference these values through your Tailwind/style setup.

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `background` | `#0A0A0A` | Page background, diagram canvas |
| `surface` | `#141414` | Node backgrounds, card fills |
| `surface-elevated` | `#1E1E1E` | Hover states, active elements |
| `border` | `#2A2A2A` | Node borders, secondary lines |
| `text-primary` | `#EDEDED` | Node titles, primary labels |
| `text-secondary` | `#888888` | Subtitles, descriptions, annotations |
| `accent` | TBD | Primary flow arrows, active states, emphasis borders |
| `accent-muted` | TBD at ~40% opacity | Secondary connections, background highlights |

### Typography

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Node title | 15–16px | 600 | text-primary |
| Node subtitle / role | 13px | 400 | text-secondary |
| Edge label | 12–13px | 500 | text-secondary |
| Annotation / footnote | 12px | 400 | text-secondary |
| Section header inside diagram | 13px | 600 | text-secondary, uppercase, letter-spacing 0.05em |

### Spacing

| Context | Value |
|---------|-------|
| Node internal padding | 16px horizontal, 12px vertical |
| Gap between nodes (horizontal flow) | 48–64px |
| Gap between nodes (vertical flow) | 32–40px |
| Gap between layers (stacked layout) | 2px (tight stacking) or 16px (separated) |
| Arrow overshoot past node edge | 8px minimum before arrowhead |

---

## Visual Elements

### Node Box

The primary building block. Represents an agent, component, process step, or entity.

```
┌─────────────────────┐
│  Title              │  ← text-primary, 15–16px, font-weight 600
│  subtitle           │  ← text-secondary, 13px, font-weight 400
└─────────────────────┘
```

- Background: `surface`
- Border: 1px solid `border`
- Border radius: 8px
- Padding: 16px horizontal, 12px vertical
- On hover (if interactive): background → `surface-elevated`, transition 200ms ease-out

### Flow Arrow

Connects nodes to show data flow, execution order, or relationships.

- Stroke: `accent` color, 2px width
- Arrowhead: filled triangle, 8px
- Corners: rounded joins when path bends (no sharp 90° angles — use 4px radius on bends)
- Secondary arrows (optional paths, fallbacks): `border` color, 1.5px width, open arrowhead

### Edge Label

Text on or near an arrow explaining the routing condition or data transformation.

- Position: centered on the arrow path, with a small `background`-colored padding box behind it (4px padding) so text doesn't overlap the line
- Style: 12–13px, font-weight 500, `text-secondary`
- For routing conditions: use a slightly different treatment — italic or enclosed in brackets: `[quick mode]`

### Layer Block

Full-width horizontal band representing a logical layer, tier, or boundary.

- Background: alternating `surface` and `background` for adjacent layers
- Border: 1px solid `border` on top and bottom edges only (no side borders)
- Internal padding: 20px horizontal, 16px vertical
- Layer label: top-left, 13px, font-weight 600, `text-secondary`, uppercase

### State Node

For state machines and lifecycle diagrams. Represents a state rather than a process.

- Shape: rounded pill (border-radius equal to half the height, or 999px)
- Background: `surface`
- Border: 1px solid `border` (default), 1px solid `accent` (active/current state)
- Padding: 8px horizontal, 6px vertical
- Text: 13–14px, centered

### Boundary Line

Separates domains, packages, or logical regions.

- Style: dashed, 2px stroke, `border` color
- Label: positioned along the line, same treatment as edge labels
- Use sparingly — if you need more than two boundary lines in a diagram, reconsider the layout

### Decision Diamond (use rarely)

For explicit branching points in flow diagrams.

- Rotated square, 24×24px
- Background: `surface`
- Border: 1px solid `accent`
- Prefer: routing labels on arrows over explicit diamond nodes. Diamonds add visual noise. Use them only when a single point has 3+ outgoing paths and the branch needs emphasis.

---

## Diagram Types & Layout Rules

### Pipeline / Flow Diagram

**When:** Showing execution order, data flow through stages, request processing.

- Layout: **horizontal**, left to right
- Nodes connected by flow arrows
- Branching paths: use vertical offset (different rows) to show parallel paths, converging back to a shared endpoint
- The Act loop (or any loop): show a curved arrow from the node back to itself, or a short arrow looping below/above the node. Label the loop condition.

**Responsive behavior:** On narrow screens (< 768px), reflow to vertical (top to bottom). Maintain the same node order.

### Layer / Stack Diagram

**When:** Showing hierarchical layers, context model, architectural tiers.

- Layout: **vertical stack**, full width
- Layers as layer blocks, stacked with 2px gaps (tight) or 16px gaps (when annotations needed between layers)
- Connection lines from external elements (agents, consumers) attach to the right or left edge of the relevant layer
- If showing which agents consume which layers: place agents in a column to one side, draw horizontal connection lines to the layers they read. Use solid lines for primary consumption, dotted for secondary/optional.

**Responsive behavior:** Layers remain stacked (already vertical). Agent connection column moves from side to below the stack on narrow screens.

### Boundary / Split Diagram

**When:** Showing package boundaries, domain separation, interface protocols.

- Layout: **two columns** (or regions) side by side
- Each region is a large rounded rectangle containing listed capabilities
- The protocol/interface between them: a vertical bar, membrane, or narrow column between the two regions
- Import direction: a one-way arrow along the bottom or top, clearly labeled

**Responsive behavior:** Two columns stack vertically on narrow screens. The interface element becomes a horizontal bar between them.

### State Machine

**When:** Showing lifecycle states, content status transitions.

- Layout: **left to right** for linear progressions with one branch point
- Use state nodes (pills) for states, flow arrows for transitions
- The user decision point: visually emphasize — larger node, accent border, or a small icon
- Loops (modification cycle): curved arrow returning to a previous state

**Responsive behavior:** Reflow to vertical if needed. Maintain state order.

---

## Animation

Diagrams should animate on entrance using the site's scroll-triggered reveal pattern.

### Entrance Animation

- **Trigger:** Element enters viewport (IntersectionObserver, threshold ~0.15)
- **Initial state:** opacity 0, translateY 20–30px
- **Final state:** opacity 1, translateY 0
- **Duration:** 500–700ms
- **Easing:** cubic-bezier(0.16, 1, 0.3, 1)
- **Stagger:** If a diagram has multiple distinct groups (e.g., layers in a stack), stagger their entrance by 80–120ms per group

### Internal Animation (optional, use sparingly)

- Flow arrows can draw in (stroke-dashoffset animation) after nodes have appeared
- Use only if it clarifies the flow direction — don't animate just to animate
- Duration: 400ms per arrow segment, starting 200ms after the connected nodes appear

### Reduced Motion

Always provide `prefers-reduced-motion` fallback:
- Skip translateY, skip stagger
- Use opacity-only fade (200ms) or show immediately

---

## Component Structure

Each diagram should be a self-contained React component. Structure:

```
DiagramName/
  DiagramName.tsx    ← The component
  (no separate CSS — use Tailwind utilities or inline styles)
```

Or, for simpler diagrams, a single component file is fine.

### Implementation Approach

**Prefer SVG for diagrams with lines, arrows, and precise positioning.** SVG gives you exact control over arrow paths, curved connections, and responsive scaling via `viewBox`.

**Use HTML/CSS for simpler layouts** where the diagram is essentially a styled grid or flex layout (like the layer stack or the boundary split). These are easier to make responsive and accessible.

**Hybrid is fine:** SVG for the connection lines/arrows overlaid on HTML-positioned nodes. This gives you the best of both — semantic, accessible node content with precise graphical connections.

### Responsive Pattern

1. Define the diagram at a "desktop" aspect ratio using a container with `max-width`
2. For diagrams that must reflow: use a media query or container query at 768px to switch from horizontal to vertical layout
3. For diagrams that just scale: use SVG `viewBox` and let it scale proportionally
4. Always test that labels remain legible at the smallest supported width (320px)

### Accessibility

- Nodes should be semantic HTML where possible (not purely SVG text)
- Provide an `aria-label` on the diagram container describing what the diagram shows
- Flow arrows are decorative — they don't need individual aria labels
- Ensure sufficient color contrast: text-primary on surface meets WCAG AA (currently ~10:1, well above 4.5:1 minimum)

---

## Common Mistakes to Avoid

1. **Too many nodes.** If a diagram has more than 8–10 nodes, it's trying to show too much. Split into two diagrams or simplify.

2. **Decorative complexity.** No gradients on nodes, no drop shadows, no glow effects. The dark surface + subtle border aesthetic relies on restraint. If it looks like a SaaS marketing diagram, it's overdone.

3. **Arrow spaghetti.** If arrows cross each other, rethink the layout. Rearrange nodes so flows don't intersect. If unavoidable, use a bridge/hop indicator where lines cross.

4. **Inconsistent node sizes.** Nodes in the same diagram should be the same width (or close to it). Variable widths create visual chaos. Titles can vary in length — padding absorbs the difference.

5. **Labels that are sentences.** Node titles: 1–3 words. Subtitles: 3–8 words max. Edge labels: 2–4 words. If you need more, put it in the prose around the diagram, not inside it.

6. **Orphaned diagrams.** Every diagram should be preceded by a paragraph that sets up why this structure matters, and followed by paragraphs that walk through the details. A diagram alone communicates structure but not significance.

7. **Pixel-pushing for pixel art.** These are technical diagrams, not illustrations. Precise alignment matters, but don't spend time on decorative details. The diagram's job is to make structure legible, not to be beautiful.

---

## Checklist Before Shipping a Diagram

- [ ] Uses design tokens (no hardcoded colors)
- [ ] Node titles are 1–3 words, subtitles under 8 words
- [ ] No more than 10 nodes
- [ ] No crossing arrows
- [ ] Scroll-triggered entrance animation with stagger
- [ ] `prefers-reduced-motion` fallback
- [ ] Legible at 320px width
- [ ] `aria-label` on container
- [ ] Preceded and followed by explanatory prose
