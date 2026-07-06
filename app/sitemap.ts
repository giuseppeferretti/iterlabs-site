import type { MetadataRoute } from "next";
import { caseSlugs } from "@/lib/content";
import { LOCALES, SITE_URL, localePath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...caseSlugs.map((slug) => `/work/${slug}`)];
  const lastModified = new Date();

  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8
    }))
  );
}
