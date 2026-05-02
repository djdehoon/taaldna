"use client";

import { cn } from "@/lib/utils";

type Item = { label: string; value: number };

type Props = {
  items: Item[];
  /** Eerste item (eigen product) extra nadruk. */
  highlightFirst?: boolean;
};

export function AverageScoreBars({ items, highlightFirst = true }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, idx) => (
        <li
          key={item.label}
          className={cn(
            highlightFirst && idx === 0 && "rounded-xl border border-violet-500/40 bg-violet-950/15 p-3 sm:p-4"
          )}
        >
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <span className="text-sm font-medium text-zinc-200">{item.label}</span>
            <span className="tabular-nums text-sm text-zinc-400">{item.value.toFixed(1)}</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-800/90">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] transition-[width] duration-500"
              style={{ width: `${(item.value / 5) * 100}%` }}
              role="progressbar"
              aria-valuenow={item.value}
              aria-valuemin={0}
              aria-valuemax={5}
              aria-label={`Gemiddelde score ${item.label}: ${item.value} van 5`}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
