"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangSwitcher } from "@/components/lang-switcher";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/content";
import { localePath, type Locale } from "@/lib/site";

export interface SiteHeaderProps {
  locale: Locale;
  nav: Dictionary["nav"];
  bookCallHref: string;
}

/**
 * Sticky header — static (no entrance animation; motion is reserved for the hero).
 * Logo, section links, EN | PT switcher, theme toggle, book-a-call CTA.
 */
export function SiteHeader({ locale, nav, bookCallHref }: SiteHeaderProps) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const home = localePath(locale, "/");
  const links = [
    { href: `${home}#work`, label: nav.work },
    { href: `${home}#services`, label: nav.services },
    { href: `${home}#about`, label: nav.about },
    { href: `${home}#contact`, label: nav.contact }
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300 ease-out-smooth",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur" : "bg-background"
      )}
    >
      <div className="container-tight flex h-16 items-center justify-between md:h-20">
        <Link
          href={home}
          className="text-base font-semibold tracking-tight transition-[letter-spacing] duration-300 ease-out-smooth hover:tracking-wider"
        >
          Iter Labs
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out-smooth group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LangSwitcher locale={locale} label={nav.switchLanguage} />
          <ThemeToggle labels={nav.theme} />
          <Button
            asChild
            size="sm"
            className="transition-transform duration-200 ease-out-smooth hover:-translate-y-0.5"
          >
            <a href={bookCallHref} target="_blank" rel="noopener noreferrer">
              {nav.bookCall}
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitcher locale={locale} label={nav.switchLanguage} />
          <ThemeToggle labels={nav.theme} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? nav.closeMenu : nav.openMenu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container-tight flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <a href={bookCallHref} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                {nav.bookCall}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
