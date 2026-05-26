"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Compass,
  Flame,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { SkillRings } from "@/components/dashboard/skill-rings";
import { StreakCalendar } from "@/components/dashboard/streak-calendar";
import { TaskItem } from "@/components/plan/task-item";
import { useSettings } from "@/contexts/settings-context";
import { useProgress } from "@/contexts/progress-context";
import { useVocabulary } from "@/contexts/vocabulary-context";
import { useJournal } from "@/contexts/journal-context";
import { useCurrentPlanPosition } from "@/hooks/use-current-plan-position";
import { getDay, getMonth, TOTAL_TASKS } from "@/data/plan";
import { ACHIEVEMENTS } from "@/data/achievements";
import { levelFromXp } from "@/lib/gamification";
import { formatDayLabel, todayKey } from "@/lib/dates";
import { formatNumber, percent } from "@/lib/utils";

export default function DashboardPage() {
  const { settings } = useSettings();
  const { state } = useProgress();
  const { dueToday, entries: vocabEntries } = useVocabulary();
  const { entries: journalEntries, todayEntry } = useJournal();
  const pos = useCurrentPlanPosition();

  const month = getMonth(pos.monthIndex);
  const day = getDay(pos.monthIndex, pos.weekIndex, pos.dayIndex);

  const level = levelFromXp(state.totalXp);

  const totalCompleted = state.completedTaskIds.length;
  const overallPct = percent(totalCompleted, TOTAL_TASKS);

  const today = todayKey();
  const todaysHistory = state.history.filter((h) => h.date === today);
  const todaysXp = todaysHistory.reduce((acc, h) => acc + h.xp, 0);
  const todayGoalXp = Math.max(60, settings.dailyTimeMinutes * 4);
  const todayGoalPct = percent(todaysXp, todayGoalXp);

  const name = settings.name || "friend";
  const hour = new Date().getHours();
  const greeting =
    hour < 5
      ? "Burning the midnight oil"
      : hour < 12
        ? "Good morning"
        : hour < 17
          ? "Good afternoon"
          : "Good evening";

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-6xl mx-auto space-y-8 fade-up">
      <section>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {formatDayLabel()}
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {greeting}, {name}.
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground max-w-xl">
          You&apos;re in{" "}
          <span className="font-medium text-foreground">{month?.title}</span> ·{" "}
          <span className="font-medium text-foreground">
            Week {pos.weekIndex}
          </span>{" "}
          ·{" "}
          <span className="font-medium text-foreground">Day {pos.dayIndex}</span>
          .{" "}
          {state.streak >= 2
            ? `${state.streak} days strong — keep the flame.`
            : "Let's get one task in today."}
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Streak"
          value={`${state.streak} ${state.streak === 1 ? "day" : "days"}`}
          hint={`Best: ${state.bestStreak}`}
          icon={<Flame className="h-5 w-5" />}
          accent="amber"
        />
        <StatCard
          label="Level"
          value={`L${level.level}`}
          hint={level.title}
          icon={<Trophy className="h-5 w-5" />}
          accent="violet"
        />
        <StatCard
          label="Total XP"
          value={formatNumber(state.totalXp)}
          hint={`${level.intoLevel}/${level.forLevel} to next`}
          icon={<Zap className="h-5 w-5" />}
          accent="emerald"
        />
        <StatCard
          label="Completed"
          value={`${totalCompleted}`}
          hint={`of ${TOTAL_TASKS} tasks`}
          icon={<CheckCircle2 className="h-5 w-5" />}
          accent="sky"
        />
      </section>

      {/* Today goal + Day card */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <CardTitle>Today&apos;s plan</CardTitle>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {day?.label} — {day?.theme}
              </p>
            </div>
            <Link href="/today">
              <Button size="sm" variant="soft">
                Open today
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {day?.tasks.slice(0, 3).map((t) => (
              <TaskItem key={t.id} task={t} />
            ))}
            {day && day.tasks.length > 3 ? (
              <Link
                href="/today"
                className="block text-center text-xs text-muted-foreground hover:text-foreground py-1.5"
              >
                +{day.tasks.length - 3} more on Today →
              </Link>
            ) : null}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <CardTitle>Today goal</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-semibold text-foreground">
                    {todaysXp} <span className="text-sm text-muted-foreground font-normal">/ {todayGoalXp} XP</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {todayGoalPct >= 100 ? "Goal hit! 🎉" : `${todayGoalPct}% of today`}
                  </div>
                </div>
                <Badge tone={todayGoalPct >= 100 ? "success" : "primary"}>
                  {todayGoalPct >= 100 ? "Done" : "Active"}
                </Badge>
              </div>
              <Progress value={todayGoalPct} tone="emerald" size="lg" showShine={todayGoalPct < 100} />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Goal scales with your daily-time setting ({settings.dailyTimeMinutes} min).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <CardTitle>Your goal</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80 leading-relaxed">
                &ldquo;{settings.goal}&rdquo;
              </p>
              <Link href="/settings" className="mt-2 inline-block text-xs text-primary hover:underline">
                Update goal →
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Progress overview */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-primary" />
                <CardTitle>6-month progress</CardTitle>
              </div>
              <Link href="/plan" className="text-xs text-primary hover:underline">
                View roadmap →
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold">{overallPct}%</div>
                <div className="text-xs text-muted-foreground">
                  {totalCompleted} of {TOTAL_TASKS} tasks complete
                </div>
              </div>
              <Badge tone="primary">{month?.title}</Badge>
            </div>
            <Progress value={overallPct} tone="primary" size="lg" />
            <div className="grid grid-cols-6 gap-1.5 pt-1">
              {Array.from({ length: 6 }, (_, i) => i + 1).map((m) => {
                const isCurrent = m === pos.monthIndex;
                const isDone = m < pos.monthIndex;
                return (
                  <Link
                    key={m}
                    href={`/plan/month/${m}`}
                    className={`flex h-8 items-center justify-center rounded-md text-[11px] font-semibold transition-colors ${
                      isDone
                        ? "bg-primary text-primary-foreground"
                        : isCurrent
                          ? "bg-primary-soft text-primary-soft-foreground ring-2 ring-primary"
                          : "bg-surface-muted text-muted-foreground hover:bg-surface-hover"
                    }`}
                  >
                    M{m}
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill XP</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Track what you&apos;re building.
            </p>
          </CardHeader>
          <CardContent>
            <SkillRings />
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <StreakCalendar days={21} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Side practice</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Quick wins outside the plan.</p>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <Link
              href="/vocabulary"
              className="flex items-center justify-between rounded-[var(--radius)] border border-border bg-surface px-3.5 py-3 hover:bg-surface-muted transition-colors"
            >
              <div>
                <div className="text-sm font-medium">Vocabulary</div>
                <div className="text-[11px] text-muted-foreground">
                  {vocabEntries.length} words · {dueToday.length} due today
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link
              href="/journal"
              className="flex items-center justify-between rounded-[var(--radius)] border border-border bg-surface px-3.5 py-3 hover:bg-surface-muted transition-colors"
            >
              <div>
                <div className="text-sm font-medium">Journal</div>
                <div className="text-[11px] text-muted-foreground">
                  {journalEntries.length} entries · today {todayEntry ? "written" : "empty"}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link
              href="/practice"
              className="flex items-center justify-between rounded-[var(--radius)] border border-border bg-surface px-3.5 py-3 hover:bg-surface-muted transition-colors"
            >
              <div>
                <div className="text-sm font-medium">Practice studio</div>
                <div className="text-[11px] text-muted-foreground">
                  Recorder, shadowing, prompts
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Achievements</h2>
          <Link href="/achievements" className="text-xs text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {ACHIEVEMENTS.slice(0, 6).map((a) => {
            const unlocked = state.unlockedAchievementIds.includes(a.id);
            return (
              <div
                key={a.id}
                className={`rounded-[var(--radius)] border p-3 text-center ${
                  unlocked
                    ? "border-primary/30 bg-primary-soft/30"
                    : "border-border bg-surface opacity-70"
                }`}
              >
                <div className="text-2xl">{a.icon}</div>
                <div className="mt-1 text-xs font-medium truncate">{a.title}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  {unlocked ? "Unlocked" : "Locked"}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
