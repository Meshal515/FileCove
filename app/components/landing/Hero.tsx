import { ArrowLeft, ArrowRight } from "lucide-react";
import { Tagline } from "~/components/brand/Logo";
import { ICON, LinkButton, buttonClass } from "~/components/ui";
import { useHref, useLocale, useT } from "~/lib/i18n";
import { ProductDemo } from "./ProductDemo";

export function Hero() {
  const t = useT();
  const href = useHref();
  const Arrow = useLocale() === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page relative pt-12 pb-20 sm:pt-16 lg:pt-24 lg:pb-28">
        <Tagline />
        <h1
          id="hero-title"
          className="mt-6 font-display text-[32px] leading-[48px] font-semibold tracking-[-0.015em] sm:text-[52px] sm:leading-[66px] lg:text-[64px] lg:leading-[80px]"
        >
          <span className="block text-balance lg:whitespace-nowrap">{t.hero.title1}</span>
          <span className="block text-balance text-muted lg:whitespace-nowrap">{t.hero.title2}</span>
        </h1>
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[500px] text-[17px] leading-[30px] text-muted text-pretty lg:text-[18px] lg:leading-[32px]">
            {t.hero.lead}
          </p>
          <div className="lg:text-end">
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton to={href("/signin")} size="lg" className="group">
                {t.hero.primary}
                <Arrow
                  {...ICON}
                  className="size-[18px] transition-transform duration-150 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                />
              </LinkButton>
              <a href="#demo" className={buttonClass("secondary", "lg")}>
                {t.hero.secondary}
              </a>
            </div>
            <p className="mt-4 text-small text-muted">{t.hero.note}</p>
          </div>
        </div>

        <div id="demo" className="mt-14 scroll-mt-24 lg:mt-20">
          <ProductDemo />
          <p className="relative mt-12 text-center text-small text-muted">{t.demo.hint}</p>
        </div>
      </div>
    </section>
  );
}
