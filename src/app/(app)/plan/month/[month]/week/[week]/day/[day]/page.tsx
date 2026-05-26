"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TaskItem } from "@/components/plan/task-item";
import { usePlan } from "@/contexts/plan-context";
import { useProgress } from "@/contexts/progress-context";
import { percent } from "@/lib/utils";

export default function DayPage({
  params,
}: {
  params: Promise<{ month: string; week: string; day: string }>;
}) {
  const { month: monthParam, week: weekParam, day: dayParam } = use(params);
  const monthIndex = Number(monthParam);
  const weekIndex = Number(weekParam);
  const dayIndex = Number(dayParam);
  const { getMonth, getWeek, getDay, loading } = usePlan();
  const month = getMonth(monthIndex);
  const week = getWeek(monthIndex, weekIndex);
  const day = getDay(monthIndex, weekIndex, dayIndex);

  const { state } = useProgress();

  if ((!month || !week || !day) && !loading) notFound();
  if (!month || !week || !day) return null;

  const totalMinutes = day.tasks.reduce((acc, t) => acc + t.minutes, 0);
  const totalXp = day.tasks.reduce((acc, t) => acc + t.xp, 0);
  const completedCount = day.tasks.filter((t) =>
    state.completedTaskIds.includes(t.id),
  ).length;
  const pct = percent(completedCount, day.tasks.length);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-3xl mx-auto space-y-6 fade-up">
      <div>
        <Link
          href={`/plan/month/${month.index}/week/${week.index}`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {week.title}
        </Link>
        <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
          {day.label}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {month.title} · Week {week.index}
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
    </div>
  );
}
