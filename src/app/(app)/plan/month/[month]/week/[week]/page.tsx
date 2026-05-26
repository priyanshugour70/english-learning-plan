"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getMonth, getWeek, dayTaskIds } from "@/data/plan";
import { useProgress } from "@/contexts/progress-context";
import { percent } from "@/lib/utils";

export default function WeekPage({
  params,
}: {
  params: Promise<{ month: string; week: string }>;
}) {
  const { month: monthParam, week: weekParam } = use(params);
  const monthIndex = Number(monthParam);
  const weekIndex = Number(weekParam);
  const month = getMonth(monthIndex);
  const week = getWeek(monthIndex, weekIndex);
  const { state } = useProgress();
  const completed = new Set(state.completedTaskIds);

  if (!month || !week) notFound();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-3xl mx-auto space-y-7 fade-up">
      <div>
        <Link
          href={`/plan/month/${month.index}`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {month.title}
        </Link>
        <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
          {week.title}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{week.focus}</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <CardTitle>This week&apos;s objective</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/85 leading-relaxed">{week.objective}</p>
          <div className="mt-4 space-y-1.5">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              You&apos;ll walk away with
            </div>
            <ul className="space-y-1.5">
              {week.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-emerald mt-0.5 flex-shrink-0" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2.5">
        {week.days.map((d) => {
          const ids = dayTaskIds(month.index, week.index, d.index);
          const doneCount = ids.filter((id) => completed.has(id)).length;
          const pct = percent(doneCount, ids.length);
          const isDone = pct >= 100;
          return (
            <Link
              key={d.index}
              href={`/plan/month/${month.index}/week/${week.index}/day/${d.index}`}
            >
              <Card className="transition-shadow hover:shadow-md cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-[15px]">{d.label}</CardTitle>
                        {isDone && (
                          <Badge tone="success">
                            <Check className="h-3 w-3" /> Done
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                        {d.theme}
                      </p>
                    </div>
                    <div className="text-right text-xs">
                      <div className="text-muted-foreground">{d.tasks.length} tasks</div>
                      <div className="text-primary font-semibold">{pct}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Progress value={pct} tone="primary" size="sm" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
