"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { LuisterEnSchrijfTrial } from "@/types";
import {
  LUISTER_EN_SCHRIJF,
  normalizeAnswerNl,
} from "@/lib/assessment/content";
import { Button } from "@/components/ui/button";

type Props = {
  onComplete: (trial: LuisterEnSchrijfTrial) => void;
};

function pickNlVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const nl = voices.find(
    (v) =>
      v.lang?.toLowerCase().startsWith("nl") ||
      v.lang?.toLowerCase().includes("nl-nl")
  );
  return (
    nl ??
    voices.find((v) => v.lang?.toLowerCase().includes("nl")) ??
    null
  );
}

export function LuisterEnSchrijf({ onComplete }: Props) {
  const [value, setValue] = useState("");
  const [hasPlayed, setHasPlayed] = useState(false);
  const [locked, setLocked] = useState(false);
  const timerStartRef = useRef<number | null>(null);
  const mountRef = useRef(
    typeof performance !== "undefined" ? performance.now() : 0
  );

  const canSpeak =
    typeof window !== "undefined" &&
    typeof window.speechSynthesis !== "undefined";

  useEffect(() => {
    if (!canSpeak) return;

    const onVoices = () => {
      pickNlVoice();
    };

    onVoices();
    window.speechSynthesis.addEventListener("voiceschanged", onVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", onVoices);
    };
  }, [canSpeak]);

  const speak = useCallback(() => {
    if (!canSpeak) {
      if (timerStartRef.current === null)
        timerStartRef.current = performance.now();
      setHasPlayed(true);
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    try {
      if (synth.paused) synth.resume();
    } catch {
      /* ignore */
    }

    const u = new SpeechSynthesisUtterance(LUISTER_EN_SCHRIJF.phrase);
    u.lang = "nl-NL";
    const voice = pickNlVoice();
    if (voice) u.voice = voice;
    u.rate = 0.92;

    if (timerStartRef.current === null) {
      timerStartRef.current = performance.now();
    }
    setHasPlayed(true);

    synth.speak(u);
  }, [canSpeak]);

  const submit = useCallback(() => {
    if (locked) return;
    setLocked(true);
    if (canSpeak) window.speechSynthesis.cancel();
    const end = performance.now();
    const start = timerStartRef.current ?? mountRef.current;
    const responseTimeMs = Math.round(end - start);
    const norm = normalizeAnswerNl(value);
    const normalizedMatch = LUISTER_EN_SCHRIJF.acceptableNormalized.some(
      (a) => a === norm
    );
    onComplete({
      exerciseSlug: "luister-en-schrijf",
      responseTimeMs,
      completedAt: new Date().toISOString(),
      typedText: value.trim(),
      normalizedMatch,
      usedSpeechSynthesis: canSpeak,
    });
  }, [value, onComplete, canSpeak, locked]);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 pb-12 pt-8 sm:px-8">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Luister en schrijf
        </p>
        <p className="text-base text-muted-foreground">
          {LUISTER_EN_SCHRIJF.hintNl}
        </p>
        {canSpeak && (
          <p className="text-xs text-muted-foreground">
            Geen geluid? Controleer volumeknop en of andere tab geen audio
            blokkeert. Tik opnieuw op Luister.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="min-h-11 w-full sm:w-auto"
          disabled={locked}
          onClick={speak}
        >
          {canSpeak ? "Luister" : "Toon tekst (geen audio)"}
        </Button>
        {!canSpeak && (
          <p className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-base text-muted-foreground">
            Je browser ondersteunt geen voorleesfunctie. Dit is de zin:{" "}
            <span className="font-medium text-foreground">
              {LUISTER_EN_SCHRIJF.phrase}
            </span>
          </p>
        )}
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium">Jouw antwoord</span>
        <textarea
          value={value}
          disabled={locked}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-base shadow-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
          placeholder="Typ wat je gehoord of gelezen hebt…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </label>

      <Button
        type="button"
        size="lg"
        className="min-h-11 w-full"
        disabled={locked || !hasPlayed || !value.trim()}
        onClick={submit}
      >
        Verstuur
      </Button>
    </div>
  );
}
