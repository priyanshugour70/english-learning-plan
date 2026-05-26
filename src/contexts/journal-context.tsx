"use client";

import * as React from "react";
import useSWR from "swr";

import { api, fetcher } from "@/lib/api";
import { todayKey } from "@/lib/dates";
import type { JournalEntry } from "@/types";

import { useAuth } from "./auth-context";

interface JournalResponse {
  entries: JournalEntry[];
}

interface JournalContextValue {
  entries: JournalEntry[];
  hydrated: boolean;
  loading: boolean;
  todayEntry: JournalEntry | undefined;
  upsertToday: (
    text: string,
    mood?: JournalEntry["mood"],
    prompt?: string,
  ) => Promise<JournalEntry | null>;
  remove: (id: string) => Promise<void>;
}

const JournalContext = React.createContext<JournalContextValue | null>(null);

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { data, isLoading, mutate } = useSWR<JournalResponse>(
    user ? "/api/journal" : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  const entries = React.useMemo(() => data?.entries ?? [], [data]);
  const hydrated = !!data;

  const upsertToday = React.useCallback<JournalContextValue["upsertToday"]>(
    async (text, mood, prompt) => {
      try {
        const res = await api<{ entry: JournalEntry }>("/api/journal", {
          method: "POST",
          body: { text, mood, prompt },
        });
        // Replace today's entry in-place, else prepend.
        await mutate((prev) => {
          const list = prev?.entries ?? [];
          const idx = list.findIndex((e) => e.date === res.entry.date);
          if (idx >= 0) {
            const next = list.slice();
            next[idx] = res.entry;
            return { entries: next };
          }
          return { entries: [res.entry, ...list] };
        }, { revalidate: false });
        return res.entry;
      } catch (e) {
        console.error("[journal.upsertToday]", e);
        return null;
      }
    },
    [mutate],
  );

  const remove = React.useCallback(
    async (id: string) => {
      await mutate(
        async () => {
          await api(`/api/journal/${id}`, { method: "DELETE" });
          return { entries: (data?.entries ?? []).filter((e) => e.id !== id) };
        },
        {
          optimisticData: {
            entries: (data?.entries ?? []).filter((e) => e.id !== id),
          },
          rollbackOnError: true,
          revalidate: false,
        },
      );
    },
    [data, mutate],
  );

  const todayEntry = React.useMemo(() => {
    const day = todayKey();
    return entries.find((e) => e.date === day);
  }, [entries]);

  const value = React.useMemo<JournalContextValue>(
    () => ({
      entries,
      hydrated,
      loading: isLoading,
      todayEntry,
      upsertToday,
      remove,
    }),
    [entries, hydrated, isLoading, todayEntry, upsertToday, remove],
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
