"use client";

import { SKILLS } from "@/lib/gamification";
import { useProgress } from "@/contexts/progress-context";
import { cn } from "@/lib/utils";

const accentMap: Record<string, { stroke: string; ring: string }> = {
  emerald: { stroke: "stroke-emerald", ring: "text-emerald" },
  sky: { stroke: "stroke-sky", ring: "text-sky" },
  violet: { stroke: "stroke-violet", ring: "text-violet" },
  amber: { stroke: "stroke-amber", ring: "text-amber" },
  pink: { stroke: "stroke-pink", ring: "text-pink" },
  orange: { stroke: "stroke-orange", ring: "text-orange" },
  rose: { stroke: "stroke-rose", ring: "text-rose" },
};

function SkillRing({
  label,
  emoji,
  value,
  accent,
}: {
  label: string;
  emoji: string;
  value: number;
  accent: string;
}) {
  // Soft growth: 200 xp = "full" ring (so feedback is visible early)
  const pct = Math.max(0, Math.min(100, (value / 200) * 100));
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const a = accentMap[accent] ?? accentMap.emerald;

  return (
    <div className="flex items-center gap-3 rounded-[var(--radius)] border border-border bg-surface p-3">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
          <circle
            cx="28"
            cy="28"
            r={radius}
            strokeWidth="5"
            fill="transparent"
            className="stroke-surface-muted"
          />
          <circle
            cx="28"
            cy="28"
            r={radius}
            strokeWidth="5"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn(a.stroke, "transition-[stroke-dashoffset] duration-700")}
          />
        </svg>
        <span className="absolute text-base" aria-hidden="true">{emoji}</span>
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium text-foreground">{label}</div>
        <div className={cn("text-[11px] font-semibold", a.ring)}>{value} XP</div>
      </div>
    </div>
  );
}

export function SkillRings() {
  const { state, hydrated } = useProgress();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
      {SKILLS.map((s) => (
        <SkillRing
          key={s.id}
          label={s.label}
          emoji={s.emoji}
          value={hydrated ? state.skillXp[s.id] ?? 0 : 0}
          accent={s.accent}
        />
      ))}
    </div>
  );
}
