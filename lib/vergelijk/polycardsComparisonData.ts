export const polycardsPageTitle = "PolyCards vs. andere flashcard-apps";

export const polycardsPageSubtitle =
  "Een eerlijke vergelijking — PolyCards is nieuw en nog in ontwikkeling";

export const polycardsColumnLabels = [
  "PolyCards",
  "Duolingo",
  "Anki",
  "Quizlet",
  "Babbel",
  "Memrise",
] as const;

/**
 * Sterrenvergelijking: volgorde op relevantie voor taal/flashcard-gebruikers (niet op PolyCards-score).
 * SRS, leer-doel, Content (kwaliteit & omvang), taal, platform, mobiel, design, prijs, community, retentie, vertrouwen.
 */
export const polycardsStarRows: { criterion: string; scores: number[] }[] = [
  { criterion: "🧠 SRS algoritme (kwaliteit)", scores: [5, 3, 5, 2, 2, 3] },
  { criterion: "🎯 Focus op taallerenden", scores: [4, 4, 3, 3, 5, 4] },
  {
    criterion: "📚 Content (kwaliteit & omvang)",
    scores: [2, 5, 5, 5, 4, 4],
  },
  { criterion: "🌍 Taalondersteuning", scores: [3, 4, 5, 4, 3, 4] },
  {
    criterion: "🌐 Platformonafhankelijk",
    scores: [5, 4, 3, 4, 3, 3],
  },
  { criterion: "📱 Mobiele app", scores: [4, 5, 4, 5, 5, 5] },
  { criterion: "🎨 Design & gebruiksgemak", scores: [3, 5, 2, 4, 5, 4] },
  { criterion: "🆓 Gratis basisversie", scores: [5, 3, 5, 3, 1, 3] },
  { criterion: "👥 Community & kant-en-klare decks", scores: [1, 5, 5, 5, 2, 4] },
  { criterion: "🔔 Notificaties & retentie", scores: [2, 5, 3, 3, 4, 4] },
  { criterion: "🏆 Track record & vertrouwen", scores: [1, 5, 5, 4, 4, 4] },
];

/** Gemiddelde sterren per kolom over alle rijen in `polycardsStarRows` (afgerond op 1 decimaal). */
const polycardsAveragesUnsorted: { label: string; value: number }[] = [
  { label: "PolyCards", value: 3.2 },
  { label: "Duolingo", value: 4.4 },
  { label: "Anki", value: 4.1 },
  { label: "Quizlet", value: 3.8 },
  { label: "Babbel", value: 3.5 },
  { label: "Memrise", value: 3.8 },
];

/** Aflopend op gemiddelde; bij gelijke score alfabetisch (nl). */
export const polycardsAverages: { label: string; value: number }[] = [
  ...polycardsAveragesUnsorted,
].sort(
  (a, b) => b.value - a.value || a.label.localeCompare(b.label, "nl")
);

export const polycardsHonestCards: { title: string; body: string }[] = [
  {
    title: "📱 Duolingo & Babbel",
    body: "Veel betere mobiele apps met miljoenen gebruikers en jarenlange UX-optimalisatie.",
  },
  {
    title: "🧠 Anki",
    body: "Het gouden standaard SRS-algoritme, battle-tested door miljoenen gebruikers wereldwijd.",
  },
  {
    title: "👥 Quizlet & Memrise",
    body: "Enorme community met kant-en-klare decks voor elke taal en elk niveau.",
  },
  {
    title: "🔔 Duolingo",
    body: "Retentie en gamification op een niveau dat wij nog niet hebben.",
  },
];

export const polycardsHonestFootnote =
  "PolyCards is in mei 2026 gestart. Op dit moment winnen de grote apps op bijna alle fronten. Ons voordeel zit in wat we bouwen — niet in wat we al hebben.";

export const polycardsUspCards: { title: string; body: string }[] = [
  {
    title: "🧠 SRS-algoritme",
    body: "Spaced repetition op basis van meerdere wetenschappelijke theorieën.",
  },
  {
    title: "🎯 Focus op taallerenden",
    body: "Specifiek ontworpen voor taalverwerving.",
  },
  {
    title: "🌐 Platformonafhankelijk",
    body: "Werkt in elke browser, geen installatie nodig.",
  },
  {
    title: "🆓 Volledig gratis",
    body: "Geen premium muur, geen advertenties.",
  },
  {
    title: "✏️ Eigen decks in elke taal",
    body: "Jij bepaalt wat je leert.",
  },
];

export const polycardsRoadmap: { icon: string; label: string }[] = [
  { icon: "🔔", label: "Slimme notificaties (Q3 2026)" },
  { icon: "📱", label: "Mobiele app (Q4 2026)" },
  { icon: "🌍", label: "Meer talen (doorlopend)" },
  { icon: "👥", label: "Gedeelde decks (Q3 2026)" },
];

export const polycardsProfileMatch: {
  emoji: string;
  name: string;
  apps: string;
  note?: string;
}[] = [
  {
    emoji: "🧭",
    name: "De Avonturier",
    apps: "Duolingo, HelloTalk, Tandem",
  },
  {
    emoji: "🔗",
    name: "De Verbinder",
    apps: "Babbel, PolyCards, Busuu",
  },
  {
    emoji: "🔍",
    name: "De Ontdekker",
    apps: "PolyCards, LingQ, Memrise",
  },
  {
    emoji: "📊",
    name: "De Systematicus",
    apps: "Anki ★, PolyCards, Busuu",
    note: "Anki is onze top pick voor dit profiel — daar zijn we eerlijk over.",
  },
];

export const polycardsDisclaimer =
  "PolyCards is gemaakt door hetzelfde team als TaalDNA.";

export const polycardsExternalUrl = "https://polycards-next.vercel.app";

/** Zet op true wanneer de externe “Probeer gratis”-link weer actief mag. */
export const polycardsGratisCtaEnabled = false;
