import type { MetaDescriptor } from "react-router";
import { localizePath, type Locale } from "~/i18n";

type RootData = { origin: string } | undefined;

export function rootOrigin(matches: readonly ({ id: string; loaderData?: unknown } | undefined)[]): string {
  const root = matches.find((m) => m?.id === "root")?.loaderData as RootData;
  return root?.origin ?? "";
}

export function pageMeta({
  title,
  description,
  path,
  locale,
  origin,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  origin: string;
  noindex?: boolean;
}): MetaDescriptor[] {
  const url = origin + localizePath(path, locale);
  const tags: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { tagName: "link", rel: "alternate", hrefLang: "ar", href: origin + localizePath(path, "ar") },
    { tagName: "link", rel: "alternate", hrefLang: "en", href: origin + localizePath(path, "en") },
    { tagName: "link", rel: "alternate", hrefLang: "x-default", href: origin + localizePath(path, "ar") },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "FileCove" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: `${origin}/og.png` },
    { property: "og:locale", content: locale === "ar" ? "ar_SA" : "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
  if (noindex) tags.push({ name: "robots", content: "noindex" });
  return tags;
}
