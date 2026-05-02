"use client";

import type { ResultaatQuadrant } from "@/lib/resultaat/scoreTrials";
import { cn } from "@/lib/utils";

const ROLES: {
  quadrant: ResultaatQuadrant;
  name: string;
  emoji: string;
  axes: string;
  description: string;
}[] = [
  {
    quadrant: "intuitief-sociaal",
    name: "De Avonturier",
    emoji: "🧭",
    axes: "Intuïtief + Sociaal",
    description: "Leert via gesprekken en immersie.",
  },
  {
    quadrant: "analytisch-sociaal",
    name: "De Verbinder",
    emoji: "🔗",
    axes: "Analytisch + Sociaal",
    description: "Combineert structuur met contact.",
  },
  {
    quadrant: "intuitief-solo",
    name: "De Ontdekker",
    emoji: "🔍",
    axes: "Intuïtief + Solo",
    description: "Leert op eigen tempo via context.",
  },
  {
    quadrant: "analytisch-solo",
    name: "De Systematicus",
    emoji: "📊",
    axes: "Analytisch + Solo",
    description: "Leert via herhaling en structuur.",
  },
];

type Props = {
  activeQuadrant: ResultaatQuadrant;
};

export function ProfileRolesSection({ activeQuadrant }: Props) {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="roles-heading">
      <h2 id="roles-heading" className="text-lg font-semibold tracking-tight text-foreground">
        Jouw rol
      </h2>
      <p className="text-sm text-muted-foreground">
        Vier profielen in het vlak — jouw resultaat is er één van.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {ROLES.map((role) => {
          const active = role.quadrant === activeQuadrant;
          return (
            <li
              key={role.quadrant}
              className={cn(
                "rounded-xl border bg-white px-4 py-4 text-left transition-shadow sm:px-5",
                active
                  ? "border-primary shadow-lg shadow-primary/25 ring-2 ring-primary/40"
                  : "border-gray-200 shadow-sm"
              )}
            >
              <p className="text-lg font-semibold text-foreground">
                <span className="mr-2" aria-hidden>
                  {role.emoji}
                </span>
                {role.name}
              </p>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {role.axes}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {role.description}
              </p>
              {active ? (
                <p className="mt-2 text-xs font-medium text-primary">Dit ben jij in deze test</p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
