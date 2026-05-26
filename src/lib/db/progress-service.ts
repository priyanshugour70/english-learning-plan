import "server-only";

import { ACHIEVEMENTS, evaluateUnlocks } from "@/data/achievements";
import { todayKey } from "@/lib/dates";
import { EMPTY_SKILL_XP, nextStreak } from "@/lib/gamification";
import type { CompletedTaskRecord, ProgressState, SkillId } from "@/types";

import { journalCol, progressCol, type ProgressDoc } from "./collections";
import { getPlan, getTaskById } from "./plan-service";

function emptyProgress(userId: string): ProgressDoc {
  const now = new Date().toISOString();
  return {
    userId,
    totalXp: 0,
    skillXp: { ...EMPTY_SKILL_XP },
    completedTaskIds: [],
    activeDays: [],
    history: [],
    streak: 0,
    bestStreak: 0,
    lastActiveDate: null,
    unlockedAchievementIds: [],
    startedAt: now,
    updatedAt: now,
  };
}

function toState(doc: ProgressDoc): ProgressState {
  return {
    totalXp: doc.totalXp,
    skillXp: { ...EMPTY_SKILL_XP, ...doc.skillXp },
    completedTaskIds: doc.completedTaskIds ?? [],
    activeDays: doc.activeDays ?? [],
    history: doc.history ?? [],
    streak: doc.streak ?? 0,
    bestStreak: doc.bestStreak ?? 0,
    lastActiveDate: doc.lastActiveDate ?? null,
    unlockedAchievementIds: doc.unlockedAchievementIds ?? [],
    startedAt: doc.startedAt,
  };
}

export async function getProgress(userId: string): Promise<ProgressState> {
  const col = await progressCol();
  const existing = await col.findOne({ userId });
  if (existing) return toState(existing);
  const fresh = emptyProgress(userId);
  await col.insertOne(fresh);
  return toState(fresh);
}

export async function resetProgress(userId: string): Promise<ProgressState> {
  const col = await progressCol();
  const fresh = emptyProgress(userId);
  await col.updateOne({ userId }, { $set: fresh }, { upsert: true });
  return toState(fresh);
}

export interface ToggleResult {
  state: ProgressState;
  unlocks: string[];
  xpDelta: number;
  achievements: typeof ACHIEVEMENTS;
}

/**
 * Toggle a task's completion state for a user. Server-side computes XP,
 * streak, active days, and achievement unlocks.
 */
export async function toggleTask(
  userId: string,
  taskId: string,
): Promise<ToggleResult | null> {
  const target = await getTaskById(taskId);
  if (!target) return null;

  const col = await progressCol();
  let doc: ProgressDoc | null = await col.findOne({ userId });
  if (!doc) {
    doc = emptyProgress(userId);
    await col.insertOne(doc);
  }

  const now = new Date();
  const day = todayKey(now);
  const isCurrentlyDone = doc.completedTaskIds.includes(taskId);
  let xpDelta = 0;
  let unlocks: string[] = [];
  let nextDoc: ProgressDoc;

  if (isCurrentlyDone) {
    xpDelta = -target.task.xp;
    const completedTaskIds = doc.completedTaskIds.filter((id) => id !== taskId);
    const history = doc.history.filter((h) => h.taskId !== taskId);
    const totalXp = Math.max(0, doc.totalXp + xpDelta);
    const skillXp: Record<SkillId, number> = {
      ...doc.skillXp,
      [target.task.skill]: Math.max(
        0,
        (doc.skillXp[target.task.skill] ?? 0) + xpDelta,
      ),
    } as Record<SkillId, number>;
    const days = Array.from(new Set(history.map((h) => h.date))).sort();
    const lastActiveDate = days[days.length - 1] ?? null;
    let streak = doc.streak;
    if (doc.lastActiveDate === day && !days.includes(day)) {
      streak = Math.max(0, doc.streak - 1);
    }
    nextDoc = {
      ...doc,
      totalXp,
      skillXp,
      completedTaskIds,
      history,
      activeDays: days,
      lastActiveDate,
      streak,
      updatedAt: now.toISOString(),
    };
  } else {
    xpDelta = target.task.xp;
    const completedTaskIds = [...doc.completedTaskIds, taskId];
    const record: CompletedTaskRecord = {
      taskId,
      monthIndex: target.monthIndex,
      weekIndex: target.weekIndex,
      dayIndex: target.dayIndex,
      skill: target.task.skill,
      xp: target.task.xp,
      date: day,
      completedAt: now.toISOString(),
    };
    const history = [...doc.history, record];
    const totalXp = doc.totalXp + xpDelta;
    const skillXp: Record<SkillId, number> = {
      ...doc.skillXp,
      [target.task.skill]:
        (doc.skillXp[target.task.skill] ?? 0) + target.task.xp,
    } as Record<SkillId, number>;
    const isNewDay =
      doc.lastActiveDate !== day && !doc.activeDays.includes(day);
    const activeDays = isNewDay
      ? [...doc.activeDays, day].sort()
      : doc.activeDays;
    const newStreak = nextStreak(
      { streak: doc.streak, lastActiveDate: doc.lastActiveDate },
      day,
    );
    const bestStreak = Math.max(doc.bestStreak, newStreak);

    const candidate: ProgressDoc = {
      ...doc,
      totalXp,
      skillXp,
      completedTaskIds,
      history,
      activeDays,
      lastActiveDate: day,
      streak: newStreak,
      bestStreak,
      updatedAt: now.toISOString(),
    };

    const journals = await journalCol();
    const journalCount = await journals.countDocuments({ userId });
    const planEnd = await monthCompleteUnlock(userId, candidate);
    const graduateUnlock = await graduateUnlock_(candidate);
    const baseUnlocks = evaluateUnlocks({
      state: toState(candidate),
      lastMonthIndex: target.monthIndex,
      lastHour: now.getHours(),
      journalCount,
    });
    unlocks = Array.from(
      new Set([...baseUnlocks, ...planEnd, ...graduateUnlock]),
    );

    nextDoc = {
      ...candidate,
      unlockedAchievementIds: [
        ...candidate.unlockedAchievementIds,
        ...unlocks,
      ],
    };
  }

  await col.replaceOne({ userId }, nextDoc, { upsert: true });

  return {
    state: toState(nextDoc),
    unlocks,
    xpDelta,
    achievements: ACHIEVEMENTS,
  };
}

async function monthCompleteUnlock(
  userId: string,
  state: ProgressDoc,
): Promise<string[]> {
  const owned = new Set(state.unlockedAchievementIds);
  if (owned.has("month_complete")) return [];
  const plan = await getPlan();
  for (const m of plan) {
    const ids = m.weeks.flatMap((w) =>
      w.days.flatMap((d) => d.tasks.map((t) => t.id)),
    );
    if (ids.length > 0 && ids.every((id) => state.completedTaskIds.includes(id))) {
      return ["month_complete"];
    }
  }
  return [];
}

async function graduateUnlock_(state: ProgressDoc): Promise<string[]> {
  const owned = new Set(state.unlockedAchievementIds);
  if (owned.has("graduate")) return [];
  const plan = await getPlan();
  const ids = plan.flatMap((m) =>
    m.weeks.flatMap((w) => w.days.flatMap((d) => d.tasks.map((t) => t.id))),
  );
  if (ids.length > 0 && ids.every((id) => state.completedTaskIds.includes(id))) {
    return ["graduate"];
  }
  return [];
}
