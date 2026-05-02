"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { motion, useReducedMotion } from "framer-motion";
import { TAALDNA_ASSESSMENT_STORAGE_KEY, type AssessmentSessionPayload } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getProfileLabel,
  getQuadrantFromScores,
  parseSessionPayload,
  scoreTrials,
} from "@/lib/resultaat/scoreTrials";
import {
  PROFILE_DESCRIPTION_NL,
  getRecommendationsForQuadrant,
} from "@/lib/resultaat/recommendations";

const svgFont: CSSProperties = {
  fontSize: 3.6,
  fontFamily:
    "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
};

function AxisPlot({ x, y }: { x: number; y: number }) {
  const cx = 50 + x / 2;
  const cy = 50 - y / 2;
  const quadrant = getQuadrantFromScores(x, y);

  return (
    <figure className="mx-auto w-full max-w-md font-sans">
      <svg
        viewBox="0 0 100 100"
        className="aspect-square w-full overflow-visible font-sans"
        role="img"
        aria-label={`Je profiel op de kaart: ${quadrant.replace("-", " en ")}.`}
      >
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          rx="4"
          fill="#0f0f1a"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.5"
        />
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        <line
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        <text x="4" y="53" fill="#ffffff" style={svgFont} className="opacity-95">
          Analytisch
        </text>
        <text x="68" y="53" fill="#ffffff" style={svgFont} className="opacity-95">
          Intuïtief
        </text>
        <text
          x="50"
          y="9"
          textAnchor="middle"
          fill="#ffffff"
          style={svgFont}
          className="opacity-95"
        >
          Sociaal
        </text>
        <text
          x="50"
          y="98"
          textAnchor="middle"
          fill="#ffffff"
          style={svgFont}
          className="opacity-95"
        >
          Solo
        </text>
        <circle cx={cx} cy={cy} r="3.5" fill="#ffffff" stroke="#ffffff" strokeWidth="0.35" />
      </svg>
      <figcaption className="mt-2 text-center font-sans text-xs text-muted-foreground">
        Horizontaal: hoe je denkt bij taal · Verticaal: hoe je graag leert met anderen
      </figcaption>
    </figure>
  );
}

function readPayloadFromStorage(): AssessmentSessionPayload | null {
  try {
    return parseSessionPayload(
      sessionStorage.getItem(TAALDNA_ASSESSMENT_STORAGE_KEY)
    );
  } catch {
    return null;
  }
}

export function ResultaatClient() {
  const reduceMotion = useReducedMotion();
  /** Alleen client-mount (page gebruikt dynamic ssr:false): direct uit sessionStorage. */
  const [payload] = useState<AssessmentSessionPayload | null>(readPayloadFromStorage);

  useEffect(() => {
    if (!payload || reduceMotion) return;
    const id = requestAnimationFrame(() => {
      confetti({
        particleCount: 110,
        spread: 68,
        startVelocity: 32,
        origin: { y: 0.55 },
        scalar: 0.9,
      });
    });
    return () => cancelAnimationFrame(id);
  }, [payload, reduceMotion]);

  if (!payload) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center gap-6 px-6 py-16 text-center font-sans">
        <h1 className="font-sans text-2xl font-semibold tracking-tight text-foreground">
          Doe eerst de test
        </h1>
        <p className="text-muted-foreground">
          We hebben nog geen resultaten voor je. Na de vier korte oefeningen zie je hier je
          persoonlijke profiel en tips.
        </p>
        <div className="flex justify-center">
          <Link href="/start" className={cn(buttonVariants({ size: "lg" }))}>
            Naar de start →
          </Link>
        </div>
      </div>
    );
  }

  const { x, y } = scoreTrials(payload.trials);
  const profileTitle = getProfileLabel(x, y);
  const quadrant = getQuadrantFromScores(x, y);
  const description = PROFILE_DESCRIPTION_NL[quadrant];
  const apps = getRecommendationsForQuadrant(quadrant);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-10 px-5 py-10 font-sans antialiased sm:px-6 sm:py-14">
      <motion.h1
        className="text-balance text-center font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {profileTitle}
      </motion.h1>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <AxisPlot x={x} y={y} />
      </motion.div>

      <motion.p
        className="text-pretty font-sans text-base leading-relaxed text-muted-foreground"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {description}
      </motion.p>

      <section className="space-y-4">
        <h2 className="font-sans text-lg font-semibold tracking-tight text-foreground">
          Drie apps die bij je passen
        </h2>
        <ul className="flex flex-col gap-3">
          {apps.map((app) => (
            <li
              key={app.name}
              className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm"
            >
              <p className="font-sans font-medium text-foreground">{app.name}</p>
              <p className="font-sans text-sm text-muted-foreground">{app.taglineNl}</p>
              <p className="mt-2 font-sans text-sm leading-snug text-foreground/90">
                {app.whyNl}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex justify-center pt-2">
        <Link href="/start" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
          Opnieuw doen →
        </Link>
      </div>
    </div>
  );
}

export default ResultaatClient;
