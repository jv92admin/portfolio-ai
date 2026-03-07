"use client";

import { useState, type ReactNode } from "react";

interface RabbitHoleProps {
  label?: string;
  children: ReactNode;
}

export default function RabbitHole({
  label = "Go deeper",
  children,
}: RabbitHoleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-6 rounded-lg border border-[var(--border)] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
        style={{ transitionDuration: "var(--duration-hover)" }}
        aria-expanded={isOpen}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 transition-transform"
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transitionDuration: "var(--duration-hover)",
            transitionTimingFunction: "var(--ease-out-expo)",
          }}
        >
          <path d="M6 3l5 5-5 5" />
        </svg>
        <span className="font-medium">{label}</span>
      </button>

      <div
        className="grid transition-[grid-template-rows]"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transitionDuration: "400ms",
          transitionTimingFunction: "var(--ease-out-expo)",
        }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1 border-t border-[var(--border)] bg-[var(--surface)]">
            <div className="border-l-2 border-[var(--accent-muted)] pl-4 text-[var(--text-secondary)] text-[15px] leading-relaxed blog-prose">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
