import * as React from "react";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/lib/content";

/**
 * Bio curta e honesta + fatos duros - reveals em cascata; fatos com
 * stagger de 0.2s por item.
 */
export function AboutSection({ about }: { about: Dictionary["about"] }) {
  return (
    <section id="about" className="section relative scroll-mt-20 overflow-hidden border-t border-border bg-muted/30">
      <div className="container-tight relative">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <div>
            <Reveal as="p" duration={0.6} y={20} className="eyebrow mb-4 flex items-center gap-3 text-muted-foreground">
              <span aria-hidden className="inline-block h-px w-7 bg-warmth/70" />
              {about.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={0.2} className="h2 text-balance">
              {about.heading}
            </Reveal>
            <div className="mt-6 space-y-4">
              {about.paragraphs.map((p, i) => (
                <Reveal as="p" key={p} delay={0.4 + i * 0.2} y={28} className="body-lg text-muted-foreground">
                  {p}
                </Reveal>
              ))}
            </div>
          </div>

          <ul className="flex flex-col gap-4 self-center border-l border-border pl-6">
            {about.facts.map((fact, i) => (
              <Reveal as="li" key={fact} delay={i * 0.2} y={24} className="body text-foreground">
                {fact}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
