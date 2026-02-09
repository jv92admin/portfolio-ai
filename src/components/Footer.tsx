const footerLinks = [
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

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-32 pt-12 pb-16 px-6 max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <nav className="flex items-center gap-6">
          {footerLinks.map((link) => (
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
        </nav>
        <p className="text-sm text-[var(--text-secondary)]">
          Built with Claude Code
        </p>
      </div>
    </footer>
  );
}
