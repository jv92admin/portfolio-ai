"use client";

import ProjectCard from "./ProjectCard";
import ScrollIndicator from "./ScrollIndicator";
import StaggerGroup from "./StaggerGroup";
import ScrollReveal from "./ScrollReveal";
import ArchitectureDiagram from "./ArchitectureDiagram";
import BeforeAfterSlider from "./BeforeAfterSlider";

const projects = [
  {
    title: "alfred(again)",
    subtitle: "A domain-agnostic multi-agent orchestration framework",
    problem:
      "Most agent frameworks demo well but break in production. I wanted to build one that actually orchestrates real systems — with deterministic state, strict identity boundaries, and a protocol that forces you to think before you ship a new domain.",
    built: "A five-agent orchestration engine on LangGraph, published on PyPI as alfredagain (v2.4.2). 73-method DomainConfig protocol. 164 tests. Three validated domains: Kitchen (reference implementation), FPL (analytics), and CRM (enterprise consulting).",
    learned:
      "Why deterministic systems matter when LLMs are nondeterministic. How to design abstraction boundaries that actually hold. That the hardest problem in orchestration isn't the agents — it's the state.",
    links: [
      { label: "Learn more", href: "/alfred", external: false },
      {
        label: "PyPI",
        href: "https://pypi.org/project/alfredagain/",
        external: true,
      },
      {
        label: "Kitchen Demo",
        href: "https://alfredagain-production.up.railway.app/",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/jv92admin/alfredagain",
        external: true,
      },
    ],
    installCommand: "pip install alfredagain",
    isHero: true,
    deepDiveHref: "/alfred",
    customVisual: <ArchitectureDiagram />,
  },
  {
    title: "Lark",
    titleDisplay: (
      <>
        Lark{" "}
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          (RIP ryesvp)
        </span>
      </>
    ),
    subtitle: "Social events, rebuilt from scratch",
    problem:
      "I go to 100+ shows a year. There's no good way to find out if your friends are interested in the same ones — so I built one.",
    built: "A social events platform where you follow venues and friends, see what's happening, and make plans together. Auth, social feeds, event discovery, RSVP — the full stack. Then I rebuilt it from scratch: an LLM enrichment pipeline that scrapes raw event data nightly and uses GPT-4o-mini to categorize events, extract performers, and direct targeted Spotify and Knowledge Graph lookups. Claude Code enforces design consistency through a four-agent pipeline and ten specialized skills.",
    learned:
      "How to build auth and social feeds from zero. How much UX matters when real people use your app. And that rebuilding something from scratch — with a real design system and an LLM pipeline — teaches you more than building it the first time.",
    links: [
      {
        label: "Visit lark.show",
        href: "https://lark.show",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/jv92admin/ryesvp",
        external: true,
      },
    ],
    customVisual: (
      <BeforeAfterSlider
        pairs={[
          {
            label: "Event Feed",
            before: {
              src: "/images/lark/ryesvp_discover.png",
              alt: "RYSVP event feed — light mode with green accents",
            },
            after: {
              src: "/images/lark/lark_homepage.png",
              alt: "Lark event feed — dark monochrome design",
            },
          },
          {
            label: "Event Detail",
            before: {
              src: "/images/lark/ryesvp_plan.png",
              alt: "RYSVP plan view — green buttons and warm tones",
            },
            after: {
              src: "/images/lark/lark_event.png",
              alt: "Lark event detail — monochrome with event art as hero",
            },
          },
        ]}
      />
    ),
  },
  {
    title: "trackviewer",
    subtitle: "Hardware meets software",
    problem:
      "I wanted my record player to show what's playing and generate visuals in real time. No reason other than it would be cool.",
    built: "A Raspberry Pi-powered audio fingerprinting and visualization system.",
    learned:
      'Debugging hardware with an AI pair programmer is a uniquely humbling experience. Also that the best projects start with "no reason other than it would be cool."',
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jv92admin/trackviewer",
        external: true,
      },
    ],
    image: "/images/trackviewer_demo.jpg",
  },
  {
    title: "vignesh.ai",
    subtitle: "This site",
    problem:
      "I've never had a personal brand. Never needed one. But I'd also never built a website, defined a design system, or orchestrated a multi-agent frontend build.",
    built: "The site you're looking at — dark mode, responsive, designed and shipped in a day using a four-agent Claude Code pipeline: design director, motion choreographer, page builder, and QA reviewer.",
    learned:
      "Design orchestration with AI agents, Playwright MCP for visual testing, devtools integration, and that defining a design system is the same muscle as scoping a product requirements doc.",
    links: [
      {
        label: "View style guide",
        href: "/style-guide",
        external: false,
      },
    ],
    image: "/images/styleguide.png",
  },
  {
    title: "fplpundit",
    subtitle: "Fantasy Premier League analytics",
    badge: "Coming Soon",
    problem:
      "I've played FPL for 10+ years and I've never cracked the top 100K. Something had to change.",
    building:
      "A \"pundit on demand\" — a BI framework that sits on top of alfred(again)'s orchestration engine, using live FPL data.",
    willProve:
      "That alfred(again)'s architecture is genuinely domain-agnostic — not just a kitchen app with abstractions bolted on.",
    isMuted: true,
  },
];

export default function ProjectCards() {
  const heroProject = projects.find((p) => p.isHero);
  const otherProjects = projects.filter((p) => !p.isHero);

  return (
    <section id="projects" className="px-6 pb-24 max-w-[1200px] mx-auto">
      <ScrollReveal>
        <h2 className="text-2xl sm:text-[28px] font-semibold text-[var(--text-primary)] mb-3 leading-tight">
          What I&apos;m Building
        </h2>
        <p className="text-[15px] sm:text-base text-[var(--text-secondary)] mb-2 leading-relaxed">
          Everything below started as a personal problem or a curiosity — none
          of it was built to be commercial.
        </p>
        <ScrollIndicator />
      </ScrollReveal>

      {/* Alfred — hero card, full width */}
      {heroProject && (
        <ScrollReveal className="mb-6">
          <ProjectCard {...heroProject} />
        </ScrollReveal>
      )}

      {/* Remaining projects — 2-column grid */}
      <StaggerGroup
        staggerDelay={100}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {otherProjects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </StaggerGroup>
    </section>
  );
}
