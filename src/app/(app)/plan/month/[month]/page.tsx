"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getMonth, weekTaskIds } from "@/data/plan";
import { useProgress } from "@/contexts/progress-context";
import { percent, cn } from "@/lib/utils";

const accentBg: Record<string, string> = {
  emerald: "bg-emerald/10",
  sky: "bg-sky/10",
  amber: "bg-amber/15",
  violet: "bg-violet/10",
  rose: "bg-rose/10",
  orange: "bg-orange/10",
  pink: "bg-pink/10",
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

export default function MonthPage({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const { month: monthParam } = use(params);
  const monthIndex = Number(monthParam);
  const month = getMonth(monthIndex);
  const { state } = useProgress();
  const completed = new Set(state.completedTaskIds);

  if (!month) {
    notFound();
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-4xl mx-auto space-y-7 fade-up">
      <div>
        <Link
          href="/plan"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to roadmap
        </Link>
        <div className="mt-3 flex items-start gap-4">
          <div
            className={cn(
              "h-14 w-14 rounded-2xl flex items-center justify-center text-lg font-semibold",
              accentBg[month.accent],
              accentText[month.accent],
            )}
          >
            M{month.index}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {month.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
              {month.description}
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-5 flex items-start gap-3">
          <Sparkles className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
          <p className="text-sm text-foreground/85 leading-relaxed">{month.tip}</p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {month.weeks.map((w) => {
          const ids = weekTaskIds(month.index, w.index);
          const doneCount = ids.filter((id) => completed.has(id)).length;
          const pct = percent(doneCount, ids.length);
          const isDone = pct >= 100;
          return (
            <Link key={w.index} href={`/plan/month/${month.index}/week/${w.index}`}>
              <Card className="transition-shadow hover:shadow-md cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{w.title}</CardTitle>
                        {isDone && (
                          <Badge tone="success">
                            <Check className="h-3 w-3" /> Done
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {w.objective}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{w.days.length} days</div>
                      <div className="text-xs font-semibold text-primary">{pct}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Progress value={pct} tone="primary" size="sm" />
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {w.outcomes.slice(0, 3).map((o, i) => (
                      <Badge key={i} tone="neutral">
                        {o}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
