"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface ImagePair {
  label: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
}

interface BeforeAfterSliderProps {
  pairs: ImagePair[];
}

export default function BeforeAfterSlider({ pairs }: BeforeAfterSliderProps) {
  const [activePair, setActivePair] = useState(0);
  const [handlePos, setHandlePos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const pair = pairs[activePair];

  const getPositionFromEvent = useCallback((clientX: number) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    return Math.min(100, Math.max(0, pct));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      setIsDragging(true);
      if (!hasInteracted) setHasInteracted(true);
      setHandlePos(getPositionFromEvent(e.clientX));
    },
    [getPositionFromEvent, hasInteracted]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setHandlePos(getPositionFromEvent(e.clientX));
    },
    [isDragging, getPositionFromEvent]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const switchPair = (index: number) => {
    setActivePair(index);
    setHandlePos(50);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Pair label + instruction */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-base font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Check out the redesign!
        </span>
        <span
          className="text-xs transition-opacity"
          style={{
            color: "var(--text-secondary)",
            opacity: hasInteracted ? 0 : 1,
            transitionDuration: "var(--duration-hover)",
          }}
        >
          Drag to compare
        </span>
      </div>

      {/* Interaction area — pointer events on the full padded region */}
      <div
        className="relative select-none"
        style={{
          width: "100%",
          maxWidth: "300px",
          touchAction: "none",
          cursor: isDragging ? "grabbing" : "ew-resize",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Image container — clips images, but line/grip render outside */}
        <div
          ref={imageRef}
          className="relative overflow-hidden rounded-lg"
          style={{ aspectRatio: "9 / 16" }}
        >
          {/* After image (full, behind) */}
          <div className="absolute inset-0">
            <Image
              src={pair.after.src}
              alt={pair.after.alt}
              fill
              sizes="300px"
              className="object-contain object-top"
              draggable={false}
            />
          </div>

          {/* Before image (clipped via clip-path) */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - handlePos}% 0 0)`,
            }}
          >
            <Image
              src={pair.before.src}
              alt={pair.before.alt}
              fill
              sizes="300px"
              className="object-contain object-top"
              draggable={false}
            />
          </div>
        </div>

        {/* Handle line — extends 12px past image top/bottom, NOT clipped by image container */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${handlePos}%`,
            top: "-12px",
            bottom: "-12px",
            transform: "translateX(-50%)",
            width: "2px",
            backgroundColor: "var(--accent)",
            willChange: isDragging ? "left" : "auto",
            zIndex: 5,
          }}
        />

        {/* Handle grip */}
        <div
          className="absolute flex items-center justify-center rounded-full pointer-events-none"
          style={{
            left: `${handlePos}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "32px",
            height: "32px",
            backgroundColor: "var(--surface)",
            border: "2px solid var(--accent)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
            willChange: isDragging ? "left" : "auto",
            zIndex: 10,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{ color: "var(--accent)" }}
          >
            <path
              d="M2 6L0 6M4 6L2 6M12 6L10 6M10 6L8 6M3 3L0.5 6L3 9M9 3L11.5 6L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Side labels — below image */}
        <div
          className="flex justify-between px-1 pt-2 pointer-events-none text-sm font-semibold"
        >
          <span style={{ color: "var(--text-secondary)" }}>ryesvp</span>
          <span style={{ color: "var(--text-primary)" }}>Lark</span>
        </div>
      </div>

      {/* Chip navigation */}
      {pairs.length > 1 && (
        <div className="flex items-center gap-2">
          {pairs.map((p, i) => (
            <button
              key={i}
              onClick={() => switchPair(i)}
              className="text-xs font-medium rounded-full transition-all"
              style={{
                padding: "6px 14px",
                backgroundColor:
                  activePair === i ? "var(--accent)" : "var(--surface-2)",
                color:
                  activePair === i ? "var(--bg-primary)" : "var(--text-secondary)",
                border: activePair === i ? "1px solid var(--accent)" : "1px solid var(--border)",
                transitionDuration: "var(--duration-hover)",
                transitionTimingFunction: "var(--ease-out-expo)",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
