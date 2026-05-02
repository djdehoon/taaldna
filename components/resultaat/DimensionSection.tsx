"use client";

import {
  DIMENSION_X,
  DIMENSION_Y,
  dimensionXHeadline,
  dimensionYHeadline,
  personalizedLineX,
  personalizedLineY,
} from "@/lib/resultaat/dimensionCopy";

type Props = {
  ux: number;
  uy: number;
};

const dimensionCardClass =
  "flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4 text-left sm:px-5 sm:py-5";

export function DimensionSection({ ux, uy }: Props) {
  const xH = dimensionXHeadline(ux);
  const yH = dimensionYHeadline(uy);

  return (
    <section className="flex flex-col gap-10" aria-labelledby="dim-heading">
      <h2 id="dim-heading" className="text-lg font-semibold tracking-tight text-foreground">
        Wat deze assen betekenen
      </h2>

      <div className={dimensionCardClass}>
        <h3 className="text-sm font-semibold text-foreground">{DIMENSION_X.title}</h3>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {DIMENSION_X.labelLeft} ↔ {DIMENSION_X.labelRight}
        </p>
        <p className="text-2xl font-semibold tabular-nums text-foreground">
          {xH.pct}% {xH.dominantLabel}
        </p>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-400 transition-[width]"
            style={{ width: `${ux * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[0.7rem] text-muted-foreground">
          <span>{DIMENSION_X.labelLeft}</span>
          <span>{DIMENSION_X.labelRight}</span>
        </div>
        {DIMENSION_X.science.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
        <p className="text-xs text-muted-foreground">{DIMENSION_X.citation}</p>
        <p className="text-sm font-medium text-foreground">{personalizedLineX(ux)}</p>
      </div>

      <div className={dimensionCardClass}>
        <h3 className="text-sm font-semibold text-foreground">{DIMENSION_Y.title}</h3>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {DIMENSION_Y.labelBottom} ↔ {DIMENSION_Y.labelTop}
        </p>
        <p className="text-2xl font-semibold tabular-nums text-foreground">
          {yH.pct}% {yH.dominantLabel}
        </p>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-400 transition-[width]"
            style={{ width: `${uy * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[0.7rem] text-muted-foreground">
          <span>{DIMENSION_Y.labelBottom}</span>
          <span>{DIMENSION_Y.labelTop}</span>
        </div>
        {DIMENSION_Y.science.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
        <p className="text-xs text-muted-foreground">{DIMENSION_Y.citation}</p>
        <p className="text-sm font-medium text-foreground">{personalizedLineY(uy)}</p>
      </div>
    </section>
  );
}
