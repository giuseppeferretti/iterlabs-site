import * as React from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

export interface FooterColumn {
  title: string;
  links: { href: string; label: string }[];
}

export interface SocialLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SiteFooterProps {
  logo: React.ReactNode;
  tagline?: string;
  columns: FooterColumn[];
  social?: SocialLink[];
  copyright: string;
}

export function SiteFooter({ logo, tagline, columns, social, copyright }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container-tight py-16 md:py-20">
        <Reveal as="div" duration={0.7} y={40}>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr] lg:gap-20">
            <div>
              <Link href="/" className="text-base font-semibold tracking-tight">
                {logo}
              </Link>
              {tagline && <p className="body mt-3 max-w-sm text-muted-foreground">{tagline}</p>}
              {social && social.length > 0 && (
                <ul className="mt-6 flex items-center gap-4">
                  {social.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {s.icon ?? s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-4">
                  <h4 className="label text-foreground">{col.title}</h4>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group relative inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                          <span
                            aria-hidden
                            className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out-smooth group-hover:scale-x-100"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 border-t border-border pt-6 text-sm text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
