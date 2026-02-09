import Link from "next/link";

const navLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vigneshj92/",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/jv92admin",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/bigneshhh",
    external: true,
  },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-8 max-w-[1200px] mx-auto w-full">
      <Link
        href="/"
        className="text-[var(--text-primary)] text-lg font-medium tracking-tight hover:text-[var(--accent)] transition-colors"
        style={{ transitionDuration: "var(--duration-hover)" }}
      >
        Vignesh Jeyaraman
      </Link>
      <nav className="flex items-center gap-3 sm:gap-6">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            style={{ transitionDuration: "var(--duration-hover)" }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
