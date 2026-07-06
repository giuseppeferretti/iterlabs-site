"use client";

import * as React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroGridBg } from "@/components/motion/hero-grid-bg";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextReveal } from "@/components/motion/split-text-reveal";
import type { Dictionary } from "@/lib/content";

/**
 * Hero — the only section that keeps the template's motion
 * (conversion > showreel). CTAs are plain anchors: external cal.com + mailto.
 */
export function HeroPortfolio({ hero }: { hero: Dictionary["hero"] }) {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroGridBg />

      <div className="container-tight relative flex min-h-[80vh] items-center justify-center pb-20 pt-12 md:min-h-[85vh] md:pb-28 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal as="div" duration={0.6} y={20} className="eyebrow mb-6 text-muted-foreground">
            {hero.eyebrow}
          </Reveal>

          <SplitTextReveal as="h1" text={hero.headline} className="h1 text-balance" stagger={0.06} />

          <Reveal as="p" delay={0.4} className="body-lg mt-6 text-balance text-muted-foreground md:mt-8">
            {hero.subheadline}
          </Reveal>

          <Reveal as="div" delay={0.6} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="transition-transform duration-200 ease-out-smooth hover:-translate-y-0.5"
            >
              <a href={hero.primaryCta.href} target="_blank" rel="noopener noreferrer">
                {hero.primaryCta.label}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={hero.secondaryCta.href}>
                <Mail aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                {hero.secondaryCta.label}
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
