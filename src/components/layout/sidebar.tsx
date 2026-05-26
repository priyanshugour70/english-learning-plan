"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  Compass,
  Flame,
  Home,
  Mic,
  NotebookPen,
  Settings,
  Sparkles,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/contexts/progress-context";
import { levelFromXp } from "@/lib/gamification";
import { ThemeToggle } from "./theme-toggle";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/today", label: "Today", icon: CalendarDays },
  { href: "/plan", label: "Roadmap", icon: Compass },
  { href: "/vocabulary", label: "Vocabulary", icon: BookOpen },
  { href: "/journal", label: "Journal", icon: NotebookPen },
  { href: "/practice", label: "Practice", icon: Mic },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { state, hydrated } = useProgress();
  const level = levelFromXp(state.totalXp);

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-surface">
      <div className="px-5 pt-6 pb-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight text-foreground">
              Fluent Path
            </div>
            <div className="text-[11px] text-muted-foreground">
              6-month English journey
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-2">
          Menu
        </div>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-[var(--radius)] text-sm transition-colors",
                    active
                      ? "bg-primary-soft text-primary-soft-foreground font-medium"
                      : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      active && "text-primary-soft-foreground",
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 space-y-3">
        <div className="rounded-[var(--radius-lg)] border border-border bg-surface-muted/50 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-semibold">
                L{level.level}
              </div>
              <div className="leading-tight">
                <div className="text-xs font-medium text-foreground">{level.title}</div>
                <div className="text-[10px] text-muted-foreground">
                  {hydrated ? `${level.intoLevel}/${level.forLevel} XP` : "—"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber font-semibold">
              <Flame className="h-3.5 w-3.5" />
              {hydrated ? state.streak : 0}
            </div>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
            <div
              className="h-full bg-primary transition-[width] duration-500"
              style={{ width: `${level.pct}%` }}
            />
          </div>
        </div>
        <ThemeToggle variant="label" />
      </div>
    </aside>
  );
}
