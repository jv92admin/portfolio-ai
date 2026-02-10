import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import RefBoundaryDiagram from "@/components/RefBoundaryDiagram";
import ContextLayersDiagram from "@/components/ContextLayersDiagram";
import FeatureGrid from "@/components/FeatureGrid";
import ContentLifecycleDiagram from "@/components/ContentLifecycleDiagram";
import DomainBoundaryDiagram from "@/components/DomainBoundaryDiagram";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alfred — Vignesh Jeyaraman",
  description:
    "Agentic orchestration for LLMs that read and write real systems. Deep dive into the architecture, state management, and design decisions behind Alfred.",
  openGraph: {
    title: "Alfred — Vignesh Jeyaraman",
    description:
      "Agentic orchestration for LLMs that read and write real systems.",
    url: "https://vignesh.ai/alfred",
    siteName: "vignesh.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfred — Vignesh Jeyaraman",
    description:
      "Agentic orchestration for LLMs that read and write real systems.",
  },
};

export default function AlfredPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-6 max-w-[900px] mx-auto">
        {/* ================================
            Page Header
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
            <p className="text-[var(--text-secondary)] mt-2 max-w-[600px] italic">
              A domain-agnostic execution engine — cooking was just the test
              case.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <a
              href="https://github.com/jv92admin/alfredagain"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm text-[var(--accent)] hover:underline transition-colors"
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
          </ScrollReveal>
        </section>

        {/* ================================
            Section 1: The Graph
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
              entirely and take a fast path. Complex tasks expand into a plan and
              an execution loop. Every path converges at a response and persisted
              state.
            </p>
            <p className="text-[var(--text-secondary)] mb-10 max-w-[700px] leading-relaxed">
              Five agents, each with a single responsibility. Understand resolves
              memory and references. Think plans what should happen. Act executes
              steps, loops tools, and enforces limits. Reply formats outcomes for
              humans. Summarize records what happened for the next turn.
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
            Section 2: Tools & Database Objects
            ================================ */}
        <section className="pb-24">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
              Tools & Database Objects
            </h2>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-6">
              Letting an LLM touch a real system safely
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="max-w-[700px] mb-10">
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                <span className="text-[var(--text-primary)] font-medium">
                  Deterministic entity refs
                </span>{" "}
                — <code className="text-[var(--accent)] text-sm" style={{ fontFamily: "var(--font-mono)" }}>recipe_1</code>,{" "}
                <code className="text-[var(--accent)] text-sm" style={{ fontFamily: "var(--font-mono)" }}>inv_3</code>,{" "}
                <code className="text-[var(--accent)] text-sm" style={{ fontFamily: "var(--font-mono)" }}>gen_recipe_1</code>.
                LLMs never see UUIDs.
              </p>
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                <span className="text-[var(--text-primary)] font-medium">
                  Strict CRUD boundary
                </span>{" "}
                — Agents operate in ref space. Database operates in UUID space.
                Translation happens at the boundary, not inside agents.
              </p>
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                <span className="text-[var(--text-primary)] font-medium">
                  Approval-aware persistence
                </span>{" "}
                — Generated content lives in memory (<code className="text-[var(--accent)] text-sm" style={{ fontFamily: "var(--font-mono)" }}>gen_*</code>).
                Nothing writes without explicit user promotion.
              </p>
              <p className="text-[var(--text-muted)] text-sm mt-6">
                Prevents identity hallucination, phantom writes, and accidental
                overwrites.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10"
              aria-label="Boundary diagram showing how references translate to UUIDs through the SessionIdRegistry"
            >
              <RefBoundaryDiagram />
            </div>
          </ScrollReveal>
        </section>

        {/* ================================
            Section 3: What "Context" Means
            ================================ */}
        <section className="pb-24">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
              What &ldquo;Context&rdquo; Means
            </h2>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-6">
              Why memory is layered, not dumped
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="max-w-[700px] mb-10">
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                Alfred maintains three independent layers of context, each
                serving a different purpose in the orchestration pipeline. This
                separation ensures agents receive only the context they need,
                reducing token usage and preventing cross-contamination between
                concerns.
              </p>
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                <span className="text-[var(--text-primary)] font-medium">
                  Entity Context
                </span>{" "}
                is deterministic — refs, labels, lifecycle state. Updated by CRUD
                operations, not LLM decisions.{" "}
                <span className="text-[var(--text-primary)] font-medium">
                  Conversation Context
                </span>{" "}
                is compressed — last 3 turns full, older turns summarized.{" "}
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

        {/* ================================
            Section 4: Nifty (but Necessary) Tools
            ================================ */}
        <section className="pb-24">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
              Nifty (but Necessary) Tools
            </h2>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-8">
              Features enabled by the architecture
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <FeatureGrid />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div
              className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10"
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
        </section>

        {/* ================================
            Section 5: Abstraction (the point)
            ================================ */}
        <section className="pb-24">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
              Abstraction
            </h2>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-6">
              Cooking was the test case
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="max-w-[700px] mb-10">
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                The orchestration graph, entity identity, CRUD execution, context
                construction, and prompt assembly are all abstracted in core.
                Domains supply their own entities, schemas, prompts, personas,
                and optional middleware like semantic search or enrichment.
              </p>
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                The protocol is DomainConfig: 66 methods (24 abstract, 42 with
                defaults), plus three extension points — DatabaseAdapter,
                CRUDMiddleware, and SubdomainCompiler. The import boundary is
                enforced: core never imports domain.
              </p>
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                The same refs, the same graph, the same approval model could
                power fantasy sports (players, teams, transfers), personal
                finance (accounts, transactions, budgets), or any
                entity-oriented domain.
              </p>
              <blockquote className="border-l-2 border-[var(--accent)] pl-4 mt-6">
                <p className="text-[var(--text-primary)] italic">
                  You don&apos;t trust an abstraction until you build a second
                  implementation.
                </p>
              </blockquote>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10"
              aria-label="Boundary diagram showing the separation between Alfred Core and Domain implementations through the protocol interface"
            >
              <DomainBoundaryDiagram />
            </div>
          </ScrollReveal>
        </section>

        {/* ================================
            Section 6: Why This Exists
            ================================ */}
        <section className="pb-24">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
              Why This Exists
            </h2>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-8">
              What I wanted to understand
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <ul className="flex flex-col gap-4 max-w-[700px]">
              <li className="text-[17px] text-[var(--text-primary)] leading-relaxed">
                How to let LLMs act on real systems without lying
              </li>
              <li className="text-[17px] text-[var(--text-primary)] leading-relaxed">
                How to manage identity, state, and memory explicitly
              </li>
              <li className="text-[17px] text-[var(--text-primary)] leading-relaxed">
                How to move beyond &ldquo;agent demos&rdquo; into orchestration
                that works
              </li>
            </ul>
            <p className="text-[var(--text-secondary)] mt-8">
              This is the result.
            </p>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
