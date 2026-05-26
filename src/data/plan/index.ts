import type { Plan, PlanDay, PlanMonth, PlanWeek } from "@/types";
import { month1 } from "./month-1";
import { month2 } from "./month-2";
import { month3 } from "./month-3";
import { month4 } from "./month-4";
import { month5 } from "./month-5";
import { month6 } from "./month-6";

export const PLAN: Plan = [month1, month2, month3, month4, month5, month6];

export const TOTAL_MONTHS = PLAN.length;
export const TOTAL_WEEKS = PLAN.reduce((acc, m) => acc + m.weeks.length, 0);
export const TOTAL_DAYS = PLAN.reduce(
  (acc, m) => acc + m.weeks.reduce((wAcc, w) => wAcc + w.days.length, 0),
  0,
);
export const TOTAL_TASKS = PLAN.reduce(
  (acc, m) =>
    acc +
    m.weeks.reduce(
      (wAcc, w) => wAcc + w.days.reduce((dAcc, d) => dAcc + d.tasks.length, 0),
      0,
    ),
  0,
);

export const TOTAL_XP = PLAN.reduce(
  (acc, m) =>
    acc +
    m.weeks.reduce(
      (wAcc, w) =>
        wAcc +
        w.days.reduce(
          (dAcc, d) => dAcc + d.tasks.reduce((tAcc, t) => tAcc + t.xp, 0),
          0,
        ),
      0,
    ),
  0,
);

export function getMonth(monthIndex: number): PlanMonth | undefined {
  return PLAN.find((m) => m.index === monthIndex);
}

export function getWeek(monthIndex: number, weekIndex: number): PlanWeek | undefined {
  return getMonth(monthIndex)?.weeks.find((w) => w.index === weekIndex);
}

export function getDay(
  monthIndex: number,
  weekIndex: number,
  dayIndex: number,
): PlanDay | undefined {
  return getWeek(monthIndex, weekIndex)?.days.find((d) => d.index === dayIndex);
}

export function getAllTasks() {
  return PLAN.flatMap((m) =>
    m.weeks.flatMap((w) =>
      w.days.flatMap((d) =>
        d.tasks.map((t) => ({
          task: t,
          monthIndex: m.index,
          weekIndex: w.index,
          dayIndex: d.index,
        })),
      ),
    ),
  );
}

export function getTaskById(id: string) {
  for (const m of PLAN) {
    for (const w of m.weeks) {
      for (const d of w.days) {
        const t = d.tasks.find((x) => x.id === id);
        if (t) {
          return { task: t, monthIndex: m.index, weekIndex: w.index, dayIndex: d.index };
        }
      }
    }
  }
  return undefined;
}

export function monthTaskIds(monthIndex: number): string[] {
  return (
    getMonth(monthIndex)?.weeks.flatMap((w) =>
      w.days.flatMap((d) => d.tasks.map((t) => t.id)),
    ) ?? []
  );
}

export function weekTaskIds(monthIndex: number, weekIndex: number): string[] {
  return (
    getWeek(monthIndex, weekIndex)?.days.flatMap((d) =>
      d.tasks.map((t) => t.id),
    ) ?? []
  );
}

export function dayTaskIds(
  monthIndex: number,
  weekIndex: number,
  dayIndex: number,
): string[] {
  return getDay(monthIndex, weekIndex, dayIndex)?.tasks.map((t) => t.id) ?? [];
}
