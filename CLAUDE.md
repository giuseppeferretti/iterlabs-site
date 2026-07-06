# CLAUDE.md — site gerado por `/site`

Este arquivo é a **referência operacional** pra quem (ou o que) for editar esse site. Foi copiado pelo template e contém as regras mínimas pra manter a coerência do padrão Cinematic Experience.

A fonte completa da skill `/site` vive em `~/.claude/skills/site/SKILL.md` e `~/.claude/skills/site/AI-NATIVE-MANIFESTO.md`. Este arquivo é um resumo local pra editores que vão mexer só nesse site.

## Motion ownership — regra crítica

Cada lib tem um papel exclusivo. Não misturar:

- **Lenis** governa a suavização do scroll (LenisProvider no layout). Não animar elemento via Lenis.
- **GSAP + ScrollTrigger** governa movimento ligado a scroll: **pin**, **scrub**, dive-in/dive-out, scroll-driven camera, takeover. Use em cenas pinadas (hero, interlude, testimonial).
- **Framer Motion** governa **mount/whileInView reveal**, **stagger de cards**, hover, **layout animations**, magnetic interactions. Não usar pra pin (deixa pro GSAP).
- **`useSpring`** (Framer) pra física reativa (cursor, magnetic, valores que reagem a input contínuo).

Heurística: pinou? GSAP. Stagger/hover? Framer. Suavização do scroll global? Lenis.

## Timing & easing canon — regra crítica

Sites cinematográficos são **lentos com intenção**:

| Contexto | Duration mínima | Easing canônico | Stagger |
|---|---|---|---|
| Mount/whileInView reveal (Framer) | **0.6s** | `[0.16, 1, 0.3, 1]` | **0.2s** entre items |
| Pin section entrance (GSAP scrub) | 1.0s+ (scrub controla) | `power3.out` | 0.2s |
| Pin section exit / dive-out | 0.4-0.6s | `power2.in` | — |
| Interlude dive-in / dive-out | 0.6-0.8s | `expo.out` / `power2.in` | — |
| Card grid "deck-dealt" (Framer) | 1.0-1.2s | `[0.22, 1, 0.36, 1]` | **0.2s × index** |
| Hover / micro-interação | 0.2-0.4s | `out-smooth` / `power2.out` | — |
| Scrub-driven (GSAP) | controlado por scroll | `ease: "none"` | — |
| Ambient infinito (CSS / mesh) | 5-12s | `ease-in-out` | — |

**Banido:** `duration <0.6s` em entradas (não-hover), `staggerChildren <0.2`, easings fora canon, easeIn puro.

**Exceções permitidas:** `useSpring` (física), `ease: "none"` em scrub, hover ≤0.4s. Pra marcar exceção legítima, adicionar comentário `// audit-ignore: <motivo>` na linha.

## Audit motion pre-deploy

Antes de declarar pronto:

```bash
node scripts/audit-motion.mjs
```

Exit code 1 se houver violations bloqueantes (duration <0.6s em entrada, easing fora canon, stagger <0.2s em lista).

## Visual-check obrigatório

```bash
node scripts/visual-check.mjs http://localhost:<porta>
```

Visual-check só pega erros de console. **Ler os screenshots gerados** em `.snapshots/` é obrigatório — animação invisível é pior que sem animação.

## Componentes que não toque sem motivo

Esses ficam em `components/motion/` e são canônicos da skill. Reutilize:

- `lenis-provider` · `gsap-scroll-pin` (helpers)
- `mesh-gradient-canvas` · `cursor-intel` · `noise-overlay` (ambient root)
- `scroll-indicator` · `hero-video` (hero)
- `reveal` · `split-text-reveal` · `kinetic-headline` (typo)
- `magnetic` · `glass-card` · `path-draw` · `dust-motes` (UI motion)

## Padrão do hero

- **Background:** vídeo loop fullbleed (`<HeroVideo>`) — fonte: Pexels/Coverr/Mixkit/Pixabay. Foto fullbleed só como fallback se vídeo não fizer sentido.
- **Headline:** tensão tipográfica (letterSpacing `-0.06em` → `-0.02em` em sync com opacity reveal).
- **ScrollIndicator** obrigatório no canto inferior central.
- Pin via GSAP (2-3vh trigger).

Detalhes completos em `~/.claude/skills/site/SKILL.md`.
