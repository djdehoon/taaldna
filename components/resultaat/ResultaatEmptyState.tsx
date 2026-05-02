"use client";

import Link from "next/link";
import { SiteKickerLink } from "@/components/layout/SiteKickerLink";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ResultaatEmptyState() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="mx-auto w-full max-w-xl px-6 pt-10 sm:px-8 sm:pt-14">
        <SiteKickerLink />
      </div>
      <div className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col justify-center gap-6 px-6 pb-16 text-center sm:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">Doe eerst de test</h1>
        <p className="text-muted-foreground">
          We hebben nog geen resultaten voor je. Na de vier korte oefeningen zie je hier je
          persoonlijke profiel en tips.
        </p>
        <div className="flex justify-center">
          <Link href="/start" className={cn(buttonVariants({ size: "lg" }))}>
            Naar de start →
          </Link>
        </div>
      </div>
    </div>
  );
}
