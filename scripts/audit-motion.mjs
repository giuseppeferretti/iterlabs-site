#!/usr/bin/env node
/**
 * audit-motion.mjs — auditoria de motion pre-deploy
 *
 * Procura por padrões problemáticos em todos os componentes do site:
 * - duration <0.6s em entradas (não-hover)
 * - easings fora do canon (não-power3/power2/expo/none nos GSAP; não-[0.16,1,0.3,1] etc. nos Framer)
 * - staggers <0.2s (delay: i * 0.16 etc.)
 *
 * Exceções aceitas:
 * - Linhas com comentário `// audit-ignore: <motivo>` (junto ou acima)
 * - Hover transitions (declarados em whileHover ou em arquivos com nome contendo `hover`)
 *
 * Saída: lista de violations com filepath:line e sugestão. Exit code 1 se houver
 * violations bloqueantes (>=1 entrada com duration <0.6s OU stagger <0.2s).
 *
 * Uso:  node scripts/audit-motion.mjs
 *
 * Convenção definida em ~/.claude/skills/site/SKILL.md `## Timing & easing canon`.
 */
import { readFile } from "node:fs/promises";
import { glob } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

// ─────────────────────────────────────────────────────────────────────────────
// Patterns

/**
 * Duration <0.6s. Captura: duration: 0.X (qualquer 0.1–0.5).
 * Não bloqueia se a mesma linha (ou linha imediatamente anterior) tem
 * `whileHover` / `audit-ignore` / `pulse-` / `transition-` (CSS class).
 */
const RE_DURATION_TOO_FAST = /duration:\s*0\.([1-5])(?!\d)/g;

/**
 * Stagger <0.2s. Captura padrões tipo `delay: i * 0.16` ou `staggerChildren: 0.15`.
 */
const RE_STAGGER_TOO_FAST =
  /(?:delay:\s*\w+\s*\*\s*0\.(0\d|1\d)(?!\d)|staggerChildren:\s*0\.(0\d|1\d)(?!\d))/g;

/**
 * GSAP easing fora canon. Captura `ease: "<algo>"` que não seja
 * power3.x, power2.x, expo.x, none, sine.x (sine permitido em ambient).
 */
const RE_GSAP_BAD_EASING =
  /ease:\s*"((?!power3|power2|expo|none|sine|circ)[a-zA-Z][a-zA-Z0-9.]*?)"/g;

/**
 * Framer cubic-bezier custom fora canon. Permitidos:
 * - [0.16, 1, 0.3, 1] (out-smooth)
 * - [0.22, 1, 0.36, 1] (easeOutExpo)
 * - [0.4, 0, 0.2, 1] (material standard, aceito)
 * Qualquer outro [n, n, n, n] vira candidato.
 */
const RE_FRAMER_BEZIER = /ease:\s*\[([^\]]+)\]/g;
const ALLOWED_BEZIERS = new Set([
  "0.16, 1, 0.3, 1",
  "0.22, 1, 0.36, 1",
  "0.4, 0, 0.2, 1",
  "0.16,1,0.3,1",
  "0.22,1,0.36,1",
  "0.4,0,0.2,1"
]);

// ─────────────────────────────────────────────────────────────────────────────
// Helpers

function hasIgnoreMarker(lines, idx) {
  const line = lines[idx] || "";
  const prev = lines[idx - 1] || "";
  return /audit-ignore/i.test(line) || /audit-ignore/i.test(prev);
}

function isHoverContext(lines, idx, filepath) {
  // arquivo com "hover" no nome OU bloco com `whileHover` próximo (10 linhas atrás)
  if (/hover/i.test(filepath)) return true;
  for (let j = Math.max(0, idx - 10); j < idx; j++) {
    if (/whileHover|whileTap|onMouseEnter/.test(lines[j])) return true;
  }
  return false;
}

function isAmbientContext(lines, idx) {
  // Verifica se está num bloco com `repeat: Infinity` próximo — ambient/looping
  // motion é OK ter duration longa OU customs (mesh, breath, marquee, etc).
  for (let j = Math.max(0, idx - 10); j <= Math.min(lines.length - 1, idx + 5); j++) {
    if (/repeat:\s*Infinity/.test(lines[j])) return true;
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main

async function findFiles() {
  const out = [];
  const patterns = ["components/**/*.tsx", "components/**/*.ts", "app/**/*.tsx"];
  for (const p of patterns) {
    try {
      for await (const entry of glob(p)) {
        out.push(path.resolve(ROOT, entry));
      }
    } catch {
      /* glob não disponível em node antigo — fallback abaixo */
    }
  }
  return out;
}

async function fallbackGlob() {
  // Fallback simples se node.glob não existir (node <22)
  const { readdirSync, statSync } = await import("node:fs");
  const out = [];
  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const name of entries) {
      if (name === "node_modules" || name === ".next" || name === ".snapshots") continue;
      const full = path.join(dir, name);
      const stat = statSync(full);
      if (stat.isDirectory()) walk(full);
      else if (/\.(tsx?|jsx?)$/.test(name)) out.push(full);
    }
  };
  walk(path.join(ROOT, "components"));
  walk(path.join(ROOT, "app"));
  return out;
}

async function main() {
  let files = await findFiles();
  if (files.length === 0) files = await fallbackGlob();

  const violations = [];

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    let content;
    try {
      content = await readFile(file, "utf-8");
    } catch {
      continue;
    }
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (hasIgnoreMarker(lines, i)) continue;

      // 1. Duration <0.6s — só blockingt fora de hover/ambient
      RE_DURATION_TOO_FAST.lastIndex = 0;
      let m;
      while ((m = RE_DURATION_TOO_FAST.exec(line)) !== null) {
        const ctx = isHoverContext(lines, i, rel)
          ? "hover"
          : isAmbientContext(lines, i)
            ? "ambient"
            : "entry";
        if (ctx === "entry") {
          violations.push({
            type: "duration-too-fast",
            blocking: true,
            file: rel,
            line: i + 1,
            snippet: line.trim(),
            msg: `duration 0.${m[1]}s — entrada deve ser >= 0.6s (regra Cinematic). Use 0.6, 0.8 ou 1.0.`
          });
        }
      }

      // 2. Stagger <0.2s
      RE_STAGGER_TOO_FAST.lastIndex = 0;
      while ((m = RE_STAGGER_TOO_FAST.exec(line)) !== null) {
        const val = (m[1] ?? m[2]).padStart(2, "0");
        violations.push({
          type: "stagger-too-fast",
          blocking: true,
          file: rel,
          line: i + 1,
          snippet: line.trim(),
          msg: `stagger 0.${val}s — usar 0.2s (regra Cinematic). Use 0.2 ou múltiplos (0.2, 0.4...).`
        });
      }

      // 3. GSAP easing fora canon (string format)
      RE_GSAP_BAD_EASING.lastIndex = 0;
      while ((m = RE_GSAP_BAD_EASING.exec(line)) !== null) {
        const easing = m[1];
        if (/^(ease|linear)$/.test(easing)) continue; // GSAP default OK
        // easeInOut/easeIn/easeOut em ambient (repeat: Infinity) é aceitável
        if (/^easeIn(Out)?$|^easeOut$/.test(easing) && isAmbientContext(lines, i)) continue;
        violations.push({
          type: "easing-out-of-canon",
          blocking: false,
          file: rel,
          line: i + 1,
          snippet: line.trim(),
          msg: `easing "${easing}" fora canon. Use power3.out (entrada), power2.in (saída), expo.out (dive), ou none (scrub).`
        });
      }

      // 4. Framer cubic-bezier custom
      RE_FRAMER_BEZIER.lastIndex = 0;
      while ((m = RE_FRAMER_BEZIER.exec(line)) !== null) {
        const tuple = m[1].replace(/\s+/g, " ").trim();
        if (!ALLOWED_BEZIERS.has(tuple) && !ALLOWED_BEZIERS.has(tuple.replace(/ /g, ""))) {
          violations.push({
            type: "bezier-out-of-canon",
            blocking: false,
            file: rel,
            line: i + 1,
            snippet: line.trim(),
            msg: `cubic-bezier [${tuple}] fora canon. Use [0.16, 1, 0.3, 1] (out-smooth) ou [0.22, 1, 0.36, 1] (easeOutExpo).`
          });
        }
      }
    }
  }

  if (violations.length === 0) {
    console.log("✓ Motion audit: zero violations — todas as animações dentro do canon Cinematic.");
    process.exit(0);
  }

  const blocking = violations.filter((v) => v.blocking);
  const warnings = violations.filter((v) => !v.blocking);

  console.log(`\n━━━ Motion audit ━━━`);
  console.log(`Total: ${violations.length} (${blocking.length} bloqueantes, ${warnings.length} avisos)\n`);

  const grouped = {};
  for (const v of violations) {
    grouped[v.type] = grouped[v.type] || [];
    grouped[v.type].push(v);
  }

  for (const [type, list] of Object.entries(grouped)) {
    const marker = list[0].blocking ? "❌" : "⚠";
    console.log(`${marker} ${type} (${list.length})`);
    for (const v of list.slice(0, 8)) {
      console.log(`   ${v.file}:${v.line}`);
      console.log(`     ${v.snippet.slice(0, 100)}`);
      console.log(`     → ${v.msg}`);
    }
    if (list.length > 8) console.log(`   ... +${list.length - 8} more`);
    console.log();
  }

  console.log(`Pra ignorar uma linha legítima: adicionar comentário "// audit-ignore: <motivo>" junto ou acima.\n`);

  process.exit(blocking.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("audit-motion failed:", err.message);
  process.exit(2);
});
