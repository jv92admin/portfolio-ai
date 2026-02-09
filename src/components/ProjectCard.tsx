"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

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
  isMuted?: boolean;
  titleDisplay?: ReactNode;
  image?: string;
  imageType?: "portrait" | "landscape";
  deepDiveHref?: string;
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
  isMuted = false,
  titleDisplay,
  image,
  imageType = "landscape",
  deepDiveHref,
}: ProjectCardProps) {
  return (
    <article
      className={`project-card group relative rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] hover:scale-[1.015] transition-all h-full ${
        isHero ? "col-span-full" : ""
      }`}
      style={{
        padding: "clamp(24px, 4vw, 40px)",
        transitionDuration: "var(--duration-hover)",
        transitionTimingFunction: "ease-out",
        opacity: isMuted ? 0.55 : undefined,
        filter: isMuted ? "saturate(0.3)" : undefined,
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
            {titleDisplay || title}
          </h3>
          {badge && (
            <span className="text-xs font-medium text-[var(--accent)] border border-[var(--accent-muted)] rounded-full px-3 py-0.5">
              {badge}
            </span>
          )}
        </div>

        {/* Subtitle */}
        <p className="text-sm text-[var(--text-secondary)] mb-1">{subtitle}</p>
        {deepDiveHref ? (
          <Link
            href={deepDiveHref}
            className="text-xs text-[var(--accent)] hover:underline mb-6 inline-block"
          >
            Nerd out here &rarr;
          </Link>
        ) : (
          <div className="mb-5" />
        )}

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

        {/* Image */}
        {image ? (
          imageType === "portrait" ? (
            <div className="mt-6 flex justify-center">
              <div
                className="relative overflow-hidden rounded-xl"
                style={{
                  maxWidth: isHero ? "280px" : "220px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                }}
              >
                <Image
                  src={image}
                  alt={`Screenshot of ${title}`}
                  width={420}
                  height={800}
                  className="w-full h-auto"
                  sizes="280px"
                />
              </div>
            </div>
          ) : (
            <div
              className="mt-6 relative overflow-hidden rounded-lg border border-[var(--border)]"
              style={{ maxHeight: isHero ? "360px" : "280px" }}
            >
              <Image
                src={image}
                alt={`Screenshot of ${title}`}
                width={800}
                height={450}
                className="w-full h-full object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          )
        ) : (
          <div
            className="mt-6 flex items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-hover)] text-sm text-[var(--text-muted)]"
            style={{ height: "160px" }}
            role="img"
            aria-label={`Screenshot of ${title} coming soon`}
          >
            Screenshot coming soon
          </div>
        )}

        {/* Links */}
        {links && links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {links.map((link) => {
              const isGitHub = link.label === "GitHub";
              const btnClass =
                "inline-flex items-center gap-2 text-sm font-medium rounded-lg px-4 py-2 border transition-all " +
                (isGitHub
                  ? "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] bg-transparent"
                  : "border-[var(--accent-muted)] text-[var(--accent)] hover:bg-[var(--accent-glow)] bg-transparent");

              const content = (
                <>
                  {isGitHub && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  )}
                  {link.label}
                </>
              );

              return link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnClass}
                  style={{ transitionDuration: "var(--duration-hover)" }}
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={btnClass}
                  style={{ transitionDuration: "var(--duration-hover)" }}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
