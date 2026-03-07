import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import RefBoundaryDiagram from "@/components/RefBoundaryDiagram";
import ContextLayersDiagram from "@/components/ContextLayersDiagram";
import ContentLifecycleDiagram from "@/components/ContentLifecycleDiagram";
import UseCaseShowcase from "@/components/UseCaseShowcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alfred — Vignesh Jeyaraman",
  description:
    "Domain-agnostic LLM orchestration engine that snaps onto any database-backed system. Deep dive into the architecture, identity model, and design decisions behind Alfred.",
  openGraph: {
    title: "Alfred — Vignesh Jeyaraman",
    description:
      "Domain-agnostic LLM orchestration that snaps onto any database-backed system.",
    url: "https://vignesh.ai/alfred",
    siteName: "vignesh.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfred — Vignesh Jeyaraman",
    description:
      "Domain-agnostic LLM orchestration that snaps onto any database-backed system.",
  },
};

export default function AlfredPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-6 max-w-[900px] mx-auto">
        {/* ================================
            Section 1: Hero
            ================================ */}
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
          <ScrollReveal>
            <h1
              className="font-semibold tracking-tight text-[var(--text-primary)]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)" }}
            >
              Alfred
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-lg text-[var(--text-secondary)] mt-3 max-w-[600px]">
              Agentic orchestration for LLMs that read and write real systems
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-[var(--text-secondary)] mt-4 max-w-[650px] leading-relaxed">
              Alfred is an orchestration engine that sits between an LLM and any
              database-backed system. You define what your data looks like, how
              intent maps to subdomains, and what persona the LLM should adopt
              in each context. Alfred handles routing, planning, tool execution,
              memory, and safety. It&apos;s published on PyPI and
              domain-agnostic by design.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div
              className="inline-flex items-center gap-2 mt-6 rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="text-sm text-[var(--text-muted)]">$</span>
              <code className="text-sm text-[var(--text-primary)]">pip install alfredagain</code>
              <span className="text-xs font-medium text-[var(--accent)] border border-[var(--accent-muted)] rounded-full px-2 py-0.5 ml-2">
                v2.4.2
              </span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://github.com/jv92admin/alfredagain"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline transition-colors"
                style={{ transitionDuration: "var(--duration-hover)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                View on GitHub
              </a>
              <a
                href="https://pypi.org/project/alfredagain/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline transition-colors"
                style={{ transitionDuration: "var(--duration-hover)" }}
              >
                View on PyPI
              </a>
            </div>
          </ScrollReveal>
        </section>

        {/* ================================
            Section 2: Depth of Customization
            ================================ */}
        <section className="pb-24">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
              Depth of Customization
            </h2>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-6">
              Tools, subdomains, and personas combine endlessly
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="max-w-[700px]">
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                A domain defines its entities — what lives in the database.
                It groups those entities into subdomains — logical clusters
                that map to how users actually think and talk. Each subdomain
                gets its own persona: a set of instructions that shape how the
                LLM reasons, what it prioritizes, and how it speaks.
              </p>
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                On top of that, a domain supplies middleware — hooks that run
                before and after every read or write — and custom tools that
                extend what the LLM can do beyond standard CRUD. Semantic
                search, ingredient lookups, email composition, chart
                generation — whatever the domain needs.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                These layers multiply each other. A domain with six subdomains,
                each with its own persona, middleware that converts currencies
                and strips sensitive fields, and a custom tool for sending
                emails — that&apos;s not configuration. That&apos;s composition.
                The surface area for domain-specific behavior is intentionally
                deep.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ================================
            Section 3: Three Domains as Proof
            ================================ */}
        <section className="pb-24">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
              Three Domains, One Engine
            </h2>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-8">
              Same engine. Different minds.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <UseCaseShowcase />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <blockquote className="border-l-2 border-[var(--accent)] pl-4 mt-10">
              <p className="text-[var(--text-primary)] italic">
                You don&apos;t trust an abstraction until you&apos;ve
                tested its limits.
              </p>
            </blockquote>
          </ScrollReveal>
        </section>

        {/* ================================
            Section 4: The Graph
            ================================ */}
        <section className="pb-24">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
              The Graph
            </h2>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-6">
              How work actually flows
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-[var(--text-secondary)] mb-4 max-w-[700px] leading-relaxed">
              Requests route, they don&apos;t chain. Simple reads skip planning
              entirely — Understand detects quick-mode and sends them straight
              to execution. Complex tasks expand into a plan with parallelizable
              step groups. Every path converges at a response and persisted state.
            </p>
            <p className="text-[var(--text-secondary)] mb-10 max-w-[700px] leading-relaxed">
              Five agents, each with a single responsibility. Understand
              resolves references and curates what stays in memory. Think
              decomposes intent into typed steps and decides whether to execute
              immediately, propose first, or ask for clarification. Act loops
              tools — CRUD operations plus any domain-specific tools — with
              retry limits and parallel execution within groups. Reply formats
              outcomes for humans. Summarize compresses the turn and persists
              the entity registry for next time.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
              aria-label="Pipeline diagram showing how requests route through Alfred's five agents across four distinct paths"
            >
              <ArchitectureDiagram />
            </div>
          </ScrollReveal>
        </section>

        {/* ================================
            Section 5: How It Keeps LLMs Honest
            ================================ */}
        <section className="pb-24">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
              How It Keeps LLMs Honest
            </h2>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-6">
              Entity identity, approval, and layered context
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-[var(--text-secondary)] mb-10 max-w-[700px] leading-relaxed">
              LLMs hallucinate identifiers, write without permission, and lose
              track of what they&apos;ve done. Alfred addresses each with a
              specific mechanism: deterministic entity refs, an approval model
              for generated content, and three independent context layers that
              give each agent only what it needs.
            </p>
          </ScrollReveal>

          {/* Subsection A: Entity Identity & Approval */}
          <ScrollReveal delay={150}>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Entity Identity & Approval
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="max-w-[700px] mb-10">
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                <span className="text-[var(--text-primary)] font-medium">
                  Deterministic entity refs
                </span>{" "}
                — Every database record gets a human-readable ref like{" "}
                <span
                  className="text-[var(--accent)] text-sm"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  recipe_1
                </span>{" "}
                or{" "}
                <span
                  className="text-[var(--accent)] text-sm"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  deal_3
                </span>
                . Counters are monotonic and never reset within a session.
                LLMs never see UUIDs.
              </p>
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                <span className="text-[var(--text-primary)] font-medium">
                  Strict CRUD boundary
                </span>{" "}
                — Agents operate in ref space. The database operates in UUID
                space. Translation happens at the boundary through a single
                registry, not inside agents.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                <span className="text-[var(--text-primary)] font-medium">
                  Approval-aware persistence
                </span>{" "}
                — Generated content lives in memory with a{" "}
                <span
                  className="text-[var(--accent)] text-sm"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  gen_*
                </span>{" "}
                prefix. Nothing writes to the database without explicit user
                promotion. The lifecycle is: generate, hold in memory, present
                for review, persist only on approval.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10"
              aria-label="Boundary diagram showing how references translate to UUIDs through the SessionIdRegistry"
            >
              <RefBoundaryDiagram />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div
              className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10"
              aria-label="State machine diagram showing the generated content lifecycle from creation through user review to persistence or removal"
            >
              <p
                className="text-xs text-[var(--text-muted)] mb-6 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Content Lifecycle
              </p>
              <ContentLifecycleDiagram />
            </div>
          </ScrollReveal>

          {/* Subsection B: Layered Context */}
          <ScrollReveal delay={100}>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-16 mb-4">
              Layered Context
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="max-w-[700px] mb-10">
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                Alfred maintains three independent layers of context, each
                serving a different purpose in the pipeline. This separation
                ensures agents receive only the context they need, reducing
                token waste and preventing cross-contamination between concerns.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                <span className="text-[var(--text-primary)] font-medium">
                  Entity Context
                </span>{" "}
                is deterministic — refs, labels, lifecycle state. Updated by CRUD
                operations, not LLM decisions.{" "}
                <span className="text-[var(--text-primary)] font-medium">
                  Conversation Context
                </span>{" "}
                is compressed — last three turns in full, older turns summarized.{" "}
                <span className="text-[var(--text-primary)] font-medium">
                  Reasoning Context
                </span>{" "}
                is auditable — what was planned, executed, and changed.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10"
              aria-label="Layer stack diagram showing three context layers and which agents read or write each layer"
            >
              <ContextLayersDiagram />
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
