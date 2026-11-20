import { useRef, useState, type KeyboardEvent } from "react";
import { Check, FileText, Folder, Info, Play, Search, ZoomIn, Gamepad2 } from "lucide-react";
import { ICON, SectionHeader } from "~/components/ui";
import { useT } from "~/lib/i18n";

const TYPES = ["pdf", "image", "video", "archive", "apk", "code"] as const;
type TypeKey = (typeof TYPES)[number];

/** Interactive file-type viewer: tabs + one large stage. */
export function Viewer() {
  const t = useT();
  const p = t.preview;
  const [active, setActive] = useState<TypeKey>("pdf");
  const tabs = useRef<Partial<Record<TypeKey, HTMLButtonElement | null>>>({});

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const rtl = document.documentElement.dir === "rtl";
    const i = TYPES.indexOf(active);
    let next = i;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TYPES.length - 1;
    else {
      const forward = (e.key === "ArrowRight") !== rtl;
      next = (i + (forward ? 1 : -1) + TYPES.length) % TYPES.length;
    }
    const key = TYPES[next]!;
    setActive(key);
    tabs.current[key]?.focus();
  }

  return (
    <section aria-labelledby="viewer-title" className="border-t border-line">
      <div className="container-page py-20 sm:py-28">
        <SectionHeader id="viewer-title" label={p.label} title={p.title} lead={p.lead} />

        <div data-reveal className="mt-12 overflow-hidden rounded-lg border border-line bg-raised">
          <div
            role="tablist"
            aria-label={p.tabsLabel}
            onKeyDown={onKeyDown}
            className="flex gap-1 overflow-x-auto border-b border-line px-2 [scrollbar-width:none]"
          >
            {TYPES.map((key) => {
              const selected = key === active;
              return (
                <button
                  key={key}
                  ref={(el) => {
                    tabs.current[key] = el;
                  }}
                  role="tab"
                  id={`tab-${key}`}
                  aria-selected={selected}
                  aria-controls={`panel-${key}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(key)}
                  className={`relative h-12 shrink-0 px-4 text-small transition-colors duration-150 ${
                    selected ? "font-medium text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {p.types[key].tab}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full ${selected ? "bg-ink" : "bg-transparent"}`}
                  />
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${active}`}
            aria-labelledby={`tab-${active}`}
            className="grid lg:grid-cols-[1fr_340px]"
          >
            <div aria-hidden className="h-[300px] bg-sunken sm:h-[360px]">
              <Stage type={active} />
            </div>
            <div className="flex flex-col justify-between gap-8 border-line p-6 max-lg:border-t lg:border-s lg:p-8">
              <div>
                <h3 className="font-display text-h2 font-semibold">{p.types[active].title}</h3>
                <p className="mt-3 text-body text-muted">{p.types[active].body}</p>
              </div>
              <p className="flex items-start gap-2.5 text-small text-muted">
                <Info {...ICON} className="mt-[3px] size-4 shrink-0 text-ink" />
                {p.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stage({ type }: { type: TypeKey }) {
  switch (type) {
    case "pdf":
      return <PdfStage />;
    case "image":
      return <ImageStage />;
    case "video":
      return <VideoStage />;
    case "archive":
      return <ArchiveStage />;
    case "apk":
      return <ApkStage />;
    case "code":
      return <CodeStage />;
  }
}

function Line({ w, className = "bg-line" }: { w: string; className?: string }) {
  return <span className={`block h-[7px] rounded-full ${className} ${w}`} />;
}

function PdfStage() {
  return (
    <div className="relative flex h-full items-end justify-center gap-4 px-6 pt-8">
      <div className="h-[86%] w-[58%] max-w-[360px] rounded-t-[8px] border border-b-0 border-line bg-raised px-7 pt-7">
        <span className="block h-2.5 w-1/2 rounded-full bg-line-strong/50" />
        <div className="mt-5 space-y-2.5">
          <Line w="w-full" />
          <Line w="w-11/12" />
          <span className="flex gap-1.5">
            <Line w="w-1/4" />
            <span className="block h-[7px] w-1/5 rounded-full bg-harbor/50 ring-4 ring-harbor-soft" />
            <Line w="w-2/5" />
          </span>
          <Line w="w-full" />
          <Line w="w-3/4" />
        </div>
        <div className="mt-5 h-20 rounded-[6px] bg-harbor-soft" />
        <div className="mt-5 space-y-2.5">
          <Line w="w-full" />
          <Line w="w-5/6" />
        </div>
      </div>
      <div className="absolute top-5 end-5 flex items-center gap-2 rounded-md border border-line bg-raised px-3 py-1.5 text-micro text-muted">
        <Search {...ICON} className="size-3.5" />
        <span dir="ltr" className="font-mono text-ink">
          speed
        </span>
        <span dir="ltr" className="font-mono">
          1/3
        </span>
      </div>
    </div>
  );
}

function ImageStage() {
  return (
    <div className="relative grid h-full grid-cols-4 grid-rows-2 gap-2 p-5">
      <div className="col-span-3 row-span-2 overflow-hidden rounded-[8px] bg-harbor-soft">
        <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMax slice" className="size-full">
          <circle cx="222" cy="58" r="20" className="fill-sand" />
          <path d="M0 200 L92 96 L150 152 L196 116 L300 200Z" className="fill-harbor/35" />
          <path d="M0 200 L60 150 L120 200Z" className="fill-harbor/50" />
        </svg>
      </div>
      <div className="rounded-[8px] bg-sand" />
      <div className="rounded-[8px] border border-line bg-raised" />
      <span className="absolute bottom-8 start-8 inline-flex items-center gap-1.5 rounded-md border border-line bg-raised px-2.5 py-1.5 text-micro">
        <ZoomIn {...ICON} className="size-3.5" />
        <span dir="ltr" className="font-mono">
          3840 × 2160
        </span>
      </span>
    </div>
  );
}

function VideoStage() {
  return (
    <div className="flex h-full flex-col bg-night p-5">
      <div className="grid flex-1 place-items-center">
        <span className="grid size-16 place-items-center rounded-full bg-night-ink text-night">
          <Play {...ICON} className="size-6 translate-x-0.5 fill-current" />
        </span>
      </div>
      <div dir="ltr" className="flex items-center gap-3 font-mono text-micro text-night-muted">
        <span>0:42</span>
        <span className="relative h-1 flex-1 rounded-full bg-night-line">
          <span className="absolute inset-y-0 left-0 w-[34%] rounded-full bg-night-ink" />
          <span className="absolute top-1/2 left-[34%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-night-ink" />
        </span>
        <span>2:05</span>
      </div>
    </div>
  );
}

function ArchiveStage() {
  const rows: [number, string, string, boolean][] = [
    [0, "Game_v1.3/", "86.4 MB", true],
    [1, "assets/", "1,204 files", true],
    [2, "levels.dat", "18.2 MB", false],
    [1, "bin/", "3 files", true],
    [2, "game.exe", "41.0 MB", false],
    [1, "README.md", "4 KB", false],
  ];
  return (
    <div className="flex h-full items-center justify-center p-5">
      <ul dir="ltr" className="w-full max-w-[460px] divide-y divide-line overflow-hidden rounded-[8px] border border-line bg-raised font-mono text-micro">
        {rows.map(([d, name, size, folder]) => (
          <li key={name} className="flex h-10 items-center gap-2 px-4">
            <span className={d === 0 ? "" : d === 1 ? "w-4" : "w-9"} />
            {folder ? <Folder {...ICON} className="size-4 text-harbor" /> : <FileText {...ICON} className="size-4 text-muted" />}
            <span className="text-ink">{name}</span>
            <span className="ms-auto text-muted">{size}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ApkStage() {
  const rows: [string, string][] = [
    ["package", "com.nakhla.runner"],
    ["versionName", "1.3 (13)"],
    ["minSdk", "26"],
    ["permissions", "INTERNET, VIBRATE"],
  ];
  return (
    <div className="flex h-full items-center justify-center p-5">
      <div dir="ltr" className="w-full max-w-[420px] rounded-[8px] border border-line bg-raised">
        <div className="flex items-center gap-3 border-b border-line p-4">
          <span className="grid size-11 place-items-center rounded-[11px] bg-ink text-on-ink">
            <Gamepad2 {...ICON} className="size-5" />
          </span>
          <div>
            <p className="text-small font-medium">Nakhla Runner</p>
            <p className="font-mono text-micro text-muted">48.2 MB</p>
          </div>
          <span className="ms-auto inline-flex items-center gap-1 rounded-sm border border-safe/25 bg-safe/10 px-2 py-0.5 font-mono text-micro text-safe">
            <Check {...ICON} className="size-3" />
            v2 signed
          </span>
        </div>
        <dl className="divide-y divide-line font-mono text-micro">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 px-4 py-2.5">
              <dt className="text-muted">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function CodeStage() {
  const lines: React.ReactNode[] = [
    <>
      <K>export function</K> spawn(level) {"{"}
    </>,
    <>
      {"  "}
      <K>const</K> speed = <N>1.3</N> * level.pace;
    </>,
    <>
      {"  "}
      <span className="text-muted">// calm start, then ramp</span>
    </>,
    <>
      {"  "}
      <K>if</K> (level.id {">"} <N>3</N>) speed *= <N>1.1</N>;
    </>,
    <>
      {"  "}
      <K>return</K> {"{"} name: <S>"runner"</S>, speed {"}"};
    </>,
    <>{"}"}</>,
  ];
  return (
    <div className="flex h-full items-center justify-center p-5">
      <pre dir="ltr" className="w-full max-w-[520px] overflow-hidden rounded-[8px] border border-line bg-raised p-5 text-left font-mono text-micro leading-[24px]">
        <code>
          {lines.map((l, i) => (
            <span key={i} className="block whitespace-pre">
              <span className="inline-block w-7 text-line-strong select-none">{i + 1}</span>
              <span className="text-ink">{l}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

const K = ({ children }: { children: React.ReactNode }) => <span className="text-harbor">{children}</span>;
const N = ({ children }: { children: React.ReactNode }) => <span className="text-caution">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="text-safe">{children}</span>;
