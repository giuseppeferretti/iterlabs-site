/**
 * Global site constants — single source of truth for URLs and identity.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iterlabs.com.br";

export const SITE_NAME = "Iter Labs";
export const PERSON_NAME = "Giuseppe Ferretti";

export const CAL_URL = "https://cal.com/giuseppe-ferretti-e1pvyy";
export const EMAIL = "giuseppe@iterlabs.com.br";
export const GITHUB_URL = "https://github.com/giuseppeferretti";

export type Locale = "en" | "pt";

export const LOCALES: Locale[] = ["en", "pt"];

/** Prefix a path for a locale. EN is the default locale and has no prefix. */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  return path === "/" ? "/pt" : `/pt${path}`;
}
