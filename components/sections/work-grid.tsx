import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/lib/content";
import { localePath, type Locale } from "@/lib/site";

export interface WorkGridProps {
  locale: Locale;
  work: Dictionary["work"];
  cases: Dictionary["cases"];
}

/**
 * Grid of case-study cards. Static; hover feedback only (CSS).
 */
export function WorkGrid({ locale, work, cases }: WorkGridProps) {
  return (
    <section id="work" className="section scroll-mt-20">
      <div className="container-tight">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4 text-muted-foreground">{work.eyebrow}</p>
          <h2 className="h2 text-balance">{work.heading}</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16">
          {cases.map((cs) => (
            <Link
              key={cs.slug}
              href={localePath(locale, `/work/${cs.slug}`)}
              className="group flex flex-col gap-4 rounded-lg border border-border bg-background p-6 transition-all duration-300 ease-out-smooth hover:-translate-y-1 hover:border-primary/50 hover:shadow md:p-8"
            >
              <p className="eyebrow text-muted-foreground">{cs.tag}</p>
              <h3 className="h3 text-balance">{cs.cardTitle}</h3>
              <p className="body text-muted-foreground">{cs.cardSummary}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-primary">
                {work.readCase}
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 ease-out-smooth group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
