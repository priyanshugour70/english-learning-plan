"use client";

import * as React from "react";
import { ThemeProvider } from "@/contexts/theme-context";
import { SettingsProvider } from "@/contexts/settings-context";
import { ProgressProvider } from "@/contexts/progress-context";
import { VocabularyProvider } from "@/contexts/vocabulary-context";
import { JournalProvider } from "@/contexts/journal-context";
import { RecordingsProvider } from "@/contexts/recordings-context";
import { ToastProvider } from "@/contexts/toast-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SettingsProvider>
          <ProgressProvider>
            <VocabularyProvider>
              <JournalProvider>
                <RecordingsProvider>{children}</RecordingsProvider>
              </JournalProvider>
            </VocabularyProvider>
          </ProgressProvider>
        </SettingsProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
