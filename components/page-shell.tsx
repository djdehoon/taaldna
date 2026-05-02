import Link from "next/link";
import { SiteKickerLink } from "@/components/layout/SiteKickerLink";

export function PageShell({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col gap-4 px-6 pb-14 pt-10 sm:px-8 sm:pt-14">
      <SiteKickerLink />
      <Link
        href="/"
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        ← Home
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
