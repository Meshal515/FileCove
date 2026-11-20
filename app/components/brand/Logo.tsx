import type { Locale } from "~/i18n";

/** Official FileCove mark paths — used verbatim, never redrawn. */
export const LOGO_VIEWBOX = "4 6 56 56";
export const LOGO_PATHS = {
  file: "M19 8H37V17A7 7 0 0 0 44 24H53.6A2.4 2.4 0 0 1 56 26.4V48C56 50.2 55.5 51.5 54.6 52.4C52.08 50.82 48.49 49.66 44.40 48.92V40.20A12.4 12.4 0 0 0 19.6 40.20V49.30C15.99 50.10 12.85 51.27 10.60 52.80C9.2 51.6 8 49.6 8 47V19A11 11 0 0 1 19 8Z",
  fold: "M39 8V17A5 5 0 0 0 44 22H54Z",
  wave: "M10.2 55.2C20 48.6 45 48.4 55.2 54.2C46 52.4 25 53 10.2 55.2Z",
  buoy: "M22.5 58C30 55.4 44 54.6 53 56C49.5 58.8 46 59.8 41.5 59.6C35 59.3 28 58.2 22.5 58Z",
} as const;

type MarkProps = {
  size?: number;
  /** "auto" follows the theme (ink), "inverse" uses on-ink for dark fills. */
  tone?: "auto" | "inverse";
  className?: string;
  title?: string;
};

export function LogoMark({ size = 32, tone = "auto", className, title }: MarkProps) {
  const body = tone === "inverse" ? "fill-on-ink" : "fill-ink";
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      // The mark never mirrors in RTL.
      direction="ltr"
    >
      <path className={body} d={LOGO_PATHS.file} />
      <path className={body} d={LOGO_PATHS.fold} />
      <path className={body} d={LOGO_PATHS.wave} />
      <path className="fill-buoy" d={LOGO_PATHS.buoy} />
    </svg>
  );
}

type LockupProps = {
  locale: Locale;
  size?: "sm" | "md" | "lg";
  tone?: "auto" | "inverse";
  className?: string;
};

const SIZES = {
  sm: { mark: 26, text: "text-[19px]", gap: "gap-2" },
  md: { mark: 30, text: "text-[22px]", gap: "gap-2.5" },
  lg: { mark: 44, text: "text-[32px]", gap: "gap-3" },
} as const;

/**
 * Lockup. Arabic: "فايل" Kufam Regular + "كوف" Kufam Bold, mark on the right
 * (start side in RTL). English: "File" Readex 300 + "Cove" Readex 600.
 */
export function Logo({ locale, size = "md", tone = "auto", className = "" }: LockupProps) {
  const s = SIZES[size];
  const color = tone === "inverse" ? "text-on-ink" : "text-ink";
  return (
    <span className={`inline-flex items-center ${s.gap} ${color} ${className}`}>
      <LogoMark size={s.mark} tone={tone} />
      {locale === "ar" ? (
        <span className={`font-display ${s.text} leading-none translate-y-[1px]`}>
          <span className="font-normal">فايل</span>{" "}
          <span className="font-bold">كوف</span>
        </span>
      ) : (
        <span className={`font-sans ${s.text} leading-none tracking-[-0.01em]`}>
          <span className="font-light">File</span>
          <span className="font-semibold">Cove</span>
        </span>
      )}
    </span>
  );
}

/** FILES • LINKS • SHARE — wide tracking, buoy dots. Always LTR. */
export function Tagline({ className = "" }: { className?: string }) {
  return (
    <span
      dir="ltr"
      className={`inline-flex items-center gap-[0.9em] font-sans text-micro font-medium tracking-wide-mark text-muted ${className}`}
    >
      <span>FILES</span>
      <span aria-hidden className="size-[5px] rounded-full bg-buoy" />
      <span>LINKS</span>
      <span aria-hidden className="size-[5px] rounded-full bg-buoy" />
      <span>SHARE</span>
    </span>
  );
}
