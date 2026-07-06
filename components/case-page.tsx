import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { FooterSimple } from "@/components/sections/footer-simple";
import { getDictionary, type CaseStudy } from "@/lib/content";
import { localePath, type Locale } from "@/lib/site";

/**
 * Shared case-study layout — consistent Problem → Approach → Results
 * with the numbers front and center. Static (motion is hero-only).
 */
export function CasePage({ locale, caseStudy }: { locale: Locale; caseStudy: CaseStudy }) {
  const dict = getDictionary(locale);
  const t = dict.casePage;

  return (
    <>
      <SiteHeader locale={locale} nav={dict.nav} bookCallHref={dict.hero.primaryCta.href} />

      <main>
        <article>
          {/* ── Header ─────────────────────────────────────────── */}
          <header className="border-b border-border">
            <div className="container-tight py-14 md:py-20">
              <Link
                href={`${localePath(locale, "/")}#work`}
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 ease-out-smooth group-hover:-translate-x-1"
                  strokeWidth={1.75}
                />
                {t.back}
              </Link>

              <p className="eyebrow mb-4 mt-10 text-muted-foreground">{caseStudy.tag}</p>
              <h1 className="h1 max-w-4xl text-balance">{caseStudy.title}</h1>
              <p className="body-lg mt-6 max-w-3xl text-muted-foreground">{caseStudy.clientLine}</p>
            </div>
          </header>

          {/* ── Problem ────────────────────────────────────────── */}
          <section className="section border-b border-border">
            <div className="container-tight grid gap-8 lg:grid-cols-[1fr_3fr] lg:gap-16">
              <div>
                <p className="eyebrow text-muted-foreground">01</p>
                <h2 className="h3 mt-2">{t.problemHeading}</h2>
              </div>
              <div className="max-w-3xl space-y-5">
                {caseStudy.problem.map((p) => (
                  <p key={p} className="body-lg text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* ── Approach ───────────────────────────────────────── */}
          <section className="section border-b border-border bg-muted/30">
            <div className="container-tight grid gap-8 lg:grid-cols-[1fr_3fr] lg:gap-16">
              <div>
                <p className="eyebrow text-muted-foreground">02</p>
                <h2 className="h3 mt-2">{t.approachHeading}</h2>
              </div>
              <ol className="max-w-3xl space-y-8">
                {caseStudy.approach.map((item, i) => (
                  <li key={item.body} className="flex gap-5">
                    <span
                      aria-hidden
                      className="font-mono mt-1 text-sm font-medium text-primary"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="body-lg text-foreground">{item.body}</p>
                      {item.link && (
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-2 inline-flex items-center gap-1 text-sm text-primary"
                        >
                          <span className="relative">
                            {item.link.label}
                            <span
                              aria-hidden
                              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out-smooth group-hover:scale-x-100"
                            />
                          </span>
                          <ArrowUpRight aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── Results ────────────────────────────────────────── */}
          <section className="section border-b border-border">
            <div className="container-tight">
              <div className="grid gap-8 lg:grid-cols-[1fr_3fr] lg:gap-16">
                <div>
                  <p className="eyebrow text-muted-foreground">03</p>
                  <h2 className="h3 mt-2">{t.resultsHeading}</h2>
                </div>
                <div>
                  <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                    {caseStudy.results.stats.map((stat) => (
                      <div key={stat.label} className="flex flex-col gap-2 border-l-2 border-primary pl-5">
                        <dt className="sr-only">{stat.label}</dt>
                        <dd className="order-1 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                          {stat.value}
                        </dd>
                        <dd className="order-2 text-sm text-muted-foreground">{stat.label}</dd>
                      </div>
                    ))}
                  </dl>
                  {caseStudy.results.note && (
                    <p className="body-lg mt-10 max-w-3xl text-muted-foreground">{caseStudy.results.note}</p>
                  )}

                  {caseStudy.links && caseStudy.links.length > 0 && (
                    <div className="mt-12">
                      <h3 className="label text-foreground">{t.linksHeading}</h3>
                      <ul className="mt-3 flex flex-col gap-2">
                        {caseStudy.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-1 text-sm text-primary"
                            >
                              <span className="relative">
                                {link.label}
                                <span
                                  aria-hidden
                                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out-smooth group-hover:scale-x-100"
                                />
                              </span>
                              <ArrowUpRight aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {caseStudy.authorizationNote && (
                    <p className="mt-12 border-t border-border pt-6 text-sm italic text-muted-foreground">
                      {caseStudy.authorizationNote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA ────────────────────────────────────────────── */}
          <section className="section">
            <div className="container-tight">
              <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                <h2 className="h2 text-balance">{t.ctaHeading}</h2>
                <p className="body-lg mt-5 text-balance text-muted-foreground">{t.ctaBody}</p>
                <div className="mt-8 flex flex-col items-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="transition-transform duration-200 ease-out-smooth hover:-translate-y-0.5"
                  >
                    <a href={dict.hero.primaryCta.href} target="_blank" rel="noopener noreferrer">
                      {t.ctaButton}
                    </a>
                  </Button>
                  <a
                    href={dict.hero.secondaryCta.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t.ctaEmail}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      <FooterSimple locale={locale} dict={dict} />
    </>
  );
}
