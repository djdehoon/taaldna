/** Per vergelijk-route in-/uitschakelbaar voor “Binnenkort beschikbaar” i.p.v. link. */
export const VERGELIJK_TAALDNA_NAV_ENABLED = true;

export function isVergelijkComparisonNavEnabled(href: string): boolean {
  if (href.includes("/vergelijk/taaldna")) return VERGELIJK_TAALDNA_NAV_ENABLED;
  return true;
}
