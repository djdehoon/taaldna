"use client";

import { cn } from "@/lib/utils";

const STAR = "⭐";

function StarCell({ count }: { count: number }) {
  const safe = Math.min(5, Math.max(0, Math.round(count)));
  return (
    <span className="whitespace-nowrap text-sm tracking-tight" aria-label={`${safe} van 5 sterren`}>
      {STAR.repeat(safe)}
    </span>
  );
}

type Row = { criterion: string; scores: number[] };

type Props = {
  columnLabels: readonly string[];
  rows: Row[];
  /** Index in scores array (0 = first product column). Weglaten = geen kolom uitlichten. */
  highlightColumnIndex?: number;
};

function roundToOneDecimal(n: number): number {
  return Math.round(n * 10) / 10;
}

export function ComparisonStarTable({ columnLabels, rows, highlightColumnIndex }: Props) {
  const highlightClass =
    "border-l border-r border-violet-500/70 bg-violet-950/25 shadow-[0_0_24px_-8px_rgba(124,58,237,0.45)]";

  const rowCount = rows.length;
  const columnAverages =
    rowCount === 0
      ? columnLabels.map(() => 0)
      : columnLabels.map((_, colIdx) =>
          roundToOneDecimal(
            rows.reduce((acc, row) => acc + row.scores[colIdx], 0) / rowCount
          )
        );

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-700/60 bg-[#141428]/80">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-700/80">
            <th
              scope="col"
              className="sticky left-0 z-20 min-w-[12rem] bg-[#0f0f1a] px-3 py-3 pr-4 text-xs font-medium uppercase tracking-wide text-zinc-500 sm:min-w-[14rem]"
            >
              Criterium
            </th>
            {columnLabels.map((label, colIdx) => (
              <th
                key={label}
                scope="col"
                className={cn(
                  "px-3 py-3 text-center text-xs font-semibold text-zinc-300 sm:px-4",
                  highlightColumnIndex !== undefined &&
                    colIdx === highlightColumnIndex &&
                    highlightClass
                )}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.criterion} className="border-b border-zinc-800/80 last:border-0">
              <th
                scope="row"
                className="sticky left-0 z-10 min-w-[12rem] bg-[#0f0f1a] px-3 py-3 pr-4 text-left font-normal text-zinc-200 sm:min-w-[14rem]"
              >
                {row.criterion}
              </th>
              {row.scores.map((score, colIdx) => (
                <td
                  key={`${row.criterion}-${colIdx}`}
                  className={cn(
                    "px-3 py-3 text-center sm:px-4",
                    highlightColumnIndex !== undefined &&
                      colIdx === highlightColumnIndex &&
                      highlightClass
                  )}
                >
                  <StarCell count={score} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-zinc-700/80">
            <th
              scope="row"
              className="sticky left-0 z-10 min-w-[12rem] bg-[#0f0f1a] px-3 py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400 sm:min-w-[14rem]"
            >
              Gemiddelde
            </th>
            {columnAverages.map((avg, colIdx) => (
              <td
                key={`avg-${colIdx}`}
                className={cn(
                  "px-3 py-3 text-center text-sm font-medium tabular-nums text-zinc-200 sm:px-4",
                  highlightColumnIndex !== undefined &&
                    colIdx === highlightColumnIndex &&
                    highlightClass
                )}
              >
                {avg.toFixed(1)}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
