"use client";

import type { ResultaatQuadrant } from "@/lib/resultaat/scoreTrials";
import { PROFILE_ROLE_META, PROFILE_ROLE_ORDER } from "@/lib/resultaat/profileRoleMeta";
import { ProfileRoleIconBadge } from "@/components/resultaat/ProfileRoleIconBadge";
import { cn } from "@/lib/utils";

type Props = {
  activeQuadrant: ResultaatQuadrant;
};

export function ProfileRolesSection({ activeQuadrant }: Props) {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="roles-heading">
      <h2 id="roles-heading" className="text-lg font-semibold tracking-tight text-foreground">
        Jouw rol
      </h2>
      <p className="text-base text-muted-foreground">
        Vier profielen in het vlak — jouw resultaat is er één van.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {PROFILE_ROLE_ORDER.map((quadrant) => {
          const active = quadrant === activeQuadrant;
          const role = PROFILE_ROLE_META[quadrant];
          return (
            <li
              key={quadrant}
              className={cn(
                "rounded-xl border bg-white px-4 py-5 text-left transition-shadow sm:px-5",
                active
                  ? "border-primary shadow-lg shadow-primary/25 ring-2 ring-primary/40"
                  : "border-gray-200 shadow-sm"
              )}
            >
              <p className="flex items-start gap-3 text-lg font-semibold text-foreground">
                <ProfileRoleIconBadge quadrant={quadrant} size="md" className="mt-0.5" />
                {role.displayName}
              </p>
              <p className="mt-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {role.axes}
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
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
