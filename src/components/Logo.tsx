import Link from "next/link";
import Mark from "./Mark";

type LogoProps = {
  /** "ink" for light surfaces (default) · "paper" for dark surfaces. */
  tone?: "ink" | "paper" | "ivory";
  className?: string;
  href?: string;
};

/**
 * Avernek lockup: the filter-A mark inside a rounded-square chip + wordmark.
 * ("ivory" is a legacy alias for "paper".)
 */
export default function Logo({ tone = "ink", className = "", href = "/" }: LogoProps) {
  const onDark = tone === "paper" || tone === "ivory";
  return (
    <Link
      href={href}
      aria-label="Avernek home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${
          onDark
            ? "bg-char-text text-ink group-hover:bg-[linear-gradient(135deg,#9f5ffe,#8f46fc_48%,#5d25a3)] group-hover:text-white"
            : "bg-ink text-paper group-hover:bg-[linear-gradient(135deg,#9f5ffe,#8f46fc_48%,#5d25a3)] group-hover:text-white"
        }`}
      >
        <Mark className="relative h-5 w-5" />
      </span>
      <span
        className={`text-lg font-semibold tracking-[0.16em] ${onDark ? "text-char-text" : "text-ink"}`}
      >
        AVERNEK
      </span>
    </Link>
  );
}
