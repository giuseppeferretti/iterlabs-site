import * as React from "react";
import type { Dictionary } from "@/lib/content";

/**
 * Short, honest bio + hard facts. Static.
 */
export function AboutSection({ about }: { about: Dictionary["about"] }) {
  return (
    <section id="about" className="section scroll-mt-20 border-t border-border bg-muted/30">
      <div className="container-tight">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4 text-muted-foreground">{about.eyebrow}</p>
            <h2 className="h2 text-balance">{about.heading}</h2>
            <div className="mt-6 space-y-4">
              {about.paragraphs.map((p) => (
                <p key={p} className="body-lg text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <ul className="flex flex-col gap-4 self-center border-l border-border pl-6">
            {about.facts.map((fact) => (
              <li key={fact} className="body text-foreground">
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
