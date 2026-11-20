import { useState } from "react";
import { Check, FileArchive, FileText, Link2, Monitor, Smartphone } from "lucide-react";
import { ICON, SectionHeader } from "~/components/ui";
import { useT } from "~/lib/i18n";

type Template = "harbor" | "paper" | "night";
type Mode = "simple" | "advanced";

const SKINS: Record<
  Template,
  { page: string; card: string; text: string; muted: string; avatar: string; layout: "list" | "grid" }
> = {
  harbor: {
    page: "bg-surface",
    card: "border border-line bg-raised rounded-[10px]",
    text: "text-ink",
    muted: "text-muted",
    avatar: "bg-ink text-on-ink",
    layout: "list",
  },
  paper: {
    page: "bg-sand",
    card: "bg-surface rounded-[16px]",
    text: "text-ink",
    muted: "text-muted",
    avatar: "bg-harbor text-on-ink",
    layout: "grid",
  },
  night: {
    page: "bg-night",
    card: "border border-night-line bg-night-raised rounded-[10px]",
    text: "text-night-ink",
    muted: "text-night-muted",
    avatar: "bg-night-ink text-night",
    layout: "list",
  },
};

const ITEM_ICONS = [FileText, FileText, FileArchive, Link2];

export function Customize() {
  const t = useT();
  const d = t.design;
  const [template, setTemplate] = useState<Template>("harbor");
  const [mode, setMode] = useState<Mode>("simple");
  const skin = SKINS[template];

  return (
    <section aria-labelledby="design-title" className="border-t border-line">
      <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader id="design-title" label={d.label} title={d.title} lead={d.lead} />

          <div data-reveal className="mt-10">
            <div role="radiogroup" aria-label={d.modesLabel} className="inline-flex rounded-md border border-line bg-sunken p-1">
              {(["simple", "advanced"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={mode === m}
                  onClick={() => setMode(m)}
                  className={`h-9 rounded-[8px] px-4 text-small transition-colors duration-150 ${
                    mode === m ? "bg-raised font-medium text-ink shadow-[0_0_0_1px_var(--line)]" : "text-muted hover:text-ink"
                  }`}
                >
                  {d.modes[m]}
                  {m === "advanced" ? <span className="ms-2 text-micro text-muted">{d.soon}</span> : null}
                </button>
              ))}
            </div>

            <ul className="mt-6 space-y-3">
              {(mode === "simple" ? d.simpleFeatures : d.advancedFeatures).map((f) => (
                <li key={f} className="flex items-center gap-3 text-small">
                  <Check {...ICON} className="size-4 shrink-0 text-harbor" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal className="lg:col-span-7">
          <div className="overflow-hidden rounded-lg border border-line bg-raised">
            {/* Editor toolbar */}
            <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3">
              <div role="radiogroup" aria-label={d.templatesLabel} className="flex gap-1.5">
                {(["harbor", "paper", "night"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={template === key}
                    onClick={() => setTemplate(key)}
                    className={`inline-flex h-8 items-center gap-2 rounded-[8px] border px-2.5 text-small transition-colors duration-150 ${
                      template === key ? "border-ink text-ink" : "border-line text-muted hover:border-line-strong"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`size-3.5 rounded-full border border-line-strong/40 ${SKINS[key].page}`}
                    />
                    {d.templates[key]}
                  </button>
                ))}
              </div>
              <div aria-hidden className="ms-auto hidden items-center gap-1 text-muted sm:flex">
                <span className="grid size-8 place-items-center rounded-[8px] bg-sunken text-ink">
                  <Smartphone {...ICON} className="size-4" />
                </span>
                <span className="grid size-8 place-items-center rounded-[8px]">
                  <Monitor {...ICON} className="size-4" />
                </span>
              </div>
            </div>

            {/* Canvas */}
            <div aria-hidden className="relative bg-sunken px-4 py-8 sm:py-10">
              {mode === "advanced" ? (
                <div className="pointer-events-none absolute inset-y-0 left-1/2 grid w-[min(340px,calc(100%-32px))] -translate-x-1/2 grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="border-x border-dashed border-harbor/30 bg-harbor/5" />
                  ))}
                </div>
              ) : null}
              <div
                className={`relative mx-auto w-full max-w-[340px] rounded-[22px] border border-line p-5 transition-colors duration-200 ${skin.page}`}
              >
                <div className="flex flex-col items-center text-center">
                  <span className={`grid size-14 place-items-center rounded-full font-sans text-h3 font-semibold ${skin.avatar}`}>
                    {t.demo.initial}
                  </span>
                  <p className={`mt-3 font-display text-body font-semibold ${skin.text}`}>{d.sampleName}</p>
                  <p className={`text-micro ${skin.muted}`}>{d.sampleBio}</p>
                </div>
                <div className={`mt-5 ${skin.layout === "grid" ? "grid grid-cols-2 gap-2" : "space-y-2"}`}>
                  {d.sampleItems.map((name, i) => {
                    const Icon = ITEM_ICONS[i]!;
                    return (
                      <div
                        key={name}
                        className={`flex items-center gap-2.5 p-3 ${skin.card} ${
                          skin.layout === "grid" ? "flex-col items-start" : ""
                        }`}
                      >
                        <Icon {...ICON} className={`size-4 shrink-0 ${skin.text}`} />
                        <span dir="ltr" className={`w-full truncate text-start text-micro font-medium ${skin.text}`}>
                          {name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
