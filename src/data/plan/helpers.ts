import type { PlanTask, SkillId, TaskCategory, TaskKind } from "@/types";

export const XP_PER_MIN: Record<SkillId, number> = {
  speaking: 5,
  pronunciation: 5,
  listening: 4,
  writing: 5,
  reading: 4,
  vocabulary: 4,
  grammar: 4,
};

export function makeXp(skill: SkillId, minutes: number, bonus = 0) {
  return minutes * XP_PER_MIN[skill] + bonus;
}

interface MakeTaskInput {
  monthIndex: number;
  weekIndex: number;
  dayIndex: number;
  slot: number;
  skill: SkillId;
  category: TaskCategory;
  kind?: TaskKind;
  title: string;
  summary?: string;
  how?: string[];
  examples?: string[];
  resources?: { label: string; url?: string }[];
  minutes: number;
  bonus?: number;
}

export function task({
  monthIndex,
  weekIndex,
  dayIndex,
  slot,
  skill,
  category,
  kind = "checkbox",
  title,
  summary,
  how,
  examples,
  resources,
  minutes,
  bonus = 0,
}: MakeTaskInput): PlanTask {
  return {
    id: `m${monthIndex}-w${weekIndex}-d${dayIndex}-t${slot}`,
    title,
    summary,
    how,
    examples,
    resources,
    category,
    skill,
    kind,
    minutes,
    xp: makeXp(skill, minutes, bonus),
  };
}

/* Quick-build presets to keep the long-form content readable. */

export function vocabTask(args: Omit<MakeTaskInput, "skill" | "category" | "kind">) {
  return task({ ...args, skill: "vocabulary", category: "vocabulary", kind: "vocab" });
}

export function speakingTask(args: Omit<MakeTaskInput, "skill" | "category" | "kind">) {
  return task({ ...args, skill: "speaking", category: "speaking", kind: "record" });
}

export function mirrorTask(args: Omit<MakeTaskInput, "skill" | "category" | "kind">) {
  return task({ ...args, skill: "speaking", category: "speaking", kind: "mirror" });
}

export function shadowTask(args: Omit<MakeTaskInput, "skill" | "category" | "kind">) {
  return task({ ...args, skill: "pronunciation", category: "pronunciation", kind: "shadow" });
}

export function listeningTask(args: Omit<MakeTaskInput, "skill" | "category" | "kind">) {
  return task({ ...args, skill: "listening", category: "listening", kind: "timer" });
}

export function readingTask(args: Omit<MakeTaskInput, "skill" | "category" | "kind">) {
  return task({ ...args, skill: "reading", category: "reading", kind: "timer" });
}

export function writingTask(args: Omit<MakeTaskInput, "skill" | "category" | "kind">) {
  return task({ ...args, skill: "writing", category: "writing", kind: "journal" });
}

export function grammarTask(args: Omit<MakeTaskInput, "skill" | "category" | "kind">) {
  return task({ ...args, skill: "grammar", category: "grammar", kind: "checkbox" });
}

export function pronunciationTask(args: Omit<MakeTaskInput, "skill" | "category" | "kind">) {
  return task({ ...args, skill: "pronunciation", category: "pronunciation", kind: "checkbox" });
}

export function reflectionTask(args: Omit<MakeTaskInput, "skill" | "category" | "kind">) {
  return task({ ...args, skill: "writing", category: "reflection", kind: "journal" });
}
