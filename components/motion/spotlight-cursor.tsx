"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SpotlightCursorProps {
  className?: string;
  color?: string;
  size?: number;
}

/**
 * A radial gradient that follows the mouse pointer within its container (relative parent).
 * Use as decorative ambient inside hero / CTA / featured sections.
 */
export function SpotlightCursor({
  className,
  color = "hsl(var(--primary) / 0.35)",
  size = 600
}: SpotlightCursorProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.7 });

  React.useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    const el = ref.current?.parentElement;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left - size / 2);
      y.set(e.clientY - rect.top - size / 2);
    };
    const onLeave = () => {
      x.set(-9999);
      y.set(-9999);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, size, x, y]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          x: sx,
          y: sy
        }}
      />
    </div>
  );
}
