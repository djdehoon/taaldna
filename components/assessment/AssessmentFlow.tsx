"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { AssessmentSessionPayload, ExerciseTrial } from "@/types";
import { TAALDNA_ASSESSMENT_STORAGE_KEY } from "@/types";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";
import { ContextueelRaden } from "@/components/assessment/exercises/ContextueelRaden";
import { LuisterEnSchrijf } from "@/components/assessment/exercises/LuisterEnSchrijf";
import { DertigSecondenSplit } from "@/components/assessment/exercises/DertigSecondenSplit";
import { BouwDeZin } from "@/components/assessment/exercises/BouwDeZin";

const TOTAL = 4;

export function AssessmentFlow() {
  const [step, setStep] = useState(0);
  const [, setTrials] = useState<ExerciseTrial[]>([]);
  const reduceMotion = useReducedMotion();
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
            sessionStorage.setItem(
              TAALDNA_ASSESSMENT_STORAGE_KEY,
              JSON.stringify(payload)
            );
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
      <AssessmentProgress stepIndex={step} totalSteps={TOTAL} />
      <div className="flex flex-1 flex-col">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            className="flex flex-1 flex-col"
            initial={reduceMotion ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <ContextueelRaden onComplete={handleComplete} />
            )}
            {step === 1 && (
              <LuisterEnSchrijf onComplete={handleComplete} />
            )}
            {step === 2 && (
              <DertigSecondenSplit onComplete={handleComplete} />
            )}
            {step === 3 && <BouwDeZin onComplete={handleComplete} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
