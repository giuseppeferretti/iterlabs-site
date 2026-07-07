"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  /** Caminho do vídeo MP4. Ex.: "/videos/hero.mp4" */
  src: string;
  /** Caminho opcional pra .webm (formato menor pra Chrome/Firefox) */
  webmSrc?: string;
  /** Imagem fallback exibida antes do load do vídeo + se vídeo falhar */
  poster?: string;
  /** Filtro CSS opcional (ex: "brightness(0.7) contrast(1.05)") */
  filter?: string;
  /** Overlay escuro pra texto legível. true (default) aplica gradient padrão */
  overlay?: boolean | string;
  className?: string;
}

/**
 * HeroVideo - vídeo cinematográfico fullbleed no background do hero.
 *
 * Setup canônico: autoPlay + muted + loop + playsInline + preload="auto".
 * Pausa quando off-screen (IntersectionObserver) pra economizar bateria.
 *
 * Buscar vídeos em Pexels/Coverr/Mixkit/Pixabay - ver SKILL.md
 * `## Asset video search`. Alvo: <5MB, 720p+, 8-20s loopable, sem cortes
 * bruscos.
 *
 * Compressão recomendada antes de servir:
 *   ffmpeg -i input.mp4 -crf 28 -vf scale=1280:-2 -an /public/videos/hero.mp4
 */
export function HeroVideo({
  src,
  webmSrc,
  poster,
  filter,
  overlay = true,
  className
}: HeroVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay bloqueado em alguns contextos - fallback silencioso */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const overlayBg =
    typeof overlay === "string"
      ? overlay
      : overlay
        ? "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.7) 100%)"
        : null;

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover"
        style={filter ? { filter } : undefined}
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={src} type="video/mp4" />
      </video>

      {overlayBg && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: overlayBg }}
        />
      )}
    </div>
  );
}
