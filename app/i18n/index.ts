import ar, { type Dict } from "./ar";
import en from "./en";

export type Locale = "ar" | "en";
export type { Dict };

export const LOCALES: Locale[] = ["ar", "en"];
export const DEFAULT_LOCALE: Locale = "ar";

const dictionaries: Record<Locale, Dict> = { ar, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ar";
}

export function dirOf(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Path for the same page in a given locale. Arabic lives at the root. */
export function localizePath(path: string, locale: Locale): string {
  const bare = path.replace(/^\/en(?=\/|$)/, "") || "/";
  if (locale === "ar") return bare;
  return bare === "/" ? "/en" : `/en${bare}`;
}
