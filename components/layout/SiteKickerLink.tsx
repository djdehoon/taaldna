"use client";

import Link from "next/link";
import { TaalDNALabel } from "@/components/brand/TaalDNALabel";
import { cn } from "@/lib/utils";

/** Merk + versie in de inhoudsflow, net boven de kop (niet als vaste app-balk). */
export function SiteKickerLink({ className }: { className?: string }) {
  return (
    <div className={cn("mb-6 sm:mb-7", className)}>
      <Link
        href="/"
        className="inline-flex rounded-sm no-underline outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
      >
        <TaalDNALabel variant="kicker" />
      </Link>
    </div>
  );
}
