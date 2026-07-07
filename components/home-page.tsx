import * as React from "react";
import { SiteHeader } from "@/components/site-header";
import { HeroPortfolio } from "@/components/sections/hero-portfolio";
import { StackMarquee } from "@/components/sections/stack-marquee";
import { MetricsBar } from "@/components/sections/metrics-bar";
import { WorkGrid } from "@/components/sections/work-grid";
import { ServicesGrid } from "@/components/sections/services-grid";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FooterSimple } from "@/components/sections/footer-simple";
import { getDictionary } from "@/lib/content";
import type { Locale } from "@/lib/site";

/**
 * Shared home page - rendered at "/" (EN) and "/pt" (PT).
 */
export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <SiteHeader locale={locale} nav={dict.nav} bookCallHref={dict.hero.primaryCta.href} />

      <main>
        <HeroPortfolio hero={dict.hero} />
        <StackMarquee items={dict.stack} />
        <MetricsBar items={dict.metrics} />
        <WorkGrid locale={locale} work={dict.work} cases={dict.cases} />
        <ServicesGrid services={dict.services} />
        <AboutSection about={dict.about} />
        <ContactSection contact={dict.contact} hero={dict.hero} />
      </main>

      <FooterSimple locale={locale} dict={dict} />
    </>
  );
}
