"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/motion/aurora-background";
import { AccentWords } from "@/components/motion/accent-words";
import { GradientText } from "@/components/motion/gradient-text";
import { HeroVideo } from "@/components/motion/hero-video";
import { ScrollIndicator } from "@/components/motion/scroll-indicator";

export interface HeroCinematicProps {
  /**
   * Path do vídeo de hero (mp4). Quando passado, renderiza HeroVideo no lugar da foto.
   * Default da skill /site - buscar vídeo em Pexels/Coverr/Mixkit/Pixabay por keywords
   * do briefing e colocar em /public/videos/hero.mp4.
   */
  videoSrc?: string;
  /** Path .webm opcional pra formato menor em Chrome/Firefox */
  videoWebmSrc?: string;
  /** Imagem usada como fallback (poster do vídeo) ou bg quando não houver vídeo */
  image: string;
  imageAlt: string;
  eyebrow?: string;
  fragments: string[];
  /**
   * Palavras dentro dos fragments que recebem destaque animado em cor primária.
   * Match case-insensitive.
   */
  accentWords?: string[];
  subheadline?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}

export function HeroCinematic({
  videoSrc,
  videoWebmSrc,
  image,
  imageAlt,
  eyebrow,
  fragments,
  accentWords = [],
  subheadline,
  primaryCta,
  secondaryCta
}: HeroCinematicProps) {
  const reduced = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.5, 0.85]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={containerRef} className="relative h-[260vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {videoSrc ? (
          <HeroVideo
            src={videoSrc}
            webmSrc={videoWebmSrc}
            poster={image}
            overlay={false}
          />
        ) : (
          <motion.div
            className="absolute inset-0"
            style={reduced ? undefined : { scale: imageScale, y: imageY }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        )}

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black"
          style={reduced ? { opacity: 0.7 } : { opacity: overlayOpacity }}
        />

        {/* Aurora morphing color blobs over the photo - gives the perpetual motion vibe */}
        <AuroraBackground intensity="normal" blendMode="overlay" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex-1" />

          <div className="container-tight pb-24 md:pb-32">
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="eyebrow mb-6 text-white/60"
              >
                <GradientText variant="primary">{eyebrow}</GradientText>
              </motion.div>
            )}

            <h1 className="display text-balance font-semibold text-white">
              {fragments.map((fragment, i) => {
                const start = 0.05 + i * 0.2;
                const end = start + 0.22;
                return (
                  <FragmentReveal
                    key={i}
                    text={fragment}
                    accentWords={accentWords}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                    reduced={reduced}
                  />
                );
              })}
            </h1>

            {subheadline && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="body-lg mt-8 max-w-2xl text-white/70 text-balance"
              >
                {subheadline}
              </motion.p>
            )}

            {(primaryCta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                {primaryCta && (
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 ease-out-smooth hover:-translate-y-0.5"
                  >
                    <Link href={primaryCta.href}>{primaryCta.label}</Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
}

/**
 * Reveal de fragment do headline com tensão tipográfica.
 * letterSpacing inicial -0.06em (apertado/tenso) → -0.02em (natural)
 * em sync com opacity + blur. Cria sensação de "respiração" antes de a palavra
 * se firmar - ver SKILL.md `## Hero` (tensão tipográfica).
 */
function FragmentReveal({
  text,
  accentWords,
  progress,
  start,
  end,
  reduced
}: {
  text: string;
  accentWords: string[];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  reduced: boolean | null;
}) {
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const blur = useTransform(progress, [start, end], ["6px", "0px"]);
  const filter = useTransform(blur, (v) => `blur(${v})`);
  const letterSpacing = useTransform(progress, [start, end], ["-0.06em", "-0.02em"]);

  const content = accentWords.length > 0 ? (
    <AccentWords text={text} highlights={accentWords} />
  ) : (
    text
  );

  if (reduced) {
    return <span className="block">{content} </span>;
  }

  return (
    <motion.span
      style={{ opacity, filter, letterSpacing }}
      className="block will-change-[filter,opacity]"
    >
      {content}{" "}
    </motion.span>
  );
}
