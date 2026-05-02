export const taaldnaPageTitle = "TaalDNA vs. andere leerstijl-tools";

export const taaldnaPageSubtitle =
  "Een eerlijke vergelijking — inclusief onze eigen zwaktes";

export const taaldnaColumnLabels = [
  "TaalDNA",
  "EF",
  "J-KAV",
  "Benny Lewis",
  "LingQ",
  "Enux VAK",
] as const;

/** Eerste kolom (index 0) = eigen product in de score-matrix. */
export const taaldnaHighlightScoreColumnIndex = 0;

/**
 * Sterren: volgorde op relevantie (methode, differentiatoren, vertrouwen, UX, toegang, features).
 * TaalDNA-kolom bewust kritischer dan eerder — nog steeds sterk op unieke punten, minder “alles vijf”.
 */
export const taaldnaStarRows: { criterion: string; scores: number[] }[] = [
  { criterion: "🔬 Wetenschappelijke basis", scores: [3, 2, 3, 2, 4, 2] },
  { criterion: "🎯 Taal-specificiteit", scores: [3, 3, 5, 4, 4, 4] },
  { criterion: "🎮 Interactieve oefeningen", scores: [4, 1, 1, 1, 1, 1] },
  { criterion: "📐 2D-profiel (twee assen)", scores: [4, 1, 2, 1, 1, 1] },
  { criterion: "🏆 Track record / autoriteit", scores: [1, 5, 4, 5, 5, 3] },
  { criterion: "👥 Gebruikersbase", scores: [1, 5, 3, 4, 5, 2] },
  { criterion: "⏱️ Snelheid (< 10 min)", scores: [4, 4, 3, 3, 3, 4] },
  { criterion: "🎨 Design kwaliteit", scores: [3, 5, 2, 2, 3, 2] },
  { criterion: "📱 Mobiel-vriendelijk", scores: [3, 5, 2, 2, 3, 2] },
  { criterion: "🆓 Gratis + geen account", scores: [4, 3, 5, 4, 3, 5] },
  { criterion: "🔗 Deelbaar resultaat", scores: [3, 2, 1, 1, 1, 1] },
  { criterion: "📲 App-aanbevelingen", scores: [3, 2, 1, 2, 2, 1] },
  { criterion: "🤝 Onafhankelijkheid", scores: [3, 1, 5, 2, 2, 5] },
];

function roundToOneDecimal(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Gemiddelde sterren per kolom over alle rijen in `taaldnaStarRows` (afgerond op 1 decimaal). */
const taaldnaAveragesUnsorted: { label: string; value: number }[] =
  taaldnaColumnLabels.map((label, colIndex) => {
    const sum = taaldnaStarRows.reduce(
      (acc, row) => acc + row.scores[colIndex],
      0
    );
    return {
      label,
      value: roundToOneDecimal(sum / taaldnaStarRows.length),
    };
  });

/**
 * Aflopend op gemiddelde; bij gelijke score eerst TaalDNA (highlight op eerste balk), daarna nl-locale op label.
 */
export const taaldnaAverages: { label: string; value: number }[] = [
  ...taaldnaAveragesUnsorted,
].sort((a, b) => {
  const dv = b.value - a.value;
  if (dv !== 0) return dv;
  if (a.label === "TaalDNA") return -1;
  if (b.label === "TaalDNA") return 1;
  return a.label.localeCompare(b.label, "nl");
});

export const taaldnaHonestCards: { title: string; body: string }[] = [
  {
    title: "🏆 EF & Benny Lewis",
    body: "Veel meer naamsbekendheid en vertrouwen door jarenlange track record.",
  },
  {
    title: "🔬 LingQ",
    body: "Wetenschappelijk sterker onderbouwd door Steve Kaufmann's input/output model.",
  },
  {
    title: "🌍 J-KAV",
    body: "Meest gedetailleerde taal-specifieke model (48 stijlen vs. onze 4).",
  },
];

export const taaldnaHonestFootnote =
  "Wij zijn eerlijk over onze beperkingen. TaalDNA is nieuw — ons voordeel zit in interactiviteit en het 2D-model, niet in autoriteit of track record.";

export const taaldnaUspCards: { title: string; body: string }[] = [
  {
    title: "🎮 Enige tool met interactieve oefeningen",
    body: "Wij meten gedrag, geen vragenlijst.",
  },
  {
    title: "📐 Enige tool met 2D-profiel",
    body: "Twee onafhankelijke assen, vier profielen.",
  },
  {
    title: "🤝 Onafhankelijk",
    body: "Eerlijke aanbevelingen, ook concurrenten.",
  },
];
