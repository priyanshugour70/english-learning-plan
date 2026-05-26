"use client";

import * as React from "react";

import { todayKey } from "@/lib/dates";
import { uid } from "@/lib/utils";
import { useLocalState } from "@/hooks/use-local-state";
import type { JournalEntry } from "@/types";

const KEY = "journal";

function countWords(s: string) {
  return s.trim().length === 0 ? 0 : s.trim().split(/\s+/).length;
}

interface JournalContextValue {
  entries: JournalEntry[];
  hydrated: boolean;
  todayEntry: JournalEntry | undefined;
  upsertToday: (
    text: string,
    mood?: JournalEntry["mood"],
    prompt?: string,
  ) => JournalEntry;
  remove: (id: string) => void;
}

const JournalContext = React.createContext<JournalContextValue | null>(null);

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries, hydrated] = useLocalState<JournalEntry[]>(
    KEY,
    [],
  );

  const upsertToday = React.useCallback<JournalContextValue["upsertToday"]>(
    (text, mood, prompt) => {
      const day = todayKey();
      const now = new Date().toISOString();
      let resultEntry: JournalEntry | null = null;
      setEntries((prev) => {
        const idx = prev.findIndex((e) => e.date === day);
        const wordCount = countWords(text);
        if (idx >= 0) {
          const merged: JournalEntry = {
            ...prev[idx],
            text,
            wordCount,
            mood: mood ?? prev[idx].mood,
            prompt: prompt ?? prev[idx].prompt,
            updatedAt: now,
          };
          const next = [...prev];
          next[idx] = merged;
          resultEntry = merged;
          return next;
        }
        const fresh: JournalEntry = {
          id: uid("j"),
          date: day,
          text,
          mood,
          prompt,
          wordCount,
          createdAt: now,
          updatedAt: now,
        };
        resultEntry = fresh;
        return [fresh, ...prev];
      });
      return resultEntry as unknown as JournalEntry;
    },
    [setEntries],
  );

  const remove = React.useCallback(
    (id: string) => {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    },
    [setEntries],
  );

  const todayEntry = React.useMemo(() => {
    const day = todayKey();
    return entries.find((e) => e.date === day);
  }, [entries]);

  const value = React.useMemo<JournalContextValue>(
    () => ({ entries, hydrated, todayEntry, upsertToday, remove }),
    [entries, hydrated, todayEntry, upsertToday, remove],
  );

  return (
    <JournalContext.Provider value={value}>{children}</JournalContext.Provider>
  );
}

export function useJournal() {
  const ctx = React.useContext(JournalContext);
  if (!ctx) throw new Error("useJournal must be used within JournalProvider");
  return ctx;
}
