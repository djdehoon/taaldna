import dynamic from "next/dynamic";

const ResultaatClient = dynamic(() => import("@/components/resultaat/ResultaatClient"), {
  ssr: false,
  loading: () => null,
});

export default function ResultaatPage() {
  return <ResultaatClient />;
}
