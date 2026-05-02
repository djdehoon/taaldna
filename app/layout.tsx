import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/page-transition";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
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
    <html lang="nl" className={cn(geistSans.variable, "theme font-sans")}>
      <body
        className={cn(
          geistSans.className,
          "min-h-screen bg-background font-sans text-foreground antialiased"
        )}
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
