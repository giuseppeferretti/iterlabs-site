import * as React from "react";
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Aura } from "@/components/art/aura";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/lib/content";

export interface ContactSectionProps {
  contact: Dictionary["contact"];
  hero: Dictionary["hero"];
}

/**
 * Contato - links diretos (call, email, GitHub), agora com aura de
 * fechamento, reveals em cascata e CTA magnético.
 */
export function ContactSection({ contact, hero }: ContactSectionProps) {
  return (
    <section id="contact" className="section relative scroll-mt-20 overflow-hidden border-t border-border">
      <Aura variant="primary" className="left-1/2 top-8 h-[420px] w-[620px] -translate-x-1/2 opacity-70" />
      <Aura variant="warmth" breathe={false} className="-bottom-32 right-[10%] h-[280px] w-[280px] opacity-60" />

      <div className="container-tight relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal as="p" duration={0.6} y={20} className="eyebrow mb-4 flex items-center gap-3 text-muted-foreground">
            <span aria-hidden className="inline-block h-px w-7 bg-warmth/70" />
            {contact.eyebrow}
            <span aria-hidden className="inline-block h-px w-7 bg-warmth/70" />
          </Reveal>
          <Reveal as="h2" delay={0.2} className="h2 text-balance">
            {contact.heading}
          </Reveal>
          <Reveal as="p" delay={0.4} className="body-lg mt-6 text-balance text-muted-foreground">
            {contact.body}
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

          <Reveal as="div" delay={0.8} duration={0.6} y={16}>
            <a
              href={contact.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github aria-hidden className="h-4 w-4" strokeWidth={1.75} />
              <span className="relative">
                {contact.github.label}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out-smooth group-hover:scale-x-100"
                />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
