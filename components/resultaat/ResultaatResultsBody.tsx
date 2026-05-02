"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { AssessmentSessionPayload } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getProfileLabel,
  getQuadrantFromScores,
  scoreTrials,
} from "@/lib/resultaat/scoreTrials";
import { PROFILE_DESCRIPTION_NL } from "@/lib/resultaat/recommendations";
import { APPS_IN_SPACE, appsWithMatches, normalizeScores } from "@/lib/resultaat/appSpace";
import { SiteKickerLink } from "@/components/layout/SiteKickerLink";
import { AxisPlot } from "@/components/resultaat/AxisPlot";
import { DimensionSection } from "@/components/resultaat/DimensionSection";
import { ExerciseInfluenceSection } from "@/components/resultaat/ExerciseInfluenceSection";
import { ProfileRolesSection } from "@/components/resultaat/ProfileRolesSection";
import { AppMatchSection } from "@/components/resultaat/AppMatchSection";
import { VergelijkToolsSection } from "@/components/resultaat/VergelijkToolsSection";

type Props = {
  payload: AssessmentSessionPayload;
};

export function ResultaatResultsBody({ payload }: Props) {
  const reduceMotion = useReducedMotion();
  const { x, y } = scoreTrials(payload.trials);
  const { ux, uy } = normalizeScores(x, y);
  const profileTitle = getProfileLabel(x, y);
  const quadrant = getQuadrantFromScores(x, y);
  const description = PROFILE_DESCRIPTION_NL[quadrant];
  const rankedApps = appsWithMatches(ux, uy);

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-10 sm:px-8 sm:py-14">
        <div className="max-w-xl">
          <SiteKickerLink className="mb-0" />
        </div>
        <motion.h1
          className="text-balance text-center text-3xl font-semibold tracking-tight sm:text-4xl"
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
          <AxisPlot x={x} y={y} apps={APPS_IN_SPACE} />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          <DimensionSection ux={ux} uy={uy} />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.13 }}
        >
          <ExerciseInfluenceSection />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.14 }}
        >
          <ProfileRolesSection activeQuadrant={quadrant} />
        </motion.div>

        <motion.p
          className="text-pretty text-base leading-relaxed text-muted-foreground"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
        >
          <AppMatchSection apps={rankedApps} />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <VergelijkToolsSection />
        </motion.div>

        <div className="flex justify-center pt-2">
          <Link
            href="/start"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            Opnieuw doen →
          </Link>
        </div>
      </div>
    </div>
  );
}
