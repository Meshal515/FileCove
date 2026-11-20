import { Link } from "react-router";
import type { ComponentProps, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */
type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium select-none " +
  "transition-[background-color,border-color,color,transform] duration-150 ease-out active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-on-ink hover:bg-harbor",
  secondary: "border border-line bg-raised text-ink hover:border-line-strong",
  ghost: "text-ink hover:bg-sunken",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-small",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-body",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant = "primary", size = "md", className = "", type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...rest} />;
}

type LinkButtonProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function LinkButton({ variant = "primary", size = "md", className = "", ...rest }: LinkButtonProps) {
  return <Link className={buttonClass(variant, size, className)} {...rest} />;
}

/* ------------------------------------------------------------------ */
/* Badge                                                               */
/* ------------------------------------------------------------------ */
type Tone = "neutral" | "harbor" | "safe" | "caution" | "danger" | "solid";

const tones: Record<Tone, string> = {
  neutral: "border-line bg-raised text-muted",
  harbor: "border-transparent bg-harbor-soft text-harbor",
  safe: "border-safe/25 bg-safe/10 text-safe",
  caution: "border-caution/25 bg-caution/10 text-caution",
  danger: "border-danger/25 bg-danger/10 text-danger",
  solid: "border-transparent bg-ink text-on-ink",
};

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 rounded-sm border px-2 text-micro font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Section header                                                      */
/* ------------------------------------------------------------------ */
export function SectionHeader({
  label,
  title,
  lead,
  id,
  className = "",
}: {
  label?: string;
  title: string;
  lead?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div data-reveal className={`max-w-[680px] ${className}`}>
      {label ? <p className="text-small font-medium text-harbor">{label}</p> : null}
      <h2
        id={id}
        className="mt-3 font-display text-[30px] leading-[40px] font-semibold tracking-[-0.01em] text-balance sm:text-[40px] sm:leading-[50px]"
      >
        {title}
      </h2>
      {lead ? <p className="mt-4 max-w-[560px] text-[17px] leading-[30px] text-muted text-pretty">{lead}</p> : null}
    </div>
  );
}

/* Bordered card. Depth comes from borders and surfaces, not shadows. */
export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-md border border-line bg-raised ${className}`}>{children}</div>;
}

/** Small square icon tile used in feature lists. */
export function IconTile({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-grid size-9 shrink-0 place-items-center rounded-[10px] border border-line bg-surface text-ink ${className}`}
    >
      {children}
    </span>
  );
}

export const ICON = { strokeWidth: 1.5, "aria-hidden": true } as const;
