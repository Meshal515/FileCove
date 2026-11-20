import { Copy, FileArchive, FileText, ShieldCheck } from "lucide-react";
import { ICON } from "~/components/ui";
import { useT } from "~/lib/i18n";

export function HowItWorks() {
  const t = useT();
  const h = t.how;
  const visuals = [<StepUpload key="u" />, <StepArrange key="a" />, <StepShare key="s" />];

  return (
    <section id="features" aria-labelledby="how-title" className="scroll-mt-16">
      <div className="container-page py-20 sm:py-28">
        <h2
          id="how-title"
          data-reveal
          className="font-display text-[34px] leading-[44px] font-semibold tracking-[-0.01em] sm:text-[48px] sm:leading-[58px]"
        >
          {h.title}
        </h2>
        <ol className="mt-12 grid overflow-hidden rounded-lg border border-line bg-raised md:grid-cols-3 md:divide-x md:divide-line md:rtl:divide-x-reverse">
          {h.steps.map((step, i) => (
            <li key={step.title} data-reveal className="flex flex-col border-line max-md:border-b max-md:last:border-b-0">
              <div className="p-3">{visuals[i]}</div>
              <div className="px-6 pt-3 pb-7">
                <h3 className="font-display text-h3 font-semibold">{step.title}</h3>
                <p className="mt-2 text-small text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div aria-hidden className="flex h-[176px] flex-col justify-center gap-2.5 rounded-md bg-sunken p-5">
      {children}
    </div>
  );
}

function StepUpload() {
  const h = useT().how;
  return (
    <Frame>
      <div className="rounded-[8px] border border-line bg-raised p-3">
        <div className="flex items-center gap-2.5">
          <FileText {...ICON} className="size-4 shrink-0" />
          <span dir="ltr" className="flex-1 truncate text-start text-micro font-medium">
            Design_Doc.pdf
          </span>
          <span className="font-mono text-micro text-muted" dir="ltr">
            68%
          </span>
        </div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-line">
          <div className="h-full w-[68%] rounded-full bg-harbor ltr:origin-left rtl:ms-auto" />
        </div>
        <p className="mt-1.5 text-[11px] text-muted">{h.uploading}</p>
      </div>
      <div className="flex items-center gap-2.5 rounded-[8px] border border-line bg-raised p-3">
        <FileArchive {...ICON} className="size-4 shrink-0" />
        <span dir="ltr" className="flex-1 truncate text-start text-micro font-medium">
          Press_Kit.zip
        </span>
        <span className="inline-flex items-center gap-1 text-micro text-safe">
          <ShieldCheck {...ICON} className="size-3.5" />
          {h.checked}
        </span>
      </div>
    </Frame>
  );
}

function StepArrange() {
  const t = useT();
  return (
    <Frame>
      <div className="grid grid-cols-[1fr_auto] gap-2.5">
        <div className="space-y-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex h-9 items-center gap-2 rounded-[8px] border bg-raised px-2.5 ${
                i === 1 ? "border-harbor ring-2 ring-harbor/15 ltr:translate-x-1.5 rtl:-translate-x-1.5" : "border-line"
              }`}
            >
              <span className="grid grid-cols-2 gap-[2px]">
                {[0, 1, 2, 3, 4, 5].map((d) => (
                  <span key={d} className="size-[3px] rounded-full bg-line-strong" />
                ))}
              </span>
              <span className={`h-1.5 rounded-full ${i === 1 ? "w-2/3 bg-harbor/40" : "w-1/2 bg-line"}`} />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-muted">{t.how.templates}</span>
          <span className="size-7 rounded-[6px] border-2 border-harbor bg-surface" />
          <span className="size-7 rounded-[6px] border border-line bg-sand" />
          <span className="size-7 rounded-[6px] border border-line bg-night" />
        </div>
      </div>
    </Frame>
  );
}

function StepShare() {
  const h = useT().how;
  return (
    <Frame>
      <div className="flex items-center gap-2 rounded-[10px] border border-line bg-raised p-1.5 ps-3.5" dir="ltr">
        <span className="flex-1 truncate font-mono text-small">
          <span className="text-muted">filecove.app/</span>
          <span className="text-ink">nakhla</span>
        </span>
        <span className="inline-flex h-8 items-center gap-1.5 rounded-[7px] bg-ink px-3 text-micro font-medium text-on-ink">
          <Copy {...ICON} className="size-3" />
          {h.copyLink}
        </span>
      </div>
      <div dir="ltr" className="flex flex-wrap justify-center gap-1.5 pt-1">
        {["bio", "WhatsApp", "X", "Discord", "Telegram"].map((n) => (
          <span key={n} className="rounded-full border border-line bg-raised px-2.5 py-0.5 text-[11px] text-muted">
            {n}
          </span>
        ))}
      </div>
    </Frame>
  );
}
