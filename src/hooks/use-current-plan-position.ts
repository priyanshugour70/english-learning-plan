"use client";

import { useProgress } from "@/contexts/progress-context";
import { PLAN, dayTaskIds } from "@/data/plan";

export interface PlanPosition {
  monthIndex: number;
  weekIndex: number;
  dayIndex: number;
}

/**
 * Determine which day the user is currently on.
 * Strategy: walk the plan in order, return the first day that still has
 * incomplete tasks. If all done -> final day.
 */
export function useCurrentPlanPosition(): PlanPosition {
  const { state } = useProgress();
  const completed = new Set(state.completedTaskIds);

  for (const m of PLAN) {
    for (const w of m.weeks) {
      for (const d of w.days) {
        const ids = dayTaskIds(m.index, w.index, d.index);
        if (ids.some((id) => !completed.has(id))) {
          return { monthIndex: m.index, weekIndex: w.index, dayIndex: d.index };
        }
      }
    }
  }
  const last = PLAN[PLAN.length - 1];
  const lastW = last.weeks[last.weeks.length - 1];
  const lastD = lastW.days[lastW.days.length - 1];
  return { monthIndex: last.index, weekIndex: lastW.index, dayIndex: lastD.index };
}
