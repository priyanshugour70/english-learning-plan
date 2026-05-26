"use client";

import * as React from "react";

import { todayKey } from "@/lib/dates";
import { uid } from "@/lib/utils";
import { useLocalState } from "@/hooks/use-local-state";
import type { RecordingSession } from "@/types";

const KEY = "recordings";

interface RecordingsContextValue {
  sessions: RecordingSession[];
  hydrated: boolean;
  log: (input: {
    prompt: string;
    duration: number;
    selfRating?: RecordingSession["selfRating"];
    notes?: string;
  }) => RecordingSession;
  remove: (id: string) => void;
}

const RecordingsContext = React.createContext<RecordingsContextValue | null>(
  null,
);

export function RecordingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sessions, setSessions, hydrated] = useLocalState<RecordingSession[]>(
    KEY,
    [],
  );

  const log = React.useCallback<RecordingsContextValue["log"]>(
    (input) => {
      const session: RecordingSession = {
        id: uid("r"),
        date: todayKey(),
        prompt: input.prompt,
        duration: input.duration,
        selfRating: input.selfRating,
        notes: input.notes,
        createdAt: new Date().toISOString(),
      };
      setSessions((prev) => [session, ...prev]);
      return session;
    },
    [setSessions],
  );

  const remove = React.useCallback(
    (id: string) => {
      setSessions((prev) => prev.filter((s) => s.id !== id));
    },
    [setSessions],
  );

  const value = React.useMemo<RecordingsContextValue>(
    () => ({ sessions, hydrated, log, remove }),
    [sessions, hydrated, log, remove],
  );

  return (
    <RecordingsContext.Provider value={value}>
      {children}
    </RecordingsContext.Provider>
  );
}

export function useRecordings() {
  const ctx = React.useContext(RecordingsContext);
  if (!ctx)
    throw new Error("useRecordings must be used within RecordingsProvider");
  return ctx;
}
