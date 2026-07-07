"use client";

import * as React from "react";
import { Reveal } from "@/components/motion/reveal";
import { RollingNumber } from "@/components/motion/rolling-number";
import type { Stat } from "@/lib/content";

/**
 * Métricas reais de produção - agora com count-up (RollingNumber) ao entrar
 * no viewport e reveals em cascata (stagger canon 0.2s).
 */
export function MetricsBar({ items }: { items: Stat[] }) {
  return (
    <section aria-label="Key metrics" className="relative overflow-hidden border-b border-border bg-muted/30">
      <div className="container-tight py-14 md:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {items.map((item, i) => (
            <Reveal as="div" key={item.label} delay={i * 0.2} y={28} className="flex flex-col gap-2">
              <dt className="sr-only">{item.label}</dt>
              <dd className="order-1 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                <RollingNumber value={item.value} delay={0.2 + i * 0.2} />
              </dd>
              <dd className="order-2 text-sm text-muted-foreground">{item.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
