"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DEV_ASSESSMENT_PAYLOAD } from "@/lib/dev/devAssessmentPreset";
import { TAALDNA_ASSESSMENT_STORAGE_KEY } from "@/types";

export default function DevPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      localStorage.setItem(
        TAALDNA_ASSESSMENT_STORAGE_KEY,
        JSON.stringify(DEV_ASSESSMENT_PAYLOAD)
      );
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => {
      router.replace("/resultaat");
    }, 1000);
    return () => window.clearTimeout(t);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="text-base text-muted-foreground">
        <span aria-hidden>🧪 </span>Dev mode — testdata laden…
      </p>
    </div>
  );
}
