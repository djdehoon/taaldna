import packageJson from "../package.json";

/** Semver uit `package.json`. Bij een release: `npm version patch` (1.0.1, 1.0.2, …) of handmatig verhogen. */
export const APP_VERSION = packageJson.version;

/** Altijd met `v`-prefix, bv. `v1.0.0`. */
export const APP_VERSION_LABEL = `v${packageJson.version}`;
