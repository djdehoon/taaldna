import type { LucideIcon } from "lucide-react";
import { BarChart3, Binoculars, Compass, Link2 } from "lucide-react";
import type { ResultaatQuadrant } from "@/lib/resultaat/scoreTrials";

export type ProfileRoleMetaEntry = {
  displayName: string;
  axes: string;
  description: string;
  Icon: LucideIcon;
  /** Achtergrond van het icoon-vlak (Tailwind) */
  iconBoxClass: string;
  /** Kleur van het Lucide-icoon (currentColor) */
  iconClass: string;
};

export const PROFILE_ROLE_META: Record<ResultaatQuadrant, ProfileRoleMetaEntry> = {
  "intuitief-sociaal": {
    displayName: "De Avonturier",
    axes: "Intuïtief + Sociaal",
    description: "Leert via gesprekken en immersie.",
    Icon: Compass,
    iconBoxClass: "bg-sky-500/15",
    iconClass: "text-sky-600",
  },
  "analytisch-sociaal": {
    displayName: "De Verbinder",
    axes: "Analytisch + Sociaal",
    description: "Combineert structuur met contact.",
    Icon: Link2,
    iconBoxClass: "bg-violet-500/15",
    iconClass: "text-violet-600",
  },
  "intuitief-solo": {
    displayName: "De Ontdekker",
    axes: "Intuïtief + Solo",
    description: "Leert op eigen tempo via context.",
    Icon: Binoculars,
    iconBoxClass: "bg-amber-500/15",
    iconClass: "text-amber-700",
  },
  "analytisch-solo": {
    displayName: "De Systematicus",
    axes: "Analytisch + Solo",
    description: "Leert via herhaling en structuur.",
    Icon: BarChart3,
    iconBoxClass: "bg-emerald-500/15",
    iconClass: "text-emerald-700",
  },
};

/** Vaste volgorde voor UI-lijsten (o.a. ProfileRolesSection). */
export const PROFILE_ROLE_ORDER: ResultaatQuadrant[] = [
  "intuitief-sociaal",
  "analytisch-sociaal",
  "intuitief-solo",
  "analytisch-solo",
];
