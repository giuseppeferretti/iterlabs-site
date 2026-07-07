import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { FooterSimple } from "@/components/sections/footer-simple";
import { Aura } from "@/components/art/aura";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { RollingNumber } from "@/components/motion/rolling-number";
import { SplitTextReveal } from "@/components/motion/split-text-reveal";
import { getDictionary, type CaseStudy } from "@/lib/content";
import { localePath, type Locale } from "@/lib/site";

/**
 * Layout compartilhado de case - Problema → Abordagem → Resultados,
 * com hero próprio (art accent + headline cinética), reveals em cascata
 * e números grandes com count-up ao entrar no viewport.
 */
export function CasePage({ locale, caseStudy }: { locale: Locale; caseStudy: CaseStudy }) {
  const dict = getDictionary(locale);
  const t = dict.casePage;

  return (
    <>
      <SiteHeader locale={locale} nav={dict.nav} bookCallHref={dict.hero.primaryCta.href} />

      <main>
        <article>
          {/* ── Hero do case ───────────────────────────────────── */}
          <header className="relative overflow-hidden">
            <div aria-hidden className="scene-hero absolute inset-0 -z-10" />
            <Aura variant="primary" className="-top-32 right-[-6%] h-[380px] w-[380px] md:h-[480px] md:w-[480px]" />
            <Aura variant="warmth" breathe={false} className="-left-24 bottom-[-30%] h-[300px] w-[300px] opacity-60" />
            <div
              aria-hidden
              className="dot-field pointer-events-none absolute inset-0 opacity-[0.3] [mask-image:radial-gradient(ellipse_70%_80%_at_70%_20%,black_25%,transparent_80%)]"
            />

            <div className="container-tight relative py-14 md:py-20">
              <Reveal as="div" duration={0.6} y={16}>
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
              </Reveal>

              <Reveal
                as="p"
                delay={0.2}
                duration={0.6}
                y={20}
                className="eyebrow mb-4 mt-10 flex items-center gap-3 text-muted-foreground"
              >
                <span aria-hidden className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-warmth" />
                {caseStudy.tag}
              </Reveal>
              <SplitTextReveal as="h1" text={caseStudy.title} delay={0.2} stagger={0.05} className="h1 max-w-4xl text-balance" />
              <Reveal as="p" delay={0.5} className="body-lg mt-6 max-w-3xl text-muted-foreground">
                {caseStudy.clientLine}
              </Reveal>
            </div>

            <div aria-hidden className="hairline-glow absolute inset-x-0 bottom-0" />
          </header>

          {/* ── Problema ───────────────────────────────────────── */}
          <section className="section border-b border-border">
            <div className="container-tight grid gap-8 lg:grid-cols-[1fr_3fr] lg:gap-16">
              <Reveal as="div" duration={0.6} y={24}>
                <p className="eyebrow flex items-center gap-3 text-muted-foreground">
                  <span aria-hidden className="inline-block h-px w-7 bg-warmth/70" />
                  01
                </p>
                <h2 className="h3 mt-2">{t.problemHeading}</h2>
              </Reveal>
              <div className="max-w-3xl space-y-5">
                {caseStudy.problem.map((p, i) => (
                  <Reveal as="p" key={p} delay={0.2 + i * 0.2} y={28} className="body-lg text-muted-foreground">
                    {p}
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Abordagem ──────────────────────────────────────── */}
          <section className="section relative overflow-hidden border-b border-border bg-muted/30">
            <Aura variant="primary" breathe={false} className="-left-48 top-1/3 h-[360px] w-[360px] opacity-40" />
            <div className="container-tight relative grid gap-8 lg:grid-cols-[1fr_3fr] lg:gap-16">
              <Reveal as="div" duration={0.6} y={24}>
                <p className="eyebrow flex items-center gap-3 text-muted-foreground">
                  <span aria-hidden className="inline-block h-px w-7 bg-warmth/70" />
                  02
                </p>
                <h2 className="h3 mt-2">{t.approachHeading}</h2>
              </Reveal>
              <ol className="max-w-3xl space-y-8">
                {caseStudy.approach.map((item, i) => (
                  <Reveal as="li" key={item.body} delay={0.2 + i * 0.2} y={32} className="flex gap-5">
                    <span aria-hidden className="font-mono mt-1 text-sm font-medium text-primary">
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
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>

          {/* ── Resultados ─────────────────────────────────────── */}
          <section className="section border-b border-border">
            <div className="container-tight">
              <div className="grid gap-8 lg:grid-cols-[1fr_3fr] lg:gap-16">
                <Reveal as="div" duration={0.6} y={24}>
                  <p className="eyebrow flex items-center gap-3 text-muted-foreground">
                    <span aria-hidden className="inline-block h-px w-7 bg-warmth/70" />
                    03
                  </p>
                  <h2 className="h3 mt-2">{t.resultsHeading}</h2>
                </Reveal>
                <div>
                  <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                    {caseStudy.results.stats.map((stat, i) => (
                      <Reveal
                        as="div"
                        key={stat.label}
                        delay={i * 0.2}
                        y={28}
                        className="flex flex-col gap-2 border-l-2 border-primary pl-5"
                      >
                        <dt className="sr-only">{stat.label}</dt>
                        <dd className="order-1 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                          <RollingNumber value={stat.value} delay={0.2 + i * 0.2} />
                        </dd>
                        <dd className="order-2 text-sm text-muted-foreground">{stat.label}</dd>
                      </Reveal>
                    ))}
                  </dl>
                  {caseStudy.results.note && (
                    <Reveal as="p" delay={0.2} className="body-lg mt-10 max-w-3xl text-muted-foreground">
                      {caseStudy.results.note}
                    </Reveal>
                  )}

                  {caseStudy.links && caseStudy.links.length > 0 && (
                    <Reveal as="div" delay={0.2} y={24} className="mt-12">
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
                    </Reveal>
                  )}

                  {caseStudy.authorizationNote && (
                    <Reveal
                      as="p"
                      delay={0.2}
                      duration={0.6}
                      y={16}
                      className="mt-12 border-t border-border pt-6 text-sm italic text-muted-foreground"
                    >
                      {caseStudy.authorizationNote}
                    </Reveal>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA ────────────────────────────────────────────── */}
          <section className="section relative overflow-hidden">
            <Aura variant="primary" className="left-1/2 top-4 h-[380px] w-[560px] -translate-x-1/2 opacity-70" />
            <div className="container-tight relative">
              <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                <Reveal as="h2" className="h2 text-balance">
                  {t.ctaHeading}
                </Reveal>
                <Reveal as="p" delay={0.2} className="body-lg mt-5 text-balance text-muted-foreground">
                  {t.ctaBody}
                </Reveal>
                <Reveal as="div" delay={0.4} className="mt-8 flex flex-col items-center gap-3">
                  <Magnetic strength={0.25} radius={140}>
                    <Button
                      asChild
                      size="lg"
                      className="shadow-[0_10px_34px_-14px_hsl(var(--primary)/0.55)] transition-[transform,box-shadow] duration-300 ease-out-smooth hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-12px_hsl(var(--primary)/0.7)]"
                    >
                      <a href={dict.hero.primaryCta.href} target="_blank" rel="noopener noreferrer">
                        {t.ctaButton}
                      </a>
                    </Button>
                  </Magnetic>
                  <a
                    href={dict.hero.secondaryCta.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t.ctaEmail}
                  </a>
                </Reveal>
              </div>
            </div>
          </section>
        </article>
      </main>

      <FooterSimple locale={locale} dict={dict} />
    </>
  );
}
