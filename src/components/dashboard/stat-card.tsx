import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon: React.ReactNode;
  accent?: "emerald" | "amber" | "violet" | "sky" | "rose" | "orange" | "pink";
}

const accentClass: Record<NonNullable<StatCardProps["accent"]>, string> = {
  emerald: "bg-emerald/10 text-emerald",
  amber: "bg-amber/15 text-amber",
  violet: "bg-violet/10 text-violet",
  sky: "bg-sky/10 text-sky",
  rose: "bg-rose/10 text-rose",
  orange: "bg-orange/10 text-orange",
  pink: "bg-pink/10 text-pink",
};

export function StatCard({ label, value, hint, icon, accent = "emerald" }: StatCardProps) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-4 sm:p-5 flex items-center gap-3">
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl flex-shrink-0",
          accentClass[accent],
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
          {value}
        </div>
        {hint ? (
          <div className="text-[11px] text-muted-foreground mt-0.5">{hint}</div>
        ) : null}
      </div>
    </div>
  );
}
