"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroGridBg } from "@/components/motion/hero-grid-bg";
import { Reveal } from "@/components/motion/reveal";
import { SplitTextReveal } from "@/components/motion/split-text-reveal";

export interface HeroProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}

export function Hero({ eyebrow, headline, subheadline, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroGridBg />

      <div className="container-tight relative flex min-h-[80vh] items-center justify-center pt-12 pb-20 md:min-h-[88vh] md:pt-20 md:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow && (
            <Reveal as="div" duration={0.6} y={20} className="eyebrow mb-6 text-muted-foreground">
              {eyebrow}
            </Reveal>
          )}

          <SplitTextReveal as="h1" text={headline} className="h1 text-balance" stagger={0.06} />

          {subheadline && (
            <Reveal as="p" delay={0.4} className="body-lg mt-6 text-muted-foreground text-balance md:mt-8">
              {subheadline}
            </Reveal>
          )}

          {(primaryCta || secondaryCta) && (
            <Reveal
              as="div"
              delay={0.6}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              {primaryCta && (
                <Button asChild size="lg" className="transition-transform duration-200 ease-out-smooth hover:-translate-y-0.5">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button asChild size="lg" variant="ghost">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
