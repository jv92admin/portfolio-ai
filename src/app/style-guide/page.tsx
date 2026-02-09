"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerGroup from "@/components/StaggerGroup";
import ProjectCard from "@/components/ProjectCard";

/* ─── Data ──────────────────────────────────────────────── */

const colorTokens = [
  { name: "Background", variable: "--background", value: "#0A0A0A" },
  { name: "Surface", variable: "--surface", value: "#141414" },
  { name: "Surface-hover", variable: "--surface-hover", value: "#1A1A1A" },
  { name: "Border", variable: "--border", value: "#222222" },
  { name: "Text-primary", variable: "--text-primary", value: "#EDEDED" },
  { name: "Text-secondary", variable: "--text-secondary", value: "#888888" },
  { name: "Text-muted", variable: "--text-muted", value: "#555555" },
  { name: "Accent", variable: "--accent", value: "#4AE5A0" },
  {
    name: "Accent-muted",
    variable: "--accent-muted",
    value: "rgba(74, 229, 160, 0.6)",
  },
  {
    name: "Accent-glow",
    variable: "--accent-glow",
    value: "rgba(74, 229, 160, 0.15)",
  },
];

const accentOptions = [
  { name: "Muted Blue", value: "#4A9EE5" },
  { name: "Warm Amber", value: "#E5A04A" },
  { name: "Soft Green (current)", value: "#4AE5A0" },
];

const typographyScale = [
  {
    label: "Hero text",
    size: "36-48px",
    weight: 500,
    sampleSize: "clamp(36px, 5vw, 48px)",
  },
  {
    label: "Section headings",
    size: "24-28px",
    weight: 600,
    sampleSize: "clamp(24px, 3vw, 28px)",
  },
  { label: "Card titles", size: "20px", weight: 600, sampleSize: "20px" },
  {
    label: "Body",
    size: "17-18px",
    weight: 400,
    sampleSize: "clamp(17px, 2vw, 18px)",
  },
  { label: "Metadata", size: "14px", weight: 400, sampleSize: "14px" },
];

const spacingSteps = [4, 8, 16, 24, 32, 40, 64, 96, 128];

/* ─── Helpers ───────────────────────────────────────────── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-semibold text-[var(--text-primary)] mb-8 pb-3 border-b border-[var(--border)]"
      style={{ fontSize: "clamp(24px, 3vw, 28px)" }}
    >
      {children}
    </h2>
  );
}

function Token({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-block font-mono text-xs text-[var(--text-muted)]">
      {label}: {value}
    </span>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 pb-24">
        {/* Back link & page title */}
        <nav className="mb-4">
          <Link
            href="/"
            className="text-sm text-[var(--accent)] hover:underline transition-colors"
            style={{ transitionDuration: "var(--duration-hover)" }}
          >
            &larr; Back to Home
          </Link>
        </nav>

        <header className="mb-16">
          <h1
            className="font-medium text-[var(--text-primary)] mb-2"
            style={{ fontSize: "clamp(36px, 5vw, 48px)" }}
          >
            Style Guide
          </h1>
          <p className="text-[17px] text-[var(--text-secondary)] max-w-[640px] leading-relaxed">
            Visual reference for every design token used across vignesh.ai.
            This page is a developer tool &mdash; not linked from the public
            navigation.
          </p>
        </header>

        {/* ── 1. Color Palette ────────────────────────── */}
        <section className="mb-24" aria-labelledby="colors">
          <SectionHeading>1. Color Palette</SectionHeading>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {colorTokens.map((token) => (
              <div key={token.variable} className="flex flex-col gap-2">
                <div
                  className="w-full aspect-square rounded-lg border border-[var(--border)]"
                  style={{ backgroundColor: `var(${token.variable})` }}
                />
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {token.name}
                </p>
                <Token label="var" value={`(${token.variable})`} />
                <Token label="hex" value={token.value} />
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. Accent Color Options ─────────────────── */}
        <section className="mb-24" aria-labelledby="accents">
          <SectionHeading>2. Accent Color Options</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {accentOptions.map((option) => (
              <div
                key={option.value}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 flex flex-col items-center gap-4"
              >
                {/* Large swatch */}
                <div
                  className="w-20 h-20 rounded-full"
                  style={{ backgroundColor: option.value }}
                />

                {/* Label */}
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {option.name}
                </p>
                <p className="font-mono text-xs text-[var(--text-muted)]">
                  {option.value}
                </p>

                {/* Preview: text, border, glow */}
                <div className="w-full flex flex-col gap-3 mt-2">
                  <p className="text-sm font-medium" style={{ color: option.value }}>
                    Sample accent text
                  </p>
                  <div
                    className="h-10 rounded-lg border flex items-center justify-center text-xs"
                    style={{
                      borderColor: option.value,
                      boxShadow: `0 0 24px ${option.value}26`,
                      color: option.value,
                    }}
                  >
                    Bordered element
                  </div>
                  <div
                    className="h-10 rounded-lg flex items-center justify-center text-xs text-[var(--text-primary)]"
                    style={{ backgroundColor: `${option.value}26` }}
                  >
                    Glow background
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Typography Scale ─────────────────────── */}
        <section className="mb-24" aria-labelledby="typography">
          <SectionHeading>3. Typography Scale</SectionHeading>

          <div className="flex flex-col gap-10">
            {typographyScale.map((entry) => (
              <div
                key={entry.label}
                className="border-b border-[var(--border)] pb-6"
              >
                <div className="flex flex-wrap items-baseline gap-4 mb-2">
                  <span className="text-sm font-mono text-[var(--accent)]">
                    {entry.label}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    {entry.size} / weight {entry.weight}
                  </span>
                </div>
                <p
                  className="text-[var(--text-primary)] leading-snug"
                  style={{
                    fontSize: entry.sampleSize,
                    fontWeight: entry.weight,
                  }}
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Spacing Scale ────────────────────────── */}
        <section className="mb-24" aria-labelledby="spacing">
          <SectionHeading>4. Spacing Scale</SectionHeading>

          <div className="flex flex-col gap-5">
            {spacingSteps.map((px) => (
              <div key={px} className="flex items-center gap-4">
                <span className="w-16 text-right font-mono text-sm text-[var(--text-secondary)]">
                  {px}px
                </span>
                <div
                  className="rounded"
                  style={{
                    width: `${px}px`,
                    height: "24px",
                    backgroundColor: "var(--accent)",
                    opacity: 0.8,
                  }}
                />
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {px / 4} units
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Card Component Demo ──────────────────── */}
        <section className="mb-24" aria-labelledby="card-demo">
          <SectionHeading>5. Card Component Demo</SectionHeading>

          <p className="text-sm text-[var(--text-secondary)] mb-2">
            Surface background &middot; 1px border &middot; 12px radius
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-8">
            Hover to see: accent border, scale(1.015), glow shadow
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard card */}
            <ProjectCard
              title="Example Project"
              subtitle="A sample card to preview the default and hover states"
              badge="Demo"
              problem="Developers need a quick visual way to verify card styling without navigating to the real portfolio."
              built="A self-contained card component with hover glow, scale, and border transitions driven entirely by CSS custom properties."
              links={[
                { label: "GitHub", href: "#", external: true },
                { label: "Live Demo", href: "#", external: true },
              ]}
            />

            {/* Hero card variant */}
            <ProjectCard
              title="Hero Variant"
              subtitle="This card uses the isHero prop for full-width treatment"
              problem="Some projects deserve more visual weight in the grid layout."
              building="Expanded layout support for featured projects, including larger image regions and richer metadata."
              isHero
            />
          </div>

          {/* Token reference table */}
          <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-6 py-3 text-[var(--text-secondary)] font-semibold">
                    Property
                  </th>
                  <th className="text-left px-6 py-3 text-[var(--text-secondary)] font-semibold">
                    Default
                  </th>
                  <th className="text-left px-6 py-3 text-[var(--text-secondary)] font-semibold">
                    Hover
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                <tr className="border-b border-[var(--border)]">
                  <td className="px-6 py-3 text-[var(--text-primary)]">
                    background
                  </td>
                  <td className="px-6 py-3 text-[var(--text-muted)]">
                    var(--surface)
                  </td>
                  <td className="px-6 py-3 text-[var(--text-muted)]">
                    var(--surface-hover)
                  </td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="px-6 py-3 text-[var(--text-primary)]">
                    border-color
                  </td>
                  <td className="px-6 py-3 text-[var(--text-muted)]">
                    var(--border)
                  </td>
                  <td className="px-6 py-3 text-[var(--accent)]">
                    var(--border-hover)
                  </td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="px-6 py-3 text-[var(--text-primary)]">
                    transform
                  </td>
                  <td className="px-6 py-3 text-[var(--text-muted)]">none</td>
                  <td className="px-6 py-3 text-[var(--text-muted)]">
                    scale(1.015)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-[var(--text-primary)]">
                    box-shadow
                  </td>
                  <td className="px-6 py-3 text-[var(--text-muted)]">none</td>
                  <td className="px-6 py-3 text-[var(--text-muted)]">
                    0 0 40px var(--accent-glow)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 6. Animation Demo ───────────────────────── */}
        <section className="mb-24" aria-labelledby="animation-demo">
          <SectionHeading>6. Animation Demo</SectionHeading>

          <p className="text-sm text-[var(--text-secondary)] mb-2">
            Scroll down to trigger the entrance animations. Each card staggers
            by{" "}
            <code className="font-mono text-[var(--accent)]">
              var(--stagger-delay)
            </code>{" "}
            (100ms).
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-8">
            Animation:{" "}
            <code className="font-mono text-[var(--accent)]">
              translateY(24px) &rarr; 0
            </code>
            ,{" "}
            <code className="font-mono text-[var(--accent)]">
              opacity 0 &rarr; 1
            </code>
            ,{" "}
            <code className="font-mono text-[var(--accent)]">
              var(--duration-reveal) 600ms
            </code>
            ,{" "}
            <code className="font-mono text-[var(--accent)]">
              var(--ease-out-expo)
            </code>
          </p>

          {/* Spacer so there is room to scroll into */}
          <div className="h-16" />

          {/* ScrollReveal standalone */}
          <ScrollReveal className="mb-12">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <p className="text-[var(--text-primary)] font-semibold mb-1">
                ScrollReveal Component
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                This block uses{" "}
                <code className="font-mono text-[var(--accent)]">
                  &lt;ScrollReveal&gt;
                </code>{" "}
                with default settings. It fades and slides up once it enters
                the viewport.
              </p>
            </div>
          </ScrollReveal>

          {/* ScrollReveal with delay */}
          <ScrollReveal delay={200} className="mb-16">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <p className="text-[var(--text-primary)] font-semibold mb-1">
                ScrollReveal with 200ms delay
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                Same component, but with a{" "}
                <code className="font-mono text-[var(--accent)]">
                  delay=&#123;200&#125;
                </code>{" "}
                prop so it enters after the block above.
              </p>
            </div>
          </ScrollReveal>

          {/* StaggerGroup */}
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            StaggerGroup Demo
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            The{" "}
            <code className="font-mono text-[var(--accent)]">
              &lt;StaggerGroup&gt;
            </code>{" "}
            component wraps multiple children and staggers their reveal by{" "}
            <code className="font-mono text-[var(--accent)]">
              staggerDelay
            </code>{" "}
            (default 100ms). Scroll to see the cards animate in sequence.
          </p>

          {/* Another spacer to ensure stagger group is below the fold */}
          <div className="h-8" />

          <StaggerGroup
            staggerDelay={120}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 flex flex-col gap-2"
              >
                <p className="text-[var(--text-primary)] font-semibold">
                  Stagger Card {n}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Delays by {(n - 1) * 120}ms from the group trigger.
                </p>
                <div
                  className="mt-3 h-2 rounded-full"
                  style={{
                    backgroundColor: "var(--accent)",
                    width: `${30 + n * 10}%`,
                    opacity: 0.7,
                  }}
                />
              </div>
            ))}
          </StaggerGroup>
        </section>

        {/* ── Token Reference ─────────────────────────── */}
        <section className="mb-24" aria-labelledby="token-ref">
          <SectionHeading>CSS Custom Properties Reference</SectionHeading>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 overflow-x-auto">
            <pre className="font-mono text-xs leading-relaxed text-[var(--text-secondary)]">
{`:root {
  /* Backgrounds */
  --background: #0A0A0A;
  --surface: #141414;
  --surface-hover: #1A1A1A;

  /* Borders */
  --border: #222222;
  --border-hover: rgba(74, 229, 160, 0.4);

  /* Text */
  --text-primary: #EDEDED;
  --text-secondary: #888888;
  --text-muted: #555555;

  /* Accent */
  --accent: #4AE5A0;
  --accent-muted: rgba(74, 229, 160, 0.6);
  --accent-glow: rgba(74, 229, 160, 0.15);

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-reveal: 600ms;
  --duration-hover: 220ms;
  --stagger-delay: 100ms;
}`}
            </pre>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
