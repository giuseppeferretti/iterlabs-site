"use client";

import * as React from "react";
import { Reveal } from "@/components/motion/reveal";
import { RollingNumber } from "@/components/motion/rolling-number";
import { AuroraBackground } from "@/components/motion/aurora-background";

export interface NumberMarqueeProps {
  items: { number: string; label: string }[];
}

export function NumberMarquee({ items }: NumberMarqueeProps) {
  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-muted/30">
      <AuroraBackground intensity="subtle" blendMode="screen" className="opacity-70" />
      <div className="container-tight relative py-16 md:py-20">
        <dl className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-6">
          {items.map((item, i) => (
            <Reveal
              key={i}
              as="div"
              delay={i * 0.1}
              y={40}
              duration={0.7}
              className="flex flex-col items-start gap-2"
            >
              <dt className="bg-[linear-gradient(110deg,hsl(var(--foreground)),hsl(var(--primary)),hsl(var(--foreground)))] bg-[length:200%_100%] bg-[position:0%_50%] bg-clip-text text-5xl font-semibold tracking-tight text-transparent [-webkit-background-clip:text] md:text-6xl animate-[gradient-shift_8s_ease-in-out_infinite]">
                <RollingNumber value={item.number} delay={0.15 + i * 0.1} />
              </dt>
              <dd className="text-sm text-muted-foreground">{item.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
