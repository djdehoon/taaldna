"use client";

import type { ReactNode } from "react";
import { SiteKickerLink } from "@/components/layout/SiteKickerLink";

type Props = {
  children: ReactNode;
};

export function VergelijkPageShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#0f0f1a] font-sans text-zinc-100 antialiased">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-12">
        <SiteKickerLink className="[&_span]:!text-zinc-400 [&_span]:opacity-90" />
        {children}
      </div>
    </div>
  );
}
