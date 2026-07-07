import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuraProps {
  className?: string;
  /** "primary" (navy/azul) ou "warmth" (dourado) - tokens do tema. */
  variant?: "primary" | "warmth";
  /** Respiração lenta (9s). Morta sob prefers-reduced-motion (CSS global). */
  breathe?: boolean;
}

/**
 * Halo luminoso - motivo de luz portado da gramática /osite (studio-lumen
 * components/art/aura.tsx), recolorido nos tokens deste site. Puro CSS
 * radial-gradient + blur; custo ~zero. Sempre decorativo.
 */
export function Aura({ className, variant = "primary", breathe = true }: AuraProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full",
        variant === "primary" ? "aura-primary" : "aura-warmth",
        breathe && "animate-aura-breathe",
        className
      )}
    />
  );
}
