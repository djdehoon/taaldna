/**
 * App-versie voor UI (o.a. TaalDNALabel). Houd gelijk met `package.json` → `"version"` bij een release.
 * Geen import van package.json: voorkomt bundler/server-edge problemen in client-trees.
 */
export const APP_VERSION = "1.5.7" as const;

/** Korte weergave in de header; semver staat in `APP_VERSION` / package.json. */
export const APP_VERSION_LABEL = "v1.5.7" as const;
