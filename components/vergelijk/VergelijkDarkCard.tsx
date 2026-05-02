"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  body: string;
  className?: string;
  footer?: ReactNode;
};

export function VergelijkDarkCard({ title, body, className, footer }: Props) {
  return (
    <article
      className={cn(
        "rounded-xl border border-zinc-700/80 bg-[#1a1a2e] p-4 shadow-md sm:p-5",
        className
      )}
    >
      <h3 className="font-semibold text-zinc-100">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
      {footer ? <div className="mt-3">{footer}</div> : null}
    </article>
  );
}
