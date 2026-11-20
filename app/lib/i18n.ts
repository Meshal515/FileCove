import { useLocation } from "react-router";
import { getDict, localeFromPath, localizePath, type Locale } from "~/i18n";

export function useLocale(): Locale {
  return localeFromPath(useLocation().pathname);
}

export function useT() {
  return getDict(useLocale());
}

/** Build an in-app href for the current locale. */
export function useHref() {
  const locale = useLocale();
  return (path: string) => localizePath(path, locale);
}
