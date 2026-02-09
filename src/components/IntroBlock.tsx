"use client";

import ScrollReveal from "./ScrollReveal";

export default function IntroBlock() {
  return (
    <section className="flex justify-center px-6 pb-24 sm:pb-32">
      <ScrollReveal>
        <p
          className="text-[17px] sm:text-lg leading-relaxed text-[var(--text-primary)] max-w-[720px]"
          style={{ lineHeight: 1.6 }}
        >
          Having worked in big tech for the last decade, building was always the
          thing I couldn&apos;t do myself. I had ideas constantly — but between
          bureaucracy, resourcing fights, and the fact that I simply couldn&apos;t
          code, they stayed ideas. The summer of 2025 changed how I think about
          what one person can do. I started building — not to prove anything, but
          because for the first time, I could. This site is where I document what
          I&apos;m learning.
        </p>
      </ScrollReveal>
    </section>
  );
}
