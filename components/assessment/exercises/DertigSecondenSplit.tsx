"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DertigSecondenSplitTrial } from "@/types";
import { DERTIG_SECONDEN_SPLIT } from "@/lib/assessment/content";
import { Button } from "@/components/ui/button";

const TOTAL_SECONDS = 30;

type Props = {
  onComplete: (trial: DertigSecondenSplitTrial) => void;
};

export function DertigSecondenSplit({ onComplete }: Props) {
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [uiLocked, setUiLocked] = useState(false);
  const startRef = useRef(
    typeof performance !== "undefined" ? performance.now() : 0
  );
  const doneRef = useRef(false);

  const finish = useCallback(
    (
      choiceId: "solo" | "sociaal" | null,
      timedOut: boolean,
      remaining: number
    ) => {
      if (doneRef.current) return;
      doneRef.current = true;
      setUiLocked(true);
      const responseTimeMs = Math.round(performance.now() - startRef.current);
      onComplete({
        exerciseSlug: "dertig-seconden-split",
        responseTimeMs,
        completedAt: new Date().toISOString(),
        choiceId,
        timedOut,
        secondsRemainingAtChoice: remaining,
      });
    },
    [onComplete]
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          finish(null, true, 0);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [finish]);

  const pick = (id: "solo" | "sociaal") => {
    if (uiLocked) return;
    finish(id, false, seconds);
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 pb-12 pt-8">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          30 seconden
        </p>
        <p className="text-sm text-muted-foreground">
          {DERTIG_SECONDEN_SPLIT.prompt}
        </p>
      </div>

      <div
        className="flex items-center justify-center rounded-xl border border-border bg-muted/30 py-4"
        aria-live="polite"
      >
        <span className="font-mono text-4xl font-semibold tabular-nums tracking-tight">
          {seconds}
        </span>
        <span className="ml-2 text-sm text-muted-foreground">sec</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={uiLocked}
          className="h-auto min-h-[11rem] flex-col items-stretch gap-2 whitespace-normal px-4 py-5 text-left sm:min-h-[12rem]"
          onClick={() => pick(DERTIG_SECONDEN_SPLIT.left.id)}
        >
          <span className="text-base font-semibold">
            {DERTIG_SECONDEN_SPLIT.left.title}
          </span>
          <span className="text-sm font-normal leading-snug text-muted-foreground">
            {DERTIG_SECONDEN_SPLIT.left.body}
          </span>
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={uiLocked}
          className="h-auto min-h-[11rem] flex-col items-stretch gap-2 whitespace-normal px-4 py-5 text-left sm:min-h-[12rem]"
          onClick={() => pick(DERTIG_SECONDEN_SPLIT.right.id)}
        >
          <span className="text-base font-semibold">
            {DERTIG_SECONDEN_SPLIT.right.title}
          </span>
          <span className="text-sm font-normal leading-snug text-muted-foreground">
            {DERTIG_SECONDEN_SPLIT.right.body}
          </span>
        </Button>
      </div>
    </div>
  );
}
