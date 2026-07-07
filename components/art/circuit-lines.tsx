"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Line-art autoral no espírito /osite (apparatus.tsx): o objeto do negócio
 * desenhado em traço, 2 cores de token. Aqui, o "objeto" da Iter Labs é o
 * fluxo de automação - janela de navegador → agente → banco de dados -
 * desenhado on-view com stroke-draw (Framer pathLength, canon do repo).
 *
 * Decorativo (aria-hidden). Sob prefers-reduced-motion renderiza pronto.
 */
export function CircuitLines({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.6, delay, ease: EASE },
        opacity: { duration: 0.6, delay, ease: EASE }
      }
    })
  };

  const fade: Variants = {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      transition: { duration: 0.8, delay, ease: EASE }
    })
  };

  const structure = {
    fill: "none",
    stroke: "hsl(var(--primary) / 0.55)",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  const flow = {
    fill: "none",
    stroke: "hsl(var(--warmth) / 0.75)",
    strokeWidth: 2,
    strokeLinecap: "round" as const
  };

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1200 560"
      className={cn("pointer-events-none h-auto w-full", className)}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* ── Janela de navegador (estrutura, primary) ─────────── */}
      <motion.rect variants={draw} custom={0} x="48" y="160" width="300" height="250" rx="14" {...structure} />
      <motion.path variants={draw} custom={0.2} d="M48 204 H348" {...structure} />
      <motion.circle variants={draw} custom={0.4} cx="76" cy="182" r="4.5" {...structure} />
      <motion.circle variants={draw} custom={0.4} cx="100" cy="182" r="4.5" {...structure} />
      <motion.circle variants={draw} custom={0.4} cx="124" cy="182" r="4.5" {...structure} />
      <motion.path variants={draw} custom={0.6} d="M80 248 H268" {...structure} />
      <motion.path variants={draw} custom={0.6} d="M80 286 H316" {...structure} />
      <motion.path variants={draw} custom={0.6} d="M80 324 H236" {...structure} />
      <motion.path variants={draw} custom={0.8} d="M272 344 l14 34 6 -13 13 -6 z" {...structure} />

      {/* ── Núcleo do agente (estrutura + miolo warmth) ──────── */}
      <motion.circle variants={draw} custom={0.8} cx="624" cy="300" r="36" {...structure} />
      <motion.path variants={draw} custom={1} d="M624 246 V258" {...structure} />
      <motion.path variants={draw} custom={1} d="M624 342 V354" {...structure} />
      <motion.path variants={draw} custom={1} d="M570 300 H558" {...structure} />
      <motion.path variants={draw} custom={1} d="M678 300 H690" {...structure} />
      <motion.circle variants={draw} custom={1.2} cx="624" cy="300" r="13" {...flow} />

      {/* ── Banco de dados (estrutura, primary) ──────────────── */}
      <motion.ellipse variants={draw} custom={1} cx="1032" cy="196" rx="104" ry="26" {...structure} />
      <motion.path variants={draw} custom={1.2} d="M928 196 V352" {...structure} />
      <motion.path variants={draw} custom={1.2} d="M1136 196 V352" {...structure} />
      <motion.path variants={draw} custom={1.4} d="M928 352 a104 26 0 0 0 208 0" {...structure} />
      <motion.path variants={draw} custom={1.4} d="M928 274 a104 26 0 0 0 208 0" {...structure} />

      {/* ── Fluxos de automação (warmth) ─────────────────────── */}
      <motion.path variants={draw} custom={1.6} d="M362 262 C 470 262, 500 300, 586 300" {...flow} />
      <motion.path variants={draw} custom={1.8} d="M662 300 C 770 300, 820 262, 926 262" {...flow} />

      {/* ── Nós vivos (pulso CSS, morto sob reduced-motion) ──── */}
      <motion.g variants={fade} custom={2.2}>
        <circle cx="362" cy="262" r="4" fill="hsl(var(--warmth) / 0.9)" className="animate-pulse [animation-duration:3s]" />
        <circle
          cx="926"
          cy="262"
          r="4"
          fill="hsl(var(--warmth) / 0.9)"
          className="animate-pulse [animation-delay:1.5s] [animation-duration:3s]"
        />
        <circle cx="624" cy="300" r="5" fill="hsl(var(--warmth) / 0.8)" className="animate-pulse [animation-duration:2.4s]" />
      </motion.g>
    </motion.svg>
  );
}
