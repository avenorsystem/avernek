import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkSecondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100";

const variants: Record<Variant, string> = {
  // Brand-violet pill — the strongest CTA on the page.
  primary:
    "btn-sheen border border-white/15 text-white hover:-translate-y-0.5 hover:brightness-110",
  // Hairline outline on dark — shifts to violet on hover.
  secondary:
    "border border-ink/25 bg-transparent text-ink hover:border-brass/70 hover:bg-ink/[0.05] hover:text-brass",
  ghost: "text-ink hover:text-brass",
  // Brand-violet pill for the porcelain-light sections.
  onDark:
    "btn-sheen-paper border border-white/10 text-ink hover:-translate-y-0.5",
  onDarkSecondary:
    "border border-char-text/30 bg-transparent text-char-text hover:border-brass-deep hover:text-brass-deep hover:bg-black/[0.04]",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type LinkButtonProps = CommonProps & {
  href: string;
};

export function LinkButton({ children, href, variant = "primary", className = "" }: LinkButtonProps) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  if (external) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

type SubmitButtonProps = CommonProps & {
  type?: "submit" | "button";
  disabled?: boolean;
};

export function ActionButton({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled,
}: SubmitButtonProps) {
  return (
    <button type={type} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
