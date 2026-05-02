import type { ResultaatQuadrant } from "@/lib/resultaat/scoreTrials";

export type ResultaatAppPick = {
  name: string;
  taglineNl: string;
  whyNl: string;
};

const RECO: Record<ResultaatQuadrant, [ResultaatAppPick, ResultaatAppPick, ResultaatAppPick]> = {
  "analytisch-solo": [
    {
      name: "Anki",
      taglineNl: "Flashcards op jouw tempo",
      whyNl:
        "Jij werkt graag zelfstandig en gestructureerd. Anki past bij wie regelmaat en controle wil over elk woord.",
    },
    {
      name: "Babbel",
      taglineNl: "Duidelijke lessen, stap voor stap",
      whyNl:
        "Heldere uitleg en vaste opbouw sluiten aan bij een analytische aanpak — zonder sociale druk.",
    },
    {
      name: "Pimsleur",
      taglineNl: "Audio-first, ritme en herhaling",
      whyNl:
        "Als je ook sterk bent in luisteren, helpt korte audio om je systeem te versterken — ideaal in je eigen tijd.",
    },
  ],
  "analytisch-sociaal": [
    {
      name: "Babbel",
      taglineNl: "Structuur die je deelt",
      whyNl:
        "Je combineert graag duidelijke regels met contact. Babbel geeft houvast; jij zoekt daarnaast mensen om mee te oefenen.",
    },
    {
      name: "italki",
      taglineNl: "Echte gesprekken, echte feedback",
      whyNl:
        "Voor wie sociaal wil leren én precies wil weten wat er beter kan: docenten en taalpartners op afroep.",
    },
    {
      name: "Duolingo",
      taglineNl: "Korte blokjes, lichte druk",
      whyNl:
        "Een vrolijke routine om dagelijks bij te blijven — handig naast gestructureerde lessen.",
    },
  ],
  "intuitief-solo": [
    {
      name: "Pimsleur",
      taglineNl: "Meeluisteren en meepraten",
      whyNl:
        "Jij pikt taal op via klank en ritme. Audio-lessen passen bij wie intuïtief leert, in stilte of onderweg.",
    },
    {
      name: "Duolingo",
      taglineNl: "Spelachtig, veel variatie",
      whyNl:
        "Korte opdrachten en verrassingen houden je flow — goed als je niet te lang wilt plannen.",
    },
    {
      name: "Anki",
      taglineNl: "Eigen deck, eigen tempo",
      whyNl:
        "Als je tóch woorden wilt verankeren, bouw je zelf setjes — zonder sociale verplichting.",
    },
  ],
  "intuitief-sociaal": [
    {
      name: "Duolingo",
      taglineNl: "Sociaal en lichtvoetig",
      whyNl:
        "Intuïtieve én sociale leerders houden vaak van korte, speelse sessies — met leagues en vrienden als extra prikkel.",
    },
    {
      name: "italki",
      taglineNl: "Praten met mensen",
      whyNl:
        "Niets vervangt een echt gesprek. italki past bij wie energie haalt uit anderen en tegelijk wil groeien.",
    },
    {
      name: "Pimsleur",
      taglineNl: "Snel aan de praat",
      whyNl:
        "Oefenen in zinnen en uitspreken helpt je vertrouwen voor die volgende call of les.",
    },
  ],
};

export function getRecommendationsForQuadrant(q: ResultaatQuadrant): ResultaatAppPick[] {
  return RECO[q];
}

/** Korte, positieve beschrijving per profiel (2–3 zinnen). */
export const PROFILE_DESCRIPTION_NL: Record<ResultaatQuadrant, string> = {
  "analytisch-solo":
    "Je bouwt taal het liefst rustig op: regels, herhaling en controle. Dat is geen traagheid — het is zorgvuldigheid. Gebruik tools die structuur geven en je rust laten focussen.",
  "analytisch-sociaal":
    "Je denkt graag na én wilt het resultaat delen met anderen. Je combineert helderheid met verbinding. Zoek platforms waar je zowel kunt studeren als écht met mensen praat.",
  "intuitief-solo":
    "Je voelt taal vaak sneller dan je het uitlegt — en dat mag. Je leert goed door te horen, te proberen en te spelen. Kies vormen die je nieuwsgierig houden zonder druk.",
  "intuitief-sociaal":
    "Je komt los als er mensen bij zijn: humor, fouten maken, samen vooruit. Dat is een kracht. Mix lichte apps met echte gesprekken en je blijft gemotiveerd.",
};
