"use client";

import * as React from "react";
import useSWR from "swr";

import { ACHIEVEMENTS } from "@/data/achievements";
import { api, fetcher } from "@/lib/api";
import { EMPTY_SKILL_XP } from "@/lib/gamification";
import type { AchievementDef, ProgressState, SkillId } from "@/types";

import { useAuth } from "./auth-context";

const DEFAULT_STATE: ProgressState = {
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

interface ProgressResponse {
  state: ProgressState;
}

interface ToggleResponse {
  state: ProgressState;
  unlocks: string[];
  xpDelta: number;
  achievements: AchievementDef[];
}

interface ProgressContextValue {
  state: ProgressState;
  hydrated: boolean;
  loading: boolean;
  isTaskComplete: (taskId: string) => boolean;
  toggleTask: (taskId: string) => Promise<ToggleResponse | null>;
  resetAll: () => Promise<void>;
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { data, isLoading, mutate } = useSWR<ProgressResponse>(
    user ? "/api/progress" : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  const state = data?.state ?? DEFAULT_STATE;
  const hydrated = !!data;

  const isTaskComplete = React.useCallback(
    (taskId: string) => state.completedTaskIds.includes(taskId),
    [state.completedTaskIds],
  );

  const toggleTask = React.useCallback<ProgressContextValue["toggleTask"]>(
    async (taskId) => {
      try {
        const res = await api<ToggleResponse>("/api/progress/toggle", {
          method: "POST",
          body: { taskId },
        });
        // Apply authoritative state from server.
        await mutate({ state: res.state }, { revalidate: false });
        return res;
      } catch (e) {
        console.error("[toggleTask]", e);
        return null;
      }
    },
    [mutate],
  );

  const resetAll = React.useCallback(async () => {
    await mutate(
      async () => {
        const res = await api<ProgressResponse>("/api/progress", {
          method: "DELETE",
        });
        return res;
      },
      { optimisticData: { state: DEFAULT_STATE }, revalidate: false },
    );
  }, [mutate]);

  // Recompute skillXp safely in case the response is from an older shape.
  const normalizedState = React.useMemo<ProgressState>(
    () => ({
      ...state,
      skillXp: { ...EMPTY_SKILL_XP, ...state.skillXp } as Record<SkillId, number>,
    }),
    [state],
  );

  const value = React.useMemo<ProgressContextValue>(
    () => ({
      state: normalizedState,
      hydrated,
      loading: isLoading,
      isTaskComplete,
      toggleTask,
      resetAll,
    }),
    [normalizedState, hydrated, isLoading, isTaskComplete, toggleTask, resetAll],
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
