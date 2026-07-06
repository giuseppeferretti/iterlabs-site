"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HeroGridBgProps {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  spacing?: number;
}

export function HeroGridBg({
  className,
  dotColor = "currentColor",
  dotSize = 1.25,
  spacing = 28
}: HeroGridBgProps) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });

  React.useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dx = (e.clientX / w - 0.5) * 24;
      const dy = (e.clientY / h - 0.5) * 24;
      x.set(dx);
      y.set(dy);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, x, y]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden text-muted-foreground/40",
        "[mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_30%,transparent_85%)]",
        className
      )}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)]"
        style={{ x: sx, y: sy }}
      >
        <defs>
          <pattern
            id="hero-dot-grid"
            x="0"
            y="0"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={spacing / 2} cy={spacing / 2} r={dotSize} fill={dotColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />
      </motion.svg>
    </div>
  );
}
