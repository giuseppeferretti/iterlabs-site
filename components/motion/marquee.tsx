"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  children: React.ReactNode;
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
  pauseOnHover?: boolean;
  fade?: boolean;
  className?: string;
}

const SPEED_CLASS: Record<NonNullable<MarqueeProps["speed"]>, string> = {
  slow: "animate-[marquee-x_60s_linear_infinite]",
  normal: "animate-[marquee-x_40s_linear_infinite]",
  fast: "animate-[marquee-x_24s_linear_infinite]"
};

export function Marquee({
  children,
  speed = "normal",
  reverse = false,
  pauseOnHover = true,
  fade = true,
  className
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-12 pr-12 will-change-transform",
          SPEED_CLASS[speed],
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 items-center gap-12 pr-12 will-change-transform",
          SPEED_CLASS[speed],
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
