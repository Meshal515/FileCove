import { describe, expect, it } from "vitest";
import ar from "~/i18n/ar";
import en from "~/i18n/en";
import { dirOf, localeFromPath, localizePath } from "~/i18n";

type Tree = Record<string, unknown>;

function shape(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj)) return [`${prefix}[${obj.length}]`, ...obj.flatMap((v, i) => shape(v, `${prefix}[${i}]`))];
  if (obj && typeof obj === "object")
    return Object.entries(obj as Tree).flatMap(([k, v]) => shape(v, prefix ? `${prefix}.${k}` : k));
  return [prefix];
}

describe("translations", () => {
  it("Arabic and English have identical keys and list lengths", () => {
    expect(shape(en)).toEqual(shape(ar));
  });

  it("no empty strings (except intentionally blank details)", () => {
    const blanks = shape(ar).filter((k) => !k.endsWith(".detail"));
    for (const dict of [ar, en]) {
      for (const path of blanks) {
        const value = path
          .split(/\.|\[|\]/)
          .filter(Boolean)
          .reduce<unknown>((o, k) => (o as Tree)?.[k], dict);
        if (typeof value === "string") expect(value.trim(), path).not.toBe("");
      }
    }
  });

  it("contains no emoji", () => {
    const text = JSON.stringify([ar, en]);
    expect(text).not.toMatch(/\p{Extended_Pictographic}/u);
  });
});

describe("locale routing", () => {
  it("detects locale from the path", () => {
    expect(localeFromPath("/")).toBe("ar");
    expect(localeFromPath("/signin")).toBe("ar");
    expect(localeFromPath("/en")).toBe("en");
    expect(localeFromPath("/en/signin")).toBe("en");
    expect(localeFromPath("/english")).toBe("ar");
  });

  it("maps paths between locales", () => {
    expect(localizePath("/", "en")).toBe("/en");
    expect(localizePath("/en", "ar")).toBe("/");
    expect(localizePath("/signin", "en")).toBe("/en/signin");
    expect(localizePath("/en/signin", "ar")).toBe("/signin");
  });

  it("direction follows locale", () => {
    expect(dirOf("ar")).toBe("rtl");
    expect(dirOf("en")).toBe("ltr");
  });
});
