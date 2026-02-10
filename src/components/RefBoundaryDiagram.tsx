"use client";

import { useEffect, useRef, useState } from "react";

export default function RefBoundaryDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Desktop: horizontal three-column layout */}
      <div className="hidden md:flex items-stretch gap-0">
        {/* Left region — LLM / Ref Namespace */}
        <div
          className="flex-1 rounded-l-lg border border-[var(--border)] bg-[var(--background)] p-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity var(--duration-reveal) var(--ease-out-expo), transform var(--duration-reveal) var(--ease-out-expo)`,
          }}
        >
          <p
            className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-4"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.05em" }}
          >
            Ref Namespace
          </p>
          <div className="flex flex-col gap-2.5">
            <RefItem label="User says" value={`"my pasta recipe"`} />
            <RefItem label="Agent sees" value="recipe_1" accent />
            <RefItem label="Generated" value="gen_recipe_1" accent />
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-4">
            Agents, user messages, LLM decisions
          </p>
        </div>

        {/* Center — SessionIdRegistry (the membrane) */}
        <div
          className="w-[160px] shrink-0 border-y border-[var(--accent)] flex flex-col items-center justify-center px-3 py-5"
          style={{
            background: "var(--accent-glow)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 120ms, transform var(--duration-reveal) var(--ease-out-expo) 120ms`,
          }}
        >
          <p
            className="text-xs font-semibold text-[var(--accent)] mb-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            SessionId
          </p>
          <p
            className="text-xs font-semibold text-[var(--accent)] mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Registry
          </p>

          {/* Bidirectional arrows */}
          <svg width="80" height="24" viewBox="0 0 80 24" aria-hidden="true">
            <defs>
              <marker
                id="arrow-right-ref"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <polygon points="0,0 6,3 0,6" fill="var(--accent)" />
              </marker>
              <marker
                id="arrow-left-ref"
                markerWidth="6"
                markerHeight="6"
                refX="1"
                refY="3"
                orient="auto"
              >
                <polygon points="6,0 0,3 6,6" fill="var(--accent)" />
              </marker>
            </defs>
            <line
              x1="8"
              y1="8"
              x2="72"
              y2="8"
              stroke="var(--accent)"
              strokeWidth="1.5"
              markerEnd="url(#arrow-right-ref)"
            />
            <line
              x1="72"
              y1="16"
              x2="8"
              y2="16"
              stroke="var(--accent)"
              strokeWidth="1.5"
              markerEnd="url(#arrow-left-ref)"
            />
          </svg>

          <p className="text-[10px] text-[var(--text-muted)] mt-3 text-center leading-tight">
            deterministic,
            <br />
            persists across turns
          </p>
        </div>

        {/* Right region — DB / UUID Namespace */}
        <div
          className="flex-1 rounded-r-lg border border-dashed border-[var(--border)] bg-[var(--background)] p-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 240ms, transform var(--duration-reveal) var(--ease-out-expo) 240ms`,
          }}
        >
          <p
            className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-4"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.05em" }}
          >
            UUID Namespace
          </p>
          <div className="flex flex-col gap-2.5">
            <RefItem label="Resolved" value="uuid-abc-123" mono />
            <RefItem label="Pending" value="__pending__" mono muted />
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-4">
            Database tables, CRUD operations
          </p>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="flex md:hidden flex-col gap-0">
        <div
          className="rounded-t-lg border border-[var(--border)] bg-[var(--background)] p-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity var(--duration-reveal) var(--ease-out-expo), transform var(--duration-reveal) var(--ease-out-expo)`,
          }}
        >
          <p
            className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.05em" }}
          >
            Ref Namespace
          </p>
          <div className="flex flex-col gap-2">
            <RefItem label="User says" value={`"my pasta recipe"`} />
            <RefItem label="Agent sees" value="recipe_1" accent />
            <RefItem label="Generated" value="gen_recipe_1" accent />
          </div>
        </div>

        <div
          className="border-x border-[var(--accent)] flex items-center justify-center px-4 py-4"
          style={{
            background: "var(--accent-glow)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 120ms, transform var(--duration-reveal) var(--ease-out-expo) 120ms`,
          }}
        >
          <p
            className="text-xs font-semibold text-[var(--accent)] mr-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            SessionIdRegistry
          </p>
          <svg width="40" height="20" viewBox="0 0 40 20" aria-hidden="true">
            <line
              x1="4"
              y1="6"
              x2="36"
              y2="6"
              stroke="var(--accent)"
              strokeWidth="1.5"
              markerEnd="url(#arrow-right-ref)"
            />
            <line
              x1="36"
              y1="14"
              x2="4"
              y2="14"
              stroke="var(--accent)"
              strokeWidth="1.5"
              markerEnd="url(#arrow-left-ref)"
            />
          </svg>
          <p className="text-[10px] text-[var(--text-muted)] ml-3">
            deterministic
          </p>
        </div>

        <div
          className="rounded-b-lg border border-dashed border-[var(--border)] bg-[var(--background)] p-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 240ms, transform var(--duration-reveal) var(--ease-out-expo) 240ms`,
          }}
        >
          <p
            className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.05em" }}
          >
            UUID Namespace
          </p>
          <div className="flex flex-col gap-2">
            <RefItem label="Resolved" value="uuid-abc-123" mono />
            <RefItem label="Pending" value="__pending__" mono muted />
          </div>
        </div>
      </div>
    </div>
  );
}

function RefItem({
  label,
  value,
  accent,
  mono,
  muted,
}: {
  label: string;
  value: string;
  accent?: boolean;
  mono?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-[var(--text-muted)] w-16 shrink-0">
        {label}
      </span>
      <span
        className={`text-xs ${muted ? "text-[var(--text-muted)]" : accent ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`}
        style={{ fontFamily: mono || accent ? "var(--font-mono)" : undefined }}
      >
        {value}
      </span>
    </div>
  );
}
