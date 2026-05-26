import { isBrowser } from "./utils";

export const STORAGE_PREFIX = "fluentpath:v1:";

export function storageKey(name: string) {
  return `${STORAGE_PREFIX}${name}`;
}

export function readJSON<T>(name: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(storageKey(name));
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(name: string, value: T) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(storageKey(name), JSON.stringify(value));
  } catch {
    // Ignore quota errors silently — UI will still work in memory.
  }
}

export function removeKey(name: string) {
  if (!isBrowser()) return;
  window.localStorage.removeItem(storageKey(name));
}

export function clearAllAppStorage() {
  if (!isBrowser()) return;
  const keysToRemove: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (k && k.startsWith(STORAGE_PREFIX)) keysToRemove.push(k);
  }
  keysToRemove.forEach((k) => window.localStorage.removeItem(k));
}

export function exportAllData(): Record<string, unknown> {
  if (!isBrowser()) return {};
  const data: Record<string, unknown> = {};
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (!k || !k.startsWith(STORAGE_PREFIX)) continue;
    const value = window.localStorage.getItem(k);
    if (value == null) continue;
    try {
      data[k.replace(STORAGE_PREFIX, "")] = JSON.parse(value);
    } catch {
      data[k.replace(STORAGE_PREFIX, "")] = value;
    }
  }
  return data;
}

export function importAllData(payload: Record<string, unknown>) {
  if (!isBrowser()) return;
  Object.entries(payload).forEach(([k, v]) => {
    try {
      window.localStorage.setItem(storageKey(k), JSON.stringify(v));
    } catch {
      // ignore
    }
  });
}
