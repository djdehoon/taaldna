import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./shadcn-tw.css";
import { APP_VERSION_LABEL } from "@/lib/app-version";
import { getPublicSiteUrl } from "@/lib/report/site-url";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/page-transition";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const appTitle = `TaalDNA / Jouw taalleerstijl · ${APP_VERSION_LABEL}`;

const siteUrl = getPublicSiteUrl();
const ogTitle = "TaalDNA — Ontdek hoe jij écht talen leert";
const ogDescription =
  "Krijg een persoonlijk taal leerprofiel op basis van jouw gedrag. In 9 minuten.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171717",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: appTitle,
  description:
    "Vier korte oefeningen, een helder 2D-profiel en eerlijke tips op basis van jouw gedrag — zonder lange vragenlijst.",
  appleWebApp: {
    capable: true,
    title: "TaalDNA",
    statusBarStyle: "default",
  },
  icons: {
    icon: [{ url: "/favicon-icon.png", type: "image/png" }],
    apple: [{ url: "/favicon-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: siteUrl,
    siteName: "TaalDNA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaalDNA — Jouw plek op de kaart",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: ["/og-image.png"],
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
