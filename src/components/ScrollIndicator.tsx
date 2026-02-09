"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="flex justify-start pt-3 pb-4 lg:hidden"
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity var(--duration-reveal) var(--ease-out-expo)`,
      }}
      aria-hidden="true"
    >
      <svg
        width="20"
        height="28"
        viewBox="0 0 20 28"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="4,10 10,16 16,10" />
        <polyline points="4,16 10,22 16,16" />
      </svg>
    </div>
  );
}
