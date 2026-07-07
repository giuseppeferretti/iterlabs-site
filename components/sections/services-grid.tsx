import * as React from "react";
import { AppWindow, ShieldCheck, Workflow } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/lib/content";

const icons = [AppWindow, Workflow, ShieldCheck];

/**
 * As três linhas de serviço - reveals em cascata (0.2s por item) e
 * hover com chip de ícone brilhando + hairline (CSS).
 */
export function ServicesGrid({ services }: { services: Dictionary["services"] }) {
  return (
    <section id="services" className="section relative scroll-mt-20 overflow-hidden border-t border-border">
      <div className="container-tight relative">
        <div className="max-w-2xl">
          <Reveal as="p" duration={0.6} y={20} className="eyebrow mb-4 flex items-center gap-3 text-muted-foreground">
            <span aria-hidden className="inline-block h-px w-7 bg-warmth/70" />
            {services.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={0.2} className="h2 text-balance">
            {services.heading}
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-12 md:mt-16 lg:grid-cols-3">
          {services.items.map((item, i) => {
            const Icon = icons[i] ?? AppWindow;
            return (
              <Reveal
                as="div"
                key={item.title}
                delay={i * 0.2}
                y={36}
                className="group relative flex flex-col gap-4 pb-6"
              >
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-warmth/70 transition-transform duration-500 ease-out-smooth group-hover:scale-x-100"
                />
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-muted/40 text-primary transition-[border-color,box-shadow,transform] duration-300 ease-out-smooth group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-[0_0_28px_-8px_hsl(var(--primary)/0.55)]">
                  <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="body text-muted-foreground">{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
