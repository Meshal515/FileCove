import { expect, test, type Page } from "@playwright/test";

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}

test.describe("landing", () => {
  test("Arabic is the default, RTL, with no console errors", async ({ page }) => {
    const errors = collectErrors(page);
    const res = await page.goto("/");
    expect(res?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("ملفاتك في صفحة وحدة");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("English lives at /en and is LTR", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Your files on one page");
  });

  test("security headers and a per-request CSP nonce", async ({ request }) => {
    const a = await request.get("/");
    const b = await request.get("/");
    const csp = a.headers()["content-security-policy"] ?? "";
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toMatch(/'nonce-[A-Za-z0-9+/=]+'/);
    expect(csp).not.toEqual(b.headers()["content-security-policy"]);
    expect(a.headers()["x-content-type-options"]).toBe("nosniff");
    expect(a.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(a.headers()["permissions-policy"]).toContain("camera=()");
  });

  test("theme choice persists across reloads without a flash", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.getByRole("button", { name: "الوضع الداكن" }).first().click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    // The attribute must already be set when the HTML is parsed (before hydration).
    await page.addInitScript(() => {
      document.addEventListener("DOMContentLoaded", () => {
        (window as unknown as { __themeAtDcl: string | null }).__themeAtDcl =
          document.documentElement.getAttribute("data-theme");
      });
    });
    await page.reload();
    expect(await page.evaluate(() => (window as unknown as { __themeAtDcl: string }).__themeAtDcl)).toBe("dark");
  });

  test("system dark preference is followed on first visit", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("language switch keeps you on the same page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "English" }).first().click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  });

  test("404 returns a real 404", async ({ request }) => {
    const res = await request.get("/does-not-exist");
    expect(res.status()).toBe(404);
  });
});

test.describe("interactions", () => {
  test("desktop demo: selecting a file updates the viewer", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/en");
    const demo = page.locator("#demo");
    await demo.getByRole("button", { name: /Press_Kit\.zip/ }).click();
    await expect(demo.getByText("Archive contents listed without unpacking")).toBeVisible();
    await expect(demo.getByRole("button", { name: /Press_Kit\.zip/ })).toHaveAttribute("aria-pressed", "true");
  });

  test("mobile demo: preview opens as a dialog, Escape closes and restores focus", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto("/en");
    const trigger = page.locator("#demo").getByRole("button", { name: /Design_Doc\.pdf/ });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("file-type tabs work with the keyboard", async ({ page }) => {
    await page.goto("/en");
    const tabs = page.getByRole("tablist", { name: "File types" });
    await tabs.getByRole("tab", { name: "PDF" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.getByRole("tab", { name: "Images" })).toHaveAttribute("aria-selected", "true");
    await expect(tabs.getByRole("tab", { name: "Images" })).toBeFocused();
  });

  test("mobile menu opens and closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto("/");
    const btn = page.getByRole("button", { name: "افتح القائمة" });
    await btn.click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).toBeHidden();
    await expect(btn).toBeFocused();
  });

  test("pricing toggle switches to yearly prices", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("radio", { name: /Yearly/ }).click();
    await expect(page.locator("#pricing")).toContainText("$60 yearly");
  });

  test("no horizontal overflow at 360px in both languages", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    for (const path of ["/", "/en"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});
