import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/page-transition";

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaalDNA — Jouw leerstijl voor Nederlands",
  description:
    "Ontdek hoe jij Nederlands leert: vier korte oefeningen, een eerlijk 2D-profiel en app-aanbevelingen op basis van gedrag.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={cn(sans.variable, "theme font-sans")}>
      <body
        className={cn(
          sans.className,
          "min-h-screen bg-background font-sans text-foreground antialiased"
        )}
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
