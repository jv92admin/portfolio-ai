# vignesh.ai — Update Spec

## 1. Navigation Changes

**Header:** Name on left (links to /), hamburger icon (☰) on right. Remove LinkedIn/GitHub/Instagram from header.

**Hamburger opens sidebar** (slide from right):
- Projects (anchor scroll to projects section on /)
- Alfred (/alfred)
- Style Guide (/style-guide)
- Bottom of sidebar: LinkedIn, GitHub, Instagram links
- Clicking name or anywhere outside closes sidebar

## 2. Intro Copy — Replace Existing

Replace the current intro paragraph with:

> I've always had ideas for things I wanted to build. I just couldn't code. In 2025, that barrier disappeared. I started building — not to prove anything, but because nothing was stopping me anymore.

Shorter. No job titles, no "big tech," no "bureaucracy." Three sentences.

## 3. Add Line Before Projects Section

Between the intro and "What I'm Building," add:

> Everything below started as a personal problem or a curiosity — none of it was built to be a product or a company.

Style as body text, text-secondary color. Not a heading — a quiet framing line.

## 4. Add Project Card: vignesh.ai

Insert as the **second to last card** (before FPL, after Record Player Visualizer).

- **Title:** vignesh.ai
- **Subtitle:** This site
- **Problem:** I've never had a personal brand. Never needed one. But I'd also never built a website, defined a design system, or orchestrated a multi-agent frontend build.
- **Built:** The site you're looking at — dark mode, responsive, designed and shipped in a day using a four-agent Claude Code pipeline: design director, motion choreographer, page builder, and QA reviewer.
- **Learned:** Design orchestration with AI agents, Playwright MCP for visual testing, devtools integration, and that defining a design system is the same muscle as scoping a product requirements doc.
- **Links:** [View style guide →](/style-guide)

## 5. FPL Card — Move to Last + Visually Mute

- FPL Assistant is now the final card
- Reduce opacity or desaturate to visually signal "coming soon / not yet built"
- Keep the "Coming Soon" badge but make the whole card feel like a sketch compared to the finished cards above it

## 6. Mobile Scroll Indicator

Below the intro, add a subtle scroll indicator (small downward chevron or "scroll" text) that:
- Only appears on mobile viewports
- Fades out once the user starts scrolling
- Signals that project content exists below the fold

## 7. Footer

Keep "Built with Claude Code" in footer. Remove social links from footer (they now live in the sidebar).
