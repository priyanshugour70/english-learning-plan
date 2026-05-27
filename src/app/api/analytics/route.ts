import "server-only";

import { withAuth } from "@/lib/auth/server";
import {
  progressCol,
  vocabularyCol,
  journalCol,
  recordingsCol,
  planCol,
} from "@/lib/db/collections";
import { SKILLS } from "@/lib/gamification";
import {
  format,
  subDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

import type { SkillId } from "@/types";

export const GET = withAuth(async (user) => {
  const [progress, vocabCount, journalCount, recordingCount, planDoc] =
    await Promise.all([
      (await progressCol()).findOne({ userId: user.id }),
      (await vocabularyCol()).countDocuments({ userId: user.id }),
      (await journalCol()).countDocuments({ userId: user.id }),
      (await recordingsCol()).countDocuments({ userId: user.id }),
      (await planCol()).findOne({ key: "default" }),
    ]);

  const history = progress?.history ?? [];
  const activeDays = new Set(progress?.activeDays ?? []);
  const skillXp: Record<string, number> = progress?.skillXp ?? {};

  const today = new Date();

  // --- dailyXp: last 30 days ---
  const last30 = eachDayOfInterval({
    start: subDays(today, 29),
    end: today,
  });

  const xpByDate = new Map<string, number>();
  for (const rec of history) {
    xpByDate.set(rec.date, (xpByDate.get(rec.date) ?? 0) + rec.xp);
  }

  const dailyXp = last30.map((d) => {
    const key = format(d, "yyyy-MM-dd");
    return { date: key, xp: xpByDate.get(key) ?? 0 };
  });

  // --- skillBreakdown ---
  const skillBreakdown = SKILLS.map((s) => ({
    skill: s.id,
    xp: skillXp[s.id] ?? 0,
    label: s.label,
    emoji: s.emoji,
  }));

  // --- weeklyCompletion: last 8 weeks ---
  const totalTasksPerWeek = planDoc?.plan
    ? planDoc.plan.reduce((sum, month) => {
        for (const week of month.weeks) {
          for (const day of week.days) {
            sum += day.tasks.length;
          }
        }
        return sum;
      }, 0) /
      (planDoc.plan.reduce(
        (sum, month) => sum + month.weeks.length,
        0,
      ) || 1)
    : 7;

  const weeklyCompletion: {
    week: string;
    completed: number;
    total: number;
    pct: number;
  }[] = [];

  for (let i = 7; i >= 0; i--) {
    const refDate = subDays(today, i * 7);
    const weekStart = startOfWeek(refDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(refDate, { weekStartsOn: 1 });
    const startKey = format(weekStart, "yyyy-MM-dd");
    const endKey = format(weekEnd, "yyyy-MM-dd");

    const completed = history.filter(
      (r) => r.date >= startKey && r.date <= endKey,
    ).length;

    const total = Math.round(totalTasksPerWeek);
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    weeklyCompletion.push({
      week: format(weekStart, "MMM d"),
      completed,
      total,
      pct: Math.min(pct, 100),
    });
  }

  // --- streakCalendar ---
  const streakCalendar = last30.map((d) => {
    const key = format(d, "yyyy-MM-dd");
    return { date: key, active: activeDays.has(key) };
  });

  // --- weakest / strongest ---
  const activeSkills = Object.entries(skillXp).filter(([, xp]) => xp > 0) as [
    SkillId,
    number,
  ][];

  let weakestSkill: { skill: string; label: string; xp: number } | null = null;
  let strongestSkill: { skill: string; label: string; xp: number } | null =
    null;

  if (activeSkills.length > 0) {
    activeSkills.sort((a, b) => a[1] - b[1]);
    const weakId = activeSkills[0][0];
    const strongId = activeSkills[activeSkills.length - 1][0];
    const weakMeta = SKILLS.find((s) => s.id === weakId);
    const strongMeta = SKILLS.find((s) => s.id === strongId);
    weakestSkill = {
      skill: weakId,
      label: weakMeta?.label ?? weakId,
      xp: activeSkills[0][1],
    };
    strongestSkill = {
      skill: strongId,
      label: strongMeta?.label ?? strongId,
      xp: activeSkills[activeSkills.length - 1][1],
    };
  }

  // --- general stats ---
  const totalActiveDays = activeDays.size;
  const averageXpPerDay =
    totalActiveDays > 0
      ? Math.round((progress?.totalXp ?? 0) / totalActiveDays)
      : 0;

  return Response.json({
    dailyXp,
    skillBreakdown,
    weeklyCompletion,
    streakCalendar,
    weakestSkill,
    strongestSkill,
    totalActiveDays,
    averageXpPerDay,
    totalCompletedTasks: progress?.completedTaskIds?.length ?? 0,
    currentStreak: progress?.streak ?? 0,
    bestStreak: progress?.bestStreak ?? 0,
    vocabularyCount: vocabCount,
    journalCount: journalCount,
    recordingCount: recordingCount,
  });
});
