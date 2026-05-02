"use client";

import { useCallback, useRef, useState } from "react";
import type { ContextueelRadenTrial } from "@/types";
import { CONTEXTUEEL_RADEN } from "@/lib/assessment/content";
import { Button } from "@/components/ui/button";

type Props = {
  onComplete: (trial: ContextueelRadenTrial) => void;
};

export function ContextueelRaden({ onComplete }: Props) {
  const startRef = useRef(
    typeof performance !== "undefined" ? performance.now() : 0
  );
  const [locked, setLocked] = useState(false);

  const choose = useCallback(
    (id: string, value: string, label: string) => {
      if (locked) return;
      setLocked(true);
      const responseTimeMs = Math.round(performance.now() - startRef.current);
      onComplete({
        exerciseSlug: "contextueel-raden",
        responseTimeMs,
        completedAt: new Date().toISOString(),
        choiceId: id,
        choiceLabel: `${value}: ${label}`,
      });
    },
    [onComplete, locked]
  );

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-8 px-6 pb-12 pt-8 sm:px-8">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Contextueel raden
        </p>
        <p className="text-sm text-muted-foreground">
          Lees de zin. Kies intuïtief welke positie (1–4) je zou markeren — er is geen fout
          antwoord.
        </p>
      </div>

      <p className="text-balance text-xl font-medium leading-relaxed sm:text-2xl">
        {CONTEXTUEEL_RADEN.before}
        <span className="mx-1 inline-block min-w-[5ch] border-b-2 border-primary align-baseline">
          {"\u00a0"}
        </span>
        {CONTEXTUEEL_RADEN.after}
      </p>

      <div className="flex flex-col gap-2 sm:gap-3">
        {CONTEXTUEEL_RADEN.options.map((opt) => (
          <Button
            key={opt.id}
            type="button"
            variant="outline"
            size="lg"
            disabled={locked}
            className="h-auto min-h-14 w-full justify-start gap-3 whitespace-normal px-4 py-3 text-left"
            onClick={() => choose(opt.id, opt.value, opt.label)}
          >
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 font-mono text-lg font-semibold tabular-nums"
              aria-hidden
            >
              {opt.value}
            </span>
            <span className="min-w-0 flex-1 text-base font-normal leading-snug">
              <span className="sr-only">Positie {opt.value}. </span>
              {opt.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
