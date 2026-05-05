"use client";

import { useRouter } from "next/navigation";

export default function ResultaatV2Page() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/resultaat");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0f0f1a] px-4">
      <button
        type="button"
        onClick={handleBack}
        className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/60 hover:bg-white/10"
      >
        ← Terug
      </button>
      <h1 className="text-3xl font-bold text-white">Resultaten</h1>
    </main>
  );
}
