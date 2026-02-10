"use client";

import StaggerGroup from "@/components/StaggerGroup";

const features = [
  {
    title: "@-Mentions",
    description:
      "Users reference exact entities (@[Butter Chicken]). Resolved before any agent runs. The AI never guesses which object you meant.",
  },
  {
    title: "Modes",
    description:
      "Quick — single read, single tool call. Plan — multi-step execution with checkpoints. Bypass — domain-specific flows that skip the graph entirely.",
  },
  {
    title: "Streaming",
    description:
      "Typed execution events (plan, step, step_complete, done). UI shows progress, not just answers. Response returns before state persistence finishes.",
  },
  {
    title: "Generated Content",
    description:
      "AI-generated content stored in memory (gen_*), not in DB. User reviews, modifies, approves or discards. On approval, gen_ ref promoted to real UUID.",
  },
];

export default function FeatureGrid() {
  return (
    <StaggerGroup
      staggerDelay={100}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {features.map((feature) => (
        <div
          key={feature.title}
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
        >
          <p className="text-[15px] font-semibold text-[var(--text-primary)] mb-1.5">
            {feature.title}
          </p>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </StaggerGroup>
  );
}
