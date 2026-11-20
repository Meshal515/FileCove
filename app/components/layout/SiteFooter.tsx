import { Link } from "react-router";
import { Logo, Tagline, LOGO_PATHS, LOGO_VIEWBOX } from "~/components/brand/Logo";
import { LinkButton } from "~/components/ui";
import { useHref, useLocale, useT } from "~/lib/i18n";

export function FinalCta() {
  const t = useT();
  const href = useHref();
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line">
      {/* Oversized mark, cropped — the only decorative flourish on the page. */}
      <svg
        aria-hidden
        viewBox={LOGO_VIEWBOX}
        className="pointer-events-none absolute -bottom-24 end-[-60px] hidden size-[440px] text-line md:block"
      >
        <path fill="currentColor" d={LOGO_PATHS.file} />
        <path fill="currentColor" d={LOGO_PATHS.fold} />
        <path fill="currentColor" d={LOGO_PATHS.wave} />
        <path className="fill-buoy" d={LOGO_PATHS.buoy} />
      </svg>
      <div className="container-page relative py-24 sm:py-32">
        <h2
          id="cta-title"
          data-reveal
          className="font-display text-[44px] leading-[54px] font-semibold tracking-[-0.015em] sm:text-[64px] sm:leading-[76px]"
        >
          {t.cta.title}
        </h2>
        <p data-reveal className="mt-4 text-[17px] leading-[30px] text-muted">
          {t.cta.lead}
        </p>
        <div data-reveal className="mt-8">
          <LinkButton to={href("/signin")} size="lg">
            {t.cta.primary}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const t = useT();
  const href = useHref();
  const locale = useLocale();
  const home = href("/");
  const product = [
    { to: `${home}#features`, label: t.nav.features },
    { to: `${home}#security`, label: t.nav.security },
    { to: `${home}#pricing`, label: t.nav.pricing },
    { to: `${home}#faq`, label: t.nav.faq },
  ];
  const legal = [
    { to: href("/terms"), label: t.footer.terms },
    { to: href("/privacy"), label: t.footer.privacy },
    { to: href("/report"), label: t.footer.report },
  ];

  return (
    <footer className="border-t border-line bg-raised">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <Logo locale={locale} />
          <div className="mt-5">
            <Tagline />
          </div>
        </div>
        <nav aria-label={t.a11y.footerNav} className="grid grid-cols-2 gap-8 md:col-span-6">
          <FooterCol title={t.footer.product} links={product} anchors />
          <FooterCol title={t.footer.legal} links={legal} />
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-micro text-muted sm:flex-row sm:justify-between">
          <span dir="ltr" className="text-start">
            © 2026 FileCove
          </span>
          <span>{t.footer.built}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  anchors,
}: {
  title: string;
  links: { to: string; label: string }[];
  anchors?: boolean;
}) {
  return (
    <div>
      <p className="text-small font-medium">{title}</p>
      <ul className="mt-3 space-y-1">
        {links.map((l) => (
          <li key={l.to}>
            {anchors ? (
              <a href={l.to} className="inline-block py-1 text-small text-muted hover:text-ink">
                {l.label}
              </a>
            ) : (
              <Link to={l.to} className="inline-block py-1 text-small text-muted hover:text-ink">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
