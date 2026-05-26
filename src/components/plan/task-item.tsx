"use client";

import { ChevronDown, ChevronUp, Clock, Zap } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { SKILL_EMOJI, SKILL_LABELS } from "@/lib/gamification";
import { useProgress } from "@/contexts/progress-context";
import { useToast } from "@/contexts/toast-context";
import { useJournal } from "@/contexts/journal-context";
import { ACHIEVEMENTS } from "@/data/achievements";
import { cn } from "@/lib/utils";
import type { PlanTask } from "@/types";

interface TaskItemProps {
  task: PlanTask;
}

const skillTone: Record<string, "emerald" | "sky" | "amber" | "violet" | "rose" | "orange" | "pink"> = {
  speaking: "emerald",
  listening: "sky",
  reading: "violet",
  writing: "amber",
  vocabulary: "pink",
  grammar: "orange",
  pronunciation: "rose",
};

export function TaskItem({ task }: TaskItemProps) {
  const { isTaskComplete, toggleTask } = useProgress();
  const { entries: journalEntries } = useJournal();
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);

  const done = isTaskComplete(task.id);

  function handleToggle(next: boolean) {
    const result = toggleTask(task.id, journalEntries.length);
    if (!result) return;
    if (next && result.xpDelta > 0) {
      toast({
        title: `+${result.xpDelta} XP earned`,
        description: task.title,
        variant: "xp",
      });
      result.unlocks.forEach((id) => {
        const def = ACHIEVEMENTS.find((a) => a.id === id);
        if (def) {
          setTimeout(() => {
            toast({
              title: `Achievement: ${def.title}`,
              description: def.description,
              variant: "achievement",
              duration: 4500,
            });
          }, 600);
        }
      });
    }
  }

  return (
    <div
      className={cn(
        "rounded-[var(--radius)] border border-border bg-surface transition-all",
        done && "bg-primary-soft/30 border-primary/20",
        expanded && "shadow-sm",
      )}
    >
      <div className="flex items-start gap-3 p-3.5 sm:p-4">
        <div className="pt-0.5">
          <Checkbox
            checked={done}
            onCheckedChange={handleToggle}
            aria-label={`Mark complete: ${task.title}`}
          />
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex-1 min-w-0 text-left"
        >
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="text-[11px] font-medium text-muted-foreground inline-flex items-center gap-1"
              aria-hidden="true"
            >
              <span>{SKILL_EMOJI[task.skill]}</span>
              <span>{SKILL_LABELS[task.skill]}</span>
            </span>
            <span className="text-muted-foreground/30">·</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3" /> {task.minutes} min
            </span>
            <span className="text-muted-foreground/30">·</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-violet font-medium">
              <Zap className="h-3 w-3" /> {task.xp} XP
            </span>
          </div>
          <div
            className={cn(
              "text-sm font-medium leading-snug text-foreground",
              done && "line-through opacity-70",
            )}
          >
            {task.title}
          </div>
          {task.summary ? (
            <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
              {task.summary}
            </p>
          ) : null}
        </button>
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Collapse details" : "Expand details"}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-muted hover:text-foreground"
        >
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>

      {expanded ? (
        <div className="border-t border-border px-4 sm:px-5 py-4 space-y-4 fade-up">
          {task.how && task.how.length > 0 ? (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                How to do it
              </div>
              <ol className="space-y-1.5">
                {task.how.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-foreground/85"
                  >
                    <span className="flex-shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-soft text-primary-soft-foreground text-[10px] font-semibold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {task.examples && task.examples.length > 0 ? (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Examples
              </div>
              <div className="space-y-1.5">
                {task.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-[var(--radius-sm)] border border-border bg-surface-muted/50 px-3 py-2 text-[13px] text-foreground/85 leading-relaxed"
                  >
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {task.resources && task.resources.length > 0 ? (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Resources
              </div>
              <ul className="space-y-1">
                {task.resources.map((r, i) => (
                  <li key={i}>
                    {r.url ? (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {r.label}
                      </a>
                    ) : (
                      <span className="text-sm text-foreground/80">
                        {r.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <Badge tone={skillTone[task.skill] ?? "neutral"}>{task.category}</Badge>
            <span>Task id: {task.id}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
