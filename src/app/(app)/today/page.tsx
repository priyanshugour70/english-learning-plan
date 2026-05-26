"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TaskItem } from "@/components/plan/task-item";
import { useCurrentPlanPosition } from "@/hooks/use-current-plan-position";
import { useProgress } from "@/contexts/progress-context";
import { usePlan } from "@/contexts/plan-context";
import { formatDayLabel } from "@/lib/dates";
import { percent } from "@/lib/utils";

export default function TodayPage() {
  const pos = useCurrentPlanPosition();
  const { state } = useProgress();
  const { plan, getMonth, getWeek, getDay } = usePlan();
  const month = getMonth(pos.monthIndex);
  const week = getWeek(pos.monthIndex, pos.weekIndex);
  const day = getDay(pos.monthIndex, pos.weekIndex, pos.dayIndex);

  if (!month || !week || !day) {
    return (
      <div className="px-6 py-8">
        <p>Plan complete. Take a victory lap.</p>
      </div>
    );
  }

  const totalMinutes = day.tasks.reduce((acc, t) => acc + t.minutes, 0);
  const totalXp = day.tasks.reduce((acc, t) => acc + t.xp, 0);
  const completedCount = day.tasks.filter((t) =>
    state.completedTaskIds.includes(t.id),
  ).length;
  const pct = percent(completedCount, day.tasks.length);

  // Navigation between days
  const navPrev = (() => {
    let m = pos.monthIndex,
      w = pos.weekIndex,
      d = pos.dayIndex - 1;
    if (d < 1) {
      w -= 1;
      if (w < 1) {
        m -= 1;
        if (m < 1) return null;
        const prevMonth = plan[m - 1];
        w = prevMonth?.weeks.length ?? 1;
      }
      const targetWeek = getWeek(m, w);
      d = targetWeek ? targetWeek.days.length : 1;
    }
    return { m, w, d };
  })();

  const navNext = (() => {
    let m = pos.monthIndex,
      w = pos.weekIndex,
      d = pos.dayIndex + 1;
    const currWeek = getWeek(m, w);
    if (!currWeek) return null;
    if (d > currWeek.days.length) {
      d = 1;
      w += 1;
      const nextWeekExists = getWeek(m, w);
      if (!nextWeekExists) {
        w = 1;
        m += 1;
        if (m > plan.length) return null;
      }
    }
    return { m, w, d };
  })();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-3xl mx-auto space-y-6 fade-up">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/plan" className="hover:text-foreground">Roadmap</Link>
          <span>/</span>
          <span className="text-foreground">Today</span>
        </div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
          {day.label}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {month.title} · Week {week.index} · {formatDayLabel()}
        </p>
      </div>

      <Card>
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <Badge tone="primary">{day.theme}</Badge>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> ~{totalMinutes} min
              </span>
              <span>{totalXp} XP available</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                {completedCount} of {day.tasks.length} done
              </span>
              <span className="text-xs font-semibold text-primary">{pct}%</span>
            </div>
            <Progress value={pct} tone="primary" size="md" showShine={pct < 100} />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {day.tasks.map((t) => (
            <TaskItem key={t.id} task={t} />
          ))}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-3">
        {navPrev ? (
          <Link href={`/plan/month/${navPrev.m}/week/${navPrev.w}/day/${navPrev.d}`}>
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4" /> Previous day
            </Button>
          </Link>
        ) : (
          <span />
        )}
        {navNext ? (
          <Link href={`/plan/month/${navNext.m}/week/${navNext.w}/day/${navNext.d}`}>
            <Button variant="ghost">
              Next day <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
