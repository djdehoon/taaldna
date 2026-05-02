"use client";

const rows = [
  {
    exercise: "Contextueel raden",
    axis: "Analytisch ↔ Intuïtief",
    detail: "Snelheid en keuze in context geven een signaal op de horizontale as.",
  },
  {
    exercise: "Luister & schrijf",
    axis: "Solo ↔ Sociaal",
    detail: "Reactietijd wordt gecombineerd met je split-keuze voor de verticale as.",
  },
  {
    exercise: "Split-screen keuze",
    axis: "Solo ↔ Sociaal",
    detail: "Je voorkeur tussen alleen of samen weegt het zwaarst op deze as.",
  },
  {
    exercise: "Zin bouwen (sleep de blokken)",
    axis: "Analytisch ↔ Intuïtief",
    detail: "Volgorde en structuur versterken het beeld op de horizontale as.",
  },
] as const;

export function ExerciseInfluenceSection() {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="ex-influence-heading">
      <h2
        id="ex-influence-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Hoe de oefeningen jouw profiel bepalen
      </h2>
      <p className="text-base text-muted-foreground">
        Elke oefening levert signalen voor één of beide assen van je 2D-profiel.
      </p>
      <ul className="flex flex-col gap-3">
        {rows.map((row) => (
          <li
            key={row.exercise}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left sm:px-5 sm:py-4"
          >
            <p className="font-medium text-foreground">{row.exercise}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {row.axis}
            </p>
            <p className="mt-1 text-base leading-relaxed text-muted-foreground">{row.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
