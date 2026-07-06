"use client";

import * as React from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextReveal } from "@/components/motion/split-text-reveal";
import { AuroraBackground } from "@/components/motion/aurora-background";

export interface TestimonialQuoteProps {
  quote: string;
  author: string;
  role?: string;
  image?: string;
}

export function TestimonialQuote({ quote, author, role, image }: TestimonialQuoteProps) {
  return (
    <section className="section relative isolate overflow-hidden">
      <AuroraBackground intensity="subtle" blendMode="screen" className="opacity-50" />

      <span
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 select-none text-[20rem] font-serif leading-none text-primary/10"
      >
        &ldquo;
      </span>

      <div className="container-tight relative">
        <figure className="mx-auto max-w-4xl text-center">
          <SplitTextReveal
            as="p"
            text={`“${quote}”`}
            className="h2 font-medium text-balance"
            stagger={0.04}
            duration={0.8}
          />
          <Reveal as="figcaption" delay={0.5} className="mt-10 flex flex-col items-center gap-3">
            {image && (
              <img src={image} alt={author} className="h-12 w-12 rounded-full object-cover" />
            )}
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold">{author}</span>
              {role && <span className="text-sm text-muted-foreground">{role}</span>}
            </div>
          </Reveal>
        </figure>
      </div>
    </section>
  );
}
