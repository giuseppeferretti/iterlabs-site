import * as React from "react";
import { Aura } from "@/components/art/aura";
import { Reveal } from "@/components/motion/reveal";
import { CaseCard } from "@/components/sections/case-card";
import type { Dictionary } from "@/lib/content";
import { localePath, type Locale } from "@/lib/site";

export interface WorkGridProps {
  locale: Locale;
  work: Dictionary["work"];
  cases: Dictionary["cases"];
}

/**
 * Grid de cases - header com reveal em cascata e cards com entrada
 * deck-dealt + hover rico (tilt/glow) via CaseCard.
 */
export function WorkGrid({ locale, work, cases }: WorkGridProps) {
  return (
    <section id="work" className="section relative scroll-mt-20 overflow-hidden">
      <Aura variant="primary" breathe={false} className="-right-40 top-10 h-[380px] w-[380px] opacity-50" />

      <div className="container-tight relative">
        <div className="max-w-2xl">
          <Reveal as="p" duration={0.6} y={20} className="eyebrow mb-4 flex items-center gap-3 text-muted-foreground">
            <span aria-hidden className="inline-block h-px w-7 bg-warmth/70" />
            {work.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={0.2} className="h2 text-balance">
            {work.heading}
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16">
          {cases.map((cs, i) => (
            <CaseCard
              key={cs.slug}
              caseStudy={cs}
              href={localePath(locale, `/work/${cs.slug}`)}
              readCase={work.readCase}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
