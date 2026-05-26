"use client";

import * as React from "react";

import { useLocalState } from "@/hooks/use-local-state";

type Theme = "system" | "light" | "dark";
type Resolved = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolved: Resolved;
  setTheme: (next: Theme) => void;
  toggle: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme";

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
  const [theme, setThemeRaw] = useLocalState<Theme>(STORAGE_KEY, "system");

  const systemPref = React.useSyncExternalStore(
    subscribeMedia,
    getMediaSnapshot,
    getMediaServerSnapshot,
  );

  const resolved: Resolved = theme === "system" ? systemPref : theme;

  React.useEffect(() => {
    applyClass(resolved);
  }, [resolved]);

  const setTheme = React.useCallback(
    (next: Theme) => {
      setThemeRaw(next);
    },
    [setThemeRaw],
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
