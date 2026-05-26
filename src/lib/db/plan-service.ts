import "server-only";

import { planCol } from "./collections";
import type { Plan, PlanDay, PlanMonth, PlanWeek } from "@/types";
import { PLAN as STATIC_PLAN } from "@/data/plan";

/**
 * Read the canonical plan. Falls back to seeding from the static catalog if
 * the DB document doesn't exist yet — this keeps a brand new database usable
 * without requiring a manual `/api/seed` call.
 */
export async function getPlan(): Promise<Plan> {
  const col = await planCol();
  const doc = await col.findOne({ key: "default" });
  if (doc?.plan) return doc.plan;

  await col.updateOne(
    { key: "default" },
    {
      $set: {
        key: "default",
        plan: STATIC_PLAN,
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true },
  );
  return STATIC_PLAN;
}

export async function getMonth(monthIndex: number): Promise<PlanMonth | null> {
  const plan = await getPlan();
  return plan.find((m) => m.index === monthIndex) ?? null;
}

export async function getWeek(
  monthIndex: number,
  weekIndex: number,
): Promise<PlanWeek | null> {
  const month = await getMonth(monthIndex);
  return month?.weeks.find((w) => w.index === weekIndex) ?? null;
}

export async function getDay(
  monthIndex: number,
  weekIndex: number,
  dayIndex: number,
): Promise<PlanDay | null> {
  const week = await getWeek(monthIndex, weekIndex);
  return week?.days.find((d) => d.index === dayIndex) ?? null;
}

export async function getTaskById(taskId: string): Promise<{
  task: PlanDay["tasks"][number];
  monthIndex: number;
  weekIndex: number;
  dayIndex: number;
} | null> {
  const plan = await getPlan();
  for (const m of plan) {
    for (const w of m.weeks) {
      for (const d of w.days) {
        const t = d.tasks.find((x) => x.id === taskId);
        if (t) {
          return {
            task: t,
            monthIndex: m.index,
            weekIndex: w.index,
            dayIndex: d.index,
          };
        }
      }
    }
  }
  return null;
}

export interface PlanStats {
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalTasks: number;
  totalXp: number;
}

export async function getPlanStats(): Promise<PlanStats> {
  const plan = await getPlan();
  let weeks = 0;
  let days = 0;
  let tasks = 0;
  let xp = 0;
  for (const m of plan) {
    weeks += m.weeks.length;
    for (const w of m.weeks) {
      days += w.days.length;
      for (const d of w.days) {
        tasks += d.tasks.length;
        for (const t of d.tasks) xp += t.xp;
      }
    }
  }
  return {
    totalMonths: plan.length,
    totalWeeks: weeks,
    totalDays: days,
    totalTasks: tasks,
    totalXp: xp,
  };
}
