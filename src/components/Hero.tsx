"use client";

import ScrollReveal from "./ScrollReveal";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center px-6 pt-12 pb-10 sm:pt-24 sm:pb-16">
      <ScrollReveal>
        <h1
          className="text-center font-medium leading-tight tracking-tight text-[var(--text-primary)]"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
        >
          I build things I shouldn&apos;t be able to build alone.
        </h1>
      </ScrollReveal>
    </section>
  );
}
