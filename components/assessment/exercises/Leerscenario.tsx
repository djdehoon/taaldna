"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LeerscenarioTrial } from "@/types";
import { LEERSCENARIO } from "@/lib/assessment/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onComplete: (trial: LeerscenarioTrial) => void;
};

const ADVANCE_MS = 420;

export function Leerscenario({ onComplete }: Props) {
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
      const trial: LeerscenarioTrial = {
        exerciseSlug: "leerscenario",
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
      <motion.div
        className="space-y-2"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Leerscenario
        </p>
        <p className="text-balance text-lg font-semibold leading-snug text-foreground sm:text-xl">
          {LEERSCENARIO.prompt}
        </p>
      </motion.div>

      <div className="flex flex-col gap-2 sm:gap-3">
        {LEERSCENARIO.options.map((opt, i) => (
          <motion.div
            key={opt.id}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.28,
              delay: reduceMotion ? 0 : 0.06 + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Button
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
                className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 text-xl"
                aria-hidden
              >
                {opt.emoji}
              </span>
              <span className="min-w-0 flex-1 text-base font-normal leading-snug">
                <span className="sr-only">Optie {opt.value}. </span>
                {opt.label}
              </span>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
