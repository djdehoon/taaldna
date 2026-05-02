import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "TaalDNA — Jouw leerstijl voor elke taal",
  description:
    "Ontdek hoe jij een taal leert — Spaans, Frans, Japans of een andere: vier korte oefeningen, een eerlijk 2D-profiel en app-tips op basis van gedrag.",
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
