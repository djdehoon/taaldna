import { cn } from "@/lib/utils";
import { APP_VERSION_LABEL } from "@/lib/app-version";

type Props = {
  className?: string;
  /** Landingspagina-kicker: uppercase + kleinere versie erachter */
  variant?: "kicker" | "inline";
};

export function TaalDNALabel({ className, variant = "inline" }: Props) {
  if (variant === "kicker") {
    return (
      <span
        className={cn("inline-flex flex-wrap items-baseline gap-x-1.5", className)}
      >
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          TaalDNA
        </span>
        <span
          className="text-[0.65rem] font-normal normal-case tracking-normal text-muted-foreground/60 tabular-nums"
          aria-label={`Versie ${APP_VERSION_LABEL}`}
        >
          {APP_VERSION_LABEL}
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-baseline gap-x-1", className)}>
      <span>TaalDNA</span>
      <span
        className="font-normal text-muted-foreground/60 tabular-nums"
        aria-label={`Versie ${APP_VERSION_LABEL}`}
      >
        {APP_VERSION_LABEL}
      </span>
    </span>
  );
}
