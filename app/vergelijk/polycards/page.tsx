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
  polycardsAverages,
  polycardsColumnLabels,
  polycardsDisclaimer,
  polycardsExternalUrl,
  polycardsHighlightScoreColumnIndex,
  polycardsHonestCards,
  polycardsHonestFootnote,
  polycardsPageSubtitle,
  polycardsPageTitle,
  polycardsProfileMatch,
  polycardsRoadmap,
  polycardsStarRows,
  polycardsUspCards,
} from "@/lib/vergelijk/polycardsComparisonData";

export default function VergelijkPolycardsPage() {
  return (
    <VergelijkPageShell>
      <div className="flex flex-col gap-10 pb-16">
        <header className="flex flex-col gap-4">
          <VergelijkBackToResultaat />
          <div className="h-px max-w-xs bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] opacity-80" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {polycardsPageTitle}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-400">{polycardsPageSubtitle}</p>
        </header>

        <section className="flex flex-col gap-3" aria-labelledby="polycards-table-heading">
          <h2 id="polycards-table-heading" className="text-lg font-semibold text-zinc-100">
            Sterrenvergelijking
          </h2>
          <ComparisonStarTable
            columnLabels={polycardsColumnLabels}
            rows={polycardsStarRows}
            highlightColumnIndex={polycardsHighlightScoreColumnIndex}
          />
        </section>

        <section className="flex flex-col gap-3" aria-labelledby="polycards-bars-heading">
          <h2 id="polycards-bars-heading" className="text-lg font-semibold text-zinc-100">
            Gemiddelde scores
          </h2>
          <AverageScoreBars items={polycardsAverages} />
        </section>

        <section className="flex flex-col gap-4" aria-labelledby="polycards-honest-heading">
          <h2 id="polycards-honest-heading" className="text-lg font-semibold text-zinc-100">
            Waar anderen nu beter zijn
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {polycardsHonestCards.map((card) => (
              <VergelijkDarkCard key={card.title} title={card.title} body={card.body} />
            ))}
          </div>
          <p className="text-sm leading-relaxed text-zinc-400">{polycardsHonestFootnote}</p>
        </section>

        <section className="flex flex-col gap-4" aria-labelledby="polycards-usp-heading">
          <h2 id="polycards-usp-heading" className="text-lg font-semibold text-zinc-100">
            Waar PolyCards nu al uniek is
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {polycardsUspCards.map((card) => (
              <VergelijkDarkCard key={card.title} title={card.title} body={card.body} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3" aria-labelledby="polycards-roadmap-heading">
          <h2 id="polycards-roadmap-heading" className="text-lg font-semibold text-zinc-100">
            Roadmap
          </h2>
          <ul className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            {polycardsRoadmap.map((item) => (
              <li
                key={item.label}
                className="rounded-lg border border-zinc-700/80 bg-[#1a1a2e]/90 px-3 py-2.5 text-zinc-300"
              >
                <span className="mr-2" aria-hidden>
                  {item.icon}
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-4" aria-labelledby="polycards-profile-heading">
          <h2 id="polycards-profile-heading" className="text-lg font-semibold text-zinc-100">
            Profiel-match
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {polycardsProfileMatch.map((p) => (
              <VergelijkDarkCard
                key={p.name}
                title={`${p.emoji} ${p.name}`}
                body={`Aanbevolen apps: ${p.apps}`}
                footer={
                  p.note ? (
                    <p className="text-xs leading-relaxed text-zinc-500">{p.note}</p>
                  ) : null
                }
              />
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-zinc-800 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href={polycardsExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Probeer PolyCards gratis →
            </Link>
            <Link
              href="/vergelijk/taaldna"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-zinc-600 bg-transparent text-zinc-200 hover:bg-zinc-800/80")}
            >
              Vergelijk TaalDNA
            </Link>
          </div>
          <p className="text-xs leading-relaxed text-zinc-500">{polycardsDisclaimer}</p>
        </footer>
      </div>
    </VergelijkPageShell>
  );
}
