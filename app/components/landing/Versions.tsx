import { Bot, Clock } from "lucide-react";
import { ICON, SectionHeader } from "~/components/ui";
import { useT } from "~/lib/i18n";

/** Illustrative bar heights (relative %), clearly labelled as example data. */
/* Static class names (no inline styles — CSP forbids style attributes). */
const BARS: [string, string][] = [
  ["h-[38%]", "h-[37%]"],
  ["h-[52%]", "h-[42%]"],
  ["h-[46%]", "h-[39%]"],
  ["h-[70%]", "h-[43%]"],
  ["h-[64%]", "h-[41%]"],
  ["h-[88%]", "h-[47%]"],
  ["h-[76%]", "h-[43%]"],
];

export function Versions() {
  const t = useT();
  const v = t.versions;

  return (
    <section aria-labelledby="versions-title" className="border-t border-line">
      <div className="container-page py-20 sm:py-28">
        <SectionHeader id="versions-title" label={v.label} title={v.title} lead={v.lead} />

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {/* Timeline */}
          <div data-reveal className="rounded-lg border border-line bg-raised p-6 sm:p-7 lg:col-span-5 lg:row-span-2">
            <p className="text-small font-medium">{v.timelineTitle}</p>
            <ol className="relative mt-6">
              <span aria-hidden className="absolute start-[7px] top-2 bottom-2 w-px bg-line" />
              {v.timeline.map((item, i) => (
                <li key={item.v} className="relative flex gap-4 pb-7 last:pb-0">
                  <span
                    aria-hidden
                    className={`relative mt-1.5 size-[15px] shrink-0 rounded-full border-2 ${
                      i === 0 ? "border-ink bg-ink" : "border-line-strong bg-raised"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="flex items-center gap-2.5">
                      <span dir="ltr" className="font-mono text-small font-medium">
                        v{item.v}
                      </span>
                      <span className="text-micro text-muted">{item.date}</span>
                      {i === 0 ? (
                        <span className="rounded-sm bg-ink px-1.5 py-px text-micro font-medium text-on-ink">{v.current}</span>
                      ) : null}
                    </p>
                    <p className={`mt-1 text-small ${i === 0 ? "text-ink" : "text-muted"}`}>{item.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Analytics */}
          <div data-reveal className="rounded-lg border border-line bg-raised p-6 sm:p-7 lg:col-span-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-small font-medium">{v.analyticsTitle}</p>
                <p className="mt-0.5 text-micro text-muted">{v.analyticsSample}</p>
              </div>
              <span dir="ltr" className="rounded-sm border border-line px-2 py-0.5 font-mono text-micro text-muted">
                {v.plan.pro}
              </span>
            </div>
            <div aria-hidden className="mt-6 grid h-36 grid-cols-7 items-end gap-2 sm:gap-3">
              {BARS.map(([visits, downloads], i) => (
                <div key={i} className="flex h-full flex-col justify-end">
                  <div className={`relative w-full rounded-t-[4px] bg-harbor-soft ${visits}`}>
                    <div className={`absolute inset-x-0 bottom-0 rounded-t-[4px] bg-harbor ${downloads}`} />
                  </div>
                </div>
              ))}
            </div>
            <div aria-hidden className="mt-2 grid grid-cols-7 gap-2 text-center text-[11px] text-muted sm:gap-3">
              {v.days.map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="mt-5 flex gap-5 text-micro text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden className="size-2.5 rounded-[3px] bg-harbor-soft" />
                {v.metrics.visits}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden className="size-2.5 rounded-[3px] bg-harbor" />
                {v.metrics.downloads}
              </span>
            </div>
          </div>

          {/* MCP */}
          <div data-reveal className="rounded-lg border border-line bg-raised p-6 sm:p-7 lg:col-span-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-small font-medium">{v.mcpTitle}</p>
                <p className="mt-1 max-w-[440px] text-small text-muted">{v.mcpBody}</p>
              </div>
              <span dir="ltr" className="rounded-sm border border-line px-2 py-0.5 font-mono text-micro text-muted">
                {v.plan.plus}
              </span>
            </div>
            <div className="mt-6 space-y-2.5">
              <p className="ms-auto w-fit max-w-[85%] rounded-[14px] rounded-se-[4px] bg-sunken px-3.5 py-2.5 text-small">
                {v.mcpPrompt}
              </p>
              <div className="flex max-w-[90%] items-start gap-2.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line">
                  <Bot {...ICON} className="size-3.5" />
                </span>
                <div className="rounded-[14px] rounded-ss-[4px] border border-line px-3.5 py-2.5">
                  <p className="text-small">{v.mcpReply}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-micro text-caution">
                    <Clock {...ICON} className="size-3.5" />
                    {v.mcpStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
