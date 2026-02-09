# Future Agent Ideas

These agents are not needed for the initial two-page build. Consider adding them as the site grows or when specific needs emerge.

## accessibility

Dedicated WCAG compliance reviewer. Add if the site grows beyond two pages or if rigorous a11y audit is desired. Would review: color contrast ratios, keyboard navigation, screen reader compatibility, ARIA usage, focus management. Complements qa-reviewer by going deeper on a11y than a general review can.

## performance

Dedicated performance profiler. Add if images/assets grow heavy or animation performance degrades. Would review: Core Web Vitals, bundle size analysis, image optimization, animation frame rates, render-blocking resources. Uses Lighthouse CI and Chrome DevTools Performance panel data.

## seo

Portfolio sites benefit from good SEO. Would manage: meta tags, OpenGraph images, structured data (JSON-LD), sitemap.xml, robots.txt, canonical URLs. Consider adding before launch to ensure discoverability. Low effort, high impact for a portfolio site.

## content-editor

Dedicated writing and editing agent. Would review prose for clarity, impact, conciseness, and consistent voice. Useful if the developer wants help refining project descriptions, the hero one-liner, or the "What I Learned" sections. Could also help with blog posts if the site expands to include writing.
