"use client";

type Props = {
  stepIndex: number;
  totalSteps: number;
};

export function AssessmentProgress({ stepIndex, totalSteps }: Props) {
  const current = Math.min(stepIndex + 1, totalSteps);
  const pct = (current / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-lg flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Oefening {current} van {totalSteps}
          </span>
          <span>TaalDNA</span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
