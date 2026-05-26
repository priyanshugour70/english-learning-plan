"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function Dialog({
  open,
  onOpenChange,
  children,
  className,
  title,
  description,
}: DialogProps) {
  React.useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] fade-up"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        aria-describedby={description ? "dialog-description" : undefined}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-xl fade-up",
          className,
        )}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        {title ? (
          <h2
            id="dialog-title"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            {title}
          </h2>
        ) : null}
        {description ? (
          <p
            id="dialog-description"
            className="mt-1 text-sm text-muted-foreground"
          >
            {description}
          </p>
        ) : null}
        <div className={cn((title || description) && "mt-4")}>{children}</div>
      </div>
    </div>
  );
}
