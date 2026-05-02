"use client";

import { useCallback, useState } from "react";
import type { ResultaatQuadrant } from "@/lib/resultaat/scoreTrials";
import type { AppWithMatch } from "@/lib/resultaat/appSpace";
import { cn } from "@/lib/utils";

type Props = {
  profileName: string;
  /** Ruwe scores uit scoreTrials (-100..100); worden naar -1..1 genormaliseerd voor de API. */
  xRaw: number;
  yRaw: number;
  quadrant: ResultaatQuadrant;
  profileDescription: string;
  topApps: AppWithMatch[];
};

export function EmailCaptureSection({
  profileName,
  xRaw,
  yRaw,
  quadrant,
  profileDescription,
  topApps,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submit = useCallback(async () => {
    setErrorMsg(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMsg("Vul je e-mailadres in.");
      return;
    }
    setStatus("loading");
    const payload = {
      email: trimmed,
      profileName,
      xScore: Math.min(1, Math.max(-1, xRaw / 100)),
      yScore: Math.min(1, Math.max(-1, yRaw / 100)),
      quadrant,
      profileDescription,
      topApps: topApps.slice(0, 3).map((a) => ({
        name: a.name,
        emoji: a.emoji,
        reasonLine: a.reasonLine,
        matchPercent: a.matchPercent,
      })),
    };
    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrorMsg(body.error ?? "Er ging iets mis. Probeer later opnieuw.");
        setStatus("idle");
        return;
      }
      setStatus("done");
    } catch {
      setErrorMsg("Netwerkfout. Controleer je verbinding.");
      setStatus("idle");
    }
  }, [email, profileName, xRaw, yRaw, quadrant, profileDescription, topApps]);

  if (status === "done") {
    return (
      <section
        className="rounded-xl border border-border bg-muted/30 px-4 py-5 sm:px-5"
        aria-live="polite"
      >
        <p className="text-base leading-relaxed text-foreground">
          <span aria-hidden>✅ </span>Onderweg! Check je inbox (ook spam).
        </p>
      </section>
    );
  }

  return (
    <section
      className="rounded-xl border border-border bg-card px-4 py-5 shadow-sm sm:px-5"
      aria-labelledby="email-capture-heading"
    >
      <h2
        id="email-capture-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Ontvang jouw profiel per mail
      </h2>
      <p className="mt-2 text-base leading-relaxed text-muted-foreground">
        We sturen je een samenvatting + tips voor jouw leerstijl. Geen spam.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="sr-only" htmlFor="taaldna-email-capture">
          E-mailadres
        </label>
        <input
          id="taaldna-email-capture"
          type="email"
          autoComplete="email"
          name="email"
          placeholder="jouw@email.nl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="min-h-11 w-full min-w-0 flex-1 rounded-lg border border-input bg-background px-4 text-base text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
        />
        <button
          type="button"
          disabled={status === "loading"}
          onClick={() => void submit()}
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg px-5 text-base font-medium text-white transition",
            "bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-60"
          )}
        >
          {status === "loading" ? "Bezig…" : "Stuur mijn profiel →"}
        </button>
      </div>
      {errorMsg ? (
        <p className="mt-3 text-sm text-destructive" role="alert">
          {errorMsg}
        </p>
      ) : null}
    </section>
  );
}
