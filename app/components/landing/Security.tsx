import { Link } from "react-router";
import { CircleCheck, Flag, TriangleAlert } from "lucide-react";
import { ICON, SectionHeader } from "~/components/ui";
import { useHref, useT } from "~/lib/i18n";

const SAMPLE_SHA = "e3b8f04c9a1d27b6c5f8e0a93d4b17c2f6a8e5d0b9c3f17a24e6d8b0c5f3a9e1";

/** Navy band — dark tokens are scoped to this section with data-theme. */
export function Security() {
  const t = useT();
  const href = useHref();
  const s = t.security;
  const r = s.report;

  return (
    <section id="security" data-theme="dark" aria-labelledby="security-title" className="band-dark scroll-mt-16">
      <div className="container-page grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeader id="security-title" label={s.label} title={s.title} lead={s.lead} />
          <ul data-reveal className="mt-10 border-t border-line">
            {s.checks.map((c) => (
              <li key={c} className="flex items-center gap-3 border-b border-line py-3.5 text-small">
                <span aria-hidden className="h-px w-3 shrink-0 bg-line-strong" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="lg:col-span-7 lg:ps-8">
          <article aria-label={r.title} className="rounded-lg border border-line bg-raised">
            <header className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line p-5 sm:p-6">
              <div className="min-w-0 flex-1">
                <p className="text-micro text-muted">{r.title}</p>
                <p dir="ltr" className="mt-1 truncate text-start font-mono text-body text-ink">
                  {r.file}
                </p>
                <p className="mt-0.5 text-micro text-muted">{r.meta}</p>
              </div>
              <span className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-caution/30 bg-caution/10 px-2.5 text-small font-medium text-caution">
                <TriangleAlert {...ICON} className="size-4" />
                {r.status}
              </span>
            </header>

            <ul className="divide-y divide-line">
              {r.rows.map((row) => {
                const safe = row.tone === "safe";
                const Icon = safe ? CircleCheck : TriangleAlert;
                return (
                  <li key={row.label} className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1 px-5 py-4 sm:px-6">
                    <span className="text-small text-ink">{row.label}</span>
                    <span className="text-end">
                      <span
                        className={`inline-flex items-center gap-1.5 text-small font-medium ${safe ? "text-safe" : "text-caution"}`}
                      >
                        <Icon {...ICON} className="size-4" />
                        {row.value}
                      </span>
                      {row.detail ? <span className="mt-0.5 block text-micro text-muted">{row.detail}</span> : null}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line px-5 py-4 sm:px-6">
              <p dir="ltr" className="text-start font-mono text-micro text-muted">
                {r.sha}
              </p>
              <code dir="ltr" className="mt-1.5 block font-mono text-micro leading-5 break-all text-ink">
                {SAMPLE_SHA}
              </code>
            </div>

            <footer className="flex flex-col gap-4 border-t border-line bg-sunken/60 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
              <p className="flex-1 text-micro text-muted">{r.note}</p>
              <Link
                to={href("/report")}
                className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-line px-3 text-small text-ink hover:border-line-strong"
              >
                <Flag {...ICON} className="size-3.5" />
                {r.action}
              </Link>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
