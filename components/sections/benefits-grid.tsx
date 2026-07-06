"use client";

import * as React from "react";
import { Reveal } from "@/components/motion/reveal";
import { AuroraBackground } from "@/components/motion/aurora-background";

export interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  body: string;
}

export interface BenefitsGridProps {
  id?: string;
  eyebrow?: string;
  headline: string;
  items: BenefitItem[];
}

export function BenefitsGrid({ id, eyebrow, headline, items }: BenefitsGridProps) {
  return (
    <section id={id} className="section relative isolate overflow-hidden">
      <AuroraBackground intensity="subtle" blendMode="screen" className="opacity-40" />
      <div className="container-tight relative">
        <Reveal as="div" className="max-w-2xl">
          {eyebrow && <div className="eyebrow mb-4 text-muted-foreground">{eyebrow}</div>}
          <h2 className="h2 text-balance">{headline}</h2>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={i}
              as="div"
              delay={i * 0.08}
              y={60}
              duration={0.7}
              className="group relative flex flex-col gap-3 pb-6"
            >
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out-smooth group-hover:scale-x-100"
              />
              <div className="text-primary transition-transform duration-300 ease-out-smooth group-hover:-translate-y-0.5 [&_svg]:h-5 [&_svg]:w-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="body text-muted-foreground">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
