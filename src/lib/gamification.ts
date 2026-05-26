import type { SkillId } from "@/types";

export const SKILLS: { id: SkillId; label: string; emoji: string; accent: string; description: string }[] = [
  {
    id: "speaking",
    label: "Speaking",
    emoji: "🗣️",
    accent: "emerald",
    description: "Talk out loud, every day.",
  },
  {
    id: "listening",
    label: "Listening",
    emoji: "🎧",
    accent: "sky",
    description: "Train your ear with real English.",
  },
  {
    id: "reading",
    label: "Reading",
    emoji: "📖",
    accent: "violet",
    description: "Read short, real-world content.",
  },
  {
    id: "writing",
    label: "Writing",
    emoji: "✍️",
    accent: "amber",
    description: "Think in English by writing it down.",
  },
  {
    id: "vocabulary",
    label: "Vocabulary",
    emoji: "🧠",
    accent: "pink",
    description: "Grow your word bank one day at a time.",
  },
  {
    id: "grammar",
    label: "Grammar",
    emoji: "📐",
    accent: "orange",
    description: "Patterns that make English click.",
  },
  {
    id: "pronunciation",
    label: "Pronunciation",
    emoji: "🎙️",
    accent: "rose",
    description: "Sound clear, calm and confident.",
  },
];

export const SKILL_LABELS: Record<SkillId, string> = Object.fromEntries(
  SKILLS.map((s) => [s.id, s.label]),
) as Record<SkillId, string>;

export const SKILL_EMOJI: Record<SkillId, string> = Object.fromEntries(
  SKILLS.map((s) => [s.id, s.emoji]),
) as Record<SkillId, string>;

export const EMPTY_SKILL_XP: Record<SkillId, number> = {
  speaking: 0,
  listening: 0,
  reading: 0,
  writing: 0,
  vocabulary: 0,
  grammar: 0,
  pronunciation: 0,
};

export interface LevelInfo {
  level: number;
  title: string;
  /** XP into the current level */
  intoLevel: number;
  /** XP needed for the current level */
  forLevel: number;
  /** XP threshold at which current level starts */
  thresholdStart: number;
  /** XP threshold at which next level starts */
  thresholdNext: number;
  /** Percent into level */
  pct: number;
}

const LEVEL_TITLES = [
  "Spark", // L1
  "Beginner",
  "Builder",
  "Explorer",
  "Connector",
  "Speaker",
  "Storyteller",
  "Communicator",
  "Confident",
  "Articulate",
  "Fluent",
  "Eloquent",
  "Master",
];

/**
 * XP curve: each level needs slightly more XP than the previous.
 * L1->L2 = 100 XP, L2->L3 = 140 XP, ... ramp ~+40 per level, capped at +100.
 */
function xpForLevel(level: number) {
  if (level <= 1) return 100;
  const extra = Math.min(40 * (level - 1), 600);
  return 100 + extra;
}

export function levelFromXp(totalXp: number): LevelInfo {
  let level = 1;
  let cumulative = 0;
  while (true) {
    const need = xpForLevel(level);
    if (totalXp < cumulative + need) {
      const intoLevel = totalXp - cumulative;
      const pct = Math.max(0, Math.min(100, Math.round((intoLevel / need) * 100)));
      return {
        level,
        title: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
        intoLevel,
        forLevel: need,
        thresholdStart: cumulative,
        thresholdNext: cumulative + need,
        pct,
      };
    }
    cumulative += need;
    level += 1;
    if (level > 999) break;
  }
  return {
    level,
    title: LEVEL_TITLES[LEVEL_TITLES.length - 1],
    intoLevel: 0,
    forLevel: 0,
    thresholdStart: cumulative,
    thresholdNext: cumulative,
    pct: 100,
  };
}

/**
 * Compute the new streak given the previous lastActive date and today's date.
 * - same day: keep the streak as-is
 * - yesterday: streak + 1
 * - else: reset to 1 (today counts)
 */
export function nextStreak(
  prev: { streak: number; lastActiveDate: string | null },
  todayKey: string,
): number {
  if (prev.lastActiveDate === todayKey) return Math.max(1, prev.streak);
  if (!prev.lastActiveDate) return 1;
  const last = new Date(`${prev.lastActiveDate}T00:00:00`);
  const today = new Date(`${todayKey}T00:00:00`);
  const diff = Math.round((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 1) return prev.streak + 1;
  if (diff === 0) return Math.max(1, prev.streak);
  return 1;
}

/** Default XP per minute when not specified — used to estimate "today" totals. */
export const XP_PER_MINUTE = 4;
