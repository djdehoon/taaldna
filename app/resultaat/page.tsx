import dynamic from "next/dynamic";

const ResultaatClient = dynamic(() => import("@/components/resultaat/ResultaatClient"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 font-sans text-sm text-muted-foreground">
      Resultaat laden…
    </div>
  ),
});

export default function ResultaatPage() {
  return <ResultaatClient />;
}
