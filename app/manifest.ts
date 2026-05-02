import type { MetadataRoute } from "next";
import { APP_VERSION_LABEL } from "@/lib/app-version";

const appTitle = `TaalDNA / Jouw taalleerstijl · ${APP_VERSION_LABEL}`;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appTitle,
    short_name: "TaalDNA",
    description:
      "Vier korte oefeningen, een helder 2D-profiel en eerlijke tips op basis van jouw gedrag — zonder lange vragenlijst.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
