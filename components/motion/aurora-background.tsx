"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AuroraBackgroundProps {
  className?: string;
  intensity?: "subtle" | "normal" | "intense";
  blendMode?: "normal" | "screen" | "overlay" | "lighten" | "soft-light";
}

const INTENSITY = {
  subtle: { opacity: 0.25, blur: "blur-3xl" },
  normal: { opacity: 0.45, blur: "blur-3xl" },
  intense: { opacity: 0.7, blur: "blur-2xl" }
} as const;

export function AuroraBackground({
  className,
  intensity = "normal",
  blendMode = "screen"
}: AuroraBackgroundProps) {
  const reduced = useReducedMotion();
  const { opacity, blur } = INTENSITY[intensity];

  const blobs = [
    {
      color: "hsl(var(--primary) / 0.55)",
      size: "h-[55vmax] w-[55vmax]",
      x: ["-10%", "30%", "10%", "-10%"],
      y: ["-20%", "10%", "30%", "-20%"],
      duration: 28
    },
    {
      color: "hsl(var(--primary) / 0.4)",
      size: "h-[45vmax] w-[45vmax]",
      x: ["70%", "30%", "60%", "70%"],
      y: ["50%", "20%", "70%", "50%"],
      duration: 36
    },
    {
      color: "hsl(220 90% 60% / 0.35)",
      size: "h-[40vmax] w-[40vmax]",
      x: ["20%", "60%", "10%", "20%"],
      y: ["60%", "40%", "20%", "60%"],
      duration: 44
    }
  ];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"] }}
    >
      {blobs.map((b, i) => (
        <motion.span
          key={i}
          className={cn("absolute rounded-full will-change-transform", b.size, blur)}
          style={{ background: b.color, opacity }}
          initial={false}
          animate={
            reduced
              ? { x: b.x[0], y: b.y[0] }
              : { x: b.x, y: b.y }
          }
          transition={
            reduced
              ? { duration: 0 }
              : { duration: b.duration, repeat: Infinity, ease: "linear" }
          }
        />
      ))}
    </div>
  );
}
