"use client";

import type { AppWithMatch } from "@/lib/resultaat/appSpace";
import { matchTierClasses, matchTierColor } from "@/lib/resultaat/appSpace";

type Props = {
  apps: AppWithMatch[];
};

export function AppMatchSection({ apps }: Props) {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="apps-heading">
      <h2 id="apps-heading" className="text-lg font-semibold tracking-tight text-foreground">
        Apps in jouw leerruimte
      </h2>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        AppSignaalruimte
      </p>
      <p className="text-sm text-muted-foreground">
        Gesorteerd op overlap met jouw profiel in het vlak (hoger = dichter bij jou op de kaart).
      </p>
      <ul className="flex flex-col gap-3">
        {apps.map((app) => {
          const tier = matchTierColor(app.matchPercent);
          const { borderLeft } = matchTierClasses(tier);
          return (
            <li
              key={app.id}
              className={`flex overflow-hidden rounded-xl border border-zinc-200/90 bg-white text-slate-900 shadow-md border-l-4 ${borderLeft}`}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-2 px-4 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">
                    <span className="mr-2" aria-hidden>
                      {app.emoji}
                    </span>
                    {app.name}
                  </p>
                  <p className="tabular-nums text-sm font-semibold text-slate-700">
                    Match {app.matchPercent}%
                  </p>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-400"
                    style={{ width: `${app.matchPercent}%` }}
                  />
                </div>
                <p className="text-sm leading-snug text-slate-700">{app.reasonLine}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
