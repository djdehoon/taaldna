import type { ResultaatQuadrant } from "@/lib/resultaat/scoreTrials";

export type SendReportTopApp = {
  name: string;
  emoji?: string;
  reasonLine: string;
  matchPercent: number;
};

export type SendReportBody = {
  email: string;
  profileName: string;
  xScore: number;
  yScore: number;
  quadrant: ResultaatQuadrant;
  profileDescription: string;
  topApps: SendReportTopApp[];
};

const QUADRANTS: ResultaatQuadrant[] = [
  "analytisch-solo",
  "analytisch-sociaal",
  "intuitief-solo",
  "intuitief-sociaal",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseSendReportBody(raw: unknown):
  | { ok: true; data: SendReportBody }
  | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Ongeldige aanvraag." };
  }
  const o = raw as Record<string, unknown>;
  const email = typeof o.email === "string" ? o.email.trim() : "";
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, error: "Vul een geldig e-mailadres in." };
  }
  const profileName =
    typeof o.profileName === "string" ? o.profileName.trim().slice(0, 120) : "";
  if (!profileName) {
    return { ok: false, error: "Profiel ontbreekt." };
  }
  const xScore = Number(o.xScore);
  const yScore = Number(o.yScore);
  if (!Number.isFinite(xScore) || xScore < -1 || xScore > 1) {
    return { ok: false, error: "Ongeldige score." };
  }
  if (!Number.isFinite(yScore) || yScore < -1 || yScore > 1) {
    return { ok: false, error: "Ongeldige score." };
  }
  const quadrant = o.quadrant;
  if (typeof quadrant !== "string" || !QUADRANTS.includes(quadrant as ResultaatQuadrant)) {
    return { ok: false, error: "Ongeldig profielkwadrant." };
  }
  const profileDescription =
    typeof o.profileDescription === "string"
      ? o.profileDescription.trim().slice(0, 4000)
      : "";
  if (!profileDescription) {
    return { ok: false, error: "Beschrijving ontbreekt." };
  }
  let topApps: SendReportTopApp[] = [];
  if (Array.isArray(o.topApps)) {
    topApps = o.topApps.slice(0, 3).map((item) => {
      if (!item || typeof item !== "object") {
        return { name: "", reasonLine: "", matchPercent: 0 };
      }
      const a = item as Record<string, unknown>;
      const name = typeof a.name === "string" ? a.name.slice(0, 80) : "";
      const reasonLine =
        typeof a.reasonLine === "string" ? a.reasonLine.slice(0, 500) : "";
      const matchPercent = Math.min(
        100,
        Math.max(0, Math.round(Number(a.matchPercent) || 0))
      );
      const emoji = typeof a.emoji === "string" ? a.emoji.slice(0, 8) : undefined;
      return { name, emoji, reasonLine, matchPercent };
    });
    topApps = topApps.filter((a) => a.name.length > 0);
  }
  return {
    ok: true,
    data: {
      email,
      profileName,
      xScore,
      yScore,
      quadrant: quadrant as ResultaatQuadrant,
      profileDescription,
      topApps,
    },
  };
}

export function safePdfFileName(profileName: string): string {
  const base =
    profileName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s\-_.]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 48)
      .replace(/^-+|-+$/g, "") || "profiel";
  return `TaalDNA-profiel-${base}.pdf`;
}
