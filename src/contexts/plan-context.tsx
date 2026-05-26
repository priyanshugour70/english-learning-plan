"use client";

import * as React from "react";
import useSWR from "swr";

import { fetcher } from "@/lib/api";
import type { Plan, PlanDay, PlanMonth, PlanWeek } from "@/types";

import { useAuth } from "./auth-context";

interface PlanStats {
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalTasks: number;
  totalXp: number;
}

interface PlanApiResponse {
  plan: Plan;
  stats: PlanStats;
}

interface PlanContextValue {
  plan: Plan;
  stats: PlanStats;
  loading: boolean;
  getMonth: (monthIndex: number) => PlanMonth | undefined;
  getWeek: (monthIndex: number, weekIndex: number) => PlanWeek | undefined;
  getDay: (
    monthIndex: number,
    weekIndex: number,
    dayIndex: number,
  ) => PlanDay | undefined;
  getTaskById: (id: string) => {
    task: PlanDay["tasks"][number];
    monthIndex: number;
    weekIndex: number;
    dayIndex: number;
  } | undefined;
  monthTaskIds: (monthIndex: number) => string[];
  weekTaskIds: (monthIndex: number, weekIndex: number) => string[];
  dayTaskIds: (
    monthIndex: number,
    weekIndex: number,
    dayIndex: number,
  ) => string[];
}

const EMPTY_PLAN: Plan = [];
const EMPTY_STATS: PlanStats = {
  totalMonths: 0,
  totalWeeks: 0,
  totalDays: 0,
  totalTasks: 0,
  totalXp: 0,
};

const PlanContext = React.createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { data, isLoading } = useSWR<PlanApiResponse>(
    user ? "/api/plan" : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5 * 60_000,
      shouldRetryOnError: false,
    },
  );

  const plan = data?.plan ?? EMPTY_PLAN;
  const stats = data?.stats ?? EMPTY_STATS;

  const value = React.useMemo<PlanContextValue>(() => {
    const getMonth = (monthIndex: number) =>
      plan.find((m) => m.index === monthIndex);
    const getWeek = (monthIndex: number, weekIndex: number) =>
      getMonth(monthIndex)?.weeks.find((w) => w.index === weekIndex);
    const getDay = (
      monthIndex: number,
      weekIndex: number,
      dayIndex: number,
    ) => getWeek(monthIndex, weekIndex)?.days.find((d) => d.index === dayIndex);

    const getTaskById = (taskId: string) => {
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
      return undefined;
    };

    const monthTaskIds = (monthIndex: number) =>
      getMonth(monthIndex)?.weeks.flatMap((w) =>
        w.days.flatMap((d) => d.tasks.map((t) => t.id)),
      ) ?? [];

    const weekTaskIds = (monthIndex: number, weekIndex: number) =>
      getWeek(monthIndex, weekIndex)?.days.flatMap((d) =>
        d.tasks.map((t) => t.id),
      ) ?? [];

    const dayTaskIds = (
      monthIndex: number,
      weekIndex: number,
      dayIndex: number,
    ) => getDay(monthIndex, weekIndex, dayIndex)?.tasks.map((t) => t.id) ?? [];

    return {
      plan,
      stats,
      loading: isLoading,
      getMonth,
      getWeek,
      getDay,
      getTaskById,
      monthTaskIds,
      weekTaskIds,
      dayTaskIds,
    };
  }, [plan, stats, isLoading]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = React.useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
