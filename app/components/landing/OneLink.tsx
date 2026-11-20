import { ShieldCheck } from "lucide-react";
import { LogoMark } from "~/components/brand/Logo";
import { ICON, SectionHeader } from "~/components/ui";
import { useT } from "~/lib/i18n";

const SCATTERED = [
  "drive.google.com/file/d/1Xr8kQ2pLm…/view",
  "mega.nz/file/7Hk2wBzT#q9…",
  "github.com/nakhla/runner/releases",
  "mediafire.com/file/z3k1…/patch_1.3.zip",
  "dropbox.com/s/8fj2…/press_kit.zip",
  "imgur.com/a/Rk20sLp",
  "youtu.be/Qm3aT8…",
  "docs.google.com/document/d/1bT…",
];

/** "One message instead of ten" — the problem, shown as a real chat. */
export function OneLink() {
  const t = useT();
  const l = t.links;
  return (
    <section aria-labelledby="links-title" className="border-y border-line bg-raised">
      <div className="container-page grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeader id="links-title" title={l.title} lead={l.body} />
          <div data-reveal className="mt-10 border-t border-line pt-6">
            <p className="text-body font-medium">{l.audienceTitle}</p>
            <p className="mt-2 text-small text-muted">{l.audienceBody}</p>
          </div>
        </div>

        <div aria-hidden className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {/* Before */}
          <div data-reveal className="flex flex-col rounded-lg border border-line bg-surface p-4">
            <ChatHeader label={l.before} />
            <div className="mt-4 max-w-[92%] rounded-[16px] rounded-ss-[4px] border border-line bg-raised p-3.5">
              <p className="text-small">{l.chatIntro}</p>
              <ul dir="ltr" className="mt-2.5 space-y-1.5">
                {SCATTERED.map((u) => (
                  <li key={u} className="truncate font-mono text-[11.5px] leading-[18px] text-harbor underline decoration-harbor/30 underline-offset-2">
                    {u}
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-small">{l.chatOutro}</p>
              <p dir="ltr" className="mt-1 text-end font-mono text-[10px] text-muted">
                {l.chatTime}
              </p>
            </div>
          </div>

          {/* After */}
          <div data-reveal className="flex flex-col rounded-lg border border-line bg-surface p-4">
            <ChatHeader label={l.after} strong />
            <div className="mt-4 max-w-[92%] rounded-[16px] rounded-ss-[4px] border border-line bg-raised p-2">
              <div className="overflow-hidden rounded-[12px] border border-line">
                <div className="flex h-[120px] items-center justify-center gap-3 bg-ink">
                  <LogoMark size={40} tone="inverse" />
                </div>
                <div className="bg-surface p-3">
                  <p className="text-small font-medium">{l.afterTitle}</p>
                  <p className="mt-0.5 text-micro text-muted">{l.afterMeta}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-micro text-safe">
                    <ShieldCheck {...ICON} className="size-3.5" />
                    SHA-256
                  </p>
                </div>
              </div>
              <p className="mt-2.5 px-1.5 text-small">{l.afterMsg}</p>
              <p dir="ltr" className="mt-1 px-1.5 text-start font-mono text-[11.5px] text-harbor underline decoration-harbor/30 underline-offset-2">
                filecove.app/nakhla
              </p>
              <p dir="ltr" className="mt-1 px-1.5 text-end font-mono text-[10px] text-muted">
                {l.chatTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatHeader({ label, strong }: { label: string; strong?: boolean }) {
  const t = useT();
  return (
    <div className="flex items-center justify-between border-b border-line pb-3">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-full bg-sand font-sans text-micro font-semibold text-ink">
          {t.demo.initial}
        </span>
        <span className="text-small font-medium">{t.links.chatName}</span>
      </div>
      <span
        className={`rounded-sm px-2 py-0.5 text-micro font-medium ${
          strong ? "bg-ink text-on-ink" : "border border-line text-muted"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
