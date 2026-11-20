import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, Moon, Sun, X, Languages } from "lucide-react";
import { Logo } from "~/components/brand/Logo";
import { LinkButton, ICON } from "~/components/ui";
import { useLocale, useT, useHref } from "~/lib/i18n";
import { localizePath } from "~/i18n";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const t = useT();
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("fc-theme", next);
    } catch {
      /* storage unavailable — choice lasts for this page only */
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? t.a11y.themeToLight : t.a11y.themeToDark}
      className={`inline-grid size-9 place-items-center rounded-md text-ink transition-colors duration-150 hover:bg-sunken ${className}`}
    >
      <Moon {...ICON} className="size-[18px] dark:hidden" />
      <Sun {...ICON} className="hidden size-[18px] dark:block" />
    </button>
  );
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const t = useT();
  const locale = useLocale();
  const { pathname, hash } = useLocation();
  const other = locale === "ar" ? "en" : "ar";
  return (
    <Link
      to={localizePath(pathname, other) + hash}
      hrefLang={other}
      lang={other}
      aria-label={t.nav.switchLang}
      className={`inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-small text-ink transition-colors duration-150 hover:bg-sunken ${className}`}
    >
      <Languages {...ICON} className="size-[17px]" />
      <span>{t.nav.switchLang}</span>
    </Link>
  );
}

export function PreLaunchBanner() {
  const t = useT();
  return (
    <div className="border-b border-line bg-sand/60">
      <p className="container-page flex min-h-10 items-center justify-center gap-2.5 py-2 text-center text-small text-ink">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <span aria-hidden className="size-1.5 rounded-full bg-buoy" />
          {t.banner.label}
        </span>
        <span aria-hidden className="h-3.5 w-px bg-line-strong/60" />
        <span className="text-muted">{t.banner.text}</span>
      </p>
    </div>
  );
}

export function SiteHeader() {
  const t = useT();
  const locale = useLocale();
  const href = useHref();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const home = href("/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { href: `${home}#features`, label: t.nav.features },
    { href: `${home}#security`, label: t.nav.security },
    { href: `${home}#pricing`, label: t.nav.pricing },
    { href: `${home}#faq`, label: t.nav.faq },
  ];

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-surface transition-colors duration-200 ${
        scrolled || open ? "border-line" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center gap-4">
        <Link to={home} className="-mx-1 rounded-md px-1 py-1">
          <Logo locale={locale} size="sm" />
        </Link>

        <nav aria-label={t.a11y.mainNav} className="ms-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex h-9 items-center rounded-md px-3 text-small text-muted transition-colors duration-150 hover:bg-sunken hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto hidden items-center gap-1 lg:flex">
          <LangSwitch />
          <ThemeToggle />
          <span aria-hidden className="mx-2 h-5 w-px bg-line" />
          <LinkButton to={href("/signin")} variant="ghost" size="sm">
            {t.nav.signin}
          </LinkButton>
          <LinkButton to={href("/signin")} size="sm" className="ms-1">
            {t.nav.cta}
          </LinkButton>
        </div>

        <div className="ms-auto flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.menuClose : t.a11y.menuOpen}
            onClick={() => setOpen((v) => !v)}
            className="inline-grid size-10 place-items-center rounded-md text-ink hover:bg-sunken"
          >
            {open ? <X {...ICON} className="size-5" /> : <Menu {...ICON} className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="fade-enter fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-surface lg:hidden"
        >
          <nav aria-label={t.a11y.mainNav} className="container-page flex min-h-full flex-col py-6">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href} className="border-b border-line">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex h-14 items-center font-display text-h3 font-semibold text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <LangSwitch className="-ms-2.5" />
            </div>
            <div className="mt-auto grid gap-3 pt-10">
              <LinkButton to={href("/signin")} size="lg" onClick={() => setOpen(false)}>
                {t.nav.cta}
              </LinkButton>
              <LinkButton to={href("/signin")} variant="secondary" size="lg" onClick={() => setOpen(false)}>
                {t.nav.signin}
              </LinkButton>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
