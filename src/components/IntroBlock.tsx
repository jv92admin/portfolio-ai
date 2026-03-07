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
          couldn&apos;t code. AI changed that —{" "}
          <span className="text-[var(--accent)] italic">
            intelligence on demand turned years of backlogged ideas into
            weekends of building.
          </span>{" "}
          This site is what happens when nothing is stopping you anymore.
        </p>
      </ScrollReveal>
    </section>
  );
}
