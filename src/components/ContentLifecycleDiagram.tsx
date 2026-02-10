"use client";

import { useEffect, useRef, useState } from "react";

export default function ContentLifecycleDiagram() {
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
      {/* Desktop: horizontal state machine */}
      <div className="hidden sm:flex items-center justify-center gap-0">
        {/* Generate */}
        <StateNode
          label="Generate"
          variant="muted"
          isVisible={isVisible}
          delay={0}
        />
        <Arrow isVisible={isVisible} delay={100} />

        {/* In memory */}
        <div className="relative">
          <StateNode
            label="In memory"
            sublabel="gen_recipe_1"
            variant="dashed"
            isVisible={isVisible}
            delay={150}
          />
          {/* Modify loop arrow */}
          <div
            className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: `opacity var(--duration-reveal) var(--ease-out-expo) 500ms`,
            }}
          >
            <svg
              width="60"
              height="20"
              viewBox="0 0 60 20"
              aria-hidden="true"
            >
              <path
                d="M 10 18 Q 10 4 30 4 Q 50 4 50 18"
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <polygon points="8,14 10,20 14,15" fill="var(--text-muted)" />
            </svg>
            <span className="text-[9px] text-[var(--text-muted)] -mt-0.5">
              modify
            </span>
          </div>
        </div>
        <Arrow isVisible={isVisible} delay={250} />

        {/* User reviews — decision point */}
        <StateNode
          label="User reviews"
          variant="accent"
          isVisible={isVisible}
          delay={300}
        />

        {/* Branch: approve / discard */}
        <div className="flex flex-col items-start gap-2 ml-0">
          <div className="flex items-center">
            <Arrow isVisible={isVisible} delay={400} />
            <StateNode
              label="Persisted"
              sublabel="real UUID"
              variant="solid"
              isVisible={isVisible}
              delay={450}
            />
          </div>
          <div className="flex items-center">
            <Arrow isVisible={isVisible} delay={400} variant="muted" />
            <StateNode
              label="Removed"
              variant="error"
              isVisible={isVisible}
              delay={450}
            />
          </div>
        </div>
      </div>

      {/* Mobile: vertical state machine */}
      <div className="flex sm:hidden flex-col items-center gap-0">
        <StateNode
          label="Generate"
          variant="muted"
          isVisible={isVisible}
          delay={0}
        />
        <VerticalArrow isVisible={isVisible} delay={80} />
        <div className="relative">
          <StateNode
            label="In memory"
            sublabel="gen_recipe_1"
            variant="dashed"
            isVisible={isVisible}
            delay={120}
          />
        </div>
        <VerticalArrow isVisible={isVisible} delay={200} />
        <StateNode
          label="User reviews"
          variant="accent"
          isVisible={isVisible}
          delay={250}
        />
        <div className="flex gap-4 mt-3">
          <div className="flex flex-col items-center gap-1">
            <VerticalArrow isVisible={isVisible} delay={350} small />
            <StateNode
              label="Persisted"
              variant="solid"
              isVisible={isVisible}
              delay={400}
              small
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <VerticalArrow
              isVisible={isVisible}
              delay={350}
              small
              variant="muted"
            />
            <StateNode
              label="Removed"
              variant="error"
              isVisible={isVisible}
              delay={400}
              small
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StateNode({
  label,
  sublabel,
  variant,
  isVisible,
  delay,
  small,
}: {
  label: string;
  sublabel?: string;
  variant: "muted" | "accent" | "solid" | "dashed" | "error";
  isVisible: boolean;
  delay: number;
  small?: boolean;
}) {
  const styles: Record<
    string,
    { border: string; bg: string; text: string; borderStyle?: string }
  > = {
    muted: {
      border: "var(--border)",
      bg: "var(--surface)",
      text: "var(--text-secondary)",
    },
    accent: {
      border: "var(--accent)",
      bg: "var(--accent-glow)",
      text: "var(--accent)",
    },
    solid: {
      border: "var(--accent)",
      bg: "var(--surface)",
      text: "var(--accent)",
    },
    dashed: {
      border: "var(--border)",
      bg: "var(--background)",
      text: "var(--text-primary)",
      borderStyle: "dashed",
    },
    error: {
      border: "var(--error)",
      bg: "var(--error-glow)",
      text: "var(--error)",
    },
  };

  const s = styles[variant];

  return (
    <div
      className="text-center shrink-0"
      style={{
        borderRadius: "999px",
        border: `1px ${s.borderStyle || "solid"} ${s.border}`,
        background: s.bg,
        padding: small ? "4px 12px" : "6px 16px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity var(--duration-reveal) var(--ease-out-expo) ${delay}ms, transform var(--duration-reveal) var(--ease-out-expo) ${delay}ms`,
      }}
    >
      <p
        className={`font-medium ${small ? "text-[11px]" : "text-[13px]"}`}
        style={{ color: s.text, fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
      {sublabel && (
        <p
          className="text-[10px] text-[var(--text-muted)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {sublabel}
        </p>
      )}
    </div>
  );
}

function Arrow({
  isVisible,
  delay,
  variant,
}: {
  isVisible: boolean;
  delay: number;
  variant?: "muted";
}) {
  const color = variant === "muted" ? "var(--text-muted)" : "var(--accent)";
  return (
    <div
      className="flex items-center justify-center shrink-0 w-8"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity var(--duration-reveal) var(--ease-out-expo) ${delay}ms`,
      }}
    >
      <svg width="24" height="12" viewBox="0 0 24 12" aria-hidden="true">
        <line
          x1="2"
          y1="6"
          x2="18"
          y2="6"
          stroke={color}
          strokeWidth="1.5"
        />
        <polygon points="16,2 24,6 16,10" fill={color} />
      </svg>
    </div>
  );
}

function VerticalArrow({
  isVisible,
  delay,
  small,
  variant,
}: {
  isVisible: boolean;
  delay: number;
  small?: boolean;
  variant?: "muted";
}) {
  const color = variant === "muted" ? "var(--text-muted)" : "var(--accent)";
  const h = small ? 12 : 20;
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        height: h + 4,
        opacity: isVisible ? 1 : 0,
        transition: `opacity var(--duration-reveal) var(--ease-out-expo) ${delay}ms`,
      }}
    >
      <svg
        width="12"
        height={h}
        viewBox={`0 0 12 ${h}`}
        aria-hidden="true"
      >
        <line
          x1="6"
          y1="1"
          x2="6"
          y2={h - 5}
          stroke={color}
          strokeWidth="1.5"
        />
        <polygon
          points={`2,${h - 6} 6,${h} 10,${h - 6}`}
          fill={color}
        />
      </svg>
    </div>
  );
}
