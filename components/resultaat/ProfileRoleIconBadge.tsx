"use client";

import type { ResultaatQuadrant } from "@/lib/resultaat/scoreTrials";
import { PROFILE_ROLE_META } from "@/lib/resultaat/profileRoleMeta";
import { cn } from "@/lib/utils";

type Props = {
  quadrant: ResultaatQuadrant;
  size?: "sm" | "md";
  className?: string;
};

export function ProfileRoleIconBadge({ quadrant, size = "md", className }: Props) {
  const { Icon, iconBoxClass, iconClass } = PROFILE_ROLE_META[quadrant];
  const boxSize = size === "sm" ? "h-8 w-8 rounded-lg" : "h-9 w-9 rounded-lg";
  const iconSize = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        boxSize,
        iconBoxClass,
        className
      )}
      aria-hidden
    >
      <Icon className={cn(iconSize, iconClass)} strokeWidth={2} />
    </span>
  );
}
