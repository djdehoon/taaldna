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

export const taaldnaStarRows: { criterion: string; scores: number[] }[] = [
  { criterion: "🎯 Taal-specificiteit", scores: [4, 3, 5, 4, 4, 4] },
  { criterion: "🔬 Wetenschappelijke basis", scores: [3, 2, 3, 2, 4, 2] },
  { criterion: "🎮 Interactieve oefeningen", scores: [5, 1, 1, 1, 1, 1] },
  { criterion: "🎨 Design kwaliteit", scores: [4, 5, 2, 2, 3, 2] },
  { criterion: "📱 Mobiel-vriendelijk", scores: [4, 5, 2, 2, 3, 2] },
  { criterion: "🔗 Deelbaar resultaat", scores: [4, 2, 1, 1, 1, 1] },
  { criterion: "📲 App-aanbevelingen", scores: [4, 2, 1, 2, 2, 1] },
  { criterion: "🤝 Onafhankelijkheid", scores: [4, 1, 5, 2, 2, 5] },
  { criterion: "🆓 Gratis + geen account", scores: [5, 3, 5, 4, 3, 5] },
  { criterion: "📐 2D-profiel (twee assen)", scores: [5, 1, 2, 1, 1, 1] },
  { criterion: "⏱️ Snelheid (< 10 min)", scores: [5, 4, 3, 3, 3, 4] },
  { criterion: "🏆 Track record / autoriteit", scores: [1, 5, 4, 5, 5, 3] },
  { criterion: "👥 Gebruikersbase", scores: [1, 5, 3, 4, 5, 2] },
];

export const taaldnaAverages: { label: string; value: number }[] = [
  { label: "TaalDNA", value: 3.8 },
  { label: "EF", value: 3.0 },
  { label: "J-KAV", value: 2.8 },
  { label: "Benny Lewis", value: 2.5 },
  { label: "LingQ", value: 2.9 },
  { label: "Enux VAK", value: 2.5 },
];

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
