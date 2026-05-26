"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  label: React.ReactNode;
  side?: "top" | "bottom";
  children: React.ReactElement;
  delay?: number;
}

export function Tooltip({
  label,
  side = "top",
  children,
  delay = 250,
}: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), delay);
  }
  function hide() {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {open ? (
        <span
          role="tooltip"
          className={cn(
            "absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[11px] font-medium text-background shadow-md",
            side === "top" ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]",
            "fade-up pointer-events-none",
          )}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}
