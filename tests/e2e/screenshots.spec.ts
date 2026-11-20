import { test } from "@playwright/test";

/**
 * Visual review: 4 widths × 2 languages × 2 themes = 16 full-page shots.
 * Run with: npm run screenshots   → written to ./screenshots/
 */
const WIDTHS = [360, 768, 1280, 1920];
const LOCALES = [
  ["ar", "/"],
  ["en", "/en"],
] as const;
const THEMES = ["light", "dark"] as const;

test.skip(!process.env.SCREENSHOTS, "set SCREENSHOTS=1 to capture");

for (const width of WIDTHS)
  for (const [locale, path] of LOCALES)
    for (const theme of THEMES)
      test(`${locale}-${theme}-${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: `screenshots/${locale}-${theme}-${width}.png`, fullPage: true });
      });
