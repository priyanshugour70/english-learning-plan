"use client";

import { useProgress } from "@/contexts/progress-context";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";

export function StreakCalendar({ days = 21 }: { days?: number }) {
  const { state } = useProgress();
  const active = new Set(state.activeDays);

  const today = new Date();
  const cells = Array.from({ length: days }, (_, i) => {
    const d = subDays(today, days - 1 - i);
    const key = format(d, "yyyy-MM-dd");
    return { d, key, active: active.has(key) };
  });

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm font-semibold text-foreground">Last {days} days</div>
          <div className="text-xs text-muted-foreground">
            Tiny squares = practice days
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground">
          {state.activeDays.length} active days total
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map(({ key, d, active }) => (
          <div
            key={key}
            title={format(d, "EEE, MMM d")}
            className={cn(
              "aspect-square rounded-md transition-colors",
              active
                ? "bg-primary"
                : "bg-surface-muted hover:bg-surface-hover",
            )}
          />
        ))}
      </div>
    </div>
  );
}
