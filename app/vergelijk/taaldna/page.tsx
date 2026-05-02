"use client";

import Link from "next/link";
import { AverageScoreBars } from "@/components/vergelijk/AverageScoreBars";
import { ComparisonStarTable } from "@/components/vergelijk/ComparisonStarTable";
import { VergelijkBackToResultaat } from "@/components/vergelijk/VergelijkBackToResultaat";
import { VergelijkDarkCard } from "@/components/vergelijk/VergelijkDarkCard";
import { VergelijkPageShell } from "@/components/vergelijk/VergelijkPageShell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  taaldnaAverages,
  taaldnaColumnLabels,
  taaldnaHighlightScoreColumnIndex,
  taaldnaHonestCards,
  taaldnaHonestFootnote,
  taaldnaPageSubtitle,
  taaldnaPageTitle,
  taaldnaStarRows,
  taaldnaUspCards,
} from "@/lib/vergelijk/taaldnaComparisonData";

export default function VergelijkTaalDnaPage() {
  return (
    <VergelijkPageShell>
      <div className="flex flex-col gap-10 pb-16">
        <header className="flex flex-col gap-4">
          <VergelijkBackToResultaat />
          <div className="h-px max-w-xs bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] opacity-80" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {taaldnaPageTitle}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-400">{taaldnaPageSubtitle}</p>
        </header>

        <section className="flex flex-col gap-3" aria-labelledby="taaldna-table-heading">
          <h2 id="taaldna-table-heading" className="text-lg font-semibold text-zinc-100">
            Sterrenvergelijking
          </h2>
          <ComparisonStarTable
            columnLabels={taaldnaColumnLabels}
            rows={taaldnaStarRows}
            highlightColumnIndex={taaldnaHighlightScoreColumnIndex}
          />
        </section>

        <section className="flex flex-col gap-3" aria-labelledby="taaldna-bars-heading">
          <h2 id="taaldna-bars-heading" className="text-lg font-semibold text-zinc-100">
            Gemiddelde scores
          </h2>
          <AverageScoreBars items={taaldnaAverages} />
        </section>

        <section className="flex flex-col gap-4" aria-labelledby="taaldna-honest-heading">
          <h2 id="taaldna-honest-heading" className="text-lg font-semibold text-zinc-100">
            Waar anderen beter zijn dan wij
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {taaldnaHonestCards.map((card) => (
              <VergelijkDarkCard key={card.title} title={card.title} body={card.body} />
            ))}
          </div>
          <p className="text-sm leading-relaxed text-zinc-400">{taaldnaHonestFootnote}</p>
        </section>

        <section className="flex flex-col gap-4" aria-labelledby="taaldna-usp-heading">
          <h2 id="taaldna-usp-heading" className="text-lg font-semibold text-zinc-100">
            Waar TaalDNA uniek is
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {taaldnaUspCards.map((card) => (
              <VergelijkDarkCard key={card.title} title={card.title} body={card.body} />
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-zinc-800 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link href="/start" className={cn(buttonVariants({ size: "lg" }))}>
            Doe de TaalDNA test →
          </Link>
          <Link
            href="/vergelijk/polycards"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-zinc-600 bg-transparent text-zinc-200 hover:bg-zinc-800/80")}
          >
            Vergelijk PolyCards
          </Link>
        </footer>
      </div>
    </VergelijkPageShell>
  );
}
