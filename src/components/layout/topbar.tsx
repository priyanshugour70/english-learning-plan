"use client";

import Link from "next/link";
import { Flame, Sparkles, Zap } from "lucide-react";
import { useProgress } from "@/contexts/progress-context";
import { formatNumber } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Topbar({ title }: { title?: string }) {
  const { state, hydrated } = useProgress();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-surface/85 backdrop-blur px-4 sm:px-6 lg:px-8 h-14">
      <Link href="/" className="lg:hidden inline-flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold tracking-tight">Fluent Path</span>
      </Link>

      <h1 className="hidden lg:block text-sm font-semibold tracking-tight text-foreground">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber/10 text-amber px-2.5 h-8 ring-1 ring-inset ring-amber/20">
          <Flame className="h-3.5 w-3.5" />
          <span className="text-xs font-semibold">{hydrated ? state.streak : 0}</span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-violet/10 text-violet px-2.5 h-8 ring-1 ring-inset ring-violet/20">
          <Zap className="h-3.5 w-3.5" />
          <span className="text-xs font-semibold">{hydrated ? formatNumber(state.totalXp) : 0}</span>
        </div>
        <ThemeToggle className="lg:hidden" />
      </div>
    </header>
  );
}
