"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "label";
}

export function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const { resolved, toggle } = useTheme();
  const isDark = resolved === "dark";

  if (variant === "label") {
    return (
      <button
        onClick={toggle}
        className={cn(
          "flex w-full items-center gap-2 rounded-[var(--radius)] px-3 py-2 text-sm text-foreground hover:bg-surface-muted",
          className,
        )}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-muted-foreground hover:bg-surface-muted hover:text-foreground transition-colors",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
