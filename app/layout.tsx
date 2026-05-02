import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./shadcn-tw.css";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/page-transition";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7c3aed",
};

export const metadata: Metadata = {
  title: "TaalDNA — Ontdek hoe jij écht talen leert",
  description:
    "Geen vragenlijst. We meten gedrag in korte oefeningen. Krijg een persoonlijk taalleerprofiel in 9 minuten.",

  openGraph: {
    title: "TaalDNA — Ontdek hoe jij écht talen leert",
    description:
      "Geen vragenlijst. We meten gedrag in korte oefeningen. Persoonlijk leerprofiel in 9 minuten.",
    url: "https://taaldna.vercel.app",
    siteName: "TaalDNA",
    images: [
      {
        url: "https://taaldna.vercel.app/og-image-landscape.png",
        width: 1200,
        height: 630,
        alt: "TaalDNA — Ontdek hoe jij écht talen leert",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TaalDNA — Ontdek hoe jij écht talen leert",
    description:
      "Geen vragenlijst. We meten gedrag in korte oefeningen. Persoonlijk leerprofiel in 9 minuten.",
    images: ["https://taaldna.vercel.app/og-image-landscape.png"],
  },

  metadataBase: new URL("https://taaldna.vercel.app"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={cn(inter.variable, "theme font-sans")}>
      <body
        className={cn(
          inter.className,
          "min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased"
        )}
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
