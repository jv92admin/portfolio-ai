"use client";

import ProjectCard from "./ProjectCard";
import StaggerGroup from "./StaggerGroup";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "Alfred",
    subtitle: "A domain-agnostic multi-agent orchestration framework",
    problem:
      "I love to cook. I hate planning what to cook. What if I could build an AI that handles meal planning, recipe management, and grocery coordination for me?",
    built: "What started as a kitchen assistant became a five-agent orchestration system with deterministic state management, a three-layer context model, and a pluggable domain protocol — now being extracted into a standalone Python package.",
    learned:
      "Why deterministic systems matter when LLMs are nondeterministic. How to design abstraction boundaries that actually hold. That the hardest problem in orchestration isn't the agents — it's the state.",
    links: [
      { label: "Learn more →", href: "/alfred", external: false },
      {
        label: "GitHub",
        href: "https://github.com/jv92admin/alfredagain",
        external: true,
      },
    ],
    isHero: true,
  },
  {
    title: "RYESVP",
    subtitle: "A social events platform",
    problem:
      "I love going to live music and comedy. I hate texting five group chats about it. What if Instagram met Ticketmaster — a social events page where your friends could just see what's happening and show up?",
    built: "A full-stack production app serving 70+ active users. My first real project with Claude Code.",
    learned:
      "Hosting, database architecture, row-level security, AI-as-a-service for metadata tagging, agentic dev workflows, and the fundamentals of Claude Code.",
    links: [
      {
        label: "Visit RYESVP.me →",
        href: "https://ryesvp.me",
        external: true,
      },
    ],
  },
  {
    title: "Record Player Visualizer",
    subtitle: "Hardware meets software",
    problem:
      "I wanted my record player to show what's playing and generate visuals in real time. No reason other than it would be cool.",
    built: "A Raspberry Pi-powered audio fingerprinting and visualization system.",
    learned:
      'Debugging hardware with an AI pair programmer is a uniquely humbling experience. Also that the best projects start with "no reason other than it would be cool."',
  },
  {
    title: "FPL Assistant",
    subtitle: "Fantasy Premier League analytics",
    badge: "Coming Soon",
    problem:
      "I've played FPL for 10+ years and I've never cracked the top 100K. Something had to change.",
    building:
      "A \"pundit on demand\" — a BI framework that sits on top of Alfred's orchestration engine, using live FPL data.",
    willProve:
      "That Alfred's architecture is genuinely domain-agnostic — not just a kitchen app with abstractions bolted on.",
  },
];

export default function ProjectCards() {
  const heroProject = projects.find((p) => p.isHero);
  const otherProjects = projects.filter((p) => !p.isHero);

  return (
    <section className="px-6 pb-24 max-w-[1200px] mx-auto">
      <ScrollReveal>
        <h2 className="text-2xl sm:text-[28px] font-semibold text-[var(--text-primary)] mb-8 leading-tight">
          What I&apos;m Building
        </h2>
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
