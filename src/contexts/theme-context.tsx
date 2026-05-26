"use client";

import * as React from "react";

import { useSettings } from "./settings-context";

type Theme = "system" | "light" | "dark";
type Resolved = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolved: Resolved;
  setTheme: (next: Theme) => void;
  toggle: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const LOCAL_CACHE_KEY = "fluentpath:v1:theme";

function subscribeMedia(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getMediaSnapshot(): Resolved {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getMediaServerSnapshot(): Resolved {
  return "light";
}

function applyClass(resolved: Resolved) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { settings, update } = useSettings();
  const theme: Theme = settings.theme ?? "system";

  const systemPref = React.useSyncExternalStore(
    subscribeMedia,
    getMediaSnapshot,
    getMediaServerSnapshot,
  );

  const resolved: Resolved = theme === "system" ? systemPref : theme;

  React.useEffect(() => {
    applyClass(resolved);
  }, [resolved]);

  // Mirror to localStorage so the inline no-flash script picks it up on next load.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(theme));
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = React.useCallback(
    (next: Theme) => {
      void update({ theme: next });
    },
    [update],
  );

  const toggle = React.useCallback(() => {
    setTheme(resolved === "dark" ? "light" : "dark");
  }, [resolved, setTheme]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, resolved, setTheme, toggle }),
    [theme, resolved, setTheme, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
