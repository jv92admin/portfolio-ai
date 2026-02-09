"use client";

import { useEffect, useRef, useState, Children, type ReactNode } from "react";

interface StaggerGroupProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export default function StaggerGroup({
  children,
  staggerDelay = 100,
  className = "",
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => (
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity var(--duration-reveal) var(--ease-out-expo) ${index * staggerDelay}ms, transform var(--duration-reveal) var(--ease-out-expo) ${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
