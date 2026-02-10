"use client";

import { useEffect, useRef, useState } from "react";

/*
  Pipeline diagram for Alfred's agent orchestration.

  6 nodes: Understand, Think, Act Quick, Act, Reply, Summarize
  4 routing paths:
    1. Understand → [simple read] → Act Quick → Reply → Summarize     (secondary/light)
    2. Understand → [needs clarification] → Reply → Summarize          (secondary, arc below)
    3. Understand → Think → [propose/clarify] → Reply → Summarize      (secondary, skips Act)
    4. Understand → Think → [plan] → Act ⟲ → Reply → Summarize         (primary, main path)

  Layout (desktop SVG):
    Row 0 (above):    [Act Quick]
    Row 1 (main):     [Understand] → [Think] → [Act ⟲] → [Reply] → [Summarize]
    Row 2 (below):    clarification arc from Understand to Reply

  Mobile: vertical card stack with primary path + routing annotations.
*/

// --- Node definitions ---
interface AgentNode {
  id: string;
  title: string;
  subtitle: string;
  x: number;
  y: number;
}

const NODE_W = 130;
const NODE_H = 64;

// Desktop SVG layout — tighter viewBox (800x270) for ~1:1 rendering
const nodes: AgentNode[] = [
  { id: "understand", title: "Understand", subtitle: "Memory Manager", x: 15, y: 128 },
  { id: "think", title: "Think", subtitle: "Planner", x: 175, y: 128 },
  { id: "act-quick", title: "Act Quick", subtitle: "Fast Path", x: 260, y: 26 },
  { id: "act", title: "Act", subtitle: "Executor", x: 335, y: 128 },
  { id: "reply", title: "Reply", subtitle: "Formatter", x: 495, y: 128 },
  { id: "summarize", title: "Summarize", subtitle: "Historian", x: 655, y: 128 },
];

// Mobile node order (primary path + act quick separate)
const mobileNodes = [
  { title: "Understand", subtitle: "Memory Manager", note: "Routes to: Act Quick, Think, or Reply" },
  { title: "Think", subtitle: "Planner", note: "Routes to: Act, or Reply directly" },
  { title: "Act", subtitle: "Executor", note: "Multi-tool loop" },
  { title: "Reply", subtitle: "Formatter", note: "All paths converge here" },
  { title: "Summarize", subtitle: "Historian", note: null },
];

export default function ArchitectureDiagram() {
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <DesktopDiagram isVisible={isVisible} />
      <MobileDiagram isVisible={isVisible} />
    </div>
  );
}

/* ================================
   Desktop SVG Diagram
   ================================ */

function DesktopDiagram({ isVisible }: { isVisible: boolean }) {
  // Node helpers
  const cx = (n: AgentNode) => n.x + NODE_W / 2;
  const cy = (n: AgentNode) => n.y + NODE_H / 2;
  const right = (n: AgentNode) => n.x + NODE_W;
  const left = (n: AgentNode) => n.x;
  const bottom = (n: AgentNode) => n.y + NODE_H;
  const top = (n: AgentNode) => n.y;

  const understand = nodes[0];
  const think = nodes[1];
  const actQuick = nodes[2];
  const act = nodes[3];
  const reply = nodes[4];
  const summarize = nodes[5];

  return (
    <div className="hidden lg:block">
      <svg
        viewBox="0 0 800 270"
        className="w-full h-auto"
        role="img"
        aria-label="Pipeline diagram showing Alfred's agent routing across four paths"
      >
        <defs>
          {/* Primary arrowhead (accent) */}
          <marker
            id="arrow-primary"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <polygon points="0,0 8,4 0,8" fill="var(--accent)" />
          </marker>
          {/* Secondary arrowhead (border/muted) */}
          <marker
            id="arrow-secondary"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <polygon points="0,0 6,3 0,6" fill="var(--border)" />
          </marker>
          {/* Loop arrowhead */}
          <marker
            id="arrow-loop"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <polygon points="0,0 6,3 0,6" fill="var(--accent-muted)" />
          </marker>
        </defs>

        {/* ---- PATH 4 (primary): Understand → Think → Act → Reply → Summarize ---- */}
        <g
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 800ms`,
          }}
        >
          {/* Understand → Think */}
          <line
            x1={right(understand)}
            y1={cy(understand)}
            x2={left(think)}
            y2={cy(think)}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#arrow-primary)"
          />
          {/* Think → Act (with label) */}
          <line
            x1={right(think)}
            y1={cy(think)}
            x2={left(act)}
            y2={cy(act)}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#arrow-primary)"
          />
          <EdgeLabel
            x={(right(think) + left(act)) / 2}
            y={cy(think) - 12}
            text="plan"
          />
          {/* Act → Reply */}
          <line
            x1={right(act)}
            y1={cy(act)}
            x2={left(reply)}
            y2={cy(reply)}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#arrow-primary)"
          />
          {/* Reply → Summarize (shared final segment) */}
          <line
            x1={right(reply)}
            y1={cy(reply)}
            x2={left(summarize)}
            y2={cy(summarize)}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#arrow-primary)"
          />
        </g>

        {/* ---- PATH 1 (secondary): Understand → Act Quick → Reply ---- */}
        <g
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 1000ms`,
          }}
        >
          {/* Understand top → Act Quick left */}
          <path
            d={`M ${cx(understand)} ${top(understand)} Q ${cx(understand)} ${cy(actQuick)} ${left(actQuick)} ${cy(actQuick)}`}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
            markerEnd="url(#arrow-secondary)"
          />
          <EdgeLabel
            x={cx(understand) - 50}
            y={top(understand) - 16}
            text="simple read"
            bracket
          />
          {/* Act Quick right → Reply top */}
          <path
            d={`M ${right(actQuick)} ${cy(actQuick)} Q ${cx(reply)} ${cy(actQuick)} ${cx(reply)} ${top(reply)}`}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
            markerEnd="url(#arrow-secondary)"
          />
        </g>

        {/* ---- PATH 2 (secondary): Understand → Reply (clarification arc below) ---- */}
        <g
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 1100ms`,
          }}
        >
          <path
            d={`M ${cx(understand)} ${bottom(understand)} Q ${cx(understand)} 248 ${(cx(understand) + cx(reply)) / 2} 248 Q ${cx(reply)} 248 ${cx(reply)} ${bottom(reply)}`}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
            markerEnd="url(#arrow-secondary)"
          />
          <EdgeLabel
            x={(cx(understand) + cx(reply)) / 2}
            y={257}
            text="needs clarification"
            bracket
          />
        </g>

        {/* ---- PATH 3 (secondary): Think → Reply (propose/clarify, skips Act) ---- */}
        <g
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 1050ms`,
          }}
        >
          <path
            d={`M ${cx(think)} ${top(think)} Q ${cx(think)} ${top(think) - 24} ${(cx(think) + cx(reply)) / 2} ${top(think) - 24} Q ${cx(reply)} ${top(think) - 24} ${cx(reply)} ${top(reply)}`}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
            markerEnd="url(#arrow-secondary)"
          />
          <EdgeLabel
            x={(cx(think) + cx(reply)) / 2}
            y={top(think) - 34}
            text="propose / clarify"
            bracket
          />
        </g>

        {/* ---- Act self-loop (multi-tool loop) ---- */}
        <g
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 1200ms`,
          }}
        >
          <path
            d={`M ${cx(act) + 20} ${bottom(act)} C ${cx(act) + 40} ${bottom(act) + 36} ${cx(act) - 40} ${bottom(act) + 36} ${cx(act) - 20} ${bottom(act)}`}
            fill="none"
            stroke="var(--accent-muted)"
            strokeWidth="1.5"
            markerEnd="url(#arrow-loop)"
          />
          <text
            x={cx(act)}
            y={bottom(act) + 44}
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="12"
            fontWeight="500"
            fontFamily="var(--font-mono)"
          >
            multi-tool loop
          </text>
        </g>

        {/* ---- Agent Node Boxes ---- */}
        {nodes.map((node, i) => {
          const isSecondary = node.id === "act-quick";
          const delay = i * 120;
          return (
            <g
              key={node.id}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity var(--duration-reveal) var(--ease-out-expo) ${delay}ms, transform var(--duration-reveal) var(--ease-out-expo) ${delay}ms`,
              }}
            >
              <rect
                x={node.x}
                y={node.y}
                width={NODE_W}
                height={NODE_H}
                rx={8}
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth={1}
                strokeDasharray={isSecondary ? "4 3" : undefined}
              />
              <text
                x={cx(node)}
                y={node.y + 27}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="16"
                fontWeight="600"
              >
                {node.title}
              </text>
              <text
                x={cx(node)}
                y={node.y + 46}
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="13"
                fontWeight="400"
              >
                {node.subtitle}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ================================
   Edge Label (text with background box)
   ================================ */

function EdgeLabel({
  x,
  y,
  text,
  bracket,
}: {
  x: number;
  y: number;
  text: string;
  bracket?: boolean;
}) {
  const displayText = bracket ? `[${text}]` : text;
  const charWidth = 7;
  const padding = 6;
  const textWidth = displayText.length * charWidth;
  const boxWidth = textWidth + padding * 2;
  const boxHeight = 18;

  return (
    <g>
      <rect
        x={x - boxWidth / 2}
        y={y - boxHeight / 2}
        width={boxWidth}
        height={boxHeight}
        rx={3}
        fill="var(--background)"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="12"
        fontWeight="500"
        fontStyle={bracket ? "italic" : undefined}
      >
        {displayText}
      </text>
    </g>
  );
}

/* ================================
   Mobile Diagram (vertical card stack)
   ================================ */

function MobileDiagram({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="flex lg:hidden flex-col items-center gap-0">
      {/* Act Quick callout */}
      <div
        className="w-full mb-4 rounded-lg border border-dashed border-[var(--border)] bg-[var(--background)] px-4 py-3 text-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(16px)",
          transition: `opacity var(--duration-reveal) var(--ease-out-expo), transform var(--duration-reveal) var(--ease-out-expo)`,
        }}
      >
        <p className="text-sm font-semibold text-[var(--text-primary)]">
          Act Quick
        </p>
        <p className="text-xs text-[var(--text-secondary)]">Fast Path</p>
        <p className="text-[11px] text-[var(--text-muted)] mt-1">
          Simple reads bypass Think and Act entirely
        </p>
      </div>

      {/* Primary path cards */}
      {mobileNodes.map((node, i) => (
        <div key={node.title} className="flex flex-col items-center w-full">
          {i > 0 && (
            <div
              className="flex items-center justify-center h-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity var(--duration-reveal) var(--ease-out-expo) ${i * 100}ms`,
              }}
            >
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                aria-hidden="true"
              >
                <line
                  x1="6"
                  y1="0"
                  x2="6"
                  y2="14"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                <polygon points="2,12 6,20 10,12" fill="var(--accent)" />
              </svg>
            </div>
          )}
          <div
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity var(--duration-reveal) var(--ease-out-expo) ${(i + 1) * 100}ms, transform var(--duration-reveal) var(--ease-out-expo) ${(i + 1) * 100}ms`,
            }}
          >
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {node.title}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              {node.subtitle}
            </p>
            {node.note && (
              <p className="text-[11px] text-[var(--text-muted)] mt-1">
                {node.note}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Path legend */}
      <div
        className="w-full mt-6 pt-4 border-t border-[var(--border)] grid grid-cols-2 gap-2"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity var(--duration-reveal) var(--ease-out-expo) 700ms`,
        }}
      >
        <PathLabel label="Quick read" path="Understand → Act Quick → Reply" />
        <PathLabel label="Clarification" path="Understand → Reply" />
        <PathLabel label="Propose" path="Understand → Think → Reply" />
        <PathLabel label="Full plan" path="Understand → Think → Act → Reply" primary />
      </div>
    </div>
  );
}

function PathLabel({
  label,
  path,
  primary,
}: {
  label: string;
  path: string;
  primary?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className={`text-[11px] font-medium ${primary ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}
      >
        {label}
      </span>
      <span
        className="text-[10px] text-[var(--text-muted)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {path}
      </span>
    </div>
  );
}
