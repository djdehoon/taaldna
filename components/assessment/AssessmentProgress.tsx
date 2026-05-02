"use client";

type Props = {
  stepIndex: number;
  totalSteps: number;
};

export function AssessmentProgress({ stepIndex, totalSteps }: Props) {
  const current = Math.min(stepIndex + 1, totalSteps);
  const pct = (current / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-40 border-b border-border/40 bg-background px-6 py-3 sm:px-8">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-2">
        <div className="text-xs text-muted-foreground">
          Oefening {current} van {totalSteps}
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
