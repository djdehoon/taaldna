"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SiteKickerLink } from "@/components/layout/SiteKickerLink";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const bullets = [
  "Jouw leerstijl",
  "Welke methoden passen bij jou",
  "Welke apps helpen jou het snelst",
  "Geen goede of foute antwoorden",
] as const;

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export default function StartPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background px-6 sm:px-8">
      <div className="mx-auto w-full max-w-xl pt-10 sm:pt-14">
        <SiteKickerLink />
      </div>
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-8 pb-14 sm:pb-16">
        <motion.h1
          className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          {...fade}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Ontdek hoe jij een taal leert
        </motion.h1>

        <motion.ul
          className="flex flex-col gap-3.5 text-base leading-snug text-foreground sm:text-lg"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.07, delayChildren: 0.12 },
            },
          }}
        >
          {bullets.map((line) => (
            <motion.li
              key={line}
              className="flex gap-3 text-pretty"
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <span className="shrink-0 font-medium text-primary" aria-hidden>
                ✓
              </span>
              <span>{line}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          className="text-sm text-muted-foreground sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          ~9 minuten · Gratis · Geen account nodig
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="pt-2"
        >
          <Link
            href="/assessment"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            Begin →
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
