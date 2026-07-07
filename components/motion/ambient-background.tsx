import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Presença ambiente global - camada fixa atrás de TUDO (gramática /osite:
 * gradiente de cena + orbes de glow + textura de pontos). Puro CSS:
 * keyframes lentos (22-26s) compositor-only; mortos sob prefers-reduced-motion
 * pela media query global. A página nunca fica "morta".
 *
 * Montar uma vez no layout, antes do conteúdo. Server-safe (zero JS).
 */
export function AmbientBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
    >
      {/* Cena base - tinta radial da marca no topo */}
      <div className="scene-hero absolute inset-0" />

      {/* Orbes de glow em deriva lenta (sangrando as bordas) */}
      <div className="animate-aura-drift-a absolute -left-[12%] -top-[18%] h-[55vmax] w-[55vmax] rounded-full aura-primary opacity-60" />
      <div className="animate-aura-drift-b absolute -bottom-[24%] -right-[14%] h-[48vmax] w-[48vmax] rounded-full aura-warmth opacity-50" />

      {/* Textura técnica - campo de pontos esvanecendo nas bordas */}
      <div className="dot-field absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black_20%,transparent_80%)]" />
    </div>
  );
}
