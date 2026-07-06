"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface NoiseOverlayProps {
  className?: string;
  opacity?: number;
}

/**
 * Subtle film grain texture. Pure SVG (cheap), fixed full-screen, blends as overlay.
 * Adds perceived "production value" to dark cinematic sites.
 */
export function NoiseOverlay({ className, opacity = 0.07 }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[1] mix-blend-overlay",
        className
      )}
      style={{ opacity }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>
    </div>
  );
}
