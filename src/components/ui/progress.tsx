import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  tone?: "primary" | "emerald" | "sky" | "amber" | "violet" | "rose" | "orange" | "pink";
  size?: "sm" | "md" | "lg";
  showShine?: boolean;
}

const toneClass: Record<NonNullable<ProgressProps["tone"]>, string> = {
  primary: "bg-primary",
  emerald: "bg-emerald",
  sky: "bg-sky",
  amber: "bg-amber",
  violet: "bg-violet",
  rose: "bg-rose",
  orange: "bg-orange",
  pink: "bg-pink",
};

export function Progress({
  value,
  max = 100,
  tone = "primary",
  size = "md",
  showShine = false,
  className,
  ...props
}: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(max, 1)) * 100));
  const height = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-surface-muted",
        height,
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500 ease-out",
          toneClass[tone],
        )}
        style={{ width: `${pct}%` }}
      />
      {showShine ? (
        <div className="pointer-events-none absolute inset-0 shine rounded-full opacity-60" />
      ) : null}
    </div>
  );
}
