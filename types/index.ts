/** Interactive assessment exercise identifiers. */
export type ExerciseSlug =
  | "contextueel-raden"
  | "luister-en-schrijf"
  | "dertig-seconden-split"
  | "bouw-de-zin"
  | "woordwolk"
  | "leerscenario";

export type ProcessingAxisHint = "analytisch" | "intuitief" | "auditief";
export type SocialAxisHint = "solo" | "sociaal";

export interface Exercise {
  id: string;
  slug: ExerciseSlug;
  titleNl: string;
  descriptionNl: string;
  order: 1 | 2 | 3 | 4 | 5 | 6;
  /** Optional hints for analytics / scoring (behaviour, not self-report). */
  measuresProcessing?: ProcessingAxisHint;
  measuresSocial?: SocialAxisHint;
}

/** Raw or normalised metrics captured while the user completes one exercise. */
export interface ExerciseSnapshot {
  exerciseId: string;
  startedAt: string;
  completedAt?: string;
  metrics?: Record<string, number | string | boolean>;
}

/** Outcome of a completed assessment session (2D profile inputs). */
export interface AssessmentResult {
  id: string;
  /** -1 (analytisch) … +1 (intuïtief) */
  axisProcessing: number;
  /** -1 (solo) … +1 (sociaal) */
  axisSocial: number;
  completedAt: string;
  exerciseSnapshots?: ExerciseSnapshot[];
}

export type ProcessingStyleLabel = "analytisch" | "intuitief" | "gebalanceerd";
export type SocialStyleLabel = "solo" | "sociaal" | "gebalanceerd";

/** Derived profile for display after assessment. */
export interface UserProfile {
  id: string;
  assessmentResultId: string;
  processingStyle: ProcessingStyleLabel;
  socialStyle: SocialStyleLabel;
  quadrantLabelNl: string;
  summaryNl: string;
}

export type AppId =
  | "duolingo"
  | "anki"
  | "pimsleur"
  | "babbel"
  | "italki";

/** Honest app recommendation tied to the user’s profile. */
export interface AppRecommendation {
  appId: AppId;
  name: string;
  taglineNl: string;
  whyNl: string;
  fitScore?: number;
  profileTags?: string[];
}

/** Recorded outcome of one assessment exercise (client-side trials). */
export type ExerciseTrialBase = {
  exerciseSlug: ExerciseSlug;
  responseTimeMs: number;
  completedAt: string;
};

export type ContextueelRadenTrial = ExerciseTrialBase & {
  exerciseSlug: "contextueel-raden";
  choiceId: string;
  choiceLabel: string;
};

export type LuisterEnSchrijfTrial = ExerciseTrialBase & {
  exerciseSlug: "luister-en-schrijf";
  typedText: string;
  normalizedMatch: boolean;
  usedSpeechSynthesis: boolean;
};

export type DertigSecondenSplitTrial = ExerciseTrialBase & {
  exerciseSlug: "dertig-seconden-split";
  choiceId: "solo" | "sociaal" | null;
  timedOut: boolean;
  secondsRemainingAtChoice?: number;
};

export type BouwDeZinTrial = ExerciseTrialBase & {
  exerciseSlug: "bouw-de-zin";
  wordOrder: string[];
  correctOrder: boolean;
};

export type AssessmentChoiceId = "a" | "b" | "c" | "d";

export type WoordwolkTrial = ExerciseTrialBase & {
  exerciseSlug: "woordwolk";
  choiceId: AssessmentChoiceId;
  choiceLabel: string;
};

export type LeerscenarioTrial = ExerciseTrialBase & {
  exerciseSlug: "leerscenario";
  choiceId: AssessmentChoiceId;
  choiceLabel: string;
};

export type ExerciseTrial =
  | ContextueelRadenTrial
  | LuisterEnSchrijfTrial
  | DertigSecondenSplitTrial
  | BouwDeZinTrial
  | WoordwolkTrial
  | LeerscenarioTrial;

/** Payload stored in localStorage under TAALDNA_ASSESSMENT_STORAGE_KEY. */
export interface AssessmentSessionPayload {
  version: 1;
  savedAt: string;
  trials: ExerciseTrial[];
}

export const TAALDNA_ASSESSMENT_STORAGE_KEY = "taaldna-assessment-trials";
