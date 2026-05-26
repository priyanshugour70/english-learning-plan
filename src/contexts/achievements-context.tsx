"use client";

import * as React from "react";
import useSWR from "swr";

import { ACHIEVEMENTS as STATIC_ACHIEVEMENTS } from "@/data/achievements";
import { fetcher } from "@/lib/api";
import type { AchievementDef } from "@/types";

import { useAuth } from "./auth-context";

interface AchievementsResponse {
  achievements: AchievementDef[];
}

interface AchievementsContextValue {
  achievements: AchievementDef[];
  loading: boolean;
}

const AchievementsContext =
  React.createContext<AchievementsContextValue | null>(null);

export function AchievementsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { data, isLoading } = useSWR<AchievementsResponse>(
    user ? "/api/achievements" : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30 * 60_000,
      shouldRetryOnError: false,
    },
  );

  // Use the static catalog as a stable fallback while the API loads.
  const achievements = data?.achievements ?? STATIC_ACHIEVEMENTS;

  const value = React.useMemo<AchievementsContextValue>(
    () => ({ achievements, loading: isLoading }),
    [achievements, isLoading],
  );

  return (
    <AchievementsContext.Provider value={value}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const ctx = React.useContext(AchievementsContext);
  if (!ctx)
    throw new Error(
      "useAchievements must be used within AchievementsProvider",
    );
  return ctx;
}
