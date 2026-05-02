"use client";

import { useEffect, useRef, useState } from "react";
import { TAALDNA_ASSESSMENT_STORAGE_KEY, type AssessmentSessionPayload } from "@/types";
import { parseSessionPayload } from "@/lib/resultaat/scoreTrials";
import { SiteKickerLink } from "@/components/layout/SiteKickerLink";
import { runResultsConfetti } from "@/lib/resultaat/runResultsConfetti";
import { ResultaatEmptyState } from "@/components/resultaat/ResultaatEmptyState";
import { ResultaatResultsBody } from "@/components/resultaat/ResultaatResultsBody";

function readPayloadFromStorage(): AssessmentSessionPayload | null {
  if (typeof window === "undefined") return null;
  try {
    let raw = localStorage.getItem(TAALDNA_ASSESSMENT_STORAGE_KEY);
    if (!raw) {
      raw = sessionStorage.getItem(TAALDNA_ASSESSMENT_STORAGE_KEY);
      if (raw) {
        localStorage.setItem(TAALDNA_ASSESSMENT_STORAGE_KEY, raw);
        sessionStorage.removeItem(TAALDNA_ASSESSMENT_STORAGE_KEY);
      }
    }
    return parseSessionPayload(raw);
  } catch {
    return null;
  }
}

export function ResultaatClient() {
  const [payload, setPayload] = useState<AssessmentSessionPayload | null | undefined>(
    undefined
  );
  const confettiRafRef = useRef(0);

  useEffect(() => {
    setPayload(readPayloadFromStorage());
  }, []);

  useEffect(() => {
    if (payload === undefined || payload === null) return;

    let cancelled = false;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    confettiRafRef.current = requestAnimationFrame(() => {
      if (cancelled) return;
      void runResultsConfetti();
    });

    return () => {
      cancelled = true;
      if (confettiRafRef.current) {
        cancelAnimationFrame(confettiRafRef.current);
        confettiRafRef.current = 0;
      }
    };
  }, [payload]);

  if (payload === undefined) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans text-sm text-muted-foreground">
        <div className="mx-auto w-full max-w-xl px-6 pt-10 sm:px-8 sm:pt-14">
          <SiteKickerLink />
        </div>
        <div className="flex flex-1 items-center justify-center px-6 pb-20">Resultaat laden…</div>
      </div>
    );
  }

  if (!payload) {
    return <ResultaatEmptyState />;
  }

  return <ResultaatResultsBody payload={payload} />;
}

export default ResultaatClient;
