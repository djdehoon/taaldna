"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Als er geen geschiedenis is (zeldzaam), fallback. */
  fallbackHref?: string;
};

export function HistoryBackLink({ className, fallbackHref = "/" }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className={cn(
        "inline-flex cursor-pointer border-0 bg-transparent p-0 text-left text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
        className
      )}
    >
      ← Terug
    </button>
  );
}
