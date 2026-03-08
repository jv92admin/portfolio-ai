"use client";

import { useState } from "react";
import Image from "next/image";

interface Step {
  label: string;
  src: string;
  alt: string;
}

interface StepCarouselProps {
  title?: string;
  steps: Step[];
}

export default function StepCarousel({ title, steps }: StepCarouselProps) {
  const [activeStep, setActiveStep] = useState(0);

  const step = steps[activeStep];

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Title */}
      {title && (
        <span
          className="text-base font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </span>
      )}

      {/* Image container */}
      <div
        className="relative overflow-hidden rounded-lg"
        style={{
          width: "100%",
          maxWidth: "300px",
          aspectRatio: "9 / 16",
        }}
      >
        <Image
          key={step.src}
          src={step.src}
          alt={step.alt}
          fill
          sizes="300px"
          className="object-contain object-top"
          draggable={false}
        />
      </div>

      {/* Step chip navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className="text-xs font-medium rounded-full transition-all"
            style={{
              padding: "6px 14px",
              backgroundColor:
                activeStep === i ? "var(--accent)" : "var(--surface-2)",
              color:
                activeStep === i
                  ? "var(--bg-primary)"
                  : "var(--text-secondary)",
              border:
                activeStep === i
                  ? "1px solid var(--accent)"
                  : "1px solid var(--border)",
              transitionDuration: "var(--duration-hover)",
              transitionTimingFunction: "var(--ease-out-expo)",
            }}
          >
            {i + 1}. {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
