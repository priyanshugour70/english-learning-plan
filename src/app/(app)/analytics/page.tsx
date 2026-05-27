"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { cn, formatNumber } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Zap, CalendarDays, TrendingUp, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AnalyticsData {
  dailyXp: { date: string; xp: number }[];
  skillBreakdown: { skill: string; xp: number; label: string; emoji: string }[];
  weeklyCompletion: {
    week: string;
    completed: number;
    total: number;
    pct: number;
  }[];
  streakCalendar: { date: string; active: boolean }[];
  weakestSkill: { skill: string; label: string; xp: number } | null;
  strongestSkill: { skill: string; label: string; xp: number } | null;
  totalActiveDays: number;
  averageXpPerDay: number;
  totalCompletedTasks: number;
  currentStreak: number;
  bestStreak: number;
  vocabularyCount: number;
  journalCount: number;
  recordingCount: number;
}

const SKILL_COLORS: Record<string, string> = {
  speaking: "bg-emerald-500",
  listening: "bg-sky-500",
  reading: "bg-violet-500",
  writing: "bg-amber-500",
  vocabulary: "bg-pink-500",
  grammar: "bg-orange-500",
  pronunciation: "bg-rose-500",
};

export default function AnalyticsPage() {
  const { data, isLoading } = useSWR<AnalyticsData>("/api/analytics", fetcher);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">
          Loading analytics...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24 lg:pb-8">
      <header className="flex items-center gap-3">
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-surface-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Your learning progress at a glance
          </p>
        </div>
      </header>

      <SummaryCards data={data} />
      <XpChart dailyXp={data.dailyXp} />
      <SkillBreakdown skills={data.skillBreakdown} />
      <WeeklyCompletionChart weeks={data.weeklyCompletion} />
      <StreakCalendar calendar={data.streakCalendar} />
      <Insights data={data} />
    </div>
  );
}

/* ─── Section 1: Summary Cards ─── */
function SummaryCards({ data }: { data: AnalyticsData }) {
  const cards = [
    {
      label: "Current Streak",
      value: data.currentStreak,
      suffix: "days",
      icon: Flame,
      accent: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Total XP",
      value: data.totalCompletedTasks > 0 ? formatNumber(data.dailyXp.reduce((s, d) => s + d.xp, 0) || data.averageXpPerDay * data.totalActiveDays) : "0",
      suffix: "",
      icon: Zap,
      accent: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "Active Days",
      value: data.totalActiveDays,
      suffix: "",
      icon: CalendarDays,
      accent: "text-sky-500",
      bg: "bg-sky-500/10",
    },
    {
      label: "Avg XP/Day",
      value: data.averageXpPerDay,
      suffix: "",
      icon: TrendingUp,
      accent: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <Card key={c.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  c.bg,
                )}
              >
                <c.icon className={cn("h-5 w-5", c.accent)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className="text-xl font-bold tabular-nums">
                  {c.value}
                  {c.suffix && (
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {c.suffix}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* ─── Section 2: XP Over Time Chart ─── */
function XpChart({ dailyXp }: { dailyXp: { date: string; xp: number }[] }) {
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    date: string;
    xp: number;
  } | null>(null);

  const maxXp = Math.max(...dailyXp.map((d) => d.xp), 1);
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const width = 800;
  const height = 300;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = dailyXp.map((d, i) => ({
    x: padding.left + (i / (dailyXp.length - 1)) * chartW,
    y: padding.top + chartH - (d.xp / maxXp) * chartH,
    ...d,
  }));

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath = `M ${points[0].x},${padding.top + chartH} ${points.map((p) => `L ${p.x},${p.y}`).join(" ")} L ${points[points.length - 1].x},${padding.top + chartH} Z`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">XP Over Time</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full min-w-[500px]"
            onMouseLeave={() => setTooltip(null)}
          >
            <defs>
              <linearGradient
                id="xpGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 0.5, 1].map((frac) => {
              const yPos = padding.top + chartH - frac * chartH;
              return (
                <g key={frac}>
                  <line
                    x1={padding.left}
                    y1={yPos}
                    x2={padding.left + chartW}
                    y2={yPos}
                    stroke="currentColor"
                    strokeOpacity="0.1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 8}
                    y={yPos + 4}
                    textAnchor="end"
                    className="fill-muted-foreground text-[11px]"
                  >
                    {Math.round(maxXp * frac)}
                  </text>
                </g>
              );
            })}

            {/* Area */}
            <path d={areaPath} fill="url(#xpGradient)" />

            {/* Line */}
            <polyline
              points={polyline}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points (interactive) */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="12"
                fill="transparent"
                onMouseEnter={() =>
                  setTooltip({ x: p.x, y: p.y, date: p.date, xp: p.xp })
                }
              />
            ))}

            {/* Highlighted dot */}
            {tooltip && (
              <circle
                cx={tooltip.x}
                cy={tooltip.y}
                r="5"
                fill="var(--color-primary)"
                stroke="var(--color-surface)"
                strokeWidth="2"
              />
            )}

            {/* X-axis labels */}
            {points
              .filter((_, i) => i % 5 === 0)
              .map((p) => (
                <text
                  key={p.date}
                  x={p.x}
                  y={height - 8}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[10px]"
                >
                  {p.date.slice(5)}
                </text>
              ))}
          </svg>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="absolute pointer-events-none bg-surface border border-border rounded-lg shadow-lg px-3 py-1.5 text-xs"
              style={{
                left: `${(tooltip.x / width) * 100}%`,
                top: `${(tooltip.y / height) * 100 - 14}%`,
                transform: "translateX(-50%)",
              }}
            >
              <p className="font-medium">{tooltip.xp} XP</p>
              <p className="text-muted-foreground">{tooltip.date}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Section 3: Skill Breakdown ─── */
function SkillBreakdown({
  skills,
}: {
  skills: { skill: string; xp: number; label: string; emoji: string }[];
}) {
  const maxXp = Math.max(...skills.map((s) => s.xp), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Skill Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {skills.map((s) => {
          const pct = Math.round((s.xp / maxXp) * 100);
          const isMax = s.xp === maxXp && s.xp > 0;
          return (
            <div key={s.skill} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className={cn("flex items-center gap-2", isMax && "font-semibold")}>
                  <span>{s.emoji}</span>
                  <span>{s.label}</span>
                  {isMax && (
                    <Badge className="text-[10px] px-1.5 py-0">Top</Badge>
                  )}
                </span>
                <span className="text-muted-foreground tabular-nums">
                  {formatNumber(s.xp)} XP
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-surface-muted overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    SKILL_COLORS[s.skill] ?? "bg-primary",
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

/* ─── Section 4: Weekly Completion ─── */
function WeeklyCompletionChart({
  weeks,
}: {
  weeks: { week: string; completed: number; total: number; pct: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Weekly Completion Rate</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-end gap-2 h-40">
          {weeks.map((w) => {
            const barColor =
              w.pct > 80
                ? "bg-emerald-500"
                : w.pct > 50
                  ? "bg-amber-500"
                  : "bg-red-500";
            return (
              <div
                key={w.week}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {w.pct}%
                </span>
                <div className="w-full flex-1 relative rounded-t-md overflow-hidden bg-surface-muted">
                  <div
                    className={cn(
                      "absolute bottom-0 inset-x-0 rounded-t-md transition-all duration-500",
                      barColor,
                    )}
                    style={{ height: `${Math.max(w.pct, 2)}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {w.week}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Section 5: Streak Calendar ─── */
function StreakCalendar({
  calendar,
}: {
  calendar: { date: string; active: boolean }[];
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">30-Day Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="relative">
          <div className="grid grid-cols-10 sm:grid-cols-15 gap-2">
            {calendar.map((day) => (
              <div
                key={day.date}
                className="relative flex items-center justify-center"
                onMouseEnter={() => setHovered(day.date)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={cn(
                    "h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 transition-colors",
                    day.active
                      ? "bg-primary border-primary"
                      : "border-border bg-transparent",
                  )}
                />
                {hovered === day.date && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-border rounded px-2 py-0.5 text-[10px] whitespace-nowrap shadow-lg z-10">
                    {day.date.slice(5)}
                    {day.active ? " ✓" : ""}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-primary" />
              Active
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full border-2 border-border" />
              Inactive
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Section 6: Insights ─── */
function Insights({ data }: { data: AnalyticsData }) {
  const insights = [
    data.strongestSkill && {
      emoji: "💪",
      text: `Your strongest skill is ${data.strongestSkill.label}`,
      sub: `${formatNumber(data.strongestSkill.xp)} XP earned`,
    },
    data.weakestSkill && {
      emoji: "🎯",
      text: `Focus more on ${data.weakestSkill.label}`,
      sub: `Only ${formatNumber(data.weakestSkill.xp)} XP so far`,
    },
    {
      emoji: "📝",
      text: `You've written ${data.journalCount} journal entries`,
      sub: "Keep reflecting daily",
    },
    {
      emoji: "🧠",
      text: `You've reviewed ${data.vocabularyCount} vocabulary words`,
      sub: "Growing your word bank",
    },
    {
      emoji: "🎙️",
      text: `You've done ${data.recordingCount} practice recordings`,
      sub: "Speaking builds confidence",
    },
  ].filter(Boolean) as { emoji: string; text: string; sub: string }[];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Insights</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid gap-3 sm:grid-cols-2">
          {insights.map((insight, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border p-3"
            >
              <span className="text-2xl">{insight.emoji}</span>
              <div>
                <p className="text-sm font-medium">{insight.text}</p>
                <p className="text-xs text-muted-foreground">{insight.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
