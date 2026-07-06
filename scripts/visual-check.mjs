/**
 * Visual verification script (headless Playwright).
 *
 * Uso: node scripts/visual-check.mjs [url]
 *
 * Faz:
 *  1. Abre Chromium headless na URL passada (default localhost:3002)
 *  2. Espera networkidle + hidratação (delay extra)
 *  3. Programaticamente scrolla bottom-up devagar (dispara IntersectionObservers
 *     dos `<Reveal>` que ficam em opacity 0 até entrarem na viewport)
 *  4. Volta ao topo
 *  5. Tira screenshot fullpage em desktop (1440x900) e mobile (390x844)
 *  6. Captura console errors + warnings + failed network requests
 *  7. Salva em .snapshots/{viewport}-{ts}.jpg
 *
 * Saída via stdout: JSON com paths + erros pra Claude ler facilmente.
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const url = process.argv[2] ?? "http://localhost:3002";
const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname).replace(/^\/([a-zA-Z]:)/, "$1"), "..");
const snapshotsDir = path.join(projectRoot, ".snapshots");
await fs.mkdir(snapshotsDir, { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 }
];

const ts = Date.now();
const result = { url, screenshots: [], consoleMessages: [], failedRequests: [], errors: [] };

const browser = await chromium.launch({ headless: true });

try {
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();

    page.on("console", async (msg) => {
      const type = msg.type();
      if (type !== "error" && type !== "warning") return;
      // Capture all args (text + key value from React's "%s" template)
      const args = [];
      for (const arg of msg.args()) {
        try {
          args.push(await arg.jsonValue());
        } catch {
          args.push("[circular]");
        }
      }
      result.consoleMessages.push({ viewport: vp.name, type, text: msg.text(), args });
    });
    page.on("pageerror", (err) => {
      result.errors.push({ viewport: vp.name, error: err.message });
    });
    page.on("requestfailed", (req) => {
      result.failedRequests.push({
        viewport: vp.name,
        url: req.url(),
        failure: req.failure()?.errorText
      });
    });

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    } catch (err) {
      result.errors.push({ viewport: vp.name, error: `goto: ${err.message}` });
    }

    // Aguarda hidratação React
    await page.waitForTimeout(1500);

    // Scrolla devagar pra disparar TODOS os IntersectionObservers (reveals)
    await page.evaluate(async () => {
      const totalHeight = document.body.scrollHeight;
      const viewportH = window.innerHeight;
      const step = viewportH * 0.5;
      const steps = Math.ceil(totalHeight / step);
      for (let i = 0; i <= steps; i++) {
        window.scrollTo({ top: i * step, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 400));
    });

    // Screenshot 1: top of page (initial cinematic frame)
    const topPath = path.join(snapshotsDir, `${vp.name}-${ts}-top.jpg`);
    await page.screenshot({ path: topPath, type: "jpeg", quality: 80, fullPage: false });
    result.screenshots.push({ viewport: vp.name, frame: "top", path: topPath });

    // Screenshot 2: fullpage (after triggering reveals)
    const fullPath = path.join(snapshotsDir, `${vp.name}-${ts}-fullpage.jpg`);
    await page.screenshot({ path: fullPath, type: "jpeg", quality: 70, fullPage: true });
    result.screenshots.push({ viewport: vp.name, frame: "fullpage", path: fullPath });

    // Screenshot 3: scroll a 1.5 viewport pra capturar segunda dobra
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: "instant" }));
    await page.waitForTimeout(400);
    const midPath = path.join(snapshotsDir, `${vp.name}-${ts}-mid.jpg`);
    await page.screenshot({ path: midPath, type: "jpeg", quality: 80, fullPage: false });
    result.screenshots.push({ viewport: vp.name, frame: "mid", path: midPath });

    await context.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(result, null, 2));
