"use client";

import * as React from "react";

import { ACHIEVEMENTS, evaluateUnlocks } from "@/data/achievements";
import { getTaskById } from "@/data/plan";
import { todayKey } from "@/lib/dates";
import { EMPTY_SKILL_XP, nextStreak } from "@/lib/gamification";
import { useLocalState } from "@/hooks/use-local-state";
import type { CompletedTaskRecord, ProgressState, SkillId } from "@/types";

const KEY = "progress";

function createDefault(): ProgressState {
  return {
    totalXp: 0,
    skillXp: { ...EMPTY_SKILL_XP },
    completedTaskIds: [],
    activeDays: [],
    history: [],
    streak: 0,
    bestStreak: 0,
    lastActiveDate: null,
    unlockedAchievementIds: [],
    startedAt: new Date().toISOString(),
  };
}

interface ProgressContextValue {
  state: ProgressState;
  hydrated: boolean;
  isTaskComplete: (taskId: string) => boolean;
  toggleTask: (
    taskId: string,
    journalCount?: number,
  ) => { unlocks: string[]; xpDelta: number } | null;
  resetAll: () => void;
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null);

function normalize(prev: ProgressState | null | undefined): ProgressState {
  const base = createDefault();
  if (!prev) return base;
  return {
    ...base,
    ...prev,
    skillXp: {
      ...base.skillXp,
      ...(prev.skillXp ?? {}),
    } as Record<SkillId, number>,
    history: prev.history ?? [],
    activeDays: prev.activeDays ?? [],
    completedTaskIds: prev.completedTaskIds ?? [],
    unlockedAchievementIds: prev.unlockedAchievementIds ?? [],
  };
}

const DEFAULT_STATE = createDefault();

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState, hydrated] = useLocalState<ProgressState>(
    KEY,
    DEFAULT_STATE,
    { normalize },
  );

  const isTaskComplete = React.useCallback(
    (taskId: string) => state.completedTaskIds.includes(taskId),
    [state.completedTaskIds],
  );

  const toggleTask = React.useCallback<ProgressContextValue["toggleTask"]>(
    (taskId, journalCount = 0) => {
      const target = getTaskById(taskId);
      if (!target) return null;

      let result: { unlocks: string[]; xpDelta: number } | null = null;

      setState((prev) => {
        const isCurrentlyDone = prev.completedTaskIds.includes(taskId);
        const now = new Date();
        const day = todayKey(now);

        if (isCurrentlyDone) {
          const xpDelta = -target.task.xp;
          const completedTaskIds = prev.completedTaskIds.filter(
            (id) => id !== taskId,
          );
          const history = prev.history.filter((h) => h.taskId !== taskId);
          const totalXp = Math.max(0, prev.totalXp + xpDelta);
          const skillXp: Record<SkillId, number> = {
            ...prev.skillXp,
            [target.task.skill]: Math.max(
              0,
              (prev.skillXp[target.task.skill] ?? 0) + xpDelta,
            ),
          };
          const days = Array.from(new Set(history.map((h) => h.date))).sort();
          const lastActiveDate = days[days.length - 1] ?? null;
          let streak = prev.streak;
          if (prev.lastActiveDate === day && !days.includes(day)) {
            streak = Math.max(0, prev.streak - 1);
          }
          const next: ProgressState = {
            ...prev,
            totalXp,
            skillXp,
            completedTaskIds,
            history,
            activeDays: days,
            lastActiveDate,
            streak,
            bestStreak: prev.bestStreak,
          };
          result = { unlocks: [], xpDelta };
          return next;
        }

        const xpDelta = target.task.xp;
        const completedTaskIds = [...prev.completedTaskIds, taskId];
        const record: CompletedTaskRecord = {
          taskId,
          monthIndex: target.monthIndex,
          weekIndex: target.weekIndex,
          dayIndex: target.dayIndex,
          skill: target.task.skill,
          xp: target.task.xp,
          date: day,
          completedAt: now.toISOString(),
        };
        const history = [...prev.history, record];
        const totalXp = prev.totalXp + xpDelta;
        const skillXp: Record<SkillId, number> = {
          ...prev.skillXp,
          [target.task.skill]:
            (prev.skillXp[target.task.skill] ?? 0) + target.task.xp,
        };
        const isNewDay =
          prev.lastActiveDate !== day && !prev.activeDays.includes(day);
        const activeDays = isNewDay
          ? [...prev.activeDays, day].sort()
          : prev.activeDays;
        const newStreak = nextStreak(
          { streak: prev.streak, lastActiveDate: prev.lastActiveDate },
          day,
        );
        const bestStreak = Math.max(prev.bestStreak, newStreak);

        const candidate: ProgressState = {
          ...prev,
          totalXp,
          skillXp,
          completedTaskIds,
          history,
          activeDays,
          lastActiveDate: day,
          streak: newStreak,
          bestStreak,
        };

        const unlocks = evaluateUnlocks({
          state: candidate,
          lastMonthIndex: target.monthIndex,
          lastHour: now.getHours(),
          journalCount,
        });
        const next = {
          ...candidate,
          unlockedAchievementIds: [
            ...candidate.unlockedAchievementIds,
            ...unlocks,
          ],
        };
        result = { unlocks, xpDelta };
        return next;
      });

      return result;
    },
    [setState],
  );

  const resetAll = React.useCallback(() => {
    setState(createDefault());
  }, [setState]);

  const value = React.useMemo<ProgressContextValue>(
    () => ({ state, hydrated, isTaskComplete, toggleTask, resetAll }),
    [state, hydrated, isTaskComplete, toggleTask, resetAll],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = React.useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

export { ACHIEVEMENTS };
