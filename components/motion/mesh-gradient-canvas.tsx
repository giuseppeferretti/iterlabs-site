"use client";

import * as React from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MeshGradientCanvasProps {
  /** 5 cores hex em ordem (base escura → meio → acento). */
  colors?: [string, string, string, string, string];
  /** Velocidade base (default 0.05). */
  speed?: number;
  className?: string;
}

/**
 * Layer 1 - Ambient base. Mesh gradient WebGL via @paper-design/shaders-react,
 * fixed full-screen atrás de TUDO. Cores morphando lentamente.
 *
 * Customize via `colors` (5 valores) pra refletir a paleta do site.
 * Default: preto + cinzas + navy + bege escuro (paleta sóbria).
 *
 * Renderiza nada em prefers-reduced-motion.
 */
export function MeshGradientCanvas({
  colors = ["#0a0a0a", "#1a1a1a", "#2a2a2a", "#1e2a3d", "#3a2f1c"],
  speed = 0.05,
  className
}: MeshGradientCanvasProps) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const speedRef = React.useRef(speed);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    speedRef.current = speed + v * 0.05;
  });

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-[10] overflow-hidden",
        className
      )}
    >
      <MeshGradient
        colors={colors}
        speed={speed}
        distortion={0.7}
        swirl={0.3}
        offsetX={0}
        offsetY={0}
        scale={1}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0.72
        }}
      />

      {/* Vinheta radial - escurece bordas, mantém foco no centro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.6)_85%)]" />
    </div>
  );
}
