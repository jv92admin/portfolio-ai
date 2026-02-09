"use client";

import Link from "next/link";

interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

interface ProjectCardProps {
  title: string;
  subtitle: string;
  badge?: string;
  problem: string;
  built?: string;
  building?: string;
  learned?: string;
  willProve?: string;
  links?: ProjectLink[];
  isHero?: boolean;
}

export default function ProjectCard({
  title,
  subtitle,
  badge,
  problem,
  built,
  building,
  learned,
  willProve,
  links,
  isHero = false,
}: ProjectCardProps) {
  return (
    <article
      className={`project-card group relative rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] hover:scale-[1.015] transition-all ${
        isHero ? "col-span-full" : ""
      }`}
      style={{
        padding: "clamp(24px, 4vw, 40px)",
        transitionDuration: "var(--duration-hover)",
        transitionTimingFunction: "ease-out",
      }}
    >
      {/* Hover glow effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          boxShadow: "0 0 40px var(--accent-glow), inset 0 0 40px var(--accent-glow)",
          transitionDuration: "var(--duration-hover)",
        }}
      />

      <div className="relative z-10">
        {/* Title row */}
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">
            {title}
          </h3>
          {badge && (
            <span className="text-xs font-medium text-[var(--accent)] border border-[var(--accent-muted)] rounded-full px-3 py-0.5">
              {badge}
            </span>
          )}
        </div>

        {/* Subtitle */}
        <p className="text-sm text-[var(--text-secondary)] mb-6">{subtitle}</p>

        {/* Sections */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">
              Problem
            </p>
            <p className="text-[17px] text-[var(--text-primary)] leading-relaxed">
              {problem}
            </p>
          </div>

          {built && (
            <div>
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">
                Built
              </p>
              <p className="text-[17px] text-[var(--text-primary)] leading-relaxed">
                {built}
              </p>
            </div>
          )}

          {building && (
            <div>
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">
                Building
              </p>
              <p className="text-[17px] text-[var(--text-primary)] leading-relaxed">
                {building}
              </p>
            </div>
          )}

          {learned && (
            <div>
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">
                Learned
              </p>
              <p className="text-[17px] text-[var(--text-primary)] leading-relaxed">
                {learned}
              </p>
            </div>
          )}

          {willProve && (
            <div>
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">
                Will prove
              </p>
              <p className="text-[17px] text-[var(--text-primary)] leading-relaxed">
                {willProve}
              </p>
            </div>
          )}
        </div>

        {/* Image placeholder */}
        <div
          className="mt-6 flex items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-hover)] text-sm text-[var(--text-muted)]"
          style={{ height: "160px" }}
          role="img"
          aria-label={`Screenshot of ${title} coming soon`}
        >
          Screenshot coming soon
        </div>

        {/* Links */}
        {links && links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--accent)] hover:underline transition-colors"
                  style={{ transitionDuration: "var(--duration-hover)" }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[var(--accent)] hover:underline transition-colors"
                  style={{ transitionDuration: "var(--duration-hover)" }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </article>
  );
}
