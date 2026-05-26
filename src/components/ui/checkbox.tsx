"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  id?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
}

export function Checkbox({
  checked,
  onCheckedChange,
  id,
  disabled,
  size = "md",
  className,
  ...rest
}: CheckboxProps) {
  const dims =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";
  const iconDim =
    size === "sm" ? "h-3 w-3" : size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5";

  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      aria-label={rest["aria-label"]}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "inline-flex flex-shrink-0 items-center justify-center rounded-md border-2 transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        dims,
        checked
          ? "bg-primary border-primary text-primary-foreground pop"
          : "bg-transparent border-border-strong text-transparent hover:border-primary hover:bg-primary-soft/40",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <Check className={cn(iconDim, "stroke-[3]")} />
    </button>
  );
}
