"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import clsx from "clsx";

export interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

function scoreColor(score: number): string {
  if (score >= 85) return "var(--warm-gold)";
  if (score >= 70) return "var(--navy)";
  if (score >= 50) return "var(--charcoal-muted)";
  return "#8a6a5a";
}

export function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  label = "Elegance",
  className,
}: ScoreRingProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const [display, setDisplay] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const dashOffset = useTransform(spring, (v) => circumference - (v / 100) * circumference);

  useEffect(() => {
    spring.set(clamped);
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [clamped, spring]);

  return (
    <div className={clsx("relative inline-flex flex-col items-center gap-2", className)}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(44,42,40,0.08)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={scoreColor(clamped)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
        <span className="font-serif text-3xl text-charcoal leading-none">{display}</span>
        <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-charcoal-muted">
          {label}
        </span>
      </div>
    </div>
  );
}
