"use client";

import * as React from "react";
import useSWR from "swr";

import { api, fetcher } from "@/lib/api";
import type { UserSettings } from "@/types";

import { useAuth } from "./auth-context";

const DEFAULT_SETTINGS: UserSettings = {
  name: "",
  goal: "Speak comfortable English in meetings, interviews and day-to-day life.",
  dailyTimeMinutes: 25,
  reminderHour: 19,
  theme: "system",
  onboardingCompletedAt: null,
};

interface SettingsResponse {
  settings: UserSettings;
}

interface SettingsContextValue {
  settings: UserSettings;
  hydrated: boolean;
  loading: boolean;
  update: (patch: Partial<UserSettings>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  reset: () => Promise<void>;
}

const SettingsContext = React.createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { data, isLoading, mutate } = useSWR<SettingsResponse>(
    user ? "/api/settings" : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  const settings = data?.settings ?? DEFAULT_SETTINGS;
  const hydrated = !!data;

  const update = React.useCallback(
    async (patch: Partial<UserSettings>) => {
      // Optimistic update
      await mutate(
        async () => {
          const next = await api<SettingsResponse>("/api/settings", {
            method: "PATCH",
            body: patch,
          });
          return next;
        },
        {
          optimisticData: data
            ? { settings: { ...data.settings, ...patch } }
            : undefined,
          rollbackOnError: true,
          revalidate: false,
        },
      );
    },
    [data, mutate],
  );

  const completeOnboarding = React.useCallback(async () => {
    await update({ onboardingCompletedAt: new Date().toISOString() });
  }, [update]);

  const reset = React.useCallback(async () => {
    await update({ ...DEFAULT_SETTINGS, onboardingCompletedAt: null });
  }, [update]);

  const value = React.useMemo<SettingsContextValue>(
    () => ({
      settings,
      hydrated,
      loading: isLoading,
      update,
      completeOnboarding,
      reset,
    }),
    [settings, hydrated, isLoading, update, completeOnboarding, reset],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = React.useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
