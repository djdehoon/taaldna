"use client";

import { ArrowRight } from "lucide-react";
import { VergelijkComparisonNavItem } from "@/components/vergelijk/VergelijkComparisonNavItem";

const links = [
  {
    href: "/vergelijk/taaldna",
    title: "TaalDNA vs. andere leerstijl-tools",
  },
  {
    href: "/vergelijk/polycards",
    title: "PolyCards vs. andere flashcard-apps",
  },
] as const;

export function VergelijkToolsSection() {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="vergelijk-heading">
      <h2 id="vergelijk-heading" className="text-lg font-semibold tracking-tight text-foreground">
        Vergelijk tools
      </h2>
      <ul className="flex flex-col gap-3">
        {links.map((item) => (
          <li key={item.href}>
            <VergelijkComparisonNavItem
              href={item.href}
              variant="card"
              trailing={
                <ArrowRight
                  className="size-5 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-zinc-200"
                  aria-hidden
                />
              }
            >
              {item.title}
            </VergelijkComparisonNavItem>
          </li>
        ))}
      </ul>
    </section>
  );
}
