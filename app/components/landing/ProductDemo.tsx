import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  FileArchive,
  FileText,
  Flag,
  Folder,
  Gamepad2,
  Link2,
  Lock,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import { useHref, useLocale, useT } from "~/lib/i18n";
import { ICON } from "~/components/ui";
import { LogoMark } from "~/components/brand/Logo";

type ItemKey = "apk" | "pdf" | "zip" | "link";

export const DEMO_SHA: Record<Exclude<ItemKey, "link">, string> = {
  apk: "4e1a9c07d2b85f3e6a0c41d97b2e58f0c3a6d1e8b47f92a05c6e3d8b1f7a2c94",
  pdf: "b7d03f5e91c24a68e0f1d9c3a7b5e2f4086c1d3e9a5b7f2c4e6d8a0b1c3e5f71",
  zip: "9f2c6e81a4d07b35c9e2f1a8d6b3c0e74f5a2d9c1b8e6f3a0d7c4b2e9f1a41ab",
};

const ICONS = { apk: Smartphone, pdf: FileText, zip: FileArchive, link: Link2 } as const;

/**
 * Product shot: a sample FileCove page. Desktop shows page | viewer | report
 * side by side; below lg the viewer opens as a sheet over the page.
 */
export function ProductDemo() {
  const t = useT();
  const d = t.demo;
  const [selected, setSelected] = useState<ItemKey>("apk");
  const [sheetOpen, setSheetOpen] = useState(false);
  const triggers = useRef<Partial<Record<ItemKey, HTMLButtonElement | null>>>({});

  function select(key: ItemKey) {
    setSelected(key);
    if (!window.matchMedia("(min-width: 1024px)").matches) setSheetOpen(true);
  }

  function closeSheet() {
    setSheetOpen(false);
    requestAnimationFrame(() => triggers.current[selected]?.focus());
  }

  return (
    <div className="relative">
      {/* Layered depth behind the window */}
      <div aria-hidden className="absolute inset-x-8 -bottom-4 top-8 rounded-lg border border-line bg-sunken sm:inset-x-16 sm:-bottom-6" />
      <div aria-hidden className="absolute inset-x-4 -bottom-2 top-4 rounded-lg border border-line bg-raised sm:inset-x-8 sm:-bottom-3" />

      <div className="relative overflow-hidden rounded-lg border border-line bg-raised shadow-float">
        {/* Chrome */}
        <div className="flex h-11 items-center gap-3 border-b border-line bg-surface px-4">
          <div aria-hidden className="flex gap-1.5" dir="ltr">
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
          </div>
          <div className="mx-auto flex h-7 min-w-0 items-center gap-1.5 rounded-sm border border-line bg-raised px-3 text-micro text-muted">
            <Lock {...ICON} className="size-3 shrink-0" />
            <span dir="ltr" className="truncate font-mono">
              {d.url}
            </span>
          </div>
          <span className="shrink-0 rounded-sm border border-line px-2 py-0.5 text-micro text-muted">{d.badge}</span>
        </div>

        <div className="relative grid h-[600px] lg:h-[540px] lg:grid-cols-[340px_1fr_272px]">
          {/* Pane 1: the public page */}
          <div className="min-h-0 overflow-hidden px-5 pt-6 pb-5 lg:border-e lg:border-line">
            <div className="flex items-center gap-3.5">
              <div className="grid size-12 shrink-0 place-items-center rounded-md bg-ink font-sans text-h3 font-semibold text-on-ink">
                {d.initial}
              </div>
              <div className="min-w-0">
                <p className="font-display text-[17px] leading-6 font-semibold">{d.name}</p>
                <p dir="ltr" className="text-start font-mono text-micro text-muted">
                  {d.handle}
                </p>
              </div>
            </div>
            <p className="mt-3 text-small text-muted">{d.bio}</p>

            <p className="mt-6 mb-2 text-micro text-muted">{d.current}</p>
            <PageItem
              k="apk"
              featured
              active={selected === "apk"}
              onSelect={select}
              ref={(el) => {
                triggers.current.apk = el;
              }}
            />

            <p className="mt-5 mb-2 text-micro text-muted">{d.files}</p>
            <div className="space-y-1">
              {(["pdf", "zip", "link"] as const).map((k) => (
                <PageItem
                  key={k}
                  k={k}
                  active={selected === k}
                  onSelect={select}
                  ref={(el) => {
                    triggers.current[k] = el;
                  }}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-micro text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Flag {...ICON} className="size-3.5" />
                {d.report}
              </span>
              <span className="inline-flex items-center gap-1.5" dir="ltr">
                <LogoMark size={14} />
                FileCove
              </span>
            </div>
          </div>

          {/* Pane 2 + 3: desktop viewer and report */}
          <div className="hidden min-h-0 flex-col bg-surface lg:flex">
            <ViewerHeader item={selected} />
            <div className="min-h-0 flex-1 overflow-hidden p-5">
              <PreviewBody item={selected} />
            </div>
          </div>
          <div className="hidden min-h-0 flex-col border-s border-line lg:flex">
            <Details item={selected} />
          </div>

          {sheetOpen ? <Sheet item={selected} onClose={closeSheet} /> : null}
        </div>
      </div>

      <FloatingProof />
    </div>
  );
}

/** Floating share link over the window edge (floating layer → shadow allowed). */
function FloatingProof() {
  const t = useT();
  return (
    <div
      aria-hidden
      className="absolute -bottom-7 start-[300px] hidden items-center gap-2 rounded-md border border-line bg-raised p-2 ps-3.5 shadow-float xl:flex"
    >
      <span dir="ltr" className="font-mono text-small">
        <span className="text-muted">filecove.app/</span>
        <span className="text-ink">nakhla</span>
      </span>
      <span className="inline-flex h-8 items-center gap-1.5 rounded-[8px] bg-ink px-3 text-micro font-medium text-on-ink">
        <Copy {...ICON} className="size-3" />
        {t.how.copyLink}
      </span>
    </div>
  );
}

function PageItem({
  k,
  featured,
  active,
  onSelect,
  ref,
}: {
  k: ItemKey;
  featured?: boolean;
  active: boolean;
  onSelect: (k: ItemKey) => void;
  ref: (el: HTMLButtonElement | null) => void;
}) {
  const t = useT();
  const locale = useLocale();
  const item = t.demo.items[k];
  const Icon = ICONS[k];
  const Chevron = locale === "ar" ? ChevronLeft : ChevronRight;
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onSelect(k)}
      aria-pressed={active}
      className={`group flex w-full items-center gap-3 rounded-md border text-start transition-colors duration-150 ${
        featured ? "p-3" : "px-3 py-2.5"
      } ${active ? "lg:border-harbor/40 lg:bg-harbor-soft/60 border-line" : "border-line hover:border-line-strong"} ${
        featured ? "bg-surface" : "bg-raised"
      }`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-[9px] ${
          featured ? "size-10 bg-ink text-on-ink" : "size-8 border border-line bg-surface"
        }`}
      >
        {featured ? <Gamepad2 {...ICON} className="size-5" /> : <Icon {...ICON} className="size-4" />}
      </span>
      <span className="min-w-0 flex-1">
        <span dir="ltr" className="block truncate text-start text-small font-medium text-ink">
          {item.name}
        </span>
        <span className="mt-0.5 flex items-center gap-2 text-micro text-muted">
          {"tag" in item ? (
            <span dir="ltr" className="font-mono text-ink">
              {item.tag}
            </span>
          ) : null}
          <span className="truncate">{item.meta}</span>
        </span>
      </span>
      {featured ? <ShieldCheck {...ICON} className="size-4 shrink-0 text-safe" /> : null}
      <Chevron {...ICON} className="size-4 shrink-0 text-muted lg:hidden" />
    </button>
  );
}

function ViewerHeader({ item }: { item: ItemKey }) {
  const t = useT();
  const s = t.demo.sheet;
  return (
    <div className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-raised px-5">
      <p dir="ltr" className="min-w-0 flex-1 truncate text-start text-small font-medium">
        {t.demo.items[item].name}
      </p>
      <span className="text-micro text-muted">{s.preview}</span>
    </div>
  );
}

function Details({ item }: { item: ItemKey }) {
  const t = useT();
  const href = useHref();
  const s = t.demo.sheet;
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden p-5">
        <ScanSummary item={item} />
        <p className="mt-5 text-micro text-muted">{s.sample}</p>
      </div>
      <div className="grid gap-2 border-t border-line p-4">
        <button
          type="button"
          disabled
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-ink text-small font-medium text-on-ink opacity-45"
        >
          {item === "link" ? <ExternalLink {...ICON} className="size-4" /> : <Download {...ICON} className="size-4" />}
          {item === "link" ? s.open : s.download}
        </button>
        <Link
          to={href("/report")}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md text-small text-muted hover:bg-sunken hover:text-ink"
        >
          <Flag {...ICON} className="size-3.5" />
          {s.report}
        </Link>
      </div>
    </div>
  );
}

function ScanSummary({ item }: { item: ItemKey }) {
  const t = useT();
  const s = t.demo.sheet;
  const hash = item === "link" ? null : DEMO_SHA[item];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div>
      <p className="text-micro text-muted">{s.scan}</p>
      <div className="mt-2 flex items-start gap-2.5">
        <ShieldCheck {...ICON} className="mt-[3px] size-[18px] shrink-0 text-safe" />
        <div>
          <p className="text-small font-medium text-safe">{item === "link" ? s.linkCheck : s.clean}</p>
          <p className="mt-0.5 text-micro text-muted">{item === "link" ? s.linkDetail : s.cleanDetail}</p>
        </div>
      </div>
      {hash ? (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p dir="ltr" className="font-mono text-micro text-muted">
              {s.sha}
            </p>
            <button
              type="button"
              onClick={copy}
              aria-label={copied ? t.a11y.copied : t.a11y.copy}
              className="inline-grid size-7 place-items-center rounded-sm text-muted hover:bg-sunken hover:text-ink"
            >
              {copied ? <Check {...ICON} className="size-3.5 text-safe" /> : <Copy {...ICON} className="size-3.5" />}
            </button>
          </div>
          <code
            dir="ltr"
            className="mt-1.5 block rounded-sm border border-line bg-sunken px-2.5 py-2 font-mono text-[11.5px] leading-[18px] break-all text-ink"
          >
            {hash}
          </code>
          <span role="status" className="sr-only">
            {copied ? t.a11y.copied : ""}
          </span>
        </div>
      ) : null}
    </div>
  );
}

function Sheet({ item, onClose }: { item: ItemKey; onClose: () => void }) {
  const t = useT();
  const href = useHref();
  const s = t.demo.sheet;
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const Icon = ICONS[item];

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div role="dialog" aria-labelledby={titleId} className="sheet-enter absolute inset-0 z-10 flex flex-col bg-raised lg:hidden">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-line px-4">
        <Icon {...ICON} className="size-4 shrink-0" />
        <p id={titleId} dir="ltr" className="min-w-0 flex-1 truncate text-start text-small font-medium">
          {t.demo.items[item].name}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.a11y.close}
          className="inline-grid size-9 shrink-0 place-items-center rounded-md text-ink hover:bg-sunken"
        >
          <X {...ICON} className="size-[18px]" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="h-[220px] overflow-hidden rounded-md border border-line bg-surface p-3">
          <PreviewBody item={item} compact />
        </div>
        <div className="mt-5">
          <ScanSummary item={item} />
        </div>
        <p className="mt-4 text-micro text-muted">{s.sample}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2 border-t border-line p-3">
        <button
          type="button"
          disabled
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-ink text-small font-medium text-on-ink opacity-45"
        >
          {item === "link" ? s.open : s.download}
          <span className="font-normal">· {s.disabled}</span>
        </button>
        <Link
          to={href("/report")}
          className="inline-flex h-10 items-center gap-1.5 rounded-md border border-line px-3 text-small text-ink"
        >
          <Flag {...ICON} className="size-3.5" />
          {s.report}
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Previews                                                            */
/* ------------------------------------------------------------------ */
function PreviewBody({ item, compact }: { item: ItemKey; compact?: boolean }) {
  switch (item) {
    case "pdf":
      return <PdfPreview compact={compact} />;
    case "zip":
      return <ZipPreview />;
    case "apk":
      return <ApkPreview />;
    case "link":
      return <LinkPreview />;
  }
}

function Bar({ w, className = "bg-line" }: { w: string; className?: string }) {
  return <span aria-hidden className={`block h-[6px] rounded-full ${className} ${w}`} />;
}

function PdfPreview({ compact }: { compact?: boolean }) {
  const s = useT().demo.sheet;
  return (
    <div className="flex h-full gap-4">
      {!compact ? (
        <div className="flex w-14 shrink-0 flex-col gap-2" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`h-[72px] rounded-[4px] border bg-raised ${i === 0 ? "border-harbor" : "border-line"}`} />
          ))}
        </div>
      ) : null}
      <div className="flex flex-1 justify-center overflow-hidden">
        <div className="w-full max-w-[380px] rounded-[6px] border border-line bg-raised px-6 py-6">
          <p className="font-display text-[15px] font-semibold">{s.pdfTitle}</p>
          <p className="mt-1 font-mono text-micro text-muted" dir="ltr">
            Nakhla Runner · v1.3
          </p>
          <p className="mt-5 text-small font-medium">{s.pdfHeading}</p>
          <div className="mt-3 space-y-2">
            <Bar w="w-full" />
            <Bar w="w-11/12" />
            <Bar w="w-full" />
            <Bar w="w-3/5" />
          </div>
          <div className="mt-5 grid grid-cols-5 gap-2" aria-hidden>
            <span className="col-span-3 h-24 rounded-[4px] bg-harbor-soft" />
            <span className="col-span-2 h-24 rounded-[4px] bg-sand" />
          </div>
          <div className="mt-5 space-y-2">
            <Bar w="w-full" />
            <Bar w="w-4/5" />
            <Bar w="w-full" />
          </div>
          <p className="mt-6 text-center font-mono text-micro text-muted" dir="ltr">
            1 / 24
          </p>
        </div>
      </div>
    </div>
  );
}

function ZipPreview() {
  const s = useT().demo.sheet;
  const rows: [number, string, string, boolean][] = [
    [0, "Press_Kit/", "12.4 MB", true],
    [1, "logos/", "6 files", true],
    [1, "screenshots/", "24 files", true],
    [1, "trailer.mp4", "9.8 MB", false],
    [1, "fact_sheet.pdf", "340 KB", false],
    [1, "README.txt", "2 KB", false],
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="overflow-hidden rounded-[6px] border border-line bg-raised">
        <ul dir="ltr" className="divide-y divide-line font-mono text-micro">
          {rows.map(([depth, name, info, folder]) => (
            <li key={name} className="flex h-9 items-center gap-2 px-3">
              {depth ? <span className="w-4 shrink-0 text-line-strong">└</span> : null}
              {folder ? (
                <Folder {...ICON} className="size-3.5 shrink-0 text-harbor" />
              ) : (
                <FileText {...ICON} className="size-3.5 shrink-0 text-muted" />
              )}
              <span className="truncate text-ink">{name}</span>
              <span className="ms-auto shrink-0 text-muted">{info}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-micro text-muted">{s.zipNote}</p>
    </div>
  );
}

function ApkPreview() {
  const s = useT().demo.sheet;
  const rows: [string, ReactNode][] = [
    [s.apkPackage, <code dir="ltr" className="font-mono">com.nakhla.runner</code>],
    [s.apkVersion, <span dir="ltr" className="font-mono">1.3 (13)</span>],
    [s.apkMinSdk, <span dir="ltr" className="font-mono">Android 8.0+</span>],
    [s.apkPerms, <span>{s.apkPermList.join(useLocale() === "ar" ? "، " : ", ")}</span>],
    [
      s.apkSig,
      <span className="inline-flex items-center gap-1 text-safe">
        <Check {...ICON} className="size-3.5" />
        {s.apkSigValue}
      </span>,
    ],
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3.5 rounded-[6px] border border-line bg-raised p-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-[12px] bg-ink text-on-ink">
          <Gamepad2 {...ICON} className="size-6" />
        </span>
        <div className="min-w-0">
          <p dir="ltr" className="text-start text-body font-medium">
            Nakhla Runner
          </p>
          <p dir="ltr" className="text-start font-mono text-micro text-muted">
            v1.3 · 48.2 MB
          </p>
        </div>
      </div>
      <dl className="mt-3 divide-y divide-line rounded-[6px] border border-line bg-raised px-4 text-micro">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-3 py-2.5">
            <dt className="shrink-0 text-muted">{k}</dt>
            <dd className="truncate text-end text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function LinkPreview() {
  const s = useT().demo.sheet;
  return (
    <div className="flex h-full flex-col">
      <div className="rounded-[6px] border border-line bg-raised p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-[10px] border border-line bg-surface">
            <Link2 {...ICON} className="size-4" />
          </span>
          <div className="min-w-0">
            <p dir="ltr" className="truncate text-start text-small font-medium">
              nakhla/runner
            </p>
            <p dir="ltr" className="truncate text-start font-mono text-micro text-muted">
              github.com
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Bar w="w-full" />
          <Bar w="w-2/3" />
        </div>
      </div>
      <dl className="mt-3 divide-y divide-line rounded-[6px] border border-line bg-raised px-4 text-micro">
        <div className="flex items-center justify-between gap-3 py-2.5">
          <dt className="text-muted">{s.linkDomain}</dt>
          <dd dir="ltr" className="font-mono text-ink">
            github.com
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 py-2.5">
          <dt className="shrink-0 text-muted">{s.linkTarget}</dt>
          <dd dir="ltr" className="truncate font-mono text-ink">
            https://github.com/nakhla/runner
          </dd>
        </div>
      </dl>
    </div>
  );
}
