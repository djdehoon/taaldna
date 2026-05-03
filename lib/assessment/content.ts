import type { ExerciseSlug } from "@/types";

export type ContextueelContent = {
  slug: ExerciseSlug;
  /** Text before the gap */
  before: string;
  /** Text after the gap */
  after: string;
  /** Zichtbare waarde per keuze (bijv. positienummer); apart van label voor duidelijke knoppen. */
  options: { id: string; label: string; value: string }[];
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

export type WoordwolkWordStyle = {
  text: string;
  /** Position + typography (fixed cloud layout) */
  className: string;
};

export type WoordwolkContent = {
  slug: ExerciseSlug;
  prompt: string;
  words: WoordwolkWordStyle[];
  options: { id: "a" | "b" | "c" | "d"; label: string; value: string }[];
};

export type LeerscenarioContent = {
  slug: ExerciseSlug;
  prompt: string;
  options: { id: "a" | "b" | "c" | "d"; label: string; emoji: string; value: string }[];
};

export const CONTEXTUEEL_RADEN: ContextueelContent = {
  slug: "contextueel-raden",
  before: "De leraar schrijft een ",
  after: " op het bord.",
  options: [
    { id: "a", value: "1", label: "woord" },
    { id: "b", value: "2", label: "vliegtuig" },
    { id: "c", value: "3", label: "appel" },
    { id: "d", value: "4", label: "oceaan" },
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
    body: "Een uur voor jezelf, kop thee, notities en koptelefoon — even helemaal niemand om je heen.",
  },
  right: {
    id: "sociaal",
    title: "Samen oefenen",
    body: "Een korte call met iemand die ook leert: hardop zinnen, lachen om fouten, meteen feedback.",
  },
};

export const BOUW_DE_ZIN: BouwDeZinContent = {
  slug: "bouw-de-zin",
  correctTokens: ["Zet", "de", "onderdelen", "in", "deze", "volgorde", "."],
};

export const WOORDWOLK: WoordwolkContent = {
  slug: "woordwolk",
  prompt: "Je ziet deze woorden voor het eerst. Wat doe je als eerste?",
  words: [
    { text: "kalo", className: "left-[6%] top-[8%] text-lg font-semibold" },
    { text: "miren", className: "right-[10%] top-[6%] text-sm opacity-90" },
    { text: "sova", className: "left-[22%] top-[28%] text-2xl font-bold" },
    { text: "telu", className: "right-[18%] top-[22%] text-base" },
    { text: "brani", className: "left-[8%] top-[48%] text-xl" },
    { text: "vespo", className: "right-[6%] top-[42%] text-lg font-medium" },
    { text: "lidor", className: "left-[38%] top-[12%] text-sm" },
    { text: "canto", className: "right-[32%] top-[52%] text-2xl font-semibold" },
    { text: "felu", className: "left-[48%] top-[38%] text-base opacity-95" },
    { text: "marka", className: "right-[40%] top-[14%] text-xl font-bold" },
    { text: "soven", className: "left-[14%] bottom-[18%] text-lg" },
    { text: "tiral", className: "right-[12%] bottom-[12%] text-sm font-semibold" },
  ],
  options: [
    {
      id: "a",
      value: "A",
      label: "Ik zoek naar patronen en overeenkomsten tussen de woorden",
    },
    {
      id: "b",
      value: "B",
      label: "Ik klik op de woorden die me het meest aanspreken qua klank",
    },
    {
      id: "c",
      value: "C",
      label: "Ik probeer de betekenis te raden op basis van hoe ze klinken",
    },
    {
      id: "d",
      value: "D",
      label: "Ik schrijf ze op en probeer ze systematisch te onthouden",
    },
  ],
};

export const LEERSCENARIO: LeerscenarioContent = {
  slug: "leerscenario",
  prompt:
    "Je hebt vanavond 20 minuten om je taal te oefenen. Wat doe je het liefst?",
  options: [
    {
      id: "a",
      value: "A",
      label: "Een app gebruiken — lekker op mijn eigen tempo",
      emoji: "📱",
    },
    {
      id: "b",
      value: "B",
      label: "Een taalpartner bellen of appen",
      emoji: "📞",
    },
    {
      id: "c",
      value: "C",
      label: "Een les of video kijken en aantekeningen maken",
      emoji: "🎬",
    },
    {
      id: "d",
      value: "D",
      label: "Een gesprek oefenen via een AI of chatbot",
      emoji: "🤖",
    },
  ],
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
