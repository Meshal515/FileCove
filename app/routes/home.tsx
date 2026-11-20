import type { Route } from "./+types/home";
import { getDict, localeFromPath } from "~/i18n";
import { pageMeta, rootOrigin } from "~/lib/seo";
import { useReveal } from "~/lib/reveal";
import { useT } from "~/lib/i18n";
import { PreLaunchBanner, SiteHeader } from "~/components/layout/SiteHeader";
import { FinalCta, SiteFooter } from "~/components/layout/SiteFooter";
import { Hero } from "~/components/landing/Hero";
import { OneLink } from "~/components/landing/OneLink";
import { HowItWorks } from "~/components/landing/HowItWorks";
import { Viewer } from "~/components/landing/Viewer";
import { Security } from "~/components/landing/Security";
import { Customize } from "~/components/landing/Customize";
import { Versions } from "~/components/landing/Versions";
import { Pricing } from "~/components/landing/Pricing";
import { Faq } from "~/components/landing/Faq";

export function meta({ location, matches }: Route.MetaArgs) {
  const locale = localeFromPath(location.pathname);
  const t = getDict(locale);
  return pageMeta({
    title: t.meta.title,
    description: t.meta.description,
    path: "/",
    locale,
    origin: rootOrigin(matches),
  });
}

export default function Home() {
  const t = useT();
  useReveal();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-on-ink focus:not-sr-only focus:fixed focus:top-3 focus:start-3"
      >
        {t.a11y.skip}
      </a>
      <PreLaunchBanner />
      <SiteHeader />
      <main id="main">
        <Hero />
        <OneLink />
        <HowItWorks />
        <Viewer />
        <Security />
        <Customize />
        <Versions />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
