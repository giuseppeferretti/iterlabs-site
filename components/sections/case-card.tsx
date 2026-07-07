"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring
} from "framer-motion";
import type { CaseStudy } from "@/lib/content";

export interface CaseCardProps {
  caseStudy: CaseStudy;
  href: string;
  readCase: string;
  index: number;
}

/**
 * Card de case com hover rico: tilt 3D (useSpring - física reativa),
 * glow radial que segue o cursor e hairline de acento no topo.
 * Entrada "deck-dealt" (canon: 1.1s, [0.22,1,0.36,1], stagger 0.2 x index).
 */
export function CaseCard({ caseStudy, href, readCase, index }: CaseCardProps) {
  const reduced = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20, mass: 0.6 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(40);
  const glow = useMotionTemplate`radial-gradient(360px circle at ${gx}% ${gy}%, hsl(var(--primary) / 0.16), transparent 68%)`;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((py - 0.5) * -6);
    ry.set((px - 0.5) * 8);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const card = (
    <Link
      href={href}
      className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-lg border border-border bg-background/80 p-6 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 ease-out-smooth hover:border-primary/50 hover:shadow-[0_18px_50px_-24px_hsl(var(--primary)/0.45)] md:p-8"
    >
      {/* Glow que segue o cursor */}
      <motion.span
        aria-hidden
        style={{ backgroundImage: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out-smooth group-hover:opacity-100"
      />
      {/* Hairline de acento no topo */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-warmth to-transparent transition-transform duration-500 ease-out-smooth group-hover:scale-x-100"
      />

      <p className="eyebrow relative text-muted-foreground">{caseStudy.tag}</p>
      <h3 className="h3 relative text-balance">{caseStudy.cardTitle}</h3>
      <p className="body relative text-muted-foreground">{caseStudy.cardSummary}</p>
      <span className="relative mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-primary">
        {readCase}
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-300 ease-out-smooth group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      </span>
    </Link>
  );

  if (reduced) {
    return <div className="h-full">{card}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="h-full will-change-transform"
    >
      {card}
    </motion.div>
  );
}
