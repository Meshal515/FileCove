// Renders PNG icons and the OG image from the official mark using Playwright.
// Usage: node scripts/generate-icons.mjs
import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";

const svg = await readFile(new URL("../public/favicon.svg", import.meta.url), "utf8");
const markOnly = svg.replace(/<rect[^>]*\/>/, "");
const out = (f) => new URL(`../public/${f}`, import.meta.url);

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });

async function shot(file, size, html) {
  await page.setViewportSize({ width: size[0], height: size[1] });
  await page.setContent(`<!doctype html><html><body style="margin:0">${html}</body></html>`);
  await page.waitForTimeout(50);
  await writeFile(out(file), await page.screenshot({ type: "png" }));
}

const full = (s) => `<div style="width:${s}px;height:${s}px">${svg.replace("<svg ", `<svg width="${s}" height="${s}" `)}</div>`;
// Full-bleed square (no rounding) for platforms that apply their own mask.
const square = (s, pad) =>
  `<div style="width:${s}px;height:${s}px;background:#0F1B2D;display:grid;place-items:center">${markOnly.replace(
    "<svg ",
    `<svg width="${s * pad}" height="${s * pad}" `,
  )}</div>`;

await shot("icon-192.png", [192, 192], full(192));
await shot("icon-512.png", [512, 512], full(512));
await shot("icon-maskable-512.png", [512, 512], square(512, 0.62));
await shot("apple-touch-icon.png", [180, 180], square(180, 0.78));
await shot("favicon-32.png", [32, 32], full(32));

await shot(
  "og.png",
  [1200, 630],
  `<div style="width:1200px;height:630px;background:#0F1B2D;display:flex;align-items:center;justify-content:center;gap:40px;font-family:system-ui">
    ${markOnly.replace("<svg ", '<svg width="220" height="220" ')}
    <div style="color:#F7F5F0">
      <div style="font-size:96px;letter-spacing:-1px"><span style="font-weight:300">File</span><span style="font-weight:600">Cove</span></div>
      <div style="margin-top:18px;font-size:22px;letter-spacing:.32em;color:#9AA6B8">FILES <span style="color:#E5532D">•</span> LINKS <span style="color:#E5532D">•</span> SHARE</div>
    </div>
  </div>`,
);

await browser.close();
console.log("icons written");
