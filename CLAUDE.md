# CLAUDE.md — motion & contribution rules

Operating reference for anyone (human or agent) editing this site. The design language is
"cinematic, deliberate": scroll-driven scenes, slow reveals, restrained motion.

## Motion ownership

Each library has exactly one job. Never mix them:

- **Lenis** owns scroll smoothing (`LenisProvider` in the root layout). Never animate elements with it.
- **GSAP + ScrollTrigger** owns scroll-bound movement: **pin**, **scrub**, dive-in/out, scroll-driven camera.
- **Framer Motion** owns mount/`whileInView` reveals, card staggers, hover, layout animations.
- **`useSpring`** (Framer) for reactive physics (cursor, magnetic, continuous-input values).

Rule of thumb: pinned? GSAP. Stagger/hover? Framer. Global scroll feel? Lenis.

## Timing & easing canon

Cinematic sites are **slow on purpose**:

| Context | Min duration | Canonical easing | Stagger |
|---|---|---|---|
| Mount / `whileInView` reveal (Framer) | **0.6s** | `[0.16, 1, 0.3, 1]` | **0.2s** per item |
| Pin-section entrance (GSAP scrub) | 1.0s+ (scrub-driven) | `power3.out` | 0.2s |
| Pin-section exit / dive-out | 0.4–0.6s | `power2.in` | — |
| Card grid "deck-dealt" (Framer) | 1.0–1.2s | `[0.22, 1, 0.36, 1]` | **0.2s × index** |
| Hover / micro-interaction | 0.2–0.4s | `power2.out` | — |
| Scrub-driven (GSAP) | scroll-controlled | `ease: "none"` | — |
| Infinite ambient (CSS / mesh) | 5–12s | `ease-in-out` | — |

**Banned:** entrance `duration < 0.6s` (non-hover), `staggerChildren < 0.2`, non-canon easings, pure ease-in.
**Allowed exceptions:** `useSpring` physics, `ease: "none"` on scrub, hover ≤ 0.4s. Mark a legitimate
exception with `// audit-ignore: <reason>` on the offending line.

## Pre-deploy checks

```bash
node scripts/audit-motion.mjs                       # exits 1 on blocking motion violations
node scripts/visual-check.mjs http://localhost:3000 # console errors + screenshots in .snapshots/
npm run build && npm run lint
```

Reading the generated screenshots is mandatory — an invisible animation is worse than none.

## Canonical components — reuse, don't fork

`components/motion/` primitives are canonical: `lenis-provider`, `gsap-scroll-pin`,
`mesh-gradient-canvas`, `noise-overlay`, `scroll-indicator`, `reveal`, `split-text-reveal`,
`kinetic-headline`, `magnetic`, `glass-card`.

## Content

All copy lives in `lib/content.ts` (typed EN/PT dictionaries) — edit copy there only.
Site constants (URL, email, links) live in `lib/site.ts`. Case-study data feeds
`components/case-page.tsx`; never hardcode copy inside sections.
