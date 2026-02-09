"use client";

import ScrollReveal from "./ScrollReveal";

export default function IntroBlock() {
  return (
    <section className="flex justify-center px-6 pb-12 sm:pb-16">
      <ScrollReveal>
        <p
          className="text-[17px] sm:text-lg leading-relaxed text-[var(--text-primary)] max-w-[720px]"
          style={{ lineHeight: 1.6 }}
        >
          I&apos;ve always had ideas for things I wanted to build. I just
          couldn&apos;t code. In 2025, that barrier disappeared. I started
          building — not to prove anything, but because nothing was stopping me
          anymore.
        </p>
      </ScrollReveal>
    </section>
  );
}
