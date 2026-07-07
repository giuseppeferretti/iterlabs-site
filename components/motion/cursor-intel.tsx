"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface CursorIntelProps {
  className?: string;
}

/**
 * Cursor "inteligente" - glow segue o ponteiro com lag spring,
 * mas REAGE ao contexto via atributo data-cursor:
 *  - default: glow padrão (380px, opacity 0.22, hue dourado 41)
 *  - sobre [data-cursor="cta"]: glow expande (560px, opacity 0.42, hue navy 218)
 *  - sobre [data-cursor="photo"]: glow contrai (240px, opacity 0.14)
 *  - sobre [data-cursor="text"]: glow esmaece (280px, opacity 0.10)
 *
 * IMPORTANTE: Só fica visível DEPOIS do primeiro pointermove. Antes disso,
 * fica completamente fora da tela + opacity 0. Resolve o bug visual de "glow
 * sem nexo no canto" ao carregar a página antes do mouse interagir.
 *
 * Customize os hues no switch abaixo conforme paleta do site.
 * Aposentado em touch devices (pointer:coarse) e em reduced-motion.
 */
export function CursorIntel({ className }: CursorIntelProps) {
  const reduced = useReducedMotion();
  const [hasPointer, setHasPointer] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const size = useMotionValue(380);
  const opacity = useMotionValue(0);
  const hue = useMotionValue(41);

  const sx = useSpring(x, { stiffness: 110, damping: 25, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 110, damping: 25, mass: 0.5 });
  const ssize = useSpring(size, { stiffness: 180, damping: 28 });
  const sopacity = useSpring(opacity, { stiffness: 180, damping: 28 });
  const shue = useSpring(hue, { stiffness: 180, damping: 28 });

  const background = useTransform(
    shue,
    (h) => `radial-gradient(circle, hsl(${h} 80% 60% / 0.55) 0%, transparent 70%)`
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    setHasPointer(fine);
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      if (!hasInteracted) {
        setHasInteracted(true);
        opacity.jump(0.22);
      }

      x.set(e.clientX - ssize.get() / 2);
      y.set(e.clientY - ssize.get() / 2);

      const el = e.target as HTMLElement | null;
      if (!el || typeof el.closest !== "function") return;
      const ctx = el.closest("[data-cursor]") as HTMLElement | null;
      const role = ctx?.dataset.cursor ?? "default";

      switch (role) {
        case "cta":
          size.set(560);
          opacity.set(0.42);
          hue.set(218);
          break;
        case "photo":
          size.set(240);
          opacity.set(0.14);
          hue.set(41);
          break;
        case "text":
          size.set(280);
          opacity.set(0.10);
          hue.set(41);
          break;
        default:
          size.set(380);
          opacity.set(0.22);
          hue.set(41);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, hasInteracted, x, y, size, opacity, hue, ssize]);

  if (!hasPointer || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 -z-[2] rounded-full blur-3xl",
        className
      )}
      style={{
        x: sx,
        y: sy,
        width: ssize,
        height: ssize,
        opacity: sopacity,
        background,
        mixBlendMode: "screen"
      }}
    />
  );
}
