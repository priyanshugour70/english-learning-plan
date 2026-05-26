"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  value: string;
  onValueChange: (next: string) => void;
  items: { value: string; label: React.ReactNode; icon?: React.ReactNode }[];
  size?: "sm" | "md";
  variant?: "pill" | "underline";
  className?: string;
}

export function Tabs({
  value,
  onValueChange,
  items,
  size = "md",
  variant = "pill",
  className,
}: TabsProps) {
  if (variant === "underline") {
    return (
      <div
        role="tablist"
        className={cn(
          "flex items-center gap-1 border-b border-border overflow-x-auto",
          className,
        )}
      >
        {items.map((it) => {
          const active = it.value === value;
          return (
            <button
              key={it.value}
              role="tab"
              aria-selected={active}
              onClick={() => onValueChange(it.value)}
              className={cn(
                "relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 transition-colors",
                size === "sm" ? "h-9 text-xs" : "h-11 text-sm",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {it.icon}
              {it.label}
              <span
                className={cn(
                  "absolute inset-x-1 -bottom-px h-0.5 rounded-full transition-all",
                  active ? "bg-primary" : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius)] border border-border bg-surface-muted p-1",
        className,
      )}
    >
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            role="tab"
            aria-selected={active}
            onClick={() => onValueChange(it.value)}
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--radius)-4px)] transition-all",
              size === "sm" ? "h-7 px-2.5 text-xs" : "h-9 px-3 text-sm",
              active
                ? "bg-surface text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {it.icon}
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
