"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SectionImageSplitProps {
  id?: string;
  index: string;
  eyebrow?: string;
  headline: string;
  body?: string;
  bullets?: string[];
  cta?: { href: string; label: string };
  image: string;
  imageAlt: string;
  reverse?: boolean;
  dark?: boolean;
}

export function SectionImageSplit({
  id,
  index,
  eyebrow,
  headline,
  body,
  bullets,
  cta,
  image,
  imageAlt,
  reverse = false,
  dark = false
}: SectionImageSplitProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn("section relative", dark && "bg-black text-white")}
    >
      <div className="container-tight">
        <div
          className={cn(
            "grid items-center gap-10 lg:gap-20",
            "lg:grid-cols-[5fr_7fr]",
            reverse && "lg:grid-cols-[7fr_5fr]"
          )}
        >
          <Reveal as="div" className={cn("flex flex-col gap-6", reverse && "lg:order-2")}>
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "label tabular-nums",
                  dark ? "text-white/40" : "text-muted-foreground"
                )}
              >
                {index}
              </span>
              <span
                aria-hidden
                className={cn("h-px w-10", dark ? "bg-white/20" : "bg-border")}
              />
              {eyebrow && (
                <span
                  className={cn(
                    "eyebrow",
                    dark ? "text-white/60" : "text-muted-foreground"
                  )}
                >
                  {eyebrow}
                </span>
              )}
            </div>

            <h2 className="h2 text-balance">{headline}</h2>

            {body && (
              <p
                className={cn(
                  "body-lg text-balance",
                  dark ? "text-white/70" : "text-muted-foreground"
                )}
              >
                {body}
              </p>
            )}

            {bullets && bullets.length > 0 && (
              <ul className="mt-2 flex flex-col gap-3">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span className={cn(dark ? "text-white/80" : "text-foreground/85")}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {cta && (
              <div className="mt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 ease-out-smooth hover:-translate-y-0.5"
                >
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              </div>
            )}
          </Reveal>

          <div
            className={cn(
              "relative aspect-[5/4] overflow-hidden rounded-2xl",
              reverse && "lg:order-1"
            )}
          >
            <motion.div
              className="absolute inset-0"
              style={reduced ? undefined : { y }}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="scale-110 object-cover"
              />
            </motion.div>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
