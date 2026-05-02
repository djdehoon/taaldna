/** Normalized coordinates: x 0 = analytisch, 1 = intuïtief; y 0 = solo, 1 = sociaal. */

export type AppInSpace = {
  id: string;
  name: string;
  emoji: string;
  /** 0–1 intuïtief-as */
  x: number;
  /** 0–1 sociaal-as */
  y: number;
  /** SVG / legend dot fill */
  plotColor: string;
  /** Kort label op de plot */
  plotLabel: string;
};

export const APPS_IN_SPACE: AppInSpace[] = [
  {
    id: "duolingo",
    name: "Duolingo",
    emoji: "🦉",
    x: 0.75,
    y: 0.7,
    plotColor: "#f97316",
    plotLabel: "Duo",
  },
  {
    id: "anki",
    name: "Anki",
    emoji: "🗃️",
    x: 0.2,
    y: 0.15,
    plotColor: "#3b82f6",
    plotLabel: "Anki",
  },
  {
    id: "babbel",
    name: "Babbel",
    emoji: "💬",
    x: 0.3,
    y: 0.45,
    plotColor: "#a855f7",
    plotLabel: "Babbel",
  },
  {
    id: "pimsleur",
    name: "Pimsleur",
    emoji: "🎧",
    x: 0.6,
    y: 0.25,
    plotColor: "#22c55e",
    plotLabel: "Pims.",
  },
  {
    id: "italki",
    name: "italki",
    emoji: "🌍",
    x: 0.65,
    y: 0.85,
    plotColor: "#ec4899",
    plotLabel: "italki",
  },
  {
    id: "polycards",
    name: "PolyCards",
    emoji: "🃏",
    x: 0.25,
    y: 0.2,
    plotColor: "#eab308",
    plotLabel: "PolyCards",
  },
];

const SQRT2 = Math.SQRT2;

export function normalizeScores(x: number, y: number): { ux: number; uy: number } {
  return {
    ux: (x + 100) / 200,
    uy: (y + 100) / 200,
  };
}

export function matchPercentForApp(
  ux: number,
  uy: number,
  ax: number,
  ay: number
): number {
  const d = Math.hypot(ux - ax, uy - ay) / SQRT2;
  return Math.round(Math.min(100, Math.max(0, 100 - d * 100)));
}

export function styleLabelFromPosition(x: number, y: number): string {
  const h = x < 0.5 ? "analytisch" : "intuïtief";
  const v = y < 0.5 ? "solo" : "sociaal";
  return `${h} + ${v}`;
}

export type AppWithMatch = AppInSpace & {
  matchPercent: number;
  reasonLine: string;
};

export function appsWithMatches(ux: number, uy: number): AppWithMatch[] {
  return APPS_IN_SPACE.map((app) => {
    const matchPercent = matchPercentForApp(ux, uy, app.x, app.y);
    const appStyle = styleLabelFromPosition(app.x, app.y);
    const reasonLine = `Past bij jou omdat: ${appStyle}.`;
    return { ...app, matchPercent, reasonLine };
  }).sort((a, b) => b.matchPercent - a.matchPercent);
}

export function matchTierColor(matchPercent: number): "green" | "orange" | "red" {
  if (matchPercent >= 75) return "green";
  if (matchPercent >= 50) return "orange";
  return "red";
}

export function matchTierClasses(tier: "green" | "orange" | "red"): {
  borderLeft: string;
  bar: string;
} {
  switch (tier) {
    case "green":
      return { borderLeft: "border-l-emerald-500", bar: "bg-emerald-500" };
    case "orange":
      return { borderLeft: "border-l-amber-500", bar: "bg-amber-500" };
    default:
      return { borderLeft: "border-l-red-500", bar: "bg-red-500" };
  }
}
