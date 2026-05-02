import type {
  AssessmentSessionPayload,
  BouwDeZinTrial,
  ContextueelRadenTrial,
  DertigSecondenSplitTrial,
  ExerciseTrial,
  ExerciseSlug,
  LuisterEnSchrijfTrial,
} from "@/types";

const RT_MIN_MS = 800;
const RT_MAX_MS = 25_000;

/** Map response time to [-100, 100]: faster → +100 (intuïtief / sociaal modifier), slower → -100. */
function responseTimeToScore(ms: number): number {
  const t = Math.min(Math.max(ms, RT_MIN_MS), RT_MAX_MS);
  const u = (t - RT_MIN_MS) / (RT_MAX_MS - RT_MIN_MS);
  return Math.round(100 - u * 200);
}

function clampAxis(n: number): number {
  return Math.min(100, Math.max(-100, n));
}

const REQUIRED_SLUGS: ExerciseSlug[] = [
  "contextueel-raden",
  "luister-en-schrijf",
  "dertig-seconden-split",
  "bouw-de-zin",
];

export type ResultaatQuadrant =
  | "analytisch-solo"
  | "analytisch-sociaal"
  | "intuitief-solo"
  | "intuitief-sociaal";

export const PROFILE_LABELS: Record<ResultaatQuadrant, string> = {
  "analytisch-solo": "De Systematicus 📊",
  "analytisch-sociaal": "De Strateeg 🎯",
  "intuitief-solo": "De Ontdekker 🔍",
  "intuitief-sociaal": "De Verbinder 🌐",
};

export function parseSessionPayload(raw: string | null): AssessmentSessionPayload | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as AssessmentSessionPayload;
    if (data?.version !== 1 || !Array.isArray(data.trials)) return null;
    const slugs = new Set(data.trials.map((t) => t.exerciseSlug));
    for (const s of REQUIRED_SLUGS) {
      if (!slugs.has(s)) return null;
    }
    if (data.trials.length !== 4) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * X: Analytisch (-) … Intuïtief (+). Combines Contextueel RT + Bouw correctheid.
 * Y: Solo (-) … Sociaal (+). Combines Split keuze + Luister RT.
 */
export function scoreTrials(trials: ExerciseTrial[]): { x: number; y: number } {
  const ctx = trials.find(
    (t): t is ContextueelRadenTrial => t.exerciseSlug === "contextueel-raden"
  )!;
  const luister = trials.find(
    (t): t is LuisterEnSchrijfTrial => t.exerciseSlug === "luister-en-schrijf"
  )!;
  const split = trials.find(
    (t): t is DertigSecondenSplitTrial => t.exerciseSlug === "dertig-seconden-split"
  )!;
  const bouw = trials.find(
    (t): t is BouwDeZinTrial => t.exerciseSlug === "bouw-de-zin"
  )!;

  const xRt = responseTimeToScore(ctx.responseTimeMs);
  const xBouw = bouw.correctOrder ? -80 : 80;
  const x = clampAxis(Math.round(0.55 * xRt + 0.45 * xBouw));

  let ySplit = 0;
  if (split.choiceId === "sociaal") ySplit = 100;
  else if (split.choiceId === "solo") ySplit = -100;
  else ySplit = 0;

  const yListen = responseTimeToScore(luister.responseTimeMs);
  const y = clampAxis(Math.round(0.6 * ySplit + 0.4 * yListen));

  return { x, y };
}

/**
 * Grenzen: analytisch bij x ≤ 0, intuïtief bij x > 0; solo bij y < 0, sociaal bij y ≥ 0.
 */
export function getQuadrantFromScores(x: number, y: number): ResultaatQuadrant {
  const analytical = x <= 0;
  const solo = y < 0;
  if (analytical && solo) return "analytisch-solo";
  if (analytical && !solo) return "analytisch-sociaal";
  if (!analytical && solo) return "intuitief-solo";
  return "intuitief-sociaal";
}

export function getProfileLabel(x: number, y: number): string {
  const q = getQuadrantFromScores(x, y);
  return PROFILE_LABELS[q];
}
