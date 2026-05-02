import Link from "next/link";
import { TaalDNALabel } from "@/components/brand/TaalDNALabel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: 1,
    title: "Start & korte uitleg",
    body: "Je ziet wat TaalDNA doet — zonder account, in een paar minuten klaar om te beginnen.",
  },
  {
    n: 2,
    title: "Vier interactieve oefeningen",
    body: "Geen vragenlijst: we kijken naar wat je doet. Ongeveer 9 minuten, met duidelijke voortgang.",
  },
  {
    n: 3,
    title: "Jouw profiel & app-tips",
    body: "Een 2D-profiel (hoe je denkt × hoe je graag leert) en eerlijke app-aanbevelingen op basis van jouw stijl.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background px-6 py-14 sm:px-8 sm:py-20">
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-12">
        <header className="flex flex-col gap-6 text-center sm:text-left">
          <p className="text-muted-foreground">
            <TaalDNALabel variant="kicker" />
          </p>
          <h1 className="text-balance font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ontdek hoe jij talen leert
          </h1>
          <p className="text-balance font-sans text-lg text-muted-foreground sm:text-xl">
            Geen lange vragenlijst — we meten gedrag in korte oefeningen. Je krijgt een helder
            profiel en eerlijke tips, ook voor Nederlands.
          </p>
          <div className="flex justify-center sm:justify-start">
            <Link
              href="/start"
              className={cn(
                buttonVariants({ size: "lg" }),
                "no-underline decoration-transparent"
              )}
            >
              Start de test (9 min)
            </Link>
          </div>
        </header>

        <section aria-labelledby="steps-heading" className="flex flex-col gap-4">
          <h2
            id="steps-heading"
            className="font-sans text-sm font-semibold tracking-tight text-foreground"
          >
            Zo werkt het
          </h2>
          <ol className="flex flex-col gap-3">
            {steps.map((step) => (
              <li
                key={step.n}
                className="flex gap-4 rounded-xl border border-border bg-card px-4 py-4 text-left shadow-sm"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                  aria-hidden
                >
                  {step.n}
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="font-sans font-medium text-foreground">{step.title}</p>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
