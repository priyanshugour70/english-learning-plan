"use client";

import * as React from "react";

import { todayKey } from "@/lib/dates";
import { uid } from "@/lib/utils";
import { useLocalState } from "@/hooks/use-local-state";
import type { VocabularyEntry } from "@/types";

const KEY = "vocabulary";

const REVIEW_GAPS: Record<VocabularyEntry["box"], number> = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16,
};

function dueDateFor(box: VocabularyEntry["box"], from: Date = new Date()) {
  const d = new Date(from);
  d.setDate(d.getDate() + REVIEW_GAPS[box]);
  return d.toISOString();
}

interface VocabularyContextValue {
  entries: VocabularyEntry[];
  hydrated: boolean;
  add: (input: {
    word: string;
    meaning: string;
    exampleSentence?: string;
    partOfSpeech?: string;
    tags?: string[];
  }) => VocabularyEntry;
  update: (id: string, patch: Partial<VocabularyEntry>) => void;
  remove: (id: string) => void;
  markReview: (id: string, knew: boolean) => void;
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
  const [entries, setEntries, hydrated] = useLocalState<VocabularyEntry[]>(
    KEY,
    [],
  );

  const add = React.useCallback<VocabularyContextValue["add"]>(
    (input) => {
      const now = new Date();
      const entry: VocabularyEntry = {
        id: uid("v"),
        word: input.word.trim(),
        meaning: input.meaning.trim(),
        exampleSentence: input.exampleSentence?.trim() || undefined,
        partOfSpeech: input.partOfSpeech,
        tags: input.tags,
        box: 1,
        lastReviewedAt: undefined,
        nextReviewAt: dueDateFor(1, now),
        reviewCount: 0,
        createdAt: now.toISOString(),
      };
      setEntries((prev) => [entry, ...prev]);
      return entry;
    },
    [setEntries],
  );

  const update = React.useCallback(
    (id: string, patch: Partial<VocabularyEntry>) => {
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
      );
    },
    [setEntries],
  );

  const remove = React.useCallback(
    (id: string) => {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    },
    [setEntries],
  );

  const markReview = React.useCallback(
    (id: string, knew: boolean) => {
      const now = new Date();
      setEntries((prev) =>
        prev.map((e) => {
          if (e.id !== id) return e;
          const newBox = (
            knew ? Math.min(5, e.box + 1) : Math.max(1, e.box - 1)
          ) as VocabularyEntry["box"];
          return {
            ...e,
            box: newBox,
            reviewCount: e.reviewCount + 1,
            lastReviewedAt: now.toISOString(),
            nextReviewAt: dueDateFor(newBox, now),
          };
        }),
      );
    },
    [setEntries],
  );

  const dueToday = React.useMemo(() => {
    const today = todayKey();
    return entries.filter((e) => {
      if (!e.nextReviewAt) return true;
      return e.nextReviewAt.slice(0, 10) <= today;
    });
  }, [entries]);

  const value = React.useMemo<VocabularyContextValue>(
    () => ({ entries, hydrated, add, update, remove, markReview, dueToday }),
    [entries, hydrated, add, update, remove, markReview, dueToday],
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
