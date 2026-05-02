"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Bij directe URL of lege geschiedenis: veilige fallback. */
  fallbackHref?: string;
};

/** Terug via browser-geschiedenis; geen vaste link naar /resultaat. */
export function VergelijkBackToResultaat({
  className,
  fallbackHref = "/resultaat",
}: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className={cn(
        "inline-block cursor-pointer border-0 bg-transparent p-0 text-left text-sm text-zinc-400 underline-offset-4 transition hover:text-zinc-100 hover:underline",
        className
      )}
    >
      ← Terug naar vorige pagina
    </button>
  );
}
