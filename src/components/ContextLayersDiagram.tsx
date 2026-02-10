"use client";

import { useEffect, useRef, useState } from "react";

const layers = [
  {
    label: "Entity Context",
    annotation: "deterministic — CRUD-driven",
    position: "top" as const,
  },
  {
    label: "Conversation Context",
    annotation: "3 turns full → older compressed",
    position: "middle" as const,
  },
  {
    label: "Reasoning Context",
    annotation: "2 summaries → older compressed",
    position: "bottom" as const,
  },
];

const agents: {
  name: string;
  layers: number[];
  direction: "reads" | "writes";
  heavy?: boolean;
}[] = [
  { name: "Understand", layers: [0, 1], direction: "reads" },
  { name: "Think", layers: [0, 1, 2], direction: "reads" },
  { name: "Act", layers: [0], direction: "reads", heavy: true },
  { name: "Reply", layers: [0, 1, 2], direction: "reads" },
  { name: "Summarize", layers: [0, 1, 2], direction: "writes" },
];

export default function ContextLayersDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);

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

  const handleAgentClick = (index: number) => {
    setSelectedAgent((prev) => (prev === index ? null : index));
  };

  // Check if a layer is connected to the selected agent
  const isLayerActive = (layerIndex: number) => {
    if (selectedAgent === null) return false;
    return agents[selectedAgent].layers.includes(layerIndex);
  };

  // Check if any agent is selected (to dim non-active elements)
  const hasSelection = selectedAgent !== null;

  return (
    <div ref={ref}>
      {/* Desktop: layers + agent column with SVG connections */}
      <DesktopDiagram
        isVisible={isVisible}
        selectedAgent={selectedAgent}
        hasSelection={hasSelection}
        isLayerActive={isLayerActive}
        onAgentClick={handleAgentClick}
      />

      {/* Mobile: layer stack with agent list below */}
      <MobileDiagram
        isVisible={isVisible}
        selectedAgent={selectedAgent}
        hasSelection={hasSelection}
        isLayerActive={isLayerActive}
        onAgentClick={handleAgentClick}
      />
    </div>
  );
}

/* ================================
   Desktop Diagram
   ================================ */

function DesktopDiagram({
  isVisible,
  selectedAgent,
  hasSelection,
  isLayerActive,
  onAgentClick,
}: {
  isVisible: boolean;
  selectedAgent: number | null;
  hasSelection: boolean;
  isLayerActive: (layerIndex: number) => boolean;
  onAgentClick: (index: number) => void;
}) {
  // Layer vertical centers for SVG connections
  // Each layer is ~56px tall with -1px overlap: centers at 28, 83, 138
  const layerCenters = [28, 83, 138];
  // Agent vertical positions (spread evenly across ~166px height)
  const agentYPositions = [16, 50, 83, 116, 150];

  return (
    <div className="hidden md:block">
      <div className="flex gap-0 items-stretch">
        {/* Left — Layer stack (constrained width) */}
        <div className="flex flex-col gap-0 w-[55%] shrink-0">
          {layers.map((layer, i) => {
            const roundedClass =
              layer.position === "top"
                ? "rounded-t-lg"
                : layer.position === "bottom"
                  ? "rounded-b-lg"
                  : "";

            const active = isLayerActive(i);
            const dimmed = hasSelection && !active;

            return (
              <div
                key={layer.label}
                className={`border border-[var(--border)] px-5 py-4 ${roundedClass} ${i > 0 ? "-mt-px" : ""}`}
                style={{
                  background:
                    i % 2 === 0
                      ? "var(--surface)"
                      : "var(--background)",
                  borderLeftColor: active
                    ? "var(--accent)"
                    : "var(--accent)",
                  borderLeftWidth: "3px",
                  opacity: isVisible
                    ? dimmed
                      ? 0.35
                      : 1
                    : 0,
                  transform: isVisible
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: `opacity 0.3s ease, transform var(--duration-reveal) var(--ease-out-expo) ${i * 100}ms`,
                }}
              >
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {layer.label}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {layer.annotation}
                </p>
              </div>
            );
          })}
        </div>

        {/* Connection lines SVG */}
        <div
          className="flex-1 relative min-w-[160px]"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 300ms`,
          }}
        >
          <svg
            width="100%"
            height="166"
            viewBox="0 0 160 166"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="arrow-read"
                markerWidth="6"
                markerHeight="6"
                refX="1"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="6,0 0,3 6,6"
                  fill="var(--text-secondary)"
                />
              </marker>
              <marker
                id="arrow-write"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <polygon points="0,0 6,3 0,6" fill="var(--accent)" />
              </marker>
              <marker
                id="arrow-read-heavy"
                markerWidth="6"
                markerHeight="6"
                refX="1"
                refY="3"
                orient="auto"
              >
                <polygon points="6,0 0,3 6,6" fill="var(--accent)" />
              </marker>
              {/* Dimmed markers for inactive state */}
              <marker
                id="arrow-read-dim"
                markerWidth="6"
                markerHeight="6"
                refX="1"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="6,0 0,3 6,6"
                  fill="var(--text-muted)"
                  opacity="0.3"
                />
              </marker>
              <marker
                id="arrow-write-dim"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0,0 6,3 0,6"
                  fill="var(--text-muted)"
                  opacity="0.3"
                />
              </marker>
            </defs>
            {agents.map((agent, ai) => {
              const agentY = agentYPositions[ai];
              const isSelected = selectedAgent === ai;
              const isDimmed = hasSelection && !isSelected;

              return agent.layers.map((li) => {
                const layerY = layerCenters[li];
                const isWrite = agent.direction === "writes";
                const isHeavy = agent.heavy;

                let stroke: string;
                let markerEnd: string;
                let strokeWidth: number;
                let opacity: number;

                if (isDimmed) {
                  stroke = "var(--text-muted)";
                  markerEnd = isWrite
                    ? "url(#arrow-write-dim)"
                    : "url(#arrow-read-dim)";
                  strokeWidth = 1;
                  opacity = 0.15;
                } else if (isSelected) {
                  stroke = "var(--accent)";
                  markerEnd = isWrite
                    ? "url(#arrow-write)"
                    : "url(#arrow-read-heavy)";
                  strokeWidth = isHeavy ? 3 : 2;
                  opacity = 1;
                } else {
                  // No selection — default state
                  stroke =
                    isWrite || isHeavy
                      ? "var(--accent)"
                      : "var(--text-muted)";
                  markerEnd = isWrite
                    ? "url(#arrow-write)"
                    : isHeavy
                      ? "url(#arrow-read-heavy)"
                      : "url(#arrow-read)";
                  strokeWidth = isHeavy ? 2.5 : isWrite ? 2 : 1;
                  opacity = isHeavy ? 1 : 0.7;
                }

                return (
                  <line
                    key={`${agent.name}-${li}`}
                    x1="0"
                    y1={layerY}
                    x2="120"
                    y2={agentY}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={
                      isWrite || (isSelected && !isWrite)
                        ? undefined
                        : isDimmed
                          ? "4 3"
                          : "4 3"
                    }
                    markerEnd={markerEnd}
                    opacity={opacity}
                    style={{ transition: "opacity 0.3s ease, stroke 0.3s ease, stroke-width 0.3s ease" }}
                  />
                );
              });
            })}
          </svg>
        </div>

        {/* Right — Agent column (clickable) */}
        <div
          className="w-[120px] shrink-0 flex flex-col justify-between py-1"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(12px)",
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 400ms, transform var(--duration-reveal) var(--ease-out-expo) 400ms`,
          }}
        >
          {agents.map((agent, i) => {
            const isSelected = selectedAgent === i;
            const isDimmed = hasSelection && !isSelected;

            return (
              <button
                key={agent.name}
                onClick={() => onAgentClick(i)}
                className="flex items-center gap-1.5 text-left group cursor-pointer rounded px-1.5 py-0.5 -ml-1.5 transition-colors"
                style={{
                  opacity: isDimmed ? 0.35 : 1,
                  transition: "opacity 0.3s ease",
                  background: isSelected
                    ? "var(--accent-glow)"
                    : "transparent",
                }}
                aria-pressed={isSelected}
                aria-label={`${agent.name}: ${agent.direction} ${agent.layers.map((l) => layers[l].label).join(", ")}`}
              >
                <span
                  className={`text-xs ${
                    isSelected
                      ? "text-[var(--accent)] font-semibold"
                      : agent.direction === "writes"
                        ? "text-[var(--accent)] font-semibold"
                        : agent.heavy
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {agent.name}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {agent.direction === "writes" ? "→" : "←"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend + hint */}
      <div
        className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--border)]"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity var(--duration-reveal) var(--ease-out-expo) 500ms`,
        }}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-0"
              style={{
                borderTop: "1px dashed var(--text-muted)",
              }}
            />
            <span className="text-[10px] text-[var(--text-muted)]">reads</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-0"
              style={{
                borderTop: "2px solid var(--accent)",
              }}
            />
            <span className="text-[10px] text-[var(--text-muted)]">
              writes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-0"
              style={{
                borderTop: "2.5px solid var(--accent)",
              }}
            />
            <span className="text-[10px] text-[var(--text-muted)]">
              deep access
            </span>
          </div>
        </div>
        <span className="text-[10px] text-[var(--text-muted)] italic">
          click an agent to isolate
        </span>
      </div>
    </div>
  );
}

/* ================================
   Mobile Diagram
   ================================ */

function MobileDiagram({
  isVisible,
  selectedAgent,
  hasSelection,
  isLayerActive,
  onAgentClick,
}: {
  isVisible: boolean;
  selectedAgent: number | null;
  hasSelection: boolean;
  isLayerActive: (layerIndex: number) => boolean;
  onAgentClick: (index: number) => void;
}) {
  return (
    <div className="flex md:hidden flex-col">
      {/* Agent selector pills */}
      <div
        className="flex flex-wrap gap-2 mb-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity var(--duration-reveal) var(--ease-out-expo)`,
        }}
      >
        {agents.map((agent, i) => {
          const isSelected = selectedAgent === i;
          return (
            <button
              key={agent.name}
              onClick={() => onAgentClick(i)}
              className="text-[11px] px-2.5 py-1 rounded-full border cursor-pointer transition-all"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: isSelected
                  ? "var(--accent)"
                  : "var(--border)",
                background: isSelected
                  ? "var(--accent-glow)"
                  : "transparent",
                color: isSelected
                  ? "var(--accent)"
                  : "var(--text-secondary)",
                opacity: hasSelection && !isSelected ? 0.5 : 1,
              }}
              aria-pressed={isSelected}
            >
              {agent.name}
              <span className="ml-1 text-[var(--text-muted)]">
                {agent.direction === "writes" ? "→" : "←"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Layer stack */}
      {layers.map((layer, i) => {
        const roundedClass =
          layer.position === "top"
            ? "rounded-t-lg"
            : layer.position === "bottom"
              ? "rounded-b-lg"
              : "";

        const active = isLayerActive(i);
        const dimmed = hasSelection && !active;

        const connectedAgents = agents
          .filter((a) => a.layers.includes(i))
          .map(
            (a) =>
              `${a.name} (${a.direction}${a.heavy ? ", deep" : ""})`
          );

        return (
          <div
            key={layer.label}
            className={`border border-[var(--border)] px-5 py-4 ${roundedClass} ${i > 0 ? "-mt-px" : ""}`}
            style={{
              background:
                i % 2 === 0 ? "var(--surface)" : "var(--background)",
              borderLeftColor: "var(--accent)",
              borderLeftWidth: active ? "4px" : "3px",
              opacity: isVisible
                ? dimmed
                  ? 0.35
                  : 1
                : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.3s ease, transform var(--duration-reveal) var(--ease-out-expo) ${i * 100}ms, border-left-width 0.3s ease`,
            }}
          >
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {layer.label}
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {layer.annotation}
            </p>
            <p className="text-[11px] text-[var(--text-muted)] mt-2">
              {connectedAgents.join(" · ")}
            </p>
          </div>
        );
      })}

      {/* Hint */}
      <p
        className="text-[10px] text-[var(--text-muted)] italic mt-3 text-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity var(--duration-reveal) var(--ease-out-expo) 400ms`,
        }}
      >
        tap an agent to isolate its connections
      </p>
    </div>
  );
}
