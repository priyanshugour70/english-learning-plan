"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { writeJSON } from "@/lib/storage";

type Updater<T> = T | ((prev: T) => T);

// Module-level cache so getSnapshot stays referentially stable across renders
// (required by useSyncExternalStore).
const cache = new Map<string, { raw: string | null; parsed: unknown }>();

function readSnapshot<T>(
  key: string,
  defaultValue: T,
  normalize?: (value: T) => T,
): T {
  if (typeof window === "undefined") return defaultValue;
  const raw = window.localStorage.getItem(key);
  const cached = cache.get(key);
  if (cached && cached.raw === raw) {
    return cached.parsed as T;
  }
  let parsed: T;
  if (raw == null) {
    parsed = defaultValue;
  } else {
    try {
      parsed = JSON.parse(raw) as T;
    } catch {
      parsed = defaultValue;
    }
  }
  if (normalize) parsed = normalize(parsed);
  cache.set(key, { raw, parsed });
  return parsed;
}

function makeSubscribe(key: string) {
  return (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    const handler = (e: StorageEvent) => {
      if (e.key === key || e.key === null) {
        cache.delete(key);
        callback();
      }
    };
    const local = () => {
      cache.delete(key);
      callback();
    };
    window.addEventListener("storage", handler);
    window.addEventListener(`local-storage:${key}`, local as EventListener);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener(
        `local-storage:${key}`,
        local as EventListener,
      );
    };
  };
}

/**
 * Tiny external store backed by localStorage.
 *
 * Built on useSyncExternalStore so React's "set-state-in-effect" and
 * "refs-during-render" rules are never triggered, and SSR always returns
 * defaultValue (avoiding hydration mismatches).
 */
export function useLocalState<T>(
  key: string,
  defaultValue: T,
  options?: { normalize?: (value: T) => T },
): readonly [T, (value: Updater<T>) => void, boolean] {
  const normalize = options?.normalize;

  const subscribe = useMemo(() => makeSubscribe(key), [key]);

  const getSnapshot = useCallback(
    () => readSnapshot(key, defaultValue, normalize),
    [key, defaultValue, normalize],
  );

  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue]);

  const value = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setValue = useCallback(
    (updater: Updater<T>) => {
      if (typeof window === "undefined") return;
      const prev = readSnapshot(key, defaultValue, normalize);
      const next =
        typeof updater === "function"
          ? (updater as (p: T) => T)(prev)
          : updater;
      writeJSON(key, next);
      cache.delete(key);
      window.dispatchEvent(new CustomEvent(`local-storage:${key}`));
    },
    [key, defaultValue, normalize],
  );

  const hydrated = typeof window !== "undefined";

  return [value, setValue, hydrated] as const;
}
