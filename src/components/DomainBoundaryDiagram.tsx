"use client";

import { useEffect, useRef, useState } from "react";

export default function DomainBoundaryDiagram() {
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

  const coreItems = [
    "Orchestration graph",
    "Entity identity + lifecycle",
    "CRUD execution",
    "Context construction",
    "Prompt assembly",
    "Mode system",
  ];

  const protocolItems = [
    "DomainConfig",
    "DatabaseAdapter",
    "CRUDMiddleware",
    "SubdomainCompiler",
  ];

  return (
    <div ref={ref}>
      {/* Desktop: horizontal three-column layout */}
      <div className="hidden md:block">
        <div className="flex items-stretch gap-0">
          {/* Left — Alfred Core */}
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
              Alfred Core
            </p>
            <ul className="flex flex-col gap-1.5">
              {coreItems.map((item) => (
                <li
                  key={item}
                  className="text-[13px] text-[var(--text-secondary)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Center — Protocol interface (the membrane) */}
          <div
            className="w-[180px] shrink-0 border-y border-[var(--accent)] flex flex-col items-center justify-center px-3 py-5"
            style={{
              background: "var(--accent-glow)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity var(--duration-reveal) var(--ease-out-expo) 120ms, transform var(--duration-reveal) var(--ease-out-expo) 120ms`,
            }}
          >
            <p
              className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-3"
              style={{ letterSpacing: "0.05em" }}
            >
              Protocol
            </p>
            <div className="flex flex-col gap-1.5 items-center">
              {protocolItems.map((item) => (
                <p
                  key={item}
                  className="text-xs font-semibold text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item}
                </p>
              ))}
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-3 text-center">
              24 abstract / 42 default
            </p>
          </div>

          {/* Right — Domain */}
          <div
            className="flex-1 rounded-r-lg border border-[var(--border)] bg-[var(--background)] p-5"
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
              Domain
            </p>
            <div className="flex flex-col gap-3">
              {/* Kitchen — current */}
              <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
                <p className="text-[13px] font-medium text-[var(--text-primary)]">
                  Kitchen
                </p>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  10 entities, 7 subdomains
                </p>
              </div>
              {/* FPL — ghost/future state */}
              <div
                className="rounded-md border border-dashed border-[var(--border)] px-3 py-2"
                style={{ opacity: 0.5 }}
              >
                <p className="text-[13px] font-medium text-[var(--text-primary)]">
                  FPL
                </p>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  same protocol, different data
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Import rule */}
        <div
          className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-[var(--border)]"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 400ms`,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-secondary)]">
              Domain → Core
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="7" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
              <polyline points="6,10 9,13 14,7" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-secondary)]">
              Core → Domain
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="7" fill="none" stroke="var(--error)" strokeWidth="1.5" />
              <line x1="7" y1="7" x2="13" y2="13" stroke="var(--error)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="13" y1="7" x2="7" y2="13" stroke="var(--error)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
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
            Alfred Core
          </p>
          <ul className="flex flex-col gap-1.5">
            {coreItems.map((item) => (
              <li
                key={item}
                className="text-[13px] text-[var(--text-secondary)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Protocol membrane (horizontal bar on mobile) */}
        <div
          className="border-x border-[var(--accent)] flex flex-col items-center px-4 py-4"
          style={{
            background: "var(--accent-glow)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 120ms, transform var(--duration-reveal) var(--ease-out-expo) 120ms`,
          }}
        >
          <p
            className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-2"
            style={{ letterSpacing: "0.05em" }}
          >
            Protocol
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {protocolItems.map((item) => (
              <span
                key={item}
                className="text-[11px] font-semibold text-[var(--accent)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-[var(--text-muted)] mt-2">
            24 abstract / 42 default
          </p>
        </div>

        <div
          className="rounded-b-lg border border-[var(--border)] bg-[var(--background)] p-5"
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
            Domain
          </p>
          <div className="flex flex-col gap-2">
            <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
              <p className="text-[13px] font-medium text-[var(--text-primary)]">
                Kitchen
              </p>
              <p className="text-[11px] text-[var(--text-secondary)]">
                10 entities, 7 subdomains
              </p>
            </div>
            <div
              className="rounded-md border border-dashed border-[var(--border)] px-3 py-2"
              style={{ opacity: 0.5 }}
            >
              <p className="text-[13px] font-medium text-[var(--text-primary)]">
                FPL
              </p>
              <p className="text-[11px] text-[var(--text-secondary)]">
                same protocol, different data
              </p>
            </div>
          </div>
        </div>

        {/* Import rule (mobile) */}
        <div
          className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[var(--border)]"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) 400ms`,
          }}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[var(--text-secondary)]">
              Domain → Core
            </span>
            <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="7" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
              <polyline points="6,10 9,13 14,7" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[var(--text-secondary)]">
              Core → Domain
            </span>
            <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="7" fill="none" stroke="var(--error)" strokeWidth="1.5" />
              <line x1="7" y1="7" x2="13" y2="13" stroke="var(--error)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="13" y1="7" x2="7" y2="13" stroke="var(--error)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
