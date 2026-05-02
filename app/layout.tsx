import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./shadcn-tw.css";
import { APP_VERSION_LABEL } from "@/lib/app-version";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/page-transition";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const appTitle = `TaalDNA / Jouw taalleerstijl · ${APP_VERSION_LABEL}`;

export const metadata: Metadata = {
  title: appTitle,
  description:
    "Vier korte oefeningen, een helder 2D-profiel en eerlijke tips op basis van jouw gedrag — zonder lange vragenlijst.",
  openGraph: {
    title: appTitle,
    description:
      "Vier korte oefeningen, een helder 2D-profiel en eerlijke tips op basis van jouw gedrag — zonder lange vragenlijst.",
  },
  twitter: {
    card: "summary_large_image",
    title: appTitle,
    description:
      "Vier korte oefeningen, een helder 2D-profiel en eerlijke tips op basis van jouw gedrag — zonder lange vragenlijst.",
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
          "min-h-screen bg-background font-sans text-foreground antialiased"
        )}
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
