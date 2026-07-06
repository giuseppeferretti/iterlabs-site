"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/site";

/**
 * Discreet EN | PT switcher. Routes mirror each other exactly:
 * "/x" <-> "/pt/x", so the target href is derived from the current path.
 */
export function LangSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? "/";

  const basePath = pathname === "/pt" ? "/" : pathname.startsWith("/pt/") ? pathname.slice(3) : pathname;
  const enHref = basePath;
  const ptHref = basePath === "/" ? "/pt" : `/pt${basePath}`;

  const item = "px-1 py-0.5 text-xs font-medium tracking-wide transition-colors";

  return (
    <nav aria-label={label} className="flex items-center text-muted-foreground">
      <Link
        href={enHref}
        aria-current={locale === "en" ? "true" : undefined}
        className={cn(item, locale === "en" ? "text-foreground" : "hover:text-foreground")}
      >
        EN
      </Link>
      <span aria-hidden className="px-0.5 text-border">
        |
      </span>
      <Link
        href={ptHref}
        aria-current={locale === "pt" ? "true" : undefined}
        className={cn(item, locale === "pt" ? "text-foreground" : "hover:text-foreground")}
      >
        PT
      </Link>
    </nav>
  );
}
