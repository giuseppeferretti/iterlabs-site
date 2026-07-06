"use client";

import * as React from "react";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";

export interface LogoItem {
  name: string;
  src?: string;
}

export interface LogoStripProps {
  id?: string;
  label?: string;
  logos: LogoItem[];
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
}

export function LogoStrip({ id, label, logos, reverse = false, speed = "normal" }: LogoStripProps) {
  return (
    <section id={id} className="border-y border-border bg-muted/30">
      <div className="py-16 md:py-20">
        {label && (
          <Reveal as="div" className="container-tight">
            <p className="eyebrow mb-10 text-center text-muted-foreground">{label}</p>
          </Reveal>
        )}
        <Marquee speed={speed} reverse={reverse}>
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="whitespace-nowrap text-xl font-semibold tracking-tight md:text-2xl">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
