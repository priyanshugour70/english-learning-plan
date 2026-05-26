"use client";

import * as React from "react";
import { SWRConfig } from "swr";

import { fetcher } from "@/lib/api";
import { AchievementsProvider } from "@/contexts/achievements-context";
import { AuthProvider } from "@/contexts/auth-context";
import { JournalProvider } from "@/contexts/journal-context";
import { PlanProvider } from "@/contexts/plan-context";
import { ProgressProvider } from "@/contexts/progress-context";
import { RecordingsProvider } from "@/contexts/recordings-context";
import { SettingsProvider } from "@/contexts/settings-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { ToastProvider } from "@/contexts/toast-context";
import { VocabularyProvider } from "@/contexts/vocabulary-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <ToastProvider>
        <AuthProvider>
          <SettingsProvider>
            <ThemeProvider>
              <PlanProvider>
                <ProgressProvider>
                  <AchievementsProvider>
                    <VocabularyProvider>
                      <JournalProvider>
                        <RecordingsProvider>{children}</RecordingsProvider>
                      </JournalProvider>
                    </VocabularyProvider>
                  </AchievementsProvider>
                </ProgressProvider>
              </PlanProvider>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </ToastProvider>
    </SWRConfig>
  );
}
