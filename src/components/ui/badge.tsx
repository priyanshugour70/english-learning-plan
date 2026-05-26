import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeTone =
  | "neutral"
  | "primary"
  | "emerald"
  | "sky"
  | "amber"
  | "violet"
  | "rose"
  | "orange"
  | "pink"
  | "success"
  | "warning"
  | "danger";

const tones: Record<BadgeTone, string> = {
  neutral:
    "bg-surface-muted text-muted-foreground ring-1 ring-inset ring-border",
  primary:
    "bg-primary-soft text-primary-soft-foreground ring-1 ring-inset ring-primary/20",
  emerald:
    "bg-emerald/10 text-emerald ring-1 ring-inset ring-emerald/20",
  sky: "bg-sky/10 text-sky ring-1 ring-inset ring-sky/20",
  amber:
    "bg-amber/15 text-amber ring-1 ring-inset ring-amber/25",
  violet:
    "bg-violet/10 text-violet ring-1 ring-inset ring-violet/20",
  rose: "bg-rose/10 text-rose ring-1 ring-inset ring-rose/20",
  orange:
    "bg-orange/10 text-orange ring-1 ring-inset ring-orange/20",
  pink: "bg-pink/10 text-pink ring-1 ring-inset ring-pink/20",
  success:
    "bg-success/10 text-success ring-1 ring-inset ring-success/20",
  warning:
    "bg-warning/15 text-warning ring-1 ring-inset ring-warning/25",
  danger:
    "bg-danger/10 text-danger ring-1 ring-inset ring-danger/20",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: "sm" | "md";
}

export function Badge({
  className,
  tone = "neutral",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-full",
        size === "sm"
          ? "h-6 px-2.5 text-[11px]"
          : "h-7 px-3 text-xs",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
