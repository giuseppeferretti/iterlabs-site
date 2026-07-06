import * as React from "react";
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/content";

export interface ContactSectionProps {
  contact: Dictionary["contact"];
  hero: Dictionary["hero"];
}

/**
 * Contact — direct links only (call, email, GitHub). No form, no endpoint. Static.
 */
export function ContactSection({ contact, hero }: ContactSectionProps) {
  return (
    <section id="contact" className="section scroll-mt-20 border-t border-border">
      <div className="container-tight">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="eyebrow mb-4 text-muted-foreground">{contact.eyebrow}</p>
          <h2 className="h2 text-balance">{contact.heading}</h2>
          <p className="body-lg mt-6 text-balance text-muted-foreground">{contact.body}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
          </div>

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
        </div>
      </div>
    </section>
  );
}
