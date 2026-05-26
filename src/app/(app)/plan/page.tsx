"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { usePlan } from "@/contexts/plan-context";
import { useProgress } from "@/contexts/progress-context";
import { useCurrentPlanPosition } from "@/hooks/use-current-plan-position";
import { percent, cn } from "@/lib/utils";

const accentBg: Record<string, string> = {
  emerald: "bg-emerald/10 border-emerald/20",
  sky: "bg-sky/10 border-sky/20",
  amber: "bg-amber/15 border-amber/25",
  violet: "bg-violet/10 border-violet/20",
  rose: "bg-rose/10 border-rose/20",
  orange: "bg-orange/10 border-orange/20",
  pink: "bg-pink/10 border-pink/20",
};

const accentText: Record<string, string> = {
  emerald: "text-emerald",
  sky: "text-sky",
  amber: "text-amber",
  violet: "text-violet",
  rose: "text-rose",
  orange: "text-orange",
  pink: "text-pink",
};

export default function PlanPage() {
  const { state } = useProgress();
  const pos = useCurrentPlanPosition();
  const { plan, monthTaskIds, stats } = usePlan();
  const TOTAL_TASKS = stats.totalTasks;
  const completed = new Set(state.completedTaskIds);
  const overallPct = percent(state.completedTaskIds.length, TOTAL_TASKS);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-5xl mx-auto space-y-8 fade-up">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Roadmap
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
          Your 6-month journey
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
          {stats.totalMonths} months · {stats.totalWeeks} weeks ·{" "}
          {TOTAL_TASKS} tasks. Built to grow with you week by week.
        </p>
        <div className="mt-4 max-w-md">
          <div className="flex items-center justify-between mb-1.5 text-xs text-muted-foreground">
            <span>{state.completedTaskIds.length} of {TOTAL_TASKS} tasks complete</span>
            <span className="font-semibold text-primary">{overallPct}%</span>
          </div>
          <Progress value={overallPct} tone="primary" size="md" />
        </div>
      </div>

      <div className="space-y-3">
        {plan.map((m) => {
          const ids = monthTaskIds(m.index);
          const doneCount = ids.filter((id) => completed.has(id)).length;
          const monthPct = percent(doneCount, ids.length);
          const isCurrent = pos.monthIndex === m.index;
          const isDone = monthPct >= 100;

          return (
            <Link key={m.index} href={`/plan/month/${m.index}`}>
              <Card
                className={cn(
                  "transition-shadow hover:shadow-md cursor-pointer",
                  isCurrent && "ring-2 ring-primary/40 ring-offset-2 ring-offset-background",
                )}
              >
                <CardHeader className="flex flex-row items-start gap-4 sm:gap-5">
                  <div
                    className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center text-lg font-semibold border",
                      accentBg[m.accent],
                      accentText[m.accent],
                    )}
                  >
                    M{m.index}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-base sm:text-lg">{m.title}</CardTitle>
                      {isCurrent && <Badge tone="primary">In progress</Badge>}
                      {isDone && (
                        <Badge tone="success">
                          <Check className="h-3 w-3" /> Done
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {m.tagline}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="text-muted-foreground">
                      {m.weeks.length} weeks · {ids.length} tasks
                    </span>
                    <span className="text-primary font-semibold">{monthPct}%</span>
                  </div>
                  <Progress value={monthPct} tone="primary" size="sm" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
