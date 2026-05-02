"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { AssessmentSessionPayload, ExerciseTrial } from "@/types";
import { TAALDNA_ASSESSMENT_STORAGE_KEY } from "@/types";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";
import { SiteKickerLink } from "@/components/layout/SiteKickerLink";
import { ContextueelRaden } from "@/components/assessment/exercises/ContextueelRaden";
import { LuisterEnSchrijf } from "@/components/assessment/exercises/LuisterEnSchrijf";
import { DertigSecondenSplit } from "@/components/assessment/exercises/DertigSecondenSplit";

/** dnd-kit + SSR op Vercel geeft nog weleens 500; alleen client-side laden. */
const BouwDeZin = dynamic(
  () =>
    import("@/components/assessment/exercises/BouwDeZin").then((m) => m.BouwDeZin),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-muted-foreground sm:px-8">
        <p className="text-sm">Laatste oefening laden…</p>
      </div>
    ),
  }
);

const TOTAL = 4;

export function AssessmentFlow() {
  const [step, setStep] = useState(0);
  const [, setTrials] = useState<ExerciseTrial[]>([]);
  const router = useRouter();

  const handleComplete = useCallback(
    (trial: ExerciseTrial) => {
      setTrials((prev) => {
        const next = [...prev, trial];
        if (next.length === TOTAL) {
          const payload: AssessmentSessionPayload = {
            version: 1,
            savedAt: new Date().toISOString(),
            trials: next,
          };
          try {
            localStorage.setItem(
              TAALDNA_ASSESSMENT_STORAGE_KEY,
              JSON.stringify(payload)
            );
            sessionStorage.removeItem(TAALDNA_ASSESSMENT_STORAGE_KEY);
          } catch {
            /* private mode / quota */
          }
          router.push("/resultaat");
        }
        return next;
      });
      setStep((s) => (s < TOTAL - 1 ? s + 1 : s));
    },
    [router]
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="px-6 pt-10 sm:px-8 sm:pt-12">
        <div className="mx-auto w-full max-w-xl">
          <SiteKickerLink />
        </div>
      </div>
      <AssessmentProgress stepIndex={step} totalSteps={TOTAL} />
      <div key={step} className="flex flex-1 flex-col">
        {step === 0 && <ContextueelRaden onComplete={handleComplete} />}
        {step === 1 && <LuisterEnSchrijf onComplete={handleComplete} />}
        {step === 2 && <DertigSecondenSplit onComplete={handleComplete} />}
        {step === 3 && <BouwDeZin onComplete={handleComplete} />}
      </div>
    </div>
  );
}
