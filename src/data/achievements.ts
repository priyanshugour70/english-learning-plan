import type { AchievementDef, ProgressState } from "@/types";

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: "first_step",
    title: "First Step",
    description: "Complete your very first task.",
    icon: "🚀",
    accent: "emerald",
    tier: 1,
  },
  {
    id: "streak_3",
    title: "Warming Up",
    description: "Practice 3 days in a row.",
    icon: "🔥",
    accent: "amber",
    tier: 1,
  },
  {
    id: "streak_7",
    title: "Week-Long Warrior",
    description: "A full week of daily practice.",
    icon: "🔥",
    accent: "orange",
    tier: 2,
  },
  {
    id: "streak_30",
    title: "Habit Locked In",
    description: "30-day streak. This is who you are now.",
    icon: "🌟",
    accent: "amber",
    tier: 3,
  },
  {
    id: "streak_100",
    title: "Triple Digits",
    description: "100 consecutive days. Unstoppable.",
    icon: "🏆",
    accent: "amber",
    tier: 4,
  },
  {
    id: "xp_500",
    title: "Climbing",
    description: "Earn 500 XP total.",
    icon: "⚡",
    accent: "violet",
    tier: 1,
  },
  {
    id: "xp_2000",
    title: "Momentum",
    description: "Earn 2,000 XP total.",
    icon: "⚡",
    accent: "violet",
    tier: 2,
  },
  {
    id: "xp_5000",
    title: "Force of Nature",
    description: "Earn 5,000 XP total.",
    icon: "💎",
    accent: "violet",
    tier: 3,
  },
  {
    id: "speaker_50",
    title: "Speaker",
    description: "Earn 50 XP in Speaking.",
    icon: "🗣️",
    accent: "emerald",
    tier: 1,
  },
  {
    id: "listener_50",
    title: "Listener",
    description: "Earn 50 XP in Listening.",
    icon: "🎧",
    accent: "sky",
    tier: 1,
  },
  {
    id: "writer_50",
    title: "Wordsmith",
    description: "Earn 50 XP in Writing.",
    icon: "✍️",
    accent: "amber",
    tier: 1,
  },
  {
    id: "vocab_100",
    title: "Word Collector",
    description: "Earn 100 XP in Vocabulary.",
    icon: "🧠",
    accent: "pink",
    tier: 2,
  },
  {
    id: "month_complete",
    title: "Month Done",
    description: "Finish every task in a single month.",
    icon: "📅",
    accent: "emerald",
    tier: 2,
  },
  {
    id: "journal_7",
    title: "Reflective",
    description: "Write 7 journal entries.",
    icon: "📓",
    accent: "violet",
    tier: 2,
  },
  {
    id: "early_bird",
    title: "Early Bird",
    description: "Complete a task before 9 AM.",
    icon: "🌅",
    accent: "orange",
    tier: 1,
  },
  {
    id: "night_owl",
    title: "Night Owl",
    description: "Complete a task after 10 PM.",
    icon: "🌙",
    accent: "violet",
    tier: 1,
  },
  {
    id: "all_skills",
    title: "Renaissance",
    description: "Earn XP in every skill.",
    icon: "🎨",
    accent: "rose",
    tier: 3,
  },
  {
    id: "polyglot",
    title: "Polyglot Path",
    description: "Reach Level 10.",
    icon: "🌍",
    accent: "sky",
    tier: 3,
  },
  {
    id: "graduate",
    title: "Six-Month Graduate",
    description: "Complete the entire 6-month plan.",
    icon: "🎓",
    accent: "emerald",
    tier: 4,
  },
];

export interface AchievementContext {
  state: ProgressState;
  /** monthIndex (1..6) of last task, when applicable */
  lastMonthIndex?: number;
  /** number of journal entries the user has written */
  journalCount?: number;
  /** hour of day (0-23) of the last completed task */
  lastHour?: number;
}

export function evaluateUnlocks(ctx: AchievementContext): string[] {
  const { state, lastHour, journalCount = 0 } = ctx;
  const owned = new Set(state.unlockedAchievementIds);
  const unlocks: string[] = [];

  const check = (id: string, condition: boolean) => {
    if (condition && !owned.has(id)) unlocks.push(id);
  };

  check("first_step", state.completedTaskIds.length >= 1);
  check("streak_3", state.streak >= 3);
  check("streak_7", state.streak >= 7);
  check("streak_30", state.streak >= 30);
  check("streak_100", state.streak >= 100);
  check("xp_500", state.totalXp >= 500);
  check("xp_2000", state.totalXp >= 2000);
  check("xp_5000", state.totalXp >= 5000);
  check("speaker_50", state.skillXp.speaking >= 50);
  check("listener_50", state.skillXp.listening >= 50);
  check("writer_50", state.skillXp.writing >= 50);
  check("vocab_100", state.skillXp.vocabulary >= 100);
  check("journal_7", journalCount >= 7);
  check("early_bird", lastHour != null && lastHour < 9);
  check("night_owl", lastHour != null && lastHour >= 22);
  check(
    "all_skills",
    Object.values(state.skillXp).every((v) => v > 0),
  );

  return unlocks;
}
