import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerGroup from "@/components/StaggerGroup";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alfred — Vignesh Jeyaraman",
  description:
    "A domain-agnostic multi-agent orchestration framework. Deep dive into the architecture, state management, and design decisions behind Alfred.",
  openGraph: {
    title: "Alfred — Vignesh Jeyaraman",
    description:
      "A domain-agnostic multi-agent orchestration framework.",
    url: "https://vignesh.ai/alfred",
    siteName: "vignesh.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfred — Vignesh Jeyaraman",
    description:
      "A domain-agnostic multi-agent orchestration framework.",
  },
};

export default function AlfredPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-6 max-w-[900px] mx-auto">
        {/* ================================
            Header Section
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
              A domain-agnostic multi-agent orchestration framework
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
            Section 1: Architecture Overview
            ================================ */}
        <section className="pb-24">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">
              Architecture Overview
            </h2>
            <p className="text-[var(--text-secondary)] mb-10 max-w-[700px]">
              Alfred processes every request through a five-agent pipeline.
              Each agent has a single responsibility, and the framework
              orchestrates data flow between them.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10"
            >
              <ArchitectureDiagram />
            </div>
          </ScrollReveal>
        </section>

        {/* ================================
            Section 2: Technical Details
            ================================ */}
        <section className="pb-24">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-12">
              Technical Details
            </h2>
          </ScrollReveal>

          {/* --- SessionIdRegistry --- */}
          <ScrollReveal>
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                SessionIdRegistry -- State Management
              </h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                The core innovation: a deterministic state layer that translates
                human-readable references to UUIDs. It prevents LLM hallucination
                by grounding all state references in real data. The LLM never
                guesses an identifier -- every reference is resolved through the
                registry.
              </p>

              {/* Resolution flow visual */}
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                <div className="p-4 sm:p-6">
                  <p
                    className="text-xs text-[var(--text-muted)] mb-4 uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Reference Resolution Flow
                  </p>
                  <StaggerGroup staggerDelay={120} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0">
                    <FlowStep
                      label="User"
                      value={`"my pasta recipe"`}
                      accent={false}
                    />
                    <FlowArrow />
                    <FlowStep
                      label="Understand"
                      value="recipe_1"
                      accent
                    />
                    <FlowArrow />
                    <FlowStep
                      label="SessionIdRegistry"
                      value="uuid-abc-123"
                      accent
                    />
                    <FlowArrow />
                    <FlowStep
                      label="Act"
                      value="DB operation with UUID"
                      accent={false}
                    />
                  </StaggerGroup>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* --- Three-Layer Context Model --- */}
          <ScrollReveal>
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                Three-Layer Context Model
              </h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Alfred maintains three distinct layers of context, each serving a
                different purpose in the orchestration pipeline. This separation
                ensures agents receive only the context they need, reducing token
                usage and preventing cross-contamination between concerns.
              </p>

              {/* Stacked layers visual */}
              <StaggerGroup staggerDelay={150} className="flex flex-col gap-0">
                <ContextLayer
                  position="top"
                  label="Entity Context"
                  description="References, labels, status of active objects"
                  color="var(--accent)"
                />
                <ContextLayer
                  position="middle"
                  label="Conversation Context"
                  description="Message history and dialogue state"
                  color="var(--accent-muted)"
                />
                <ContextLayer
                  position="bottom"
                  label="Reasoning Context"
                  description="Execution summaries, decision logs, plan outcomes"
                  color="var(--text-muted)"
                />
              </StaggerGroup>
            </div>
          </ScrollReveal>

          {/* --- Domain Protocol --- */}
          <ScrollReveal>
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                Domain Protocol -- DomainConfig
              </h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Approximately 50 methods define how a domain plugs into Alfred.
                The CRUD middleware pattern ensures consistent data operations
                across any domain. The key insight: swap the domain config, keep
                everything else identical. This is how Alfred stays
                domain-agnostic.
              </p>

              {/* Interface boundary visual */}
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 w-full rounded-md border border-[var(--border)] bg-[var(--background)] p-4 text-center">
                    <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                      Alfred Core
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Agents, orchestration, state
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div
                      className="rounded-md border border-[var(--accent)] px-3 py-1.5"
                      style={{ background: "var(--accent-glow)" }}
                    >
                      <p
                        className="text-xs font-semibold text-[var(--accent)]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        DomainConfig
                      </p>
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      ~50 methods
                    </p>
                  </div>

                  <div className="flex-1 w-full rounded-md border border-dashed border-[var(--border)] bg-[var(--background)] p-4 text-center">
                    <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                      Domain
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Recipes, FPL, or any domain
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* --- Generated Content Lifecycle --- */}
          <ScrollReveal>
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                Generated Content Lifecycle
              </h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                AI-generated content moves through defined states before
                persisting. The user always has control over what gets saved.
                Nothing generated by the LLM is committed without explicit
                approval.
              </p>

              {/* Lifecycle flowchart */}
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
                <StaggerGroup staggerDelay={120} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
                  <LifecycleStep label="Generated" variant="muted" />
                  <FlowArrow />
                  <LifecycleStep label="Pending" variant="accent" />
                  <FlowArrow />
                  <div className="flex flex-col gap-2 items-center">
                    <LifecycleStep label="Approved" variant="success" />
                    <span className="text-xs text-[var(--text-muted)]">or</span>
                    <LifecycleStep label="Rejected" variant="error" />
                  </div>
                </StaggerGroup>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ================================
            Section 3: What I Learned
            ================================ */}
        <section className="pb-24">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-8">
              What I Learned
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-col gap-6 max-w-[700px]">
              <p className="text-[17px] text-[var(--text-primary)] leading-relaxed">
                The hardest problem in LLM orchestration is not making agents
                work -- it is preventing them from corrupting shared state. Once
                you have multiple agents reading and writing to the same context,
                every assumption about data integrity gets tested. The bugs are
                subtle: an agent resolves a reference that no longer exists, or
                two agents write conflicting updates to the same entity.
              </p>
              <p className="text-[17px] text-[var(--text-primary)] leading-relaxed">
                Deterministic systems and nondeterministic models are in constant
                tension. The SessionIdRegistry was my answer: never let the LLM
                guess an ID. Every reference flows through a resolution layer that
                maps human language to real database identifiers. This single
                decision eliminated an entire class of hallucination bugs.
              </p>
              <p className="text-[17px] text-[var(--text-primary)] leading-relaxed">
                Abstraction boundaries only work if you test them by actually
                swapping domains -- which is why FPL exists as a project. Building
                a second domain on top of Alfred forced me to find every place
                where recipe-specific logic had leaked through the interface. The
                protocol got better each time something broke.
              </p>
              <p className="text-[17px] text-[var(--text-primary)] leading-relaxed">
                Building with AI taught me that the skill ceiling is not technical
                knowledge -- it is the ability to decompose problems clearly
                enough that an LLM can execute them. The better I got at breaking
                problems into precise, unambiguous steps, the more I could build
                in less time.
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* ================================
   Sub-components: visuals
   ================================ */

function FlowStep({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: boolean;
}) {
  return (
    <div className="flex-1 min-w-0 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-center">
      <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
        {label}
      </p>
      <p
        className={`text-xs truncate ${accent ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {value}
      </p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center shrink-0 w-6 h-6 sm:w-8">
      {/* Horizontal arrow on sm+, vertical on mobile */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="hidden sm:block"
        aria-hidden="true"
      >
        <line
          x1="2"
          y1="10"
          x2="16"
          y2="10"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <polygon points="14,6 20,10 14,14" fill="var(--accent)" />
      </svg>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="block sm:hidden"
        aria-hidden="true"
      >
        <line
          x1="10"
          y1="2"
          x2="10"
          y2="16"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <polygon points="6,14 10,20 14,14" fill="var(--accent)" />
      </svg>
    </div>
  );
}

function ContextLayer({
  position,
  label,
  description,
  color,
}: {
  position: "top" | "middle" | "bottom";
  label: string;
  description: string;
  color: string;
}) {
  const roundedClass =
    position === "top"
      ? "rounded-t-lg"
      : position === "bottom"
        ? "rounded-b-lg"
        : "";

  return (
    <div
      className={`border border-[var(--border)] bg-[var(--surface)] px-6 py-4 ${roundedClass} ${position !== "top" ? "-mt-px" : ""}`}
      style={{ borderLeftColor: color, borderLeftWidth: "3px" }}
    >
      <p className="text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </p>
      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
        {description}
      </p>
    </div>
  );
}

function LifecycleStep({
  label,
  variant,
}: {
  label: string;
  variant: "muted" | "accent" | "success" | "error";
}) {
  const styles: Record<string, { border: string; text: string; bg: string }> = {
    muted: {
      border: "var(--border)",
      text: "var(--text-secondary)",
      bg: "var(--background)",
    },
    accent: {
      border: "var(--accent)",
      text: "var(--accent)",
      bg: "var(--accent-glow)",
    },
    success: {
      border: "var(--accent)",
      text: "var(--accent)",
      bg: "var(--accent-glow)",
    },
    error: {
      border: "var(--error)",
      text: "var(--error)",
      bg: "var(--error-glow)",
    },
  };

  const s = styles[variant];

  return (
    <div
      className="rounded-md px-4 py-2 text-center"
      style={{
        border: `1px solid ${s.border}`,
        background: s.bg,
      }}
    >
      <p
        className="text-sm font-medium"
        style={{ color: s.text, fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
    </div>
  );
}
