"use client";

/** Laadt canvas-confetti alleen in de browser (geen statische bundel-import). */
export async function runResultsConfetti(): Promise<void> {
  const { default: confetti } = await import("canvas-confetti");
  confetti({
    particleCount: 110,
    spread: 68,
    startVelocity: 32,
    origin: { y: 0.55 },
    scalar: 0.9,
  });
}
