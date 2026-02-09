"use client";

import { useEffect, useRef, useState } from "react";

const agents = [
  {
    id: "understand",
    label: "Understand",
    role: "Memory Manager",
    description: "Retrieves relevant context, resolves references",
  },
  {
    id: "think",
    label: "Think",
    role: "Planner",
    description: "Analyzes the request, creates an execution plan",
  },
  {
    id: "act",
    label: "Act",
    role: "Executor",
    description: "Executes the plan by calling domain functions",
  },
  {
    id: "reply",
    label: "Reply",
    role: "Presenter",
    description: "Formats results into a natural response",
  },
  {
    id: "summarize",
    label: "Summarize",
    role: "Compressor",
    description: "Compresses the interaction into memory",
  },
];

export default function ArchitectureDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
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
    <div ref={containerRef} className="w-full">
      <style>{`
        @keyframes pulseFlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% {
            filter: drop-shadow(0 0 3px var(--accent-glow));
          }
          50% {
            filter: drop-shadow(0 0 8px var(--accent-muted));
          }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 60; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawQuickLine {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        .arch-agent-box {
          opacity: 0;
          transform: translateY(20px);
        }
        .arch-agent-box.visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity var(--duration-reveal) var(--ease-out-expo),
                      transform var(--duration-reveal) var(--ease-out-expo);
        }
        .arch-connector {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
        }
        .arch-connector.visible {
          animation: drawLine 500ms var(--ease-out-expo) forwards;
        }
        .arch-quick-connector {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
        }
        .arch-quick-connector.visible {
          animation: drawQuickLine 700ms var(--ease-out-expo) forwards;
        }
        .arch-flow-glow {
          opacity: 0;
        }
        .arch-flow-glow.visible {
          opacity: 1;
          animation: pulseFlow 3s ease-in-out infinite;
          transition: opacity 600ms ease;
        }
        .arch-diagram-glow {
          opacity: 0;
        }
        .arch-diagram-glow.visible {
          opacity: 1;
          animation: glowPulse 3s ease-in-out infinite;
          transition: opacity 600ms ease;
        }
      `}</style>

      {/* Desktop layout: horizontal flow */}
      <div className="hidden lg:block">
        <DesktopDiagram isVisible={isVisible} />
      </div>

      {/* Mobile/tablet layout: vertical flow */}
      <div className="block lg:hidden">
        <MobileDiagram isVisible={isVisible} />
      </div>
    </div>
  );
}

/* ==============================
   Desktop — Horizontal SVG layout
   ============================== */

function DesktopDiagram({ isVisible }: { isVisible: boolean }) {
  const boxW = 150;
  const boxH = 90;
  const gapX = 40;
  const totalW = agents.length * boxW + (agents.length - 1) * gapX;
  const svgW = totalW + 40;
  const svgH = 260;
  const startX = 20;
  const boxY = 30;

  // Timing: each agent appears staggered 200ms apart
  // Connector lines appear after their left agent
  // Quick mode arc appears after all agents
  // Glow starts after everything is built
  const agentDelay = (i: number) => i * 200;
  const connectorDelay = (i: number) => i * 200 + 150;
  const quickModeDelay = agents.length * 200 + 200;
  const glowDelay = quickModeDelay + 500;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className={`w-full max-w-[900px] mx-auto ${isVisible ? "arch-diagram-glow visible" : "arch-diagram-glow"}`}
        style={{ animationDelay: `${glowDelay}ms` }}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Alfred architecture diagram: five agents — Understand, Think, Act, Reply, Summarize — connected in a pipeline with a Quick Mode bypass from Understand to Act"
      >
        {/* Connector lines between agent boxes */}
        {agents.slice(0, -1).map((_, i) => {
          const x1 = startX + i * (boxW + gapX) + boxW;
          const x2 = startX + (i + 1) * (boxW + gapX);
          const y = boxY + boxH / 2;
          return (
            <line
              key={`conn-${i}`}
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="var(--accent)"
              strokeWidth="2"
              className={isVisible ? "arch-connector visible" : "arch-connector"}
              style={{ animationDelay: `${connectorDelay(i)}ms` }}
            />
          );
        })}

        {/* Arrowheads on connector lines */}
        {agents.slice(0, -1).map((_, i) => {
          const x2 = startX + (i + 1) * (boxW + gapX);
          const y = boxY + boxH / 2;
          return (
            <polygon
              key={`arrow-${i}`}
              points={`${x2 - 8},${y - 5} ${x2},${y} ${x2 - 8},${y + 5}`}
              fill="var(--accent)"
              className={isVisible ? "arch-connector visible" : "arch-connector"}
              style={{ animationDelay: `${connectorDelay(i)}ms` }}
            />
          );
        })}

        {/* Quick mode bypass arc: Understand -> Act (skipping Think) */}
        {(() => {
          const fromX = startX + 0 * (boxW + gapX) + boxW;
          const toX = startX + 2 * (boxW + gapX);
          const midX = (fromX + toX) / 2;
          const arcY = boxY + boxH + 50;
          const startY = boxY + boxH;
          return (
            <g>
              <path
                d={`M ${fromX} ${startY} Q ${midX} ${arcY} ${toX} ${startY}`}
                fill="none"
                stroke="var(--accent-muted)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className={isVisible ? "arch-quick-connector visible" : "arch-quick-connector"}
                style={{ animationDelay: `${quickModeDelay}ms` }}
              />
              <polygon
                points={`${toX - 6},${startY + 4} ${toX},${startY} ${toX - 8},${startY - 4}`}
                fill="var(--accent-muted)"
                className={isVisible ? "arch-quick-connector visible" : "arch-quick-connector"}
                style={{ animationDelay: `${quickModeDelay}ms` }}
              />
              <text
                x={midX}
                y={arcY - 2}
                textAnchor="middle"
                fill="var(--accent-muted)"
                fontSize="11"
                fontFamily="var(--font-mono)"
                className={isVisible ? "arch-flow-glow visible" : "arch-flow-glow"}
                style={{ animationDelay: `${quickModeDelay + 200}ms` }}
              >
                Quick Mode
              </text>
            </g>
          );
        })()}

        {/* Agent boxes */}
        {agents.map((agent, i) => {
          const x = startX + i * (boxW + gapX);
          return (
            <g
              key={agent.id}
              className={isVisible ? "arch-agent-box visible" : "arch-agent-box"}
              style={{ transitionDelay: `${agentDelay(i)}ms` }}
            >
              <rect
                x={x}
                y={boxY}
                width={boxW}
                height={boxH}
                rx="8"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x={x + boxW / 2}
                y={boxY + 28}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="14"
                fontWeight="600"
              >
                {agent.label}
              </text>
              <text
                x={x + boxW / 2}
                y={boxY + 46}
                textAnchor="middle"
                fill="var(--accent)"
                fontSize="11"
                fontFamily="var(--font-mono)"
              >
                {agent.role}
              </text>
              <text
                x={x + boxW / 2}
                y={boxY + 66}
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="9.5"
              >
                {wrapText(agent.description, 22).map((line, li) => (
                  <tspan key={li} x={x + boxW / 2} dy={li === 0 ? 0 : 12}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        {/* Flow glow overlay on the main path */}
        <line
          x1={startX + boxW}
          y1={boxY + boxH / 2}
          x2={startX + (agents.length - 1) * (boxW + gapX)}
          y2={boxY + boxH / 2}
          stroke="var(--accent-glow)"
          strokeWidth="6"
          strokeLinecap="round"
          className={isVisible ? "arch-flow-glow visible" : "arch-flow-glow"}
          style={{ animationDelay: `${glowDelay}ms` }}
        />
      </svg>
    </div>
  );
}

/* ==============================
   Mobile — Vertical card layout
   ============================== */

function MobileDiagram({ isVisible }: { isVisible: boolean }) {
  const agentDelay = (i: number) => i * 200;
  const connectorDelay = (i: number) => i * 200 + 150;
  const quickModeDelay = agents.length * 200 + 200;

  return (
    <div className="flex flex-col items-center gap-0">
      {agents.map((agent, i) => (
        <div key={agent.id} className="flex flex-col items-center">
          {/* Agent card */}
          <div
            className={isVisible ? "arch-agent-box visible" : "arch-agent-box"}
            style={{ transitionDelay: `${agentDelay(i)}ms` }}
          >
            <div
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-center w-full max-w-[260px]"
            >
              <p className="text-base font-semibold text-[var(--text-primary)]">
                {agent.label}
              </p>
              <p
                className="text-xs text-[var(--accent)] mt-0.5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {agent.role}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                {agent.description}
              </p>
            </div>
          </div>

          {/* Connector arrow between agents */}
          {i < agents.length - 1 && (
            <svg
              width="20"
              height="32"
              viewBox="0 0 20 32"
              className={isVisible ? "arch-connector visible" : "arch-connector"}
              style={{ animationDelay: `${connectorDelay(i)}ms` }}
            >
              <line
                x1="10"
                y1="0"
                x2="10"
                y2="24"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <polygon
                points="5,22 10,30 15,22"
                fill="var(--accent)"
              />
            </svg>
          )}

          {/* Quick mode label after Understand */}
          {i === 0 && (
            <div
              className={`-mt-1 mb-1 ${isVisible ? "arch-flow-glow visible" : "arch-flow-glow"}`}
              style={{ animationDelay: `${quickModeDelay}ms` }}
            >
              <span
                className="text-[10px] text-[var(--accent-muted)] border border-[var(--accent-glow)] rounded-full px-3 py-0.5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Quick Mode: skip Think, go to Act
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ==============================
   Utility: wrap text for SVG tspan
   ============================== */

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars && current.length > 0) {
      lines.push(current.trim());
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  }
  if (current.trim().length > 0) {
    lines.push(current.trim());
  }
  return lines;
}
