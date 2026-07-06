import type { Metadata } from "next";
import { getDictionary } from "@/lib/content";
import { SITE_NAME, SITE_URL, localePath, type Locale } from "@/lib/site";

interface PageMetaInput {
  locale: Locale;
  /** Locale-agnostic path, e.g. "/" or "/work/erp-automation". */
  path: string;
  title: string;
  description: string;
  ogType?: "website" | "article";
}

/**
 * Per-route metadata: title, description, canonical, hreflang alternates and OG tags.
 */
export function pageMetadata({ locale, path, title, description, ogType = "website" }: PageMetaInput): Metadata {
  const dict = getDictionary(locale);
  const url = `${SITE_URL}${localePath(locale, path)}`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}${localePath("en", path)}`,
        "pt-BR": `${SITE_URL}${localePath("pt", path)}`,
        "x-default": `${SITE_URL}${localePath("en", path)}`
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: dict.ogLocale,
      type: ogType
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}
