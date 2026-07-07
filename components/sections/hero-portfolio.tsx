"use client";

import * as React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Aura } from "@/components/art/aura";
import { CircuitLines } from "@/components/art/circuit-lines";
import { HeroGridBg } from "@/components/motion/hero-grid-bg";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { ScrollIndicator } from "@/components/motion/scroll-indicator";
import { SplitTextReveal } from "@/components/motion/split-text-reveal";
import type { Dictionary } from "@/lib/content";

/**
 * Hero - camadas /osite: cena radial → grid de pontos mouse-reactive →
 * auras respirando → line-art do fluxo de automação (stroke-draw) →
 * copy com headline cinética + CTAs magnéticos + scroll cue.
 * LCP preservado: headline é texto (SSR), arte é SVG/CSS leve.
 */
export function HeroPortfolio({ hero }: { hero: Dictionary["hero"] }) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Camada 1 - cena radial da marca */}
      <div aria-hidden className="scene-hero absolute inset-0 -z-10" />

      {/* Camada 2 - grid de pontos que segue o mouse */}
      <HeroGridBg />

      {/* Camada 3 - auras respirando, sangrando as bordas */}
      <Aura variant="primary" className="-top-40 left-[6%] h-[420px] w-[420px] md:h-[560px] md:w-[560px]" />
      <Aura variant="warmth" className="right-[2%] top-[34%] h-[300px] w-[300px] [animation-delay:2.4s] md:h-[400px] md:w-[400px]" />

      {/* Camada 4 - line-art do fluxo de automação (desenha on-view) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 hidden w-[min(1240px,96vw)] -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-50 md:block"
      >
        <CircuitLines />
      </div>

      <div className="container-tight relative flex min-h-[86vh] items-center justify-center pb-24 pt-12 md:min-h-[92svh] md:pb-32 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal
            as="div"
            duration={0.6}
            y={20}
            className="eyebrow mb-6 inline-flex items-center justify-center gap-2.5 text-muted-foreground"
          >
            <span aria-hidden className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-warmth" />
            {hero.eyebrow}
          </Reveal>

          <SplitTextReveal
            as="h1"
            text={hero.headline}
            accent={hero.headlineAccent}
            className="h1 text-balance"
            stagger={0.06}
          />

          <Reveal as="p" delay={0.4} className="body-lg mt-6 text-balance text-muted-foreground md:mt-8">
            {hero.subheadline}
          </Reveal>

          <Reveal as="div" delay={0.6} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Magnetic strength={0.25} radius={140}>
              <Button
                asChild
                size="lg"
                className="shadow-[0_10px_34px_-14px_hsl(var(--primary)/0.55)] transition-[transform,box-shadow] duration-300 ease-out-smooth hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-12px_hsl(var(--primary)/0.7)]"
              >
                <a href={hero.primaryCta.href} target="_blank" rel="noopener noreferrer">
                  {hero.primaryCta.label}
                </a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.2} radius={120}>
              <Button asChild size="lg" variant="outline" className="backdrop-blur-sm">
                <a href={hero.secondaryCta.href}>
                  <Mail aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                  {hero.secondaryCta.label}
                </a>
              </Button>
            </Magnetic>
          </Reveal>
        </div>

        <ScrollIndicator label={hero.scrollCue} />
      </div>

      {/* Transição de cena - hairline com brilho no pé do hero */}
      <div aria-hidden className="hairline-glow absolute inset-x-0 bottom-0" />
    </section>
  );
}
