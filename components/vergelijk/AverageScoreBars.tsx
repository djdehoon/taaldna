"use client";

import { cn } from "@/lib/utils";

type Item = { label: string; value: number };

type Props = {
  items: Item[];
  /**
   * Exacte label-string van de eigen tool (bijv. "TaalDNA"): zichtbaar kader.
   * Andere rijen krijgen dezelfde randbreedte in het transparant zodat balken uitlijnen.
   */
  highlightLabel?: string;
};

export function AverageScoreBars({ items, highlightLabel }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => {
        const isHighlight =
          highlightLabel !== undefined && item.label === highlightLabel;
        const balanceColumns = highlightLabel !== undefined;

        return (
        <li
          key={item.label}
          className={cn(
            balanceColumns && "rounded-xl",
            isHighlight && "border border-violet-500/40 bg-violet-950/15 p-3 sm:p-4",
            balanceColumns &&
              !isHighlight &&
              "border border-transparent px-3 py-1.5 sm:px-4 sm:py-2"
          )}
        >
          <div className="mb-1 flex items-baseline justify-between gap-2">
            <span className="text-sm font-medium text-zinc-200">{item.label}</span>
            <span className="tabular-nums text-sm text-zinc-400">{item.value.toFixed(1)}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/90 sm:h-2.5">
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
        );
      })}
    </ul>
  );
}
