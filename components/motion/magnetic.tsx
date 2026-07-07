"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagneticProps {
  children: React.ReactNode;
  /** Força do pull (0.3 default - botões; 0.5 mais forte - logos). */
  strength?: number;
  /** Raio em px ao redor do elemento onde o pull começa. */
  radius?: number;
  className?: string;
}

/**
 * Wrapper que faz o elemento "perseguir" o cursor quando ele se aproxima.
 * Use em CTAs, links proeminentes ou logos pra microinteração premium.
 *
 * Skip em prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.3,
  radius = 200,
  className
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });

  React.useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const falloff = 1 - dist / radius;
        x.set(dx * strength * falloff);
        y.set(dy * strength * falloff);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, strength, radius, x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
