import type { AssessmentSessionPayload } from "@/types";

/** Preset for /dev: valid 6 trials; scoreTrials yields { x: 66, y: -40 } (x=65 not discrete-reachable). */
const ISO = "2026-05-03T12:00:00.000Z";

export const DEV_ASSESSMENT_PAYLOAD: AssessmentSessionPayload = {
  version: 1,
  savedAt: ISO,
  trials: [
    {
      exerciseSlug: "contextueel-raden",
      responseTimeMs: 5000,
      completedAt: ISO,
      choiceId: "a",
      choiceLabel: "1: woord",
    },
    {
      exerciseSlug: "luister-en-schrijf",
      responseTimeMs: 11448,
      completedAt: ISO,
      typedText: "test",
      normalizedMatch: false,
      usedSpeechSynthesis: false,
    },
    {
      exerciseSlug: "dertig-seconden-split",
      responseTimeMs: 5000,
      completedAt: ISO,
      choiceId: "solo",
      timedOut: false,
      secondsRemainingAtChoice: 20,
    },
    {
      exerciseSlug: "bouw-de-zin",
      responseTimeMs: 8000,
      completedAt: ISO,
      wordOrder: [".", "Zet", "de", "onderdelen", "in", "deze", "volgorde"],
      correctOrder: false,
    },
    {
      exerciseSlug: "woordwolk",
      responseTimeMs: 2000,
      completedAt: ISO,
      choiceId: "b",
      choiceLabel: "B: klank",
    },
    {
      exerciseSlug: "leerscenario",
      responseTimeMs: 2000,
      completedAt: ISO,
      choiceId: "d",
      choiceLabel: "D: AI",
    },
  ],
};
