import type { ExerciseSlug } from "@/types";

export type ContextueelContent = {
  slug: ExerciseSlug;
  /** Text before the gap */
  before: string;
  /** Text after the gap */
  after: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
};

export type LuisterContent = {
  slug: ExerciseSlug;
  /** Phrase read aloud (TTS) */
  phrase: string;
  /** Normalized acceptable answers (lowercase, trimmed) */
  acceptableNormalized: string[];
  hintNl: string;
};

export type SplitScenario = {
  id: "solo" | "sociaal";
  title: string;
  body: string;
};

export type SplitContent = {
  slug: ExerciseSlug;
  prompt: string;
  left: SplitScenario;
  right: SplitScenario;
};

export type BouwDeZinContent = {
  slug: ExerciseSlug;
  /** Correct token order (sentence) */
  correctTokens: string[];
};

export const CONTEXTUEEL_RADEN: ContextueelContent = {
  slug: "contextueel-raden",
  before: "Ze nam een grote hap van het warme ",
  after: " en proefde kaneel en appel.",
  options: [
    { id: "a", label: "gebak" },
    { id: "b", label: "soep" },
    { id: "c", label: "brood" },
    { id: "d", label: "ijs" },
  ],
  correctOptionId: "a",
};

export const LUISTER_EN_SCHRIJF: LuisterContent = {
  slug: "luister-en-schrijf",
  phrase: "De trein vertrekt over vijf minuten van spoor twee.",
  acceptableNormalized: [
    "de trein vertrekt over vijf minuten van spoor twee",
    "de trein vertrekt over 5 minuten van spoor twee",
  ],
  hintNl: "Typ wat je hoort. Hoofdletters en leestekens mogen, maar tellen niet mee.",
};

export const DERTIG_SECONDEN_SPLIT: SplitContent = {
  slug: "dertig-seconden-split",
  prompt: "Welke situatie voelt het meest als jouw ideale leermoment?",
  left: {
    id: "solo",
    title: "Rust thuis",
    body: "Een uur voor jezelf, kop thee, woordenlijst en koptelefoon — even helemaal niemand om je heen.",
  },
  right: {
    id: "sociaal",
    title: "Samen oefenen",
    body: "Een korte call met iemand die ook leert: hardop zinnen, lachen om fouten, meteen feedback.",
  },
};

export const BOUW_DE_ZIN: BouwDeZinContent = {
  slug: "bouw-de-zin",
  correctTokens: ["Ik", "wil", "vandaag", "Spaans", "oefenen", "."],
};

/** Fisher–Yates shuffle (copy). */
export function shuffleTokens<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function normalizeAnswerNl(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
