"use client";

import ProjectCard from "./ProjectCard";
import ScrollIndicator from "./ScrollIndicator";
import StaggerGroup from "./StaggerGroup";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "alfred(again)",
    subtitle: "A domain-agnostic multi-agent orchestration framework",
    problem:
      "I love to cook. I hate planning what to cook. What if I could build an AI that handles meal planning, recipe management, and grocery coordination for me?",
    built: "The first Alfred didn't survive its own complexity — I learned more from killing it than building it. The second attempt became a five-agent orchestration system with deterministic state management, a three-layer context model, and a pluggable domain protocol — now being extracted into a standalone Python package.",
    learned:
      "Why deterministic systems matter when LLMs are nondeterministic. How to design abstraction boundaries that actually hold. That the hardest problem in orchestration isn't the agents — it's the state.",
    links: [
      { label: "Learn more", href: "/alfred", external: false },
      {
        label: "Try Alfred",
        href: "https://alfredagain-production.up.railway.app/",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/jv92admin/alfredagain",
        external: true,
      },
    ],
    isHero: true,
    image: "/images/alfred.jpg",
    imageType: "portrait" as const,
  },
  {
    title: "ryesvp",
    titleDisplay: (
      <>
        r<span style={{ color: "var(--accent)" }}>yes</span>vp
      </>
    ),
    subtitle: "A social events platform",
    problem:
      "I love going to live music and comedy. I hate texting five group chats about it. What if Instagram met Ticketmaster — a social events page where your friends could just see what's happening and show up?",
    built: "A full-stack production app serving 50+ active users. My first real project with Claude Code.",
    learned:
      "Hosting, database architecture, row-level security, AI-as-a-service for metadata tagging, agentic dev workflows, and the fundamentals of Claude Code.",
    links: [
      {
        label: "Visit RYESVP.me",
        href: "https://ryesvp.me",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/jv92admin/ryesvp",
        external: true,
      },
    ],
    image: "/images/ryesvp.png",
    imageType: "portrait" as const,
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
          of it was built to be a product or a company.
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
