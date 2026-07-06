import * as React from "react";
import { AppWindow, ShieldCheck, Workflow } from "lucide-react";
import type { Dictionary } from "@/lib/content";

const icons = [AppWindow, Workflow, ShieldCheck];

/**
 * The three service lines. Static; hover feedback only (CSS).
 */
export function ServicesGrid({ services }: { services: Dictionary["services"] }) {
  return (
    <section id="services" className="section scroll-mt-20 border-t border-border">
      <div className="container-tight">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4 text-muted-foreground">{services.eyebrow}</p>
          <h2 className="h2 text-balance">{services.heading}</h2>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-12 md:mt-16 lg:grid-cols-3">
          {services.items.map((item, i) => {
            const Icon = icons[i] ?? AppWindow;
            return (
              <div key={item.title} className="group relative flex flex-col gap-3 pb-6">
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out-smooth group-hover:scale-x-100"
                />
                <Icon aria-hidden className="h-5 w-5 text-primary" strokeWidth={1.75} />
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="body text-muted-foreground">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
