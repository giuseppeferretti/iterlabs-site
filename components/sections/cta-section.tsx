"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { AuroraBackground } from "@/components/motion/aurora-background";
import { SpotlightCursor } from "@/components/motion/spotlight-cursor";
import { GradientText } from "@/components/motion/gradient-text";

export interface CTASectionProps {
  headline: string;
  subheadline?: string;
  cta: { href: string; label: string; icon?: React.ReactNode };
  /**
   * Palavras a destacar no headline com gradient color shift contínuo.
   */
  accentWords?: string[];
}

export function CTASection({ headline, subheadline, cta, accentWords = [] }: CTASectionProps) {
  // Split headline at first matched accent word so we can render that span as GradientText.
  const headlineNodes = React.useMemo(() => {
    if (!accentWords.length) return [headline];
    const escaped = accentWords.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const re = new RegExp(`(${escaped.join("|")})`, "gi");
    return headline.split(re).map((part, i) => {
      const isAccent = accentWords.some((w) => w.toLowerCase() === part.toLowerCase());
      return isAccent ? <GradientText key={i} variant="primary">{part}</GradientText> : <React.Fragment key={i}>{part}</React.Fragment>;
    });
  }, [headline, accentWords]);

  return (
    <section className="section relative isolate overflow-hidden">
      <AuroraBackground intensity="normal" blendMode="screen" />
      <SpotlightCursor color="hsl(var(--primary) / 0.4)" size={700} />
      <div className="container-tight relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal as="h2" className="h2 text-balance">
            {headlineNodes}
          </Reveal>
          {subheadline && (
            <Reveal as="p" delay={0.15} className="body-lg mt-6 text-muted-foreground text-balance">
              {subheadline}
            </Reveal>
          )}
          <Reveal as="div" delay={0.3} className="mt-10">
            <Button
              asChild
              size="lg"
              className="animate-[pulse-glow_3.5s_ease-in-out_infinite] transition-transform duration-200 ease-out-smooth hover:-translate-y-0.5"
            >
              <Link href={cta.href}>
                {cta.label}
                {cta.icon}
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
