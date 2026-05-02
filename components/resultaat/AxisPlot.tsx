"use client";

import type { CSSProperties } from "react";
import type { AppInSpace } from "@/lib/resultaat/appSpace";
import { getQuadrantFromScores } from "@/lib/resultaat/scoreTrials";

const svgFontSmall: CSSProperties = {
  fontSize: 2.8,
  fontFamily:
    "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
};

const axisLabelClass =
  "pointer-events-none absolute z-10 text-xs font-normal uppercase tracking-widest text-gray-400";

type Props = {
  x: number;
  y: number;
  apps: AppInSpace[];
};

export function AxisPlot({ x, y, apps }: Props) {
  const cx = 50 + x / 2;
  const cy = 50 - y / 2;
  const quadrant = getQuadrantFromScores(x, y);

  return (
    <figure className="w-full font-sans">
      <div className="relative aspect-square w-full">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible font-sans"
          role="img"
          aria-label={`Je profiel op de kaart: ${quadrant.replace("-", " en ")}.`}
        >
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            rx="4"
            fill="#0f0f1a"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.5"
          />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#ffffff" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#ffffff" strokeWidth="0.5" />
          {apps.map((app) => {
            const ax = 100 * app.x;
            const ay = 100 - 100 * app.y;
            const lx = ax + (ax < 52 ? 2.5 : -2.5);
            const anchor = ax < 52 ? "start" : "end";
            return (
              <g key={app.id}>
                <circle
                  cx={ax}
                  cy={ay}
                  r="2"
                  fill={app.plotColor}
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="0.2"
                />
                <text
                  x={lx}
                  y={ay + 1.1}
                  textAnchor={anchor}
                  fill={app.plotColor}
                  style={svgFontSmall}
                  className="opacity-95"
                >
                  {app.plotLabel}
                </text>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="3.5" fill="#ffffff" />
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#aaaaaa"
            style={{
              fontFamily:
                "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
              fontSize: 2.2,
              fontWeight: 400,
            }}
          >
            you
          </text>
        </svg>
        <span className={`${axisLabelClass} left-[25%] top-2`}>Sociaal</span>
        <span className={`${axisLabelClass} bottom-2 left-[25%]`}>Solo</span>
        <span
          className={`${axisLabelClass} bottom-[calc(50%+10px)] left-2 text-left`}
        >
          Analytisch
        </span>
        <span
          className={`${axisLabelClass} bottom-[calc(50%+10px)] right-2 text-right`}
        >
          Intuïtief
        </span>
      </div>
    </figure>
  );
}
