import { useState } from "react";
import { Check } from "lucide-react";
import { ICON, LinkButton, SectionHeader } from "~/components/ui";
import { useHref, useT } from "~/lib/i18n";

type Billing = "monthly" | "yearly";

const PRICES = {
  pro: { monthly: 7, yearly: 5, yearTotal: 60 },
  plus: { monthly: 12, yearly: 10, yearTotal: 120 },
} as const;

export function Pricing() {
  const t = useT();
  const href = useHref();
  const p = t.pricing;
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-16 border-t border-line">
      <div className="container-page py-20 sm:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader id="pricing-title" label={p.label} title={p.title} lead={p.lead} />
          <div data-reveal role="radiogroup" aria-label={p.billingLabel} className="inline-flex self-start rounded-md border border-line bg-sunken p-1 md:self-auto">
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                type="button"
                role="radio"
                aria-checked={billing === b}
                onClick={() => setBilling(b)}
                className={`h-9 rounded-[8px] px-4 text-small transition-colors duration-150 ${
                  billing === b ? "bg-raised font-medium text-ink shadow-[0_0_0_1px_var(--line)]" : "text-muted hover:text-ink"
                }`}
              >
                {p[b]}
                {b === "yearly" ? (
                  <span dir="ltr" className="ms-2 font-mono text-micro font-medium text-harbor">
                    {p.yearlySave}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div data-reveal className="mt-12 grid overflow-hidden rounded-lg border border-line bg-raised md:grid-cols-3">
          {/* Free */}
          <Plan
            name={p.plans.free.name}
            desc={p.plans.free.desc}
            price="$0"
            unit={p.always}
            features={p.plans.free.features}
            highlight
            action={
              <LinkButton to={href("/signin")} className="w-full">
                {p.plans.free.cta}
              </LinkButton>
            }
          />
          {(["pro", "plus"] as const).map((key) => {
            const price = PRICES[key];
            return (
              <Plan
                key={key}
                name={p.plans[key].name}
                desc={p.plans[key].desc}
                price={`$${price[billing]}`}
                unit={p.perMonth}
                sub={billing === "yearly" ? `$${price.yearTotal} ${p.billedYearly}` : undefined}
                features={p.plans[key].features}
                soon={p.soon}
                action={
                  <button
                    type="button"
                    disabled
                    className="inline-flex h-11 w-full items-center justify-center rounded-md border border-line text-[15px] font-medium text-muted"
                  >
                    {p.soon}
                  </button>
                }
              />
            );
          })}
        </div>
        <p data-reveal className="mt-6 text-small text-muted">
          {p.note}
        </p>
      </div>
    </section>
  );
}

function Plan({
  name,
  desc,
  price,
  unit,
  sub,
  features,
  action,
  soon,
  highlight,
}: {
  name: string;
  desc: string;
  price: string;
  unit: string;
  sub?: string;
  features: string[];
  action: React.ReactNode;
  soon?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col p-7 sm:p-8 max-md:border-b max-md:last:border-b-0 md:border-e md:last:border-e-0 border-line ${
        highlight ? "bg-surface" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 dir="ltr" className="font-sans text-h3 font-semibold">
          {name}
        </h3>
        {soon ? <span className="rounded-sm border border-line px-2 py-0.5 text-micro text-muted">{soon}</span> : null}
      </div>
      <p className="mt-1.5 text-small text-muted">{desc}</p>
      <p className="mt-7 flex items-baseline gap-2">
        <span dir="ltr" className="font-display text-[44px] leading-none font-semibold tracking-[-0.02em]">
          {price}
        </span>
        <span className="text-small text-muted">{unit}</span>
      </p>
      <p dir="auto" className="mt-2 h-5 font-mono text-micro text-muted">
        {sub ?? ""}
      </p>
      <div className="mt-6">{action}</div>
      <ul className="mt-7 space-y-3 border-t border-line pt-6">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-small">
            <Check {...ICON} className="mt-[5px] size-4 shrink-0 text-ink" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
