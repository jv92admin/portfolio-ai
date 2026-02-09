"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Alfred", href: "/alfred" },
  { label: "Style Guide", href: "/style-guide" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vigneshj92/",
  },
  {
    label: "GitHub",
    href: "https://github.com/jv92admin",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/bigneshhh",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isOpen, close]);

  return (
    <>
      <header className="flex items-center justify-between px-6 py-8 max-w-[1200px] mx-auto w-full">
        <Link
          href="/"
          onClick={close}
          className="text-[var(--text-primary)] text-lg font-medium tracking-tight hover:text-[var(--accent)] transition-colors"
          style={{ transitionDuration: "var(--duration-hover)" }}
        >
          Vignesh Jeyaraman
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors p-2 -mr-2"
          style={{ transitionDuration: "var(--duration-hover)" }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            {isOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ transitionDuration: "var(--duration-reveal)" }}
        onClick={close}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <nav
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-[var(--surface)] border-l border-[var(--border)] flex flex-col transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transitionDuration: "var(--duration-reveal)",
          transitionTimingFunction: "var(--ease-out-expo)",
        }}
        aria-label="Site navigation"
      >
        {/* Close button inside sidebar */}
        <div className="flex justify-end px-6 py-8">
          <button
            onClick={close}
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors p-2 -mr-2"
            style={{ transitionDuration: "var(--duration-hover)" }}
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-1 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={close}
              className="text-lg text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors py-3"
              style={{ transitionDuration: "var(--duration-hover)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social links at bottom */}
        <div className="mt-auto px-6 pb-12 flex flex-col gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              style={{ transitionDuration: "var(--duration-hover)" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
