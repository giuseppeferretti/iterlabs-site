import * as React from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/content";
import { localePath, type Locale } from "@/lib/site";

export interface FooterSimpleProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Static footer: tagline, case-study links, external links, copyright.
 */
export function FooterSimple({ locale, dict }: FooterSimpleProps) {
  const external = [
    dict.contact.github,
    { label: dict.hero.secondaryCta.label, href: dict.hero.secondaryCta.href },
    { label: "cal.com/giuseppe-ferretti-e1pvyy", href: dict.hero.primaryCta.href }
  ];

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container-tight py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr] lg:gap-20">
          <div>
            <Link href={localePath(locale, "/")} className="text-base font-semibold tracking-tight">
              Iter Labs
            </Link>
            <p className="body mt-3 max-w-sm text-muted-foreground">{dict.footer.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="label text-foreground">{dict.footer.pagesTitle}</h2>
              <ul className="flex flex-col gap-3">
                {dict.cases.map((cs) => (
                  <li key={cs.slug}>
                    <Link
                      href={localePath(locale, `/work/${cs.slug}`)}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {cs.cardTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="label text-foreground">{dict.footer.linksTitle}</h2>
              <ul className="flex flex-col gap-3">
                {external.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-6 text-sm text-muted-foreground">
          {dict.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
