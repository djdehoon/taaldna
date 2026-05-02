"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
            <Link
              href={item.href}
              className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-700 bg-[#0f0f1a] px-4 py-4 text-left text-zinc-100 shadow-md transition hover:border-zinc-500 hover:bg-[#141428] sm:px-5"
            >
              <span className="min-w-0 flex-1 text-sm font-medium leading-snug sm:text-base">
                {item.title}
              </span>
              <ArrowRight
                className="size-5 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-zinc-200"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
