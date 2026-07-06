import * as React from "react";
import type { Stat } from "@/lib/content";

/**
 * Real production metrics — static by design (motion is reserved for the hero).
 */
export function MetricsBar({ items }: { items: Stat[] }) {
  return (
    <section aria-label="Key metrics" className="border-y border-border bg-muted/30">
      <div className="container-tight py-14 md:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <dt className="sr-only">{item.label}</dt>
              <dd className="order-1 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                {item.value}
              </dd>
              <dd className="order-2 text-sm text-muted-foreground">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
