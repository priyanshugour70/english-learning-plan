"use client";

import { Lock, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ACHIEVEMENTS } from "@/data/achievements";
import { useProgress } from "@/contexts/progress-context";
import { levelFromXp } from "@/lib/gamification";
import { percent } from "@/lib/utils";

const tierLabels = ["Bronze", "Silver", "Gold", "Diamond"] as const;

export default function AchievementsPage() {
  const { state } = useProgress();
  const unlocked = new Set(state.unlockedAchievementIds);
  const total = ACHIEVEMENTS.length;
  const unlockedCount = ACHIEVEMENTS.filter((a) => unlocked.has(a.id)).length;
  const pct = percent(unlockedCount, total);
  const level = levelFromXp(state.totalXp);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-5xl mx-auto space-y-6 fade-up">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Achievements</p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">Your trophy shelf</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {unlockedCount} of {total} unlocked · Level {level.level} ({level.title})
        </p>
        <div className="mt-3 max-w-md">
          <Progress value={pct} tone="primary" size="md" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((a) => {
          const isUnlocked = unlocked.has(a.id);
          return (
            <Card
              key={a.id}
              className={isUnlocked ? "border-primary/30 bg-primary-soft/20" : "opacity-80"}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{a.icon}</div>
                    <div>
                      <CardTitle className="text-[15px]">{a.title}</CardTitle>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {tierLabels[a.tier - 1]}
                      </p>
                    </div>
                  </div>
                  {isUnlocked ? (
                    <Badge tone="success">
                      <Trophy className="h-3 w-3" /> Unlocked
                    </Badge>
                  ) : (
                    <Badge tone="neutral">
                      <Lock className="h-3 w-3" /> Locked
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                {a.description}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
