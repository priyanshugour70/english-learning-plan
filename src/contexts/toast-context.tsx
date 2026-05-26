"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Sparkles, Trophy, X, Zap } from "lucide-react";

interface ToastInput {
  title: string;
  description?: string;
  variant?: "success" | "xp" | "achievement" | "info";
  duration?: number;
}

interface ToastRecord extends ToastInput {
  id: string;
}

interface ToastContextValue {
  toast: (input: ToastInput) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const variantStyles: Record<NonNullable<ToastInput["variant"]>, { bg: string; icon: React.ReactNode }> = {
  success: {
    bg: "bg-emerald/10 border-emerald/30 text-foreground",
    icon: <CheckCircle2 className="h-5 w-5 text-emerald" />,
  },
  xp: {
    bg: "bg-violet/10 border-violet/30 text-foreground",
    icon: <Zap className="h-5 w-5 text-violet" />,
  },
  achievement: {
    bg: "bg-amber/15 border-amber/30 text-foreground",
    icon: <Trophy className="h-5 w-5 text-amber" />,
  },
  info: {
    bg: "bg-sky/10 border-sky/30 text-foreground",
    icon: <Sparkles className="h-5 w-5 text-sky" />,
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastRecord[]>([]);

  const toast = React.useCallback((input: ToastInput) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const record: ToastRecord = {
      id,
      duration: 3500,
      variant: "success",
      ...input,
    };
    setItems((prev) => [...prev, record]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, record.duration);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end">
        {items.map((t) => {
          const styles = variantStyles[t.variant ?? "success"];
          return (
            <div
              key={t.id}
              className={cn(
                "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-[var(--radius-lg)] border bg-surface px-4 py-3 shadow-lg fade-up",
                styles.bg,
              )}
              role="status"
            >
              <div className="mt-0.5 flex-shrink-0">{styles.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight">{t.title}</p>
                {t.description ? (
                  <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
                    {t.description}
                  </p>
                ) : null}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="rounded-md p-1 text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
