import type { Route } from "./+types/not-found";
import { getDict, localeFromPath } from "~/i18n";
import { useHref, useT } from "~/lib/i18n";
import { SiteHeader } from "~/components/layout/SiteHeader";
import { LinkButton } from "~/components/ui";

export function loader() {
  throw new Response("Not Found", { status: 404 });
}

export function meta({ location }: Route.MetaArgs) {
  const t = getDict(localeFromPath(location.pathname));
  return [{ title: `${t.soon.notFound.title} · FileCove` }, { name: "robots", content: "noindex" }];
}

export function ErrorBoundary() {
  const t = useT();
  const href = useHref();
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-page flex min-h-[60vh] flex-col justify-center py-24">
        <p dir="ltr" className="text-start font-mono text-small text-muted">
          404
        </p>
        <h1 className="mt-3 font-display text-[36px] leading-[46px] font-semibold">{t.soon.notFound.title}</h1>
        <p className="mt-4 text-[17px] leading-[30px] text-muted">{t.soon.notFound.body}</p>
        <div className="mt-8">
          <LinkButton to={href("/")} variant="secondary">
            {t.soon.back}
          </LinkButton>
        </div>
      </main>
    </>
  );
}

export default function NotFound() {
  return null;
}
