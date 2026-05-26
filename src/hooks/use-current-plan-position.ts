"use client";

import { usePlan } from "@/contexts/plan-context";
import { useProgress } from "@/contexts/progress-context";

export interface PlanPosition {
  monthIndex: number;
  weekIndex: number;
  dayIndex: number;
}

/**
 * Determine which day the user is currently on.
 *
 * Strategy: walk the plan in order, return the first day that still has
 * incomplete tasks. If all are done, return the final day. If the plan
 * hasn't loaded yet, return a stable {1,1,1} so pages can render shells.
 */
export function useCurrentPlanPosition(): PlanPosition {
  const { plan, dayTaskIds } = usePlan();
  const { state } = useProgress();
  const completed = new Set(state.completedTaskIds);

  if (plan.length === 0) {
    return { monthIndex: 1, weekIndex: 1, dayIndex: 1 };
  }

  for (const m of plan) {
    for (const w of m.weeks) {
      for (const d of w.days) {
        const ids = dayTaskIds(m.index, w.index, d.index);
        if (ids.some((id) => !completed.has(id))) {
          return {
            monthIndex: m.index,
            weekIndex: w.index,
            dayIndex: d.index,
          };
        }
      }
    }
  }
  const last = plan[plan.length - 1];
  const lastW = last.weeks[last.weeks.length - 1];
  const lastD = lastW.days[lastW.days.length - 1];
  return {
    monthIndex: last.index,
    weekIndex: lastW.index,
    dayIndex: lastD.index,
  };
}
