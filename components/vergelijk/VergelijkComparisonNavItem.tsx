import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { isVergelijkComparisonNavEnabled } from "@/lib/vergelijk-comparison-nav-enabled";

const COMING_SOON_SUB = "Binnenkort beschikbaar";

type Props = {
  href: string;
  variant: "card" | "footer" | "buttonOutline";
  children: ReactNode;
  className?: string;
  trailing?: ReactNode;
};

export function VergelijkComparisonNavItem({
  href,
  variant,
  children,
  className,
  trailing,
}: Props) {
  const enabled = isVergelijkComparisonNavEnabled(href);

  if (variant === "footer") {
    if (enabled) {
      return (
        <Link
          href={href}
          className={cn("underline-offset-4 hover:text-foreground hover:underline", className)}
        >
          {children}
        </Link>
      );
    }
    return (
      <span
        className={cn(
          "cursor-not-allowed select-none text-muted-foreground opacity-90",
          className
        )}
        aria-disabled="true"
      >
        <span className="block">{children}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground/80">{COMING_SOON_SUB}</span>
      </span>
    );
  }

  if (variant === "card") {
    const base =
      "group flex items-center justify-between gap-4 rounded-xl border border-zinc-700 bg-[#0f0f1a] px-4 py-4 text-left text-zinc-100 shadow-md sm:px-5";
    if (enabled) {
      return (
        <Link
          href={href}
          className={cn(base, "transition hover:border-zinc-500 hover:bg-[#141428]", className)}
        >
          <span className="min-w-0 flex-1 text-sm font-medium leading-snug sm:text-base">
            {children}
          </span>
          {trailing}
        </Link>
      );
    }
    return (
      <div
        className={cn(base, "cursor-not-allowed opacity-80", className)}
        aria-disabled="true"
      >
        <div className="min-w-0 flex-1">
          <span className="block text-sm font-medium leading-snug sm:text-base">{children}</span>
          <span className="mt-1 block text-xs text-zinc-500">{COMING_SOON_SUB}</span>
        </div>
        {trailing ? (
          <span className="pointer-events-none shrink-0 opacity-40" aria-hidden>
            {trailing}
          </span>
        ) : null}
      </div>
    );
  }

  /* buttonOutline */
  if (enabled) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <span
      className={cn(
        className,
        "inline-flex min-h-11 cursor-not-allowed flex-col items-center justify-center gap-1 py-3 text-center opacity-80 sm:items-stretch sm:text-left"
      )}
      aria-disabled="true"
    >
      <span>{children}</span>
      <span className="text-xs font-normal leading-tight text-zinc-500">{COMING_SOON_SUB}</span>
    </span>
  );
}
