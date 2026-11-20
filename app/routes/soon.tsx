import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocation } from "react-router";
import type { Route } from "./+types/soon";
import { getDict, localeFromPath } from "~/i18n";
import { pageMeta, rootOrigin } from "~/lib/seo";
import { useHref, useLocale, useT } from "~/lib/i18n";
import { SiteHeader } from "~/components/layout/SiteHeader";
import { SiteFooter } from "~/components/layout/SiteFooter";
import { ICON, LinkButton } from "~/components/ui";

type Page = "signin" | "terms" | "privacy" | "report";

function pageFromPath(pathname: string): Page {
  const last = pathname.replace(/\/$/, "").split("/").pop();
  return last === "terms" || last === "privacy" || last === "report" ? last : "signin";
}

export function meta({ location, matches }: Route.MetaArgs) {
  const locale = localeFromPath(location.pathname);
  const page = pageFromPath(location.pathname);
  const t = getDict(locale);
  return pageMeta({
    title: `${t.soon[page].title} · FileCove`,
    description: t.soon[page].body,
    path: `/${page}`,
    locale,
    origin: rootOrigin(matches),
    noindex: true,
  });
}

export default function Soon() {
  const t = useT();
  const href = useHref();
  const Back = useLocale() === "ar" ? ArrowRight : ArrowLeft;
  const page = pageFromPath(useLocation().pathname);
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-page flex min-h-[60vh] flex-col justify-center py-24">
        <h1 className="max-w-[640px] font-display text-[36px] leading-[46px] font-semibold sm:text-[44px] sm:leading-[56px]">
          {t.soon[page].title}
        </h1>
        <p className="mt-4 max-w-[560px] text-[17px] leading-[30px] text-muted">{t.soon[page].body}</p>
        <div className="mt-8">
          <LinkButton to={href("/")} variant="secondary">
            <Back {...ICON} className="size-4" />
            {t.soon.back}
          </LinkButton>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
