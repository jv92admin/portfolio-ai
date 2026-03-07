"use client";

import { useState } from "react";
import StaggerGroup from "@/components/StaggerGroup";

interface UseCase {
  domain: string;
  status: string;
  description: string;
  stats?: string;
}

const useCases: UseCase[] = [
  {
    domain: "Kitchen",
    status: "Reference",
    description:
      "Recipe management, meal planning, grocery coordination. The original domain that proved the architecture.",
    stats: "10 entities, 7 subdomains",
  },
  {
    domain: "FPL",
    status: "Validated",
    description:
      "Fantasy Premier League analytics on live data. Players, teams, transfers, gameweek intelligence.",
    stats: "117 tests, 14 DB tables",
  },
  {
    domain: "CRM",
    status: "Enterprise",
    description:
      "Customer relationship management. Accounts, contacts, pipelines, activity tracking.",
  },
];

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs tracking-wider text-[var(--text-muted)] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {useCase.domain}
        </span>
        <span className="text-xs font-medium text-[var(--accent)] border border-[var(--accent-muted)] rounded-full px-2.5 py-0.5">
          {useCase.status}
        </span>
      </div>
      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
        {useCase.description}
      </p>
      {useCase.stats && (
        <p
          className="text-xs text-[var(--text-muted)] mt-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {useCase.stats}
        </p>
      )}
    </div>
  );
}

function AccordionItem({ useCase }: { useCase: UseCase }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[var(--border)] rounded-lg bg-[var(--surface)] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs tracking-wider text-[var(--text-muted)] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {useCase.domain}
          </span>
          <span className="text-xs font-medium text-[var(--accent)] border border-[var(--accent-muted)] rounded-full px-2.5 py-0.5">
            {useCase.status}
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-[var(--text-muted)] shrink-0"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform var(--duration-hover) ease-out",
          }}
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className="grid transition-all"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transitionDuration: "var(--duration-hover)",
          transitionTimingFunction: "ease-out",
        }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-3">
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
              {useCase.description}
            </p>
            {useCase.stats && (
              <p
                className="text-xs text-[var(--text-muted)] mt-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {useCase.stats}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UseCaseShowcase() {
  return (
    <>
      {/* Desktop: 3-column grid */}
      <div className="hidden sm:block">
        <StaggerGroup
          staggerDelay={100}
          className="grid grid-cols-3 gap-4"
        >
          {useCases.map((uc) => (
            <UseCaseCard key={uc.domain} useCase={uc} />
          ))}
        </StaggerGroup>
      </div>

      {/* Mobile: Accordion */}
      <div className="flex flex-col gap-2 sm:hidden">
        {useCases.map((uc) => (
          <AccordionItem key={uc.domain} useCase={uc} />
        ))}
      </div>
    </>
  );
}
