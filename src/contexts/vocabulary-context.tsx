"use client";

import * as React from "react";
import useSWR from "swr";

import { api, fetcher } from "@/lib/api";
import { todayKey } from "@/lib/dates";
import type { VocabularyEntry } from "@/types";

import { useAuth } from "./auth-context";

interface VocabResponse {
  entries: VocabularyEntry[];
}

interface CreateInput {
  word: string;
  meaning: string;
  exampleSentence?: string;
  partOfSpeech?: string;
  tags?: string[];
}

interface VocabularyContextValue {
  entries: VocabularyEntry[];
  hydrated: boolean;
  loading: boolean;
  add: (input: CreateInput) => Promise<VocabularyEntry | null>;
  update: (id: string, patch: Partial<VocabularyEntry>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  markReview: (id: string, knew: boolean) => Promise<void>;
  dueToday: VocabularyEntry[];
}

const VocabularyContext = React.createContext<VocabularyContextValue | null>(
  null,
);

export function VocabularyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { data, isLoading, mutate } = useSWR<VocabResponse>(
    user ? "/api/vocabulary" : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  const entries = React.useMemo(() => data?.entries ?? [], [data]);
  const hydrated = !!data;

  const add = React.useCallback<VocabularyContextValue["add"]>(
    async (input) => {
      try {
        const res = await api<{ entry: VocabularyEntry }>("/api/vocabulary", {
          method: "POST",
          body: input,
        });
        await mutate(
          (prev) => ({
            entries: [res.entry, ...(prev?.entries ?? [])],
          }),
          { revalidate: false },
        );
        return res.entry;
      } catch (e) {
        console.error("[vocab.add]", e);
        return null;
      }
    },
    [mutate],
  );

  const update = React.useCallback(
    async (id: string, patch: Partial<VocabularyEntry>) => {
      await mutate(
        async () => {
          await api<{ ok: true }>(`/api/vocabulary/${id}`, {
            method: "PATCH",
            body: patch,
          });
          return {
            entries: (data?.entries ?? []).map((e) =>
              e.id === id ? { ...e, ...patch } : e,
            ),
          };
        },
        {
          optimisticData: {
            entries: (data?.entries ?? []).map((e) =>
              e.id === id ? { ...e, ...patch } : e,
            ),
          },
          rollbackOnError: true,
          revalidate: false,
        },
      );
    },
    [data, mutate],
  );

  const remove = React.useCallback(
    async (id: string) => {
      await mutate(
        async () => {
          await api<{ ok: true }>(`/api/vocabulary/${id}`, {
            method: "DELETE",
          });
          return {
            entries: (data?.entries ?? []).filter((e) => e.id !== id),
          };
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

  const markReview = React.useCallback(
    async (id: string, knew: boolean) => {
      try {
        await api(`/api/vocabulary/${id}/review`, {
          method: "POST",
          body: { knew },
        });
        await mutate();
      } catch (e) {
        console.error("[vocab.markReview]", e);
      }
    },
    [mutate],
  );

  const dueToday = React.useMemo(() => {
    const today = todayKey();
    return entries.filter((e) => {
      if (!e.nextReviewAt) return true;
      return e.nextReviewAt.slice(0, 10) <= today;
    });
  }, [entries]);

  const value = React.useMemo<VocabularyContextValue>(
    () => ({
      entries,
      hydrated,
      loading: isLoading,
      add,
      update,
      remove,
      markReview,
      dueToday,
    }),
    [entries, hydrated, isLoading, add, update, remove, markReview, dueToday],
  );

  return (
    <VocabularyContext.Provider value={value}>
      {children}
    </VocabularyContext.Provider>
  );
}

export function useVocabulary() {
  const ctx = React.useContext(VocabularyContext);
  if (!ctx)
    throw new Error("useVocabulary must be used within VocabularyProvider");
  return ctx;
}
