export type SkillId =
  | "speaking"
  | "listening"
  | "reading"
  | "writing"
  | "vocabulary"
  | "grammar"
  | "pronunciation";

export type TaskCategory =
  | "warmup"
  | "vocabulary"
  | "grammar"
  | "listening"
  | "speaking"
  | "writing"
  | "pronunciation"
  | "reading"
  | "reflection"
  | "challenge";

export type TaskKind =
  | "checkbox"
  | "timer"
  | "record"
  | "journal"
  | "vocab"
  | "shadow"
  | "mirror";

export interface PlanTask {
  /** Stable id within a day, e.g. "m1-w1-d1-t1" */
  id: string;
  title: string;
  /** Short instruction shown by default */
  summary?: string;
  /** Longer "how to" — expanded view */
  how?: string[];
  /** Concrete examples / sentences / words */
  examples?: string[];
  /** External or in-app resources */
  resources?: { label: string; url?: string }[];
  category: TaskCategory;
  skill: SkillId;
  kind: TaskKind;
  /** Suggested minutes; used for timers + planning */
  minutes: number;
  xp: number;
}

export interface PlanDay {
  /** 1..7 */
  index: number;
  label: string;
  theme: string;
  tasks: PlanTask[];
}

export interface PlanWeek {
  /** 1..4 */
  index: number;
  title: string;
  focus: string;
  objective: string;
  outcomes: string[];
  days: PlanDay[];
}

export type AccentToken =
  | "emerald"
  | "sky"
  | "amber"
  | "violet"
  | "rose"
  | "orange"
  | "pink";

export interface PlanMonth {
  /** 1..6 */
  index: number;
  title: string;
  focus: string;
  tagline: string;
  description: string;
  icon: string;
  accent: AccentToken;
  weeks: PlanWeek[];
  tip: string;
}

export type Plan = PlanMonth[];

/* -------------------------------------------------------------------------- */
/* Progress / gamification                                                    */
/* -------------------------------------------------------------------------- */

export interface CompletedTaskRecord {
  taskId: string;
  monthIndex: number;
  weekIndex: number;
  dayIndex: number;
  skill: SkillId;
  xp: number;
  /** YYYY-MM-DD */
  date: string;
  /** ISO timestamp */
  completedAt: string;
}

export interface ProgressState {
  totalXp: number;
  skillXp: Record<SkillId, number>;
  /** Set of task ids the user has marked complete */
  completedTaskIds: string[];
  /** Days the user did at least one task, sorted ascending */
  activeDays: string[];
  /** Daily history records */
  history: CompletedTaskRecord[];
  streak: number;
  bestStreak: number;
  /** Last day the user completed at least one task */
  lastActiveDate: string | null;
  unlockedAchievementIds: string[];
  /** First day the user opened the app */
  startedAt: string;
}

export interface VocabularyEntry {
  id: string;
  word: string;
  meaning: string;
  exampleSentence?: string;
  partOfSpeech?: string;
  tags?: string[];
  /** Spaced-repetition box (1..5). Higher = known better. */
  box: 1 | 2 | 3 | 4 | 5;
  /** ISO date last reviewed */
  lastReviewedAt?: string;
  /** ISO date next due */
  nextReviewAt?: string;
  /** Times reviewed */
  reviewCount: number;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  prompt?: string;
  text: string;
  wordCount: number;
  mood?: "great" | "good" | "ok" | "tough" | "struggling";
  updatedAt: string;
  createdAt: string;
}

export interface RecordingSession {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  prompt: string;
  /** Duration in seconds */
  duration: number;
  /** Approximate WPM if known */
  wpm?: number;
  selfRating?: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  createdAt: string;
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: AccentToken;
  /** Used to surface in lists; lower = earlier */
  tier: 1 | 2 | 3 | 4;
}

export interface UserSettings {
  name: string;
  goal: string;
  dailyTimeMinutes: number;
  reminderHour: number;
  theme: "system" | "light" | "dark";
  onboardingCompletedAt: string | null;
}
