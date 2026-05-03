"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { WoordwolkTrial } from "@/types";
import { WOORDWOLK } from "@/lib/assessment/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onComplete: (trial: WoordwolkTrial) => void;
};

const ADVANCE_MS = 420;

export function Woordwolk({ onComplete }: Props) {
  const reduceMotion = useReducedMotion();
  const startRef = useRef<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useLayoutEffect(() => {
    startRef.current = performance.now();
  }, []);

  const choose = useCallback(
    (id: "a" | "b" | "c" | "d", value: string, label: string) => {
      if (locked || startRef.current === null) return;
      setLocked(true);
      setSelectedId(id);
      const responseTimeMs = Math.round(performance.now() - startRef.current);
      const trial: WoordwolkTrial = {
        exerciseSlug: "woordwolk",
        responseTimeMs,
        completedAt: new Date().toISOString(),
        choiceId: id,
        choiceLabel: `${value}: ${label}`,
      };
      window.setTimeout(() => {
        onComplete(trial);
      }, ADVANCE_MS);
    },
    [onComplete, locked]
  );

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-8 px-4 pb-12 pt-8 sm:px-8">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Woordwolk
        </p>
        <p className="text-sm text-muted-foreground">{WOORDWOLK.prompt}</p>
      </div>

      <motion.div
        className="relative mx-auto min-h-[200px] w-full max-w-md rounded-2xl border border-border/60 bg-muted/20 px-2 py-6 sm:min-h-[220px]"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {WOORDWOLK.words.map((w, i) => (
          <motion.span
            key={`${w.text}-${i}`}
            className={cn(
              "pointer-events-none absolute select-none text-foreground",
              w.className
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.28,
              delay: reduceMotion ? 0 : i * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w.text}
          </motion.span>
        ))}
      </motion.div>

      <div className="flex flex-col gap-2 sm:gap-3">
        {WOORDWOLK.options.map((opt) => (
          <Button
            key={opt.id}
            type="button"
            variant="outline"
            size="lg"
            disabled={locked}
            className={cn(
              "h-auto min-h-11 w-full justify-start gap-3 whitespace-normal px-4 py-3 text-left transition-colors duration-200 sm:min-h-14",
              selectedId === opt.id &&
                "border-primary bg-primary/15 ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
            )}
            onClick={() => choose(opt.id, opt.value, opt.label)}
          >
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 font-mono text-lg font-semibold tabular-nums"
              aria-hidden
            >
              {opt.value}
            </span>
            <span className="min-w-0 flex-1 text-base font-normal leading-snug">
              <span className="sr-only">Optie {opt.value}. </span>
              {opt.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
