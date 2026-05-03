/** Vaste wetenschapsteksten + gepersonaliseerde éénzinnen per as (NL). */

export const DIMENSION_X = {
  title: "Hoe je taal verwerkt",
  labelLeft: "Analytisch",
  labelRight: "Intuïtief",
  science: [
    "In de traditie van Andersons ACT*-theorie (1983) onderscheiden we stijlen die vooral op regels en expliciete structuur leunen, versus stijlen die patronen en blootstelling gebruiken.",
    "Analytische leerders houden van regels en volgorde; intuïtieve leerders pakken taal vaak sneller op door mee te draaien en voorbeelden te herkennen.",
  ],
  citation: "Anderson, J. R. (1983). The Architecture of Cognition.",
} as const;

export const DIMENSION_Y = {
  title: "Hoe je het liefst leert",
  labelBottom: "Solo",
  labelTop: "Sociaal",
  science: [
    "Bij Vygotsky (1978) speelt de zone van naaste ontwikkeling een centrale rol: leren gebeurt vaak het sterkst in interactie met anderen die net iets verder zijn.",
    "Sociale leerders floreren met feedback en samen oefenen; solo-leerders geven de voorkeur aan autonoom tempo en controle over hun materiaal.",
  ],
  citation: "Vygotsky, L. S. (1978). Mind in Society.",
} as const;

/** Share 0 = linkerpool, 1 = rechterpool; pct = dominantie (afstand tot midden). */
export function pctDominant(share: number): { pct: number; pole: "left" | "right" } {
  const high = Math.round(Math.max(share, 1 - share) * 100);
  return { pct: high, pole: share >= 0.5 ? "right" : "left" };
}

/** Zelfde headline als DimensionSection, op basis van ruwe as-score (-100..100). */
export function spectrumHeadlineFromRawScore(
  rawScore: number,
  labelLeft: string,
  labelRight: string,
  accentLeft: string,
  accentRight: string
): { text: string; className: string } {
  const s = Math.min(100, Math.max(-100, rawScore));
  const share = (s + 100) / 200;
  const { pct, pole } = pctDominant(share);
  const dominantLabel = pole === "right" ? labelRight : labelLeft;
  const className = pole === "right" ? accentRight : accentLeft;
  return { text: `${pct}% ${dominantLabel}`, className };
}

export function dimensionXHeadline(ux: number): { pct: number; dominantLabel: string } {
  const { pct, pole } = pctDominant(ux);
  return {
    pct,
    dominantLabel: pole === "right" ? "Intuïtief" : "Analytisch",
  };
}

export function dimensionYHeadline(uy: number): { pct: number; dominantLabel: string } {
  const { pct, pole } = pctDominant(uy);
  return {
    pct,
    dominantLabel: pole === "right" ? "Sociaal" : "Solo",
  };
}

/** Eén concrete zin voor dimensie X. */
export function personalizedLineX(ux: number): string {
  if (ux >= 0.62) {
    return "Jij pikt taal vaak op door er middenin te zitten — niet door eerst alle regels te spellen.";
  }
  if (ux <= 0.38) {
    return "Jij werkt taal het liefst stap voor stap: structuur en regels geven je houvast.";
  }
  return "Jij schakelt tussen analyseren en voelen: soms regels, soms gewoon veel voorbeelden.";
}

/** Eén concrete zin voor dimensie Y. */
export function personalizedLineY(uy: number): string {
  if (uy >= 0.62) {
    return "Je komt op gang met mensen erbij: praten, fouten maken samen, directe reacties.";
  }
  if (uy <= 0.38) {
    return "Je leert het liefst op je eigen tempo, zonder sociale druk — focus en rust eerst.";
  }
  return "Je zoekt een mix: af en toe alleen, af en toe met iemand om scherp te blijven.";
}
