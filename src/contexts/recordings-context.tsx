"use client";

import * as React from "react";
import useSWR from "swr";

import { api, fetcher } from "@/lib/api";
import type { RecordingSession } from "@/types";

import { useAuth } from "./auth-context";

interface RecordingsResponse {
  sessions: RecordingSession[];
}

interface LogInput {
  prompt: string;
  duration: number;
  selfRating?: RecordingSession["selfRating"];
  notes?: string;
}

interface RecordingsContextValue {
  sessions: RecordingSession[];
  hydrated: boolean;
  loading: boolean;
  log: (input: LogInput) => Promise<RecordingSession | null>;
  remove: (id: string) => Promise<void>;
}

const RecordingsContext = React.createContext<RecordingsContextValue | null>(
  null,
);

export function RecordingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { data, isLoading, mutate } = useSWR<RecordingsResponse>(
    user ? "/api/recordings" : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  const sessions = React.useMemo(() => data?.sessions ?? [], [data]);
  const hydrated = !!data;

  const log = React.useCallback<RecordingsContextValue["log"]>(
    async (input) => {
      try {
        const res = await api<{ session: RecordingSession }>(
          "/api/recordings",
          { method: "POST", body: input },
        );
        await mutate(
          (prev) => ({
            sessions: [res.session, ...(prev?.sessions ?? [])],
          }),
          { revalidate: false },
        );
        return res.session;
      } catch (e) {
        console.error("[recordings.log]", e);
        return null;
      }
    },
    [mutate],
  );

  const remove = React.useCallback(
    async (id: string) => {
      await mutate(
        async () => {
          await api(`/api/recordings/${id}`, { method: "DELETE" });
          return {
            sessions: (data?.sessions ?? []).filter((s) => s.id !== id),
          };
        },
        {
          optimisticData: {
            sessions: (data?.sessions ?? []).filter((s) => s.id !== id),
          },
          rollbackOnError: true,
          revalidate: false,
        },
      );
    },
    [data, mutate],
  );

  const value = React.useMemo<RecordingsContextValue>(
    () => ({ sessions, hydrated, loading: isLoading, log, remove }),
    [sessions, hydrated, isLoading, log, remove],
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
