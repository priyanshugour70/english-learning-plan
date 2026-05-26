"use client";

import * as React from "react";

import { useLocalState } from "@/hooks/use-local-state";
import type { UserSettings } from "@/types";

const KEY = "settings";

const DEFAULT_SETTINGS: UserSettings = {
  name: "",
  goal: "Speak comfortable English in meetings, interviews and day-to-day life.",
  dailyTimeMinutes: 25,
  reminderHour: 19,
  theme: "system",
  onboardingCompletedAt: null,
};

interface SettingsContextValue {
  settings: UserSettings;
  hydrated: boolean;
  update: (patch: Partial<UserSettings>) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

const SettingsContext = React.createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings, hydrated] = useLocalState<UserSettings>(
    KEY,
    DEFAULT_SETTINGS,
    { normalize: (s) => ({ ...DEFAULT_SETTINGS, ...s }) },
  );

  const update = React.useCallback(
    (patch: Partial<UserSettings>) => {
      setSettings((prev) => ({ ...prev, ...patch }));
    },
    [setSettings],
  );

  const completeOnboarding = React.useCallback(() => {
    update({ onboardingCompletedAt: new Date().toISOString() });
  }, [update]);

  const reset = React.useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, [setSettings]);

  const value = React.useMemo<SettingsContextValue>(
    () => ({ settings, hydrated, update, completeOnboarding, reset }),
    [settings, hydrated, update, completeOnboarding, reset],
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
