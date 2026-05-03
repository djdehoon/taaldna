"use client";

import { spectrumHeadlineFromRawScore } from "@/lib/resultaat/dimensionCopy";
import { cn } from "@/lib/utils";

export interface ScoreAxisBarProps {
  score: number;
  labelLeft: string;
  labelRight: string;
  accentLeft: string;
  accentRight: string;
}

function clampScore(n: number): number {
  return Math.min(100, Math.max(-100, n));
}

export function ScoreSpectrumBar({
  score,
  labelLeft,
  labelRight,
  accentLeft,
  accentRight,
}: ScoreAxisBarProps) {
  const s = clampScore(score);
  const pctRaw = ((s + 100) / 200) * 100;
  const pct = Math.min(100, Math.max(0, pctRaw));
  const { text, className } = spectrumHeadlineFromRawScore(
    score,
    labelLeft,
    labelRight,
    accentLeft,
    accentRight
  );

  return (
    <div className="flex flex-col gap-2">
      <p className={cn("text-center text-sm font-medium tabular-nums", className)}>
        {text}
      </p>
      <div className="relative h-6 w-full">
        <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <div
          className="absolute top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg ring-2 ring-white/80"
          style={{
            left: `clamp(0.5rem, ${pct}%, calc(100% - 0.5rem))`,
          }}
          aria-hidden
        />
      </div>
      <div className="flex justify-between text-[0.7rem] text-muted-foreground">
        <span>{labelLeft}</span>
        <span>{labelRight}</span>
      </div>
    </div>
  );
}
