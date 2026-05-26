"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { useSettings } from "@/contexts/settings-context";

export function OnboardingScreen() {
  const { settings, update, completeOnboarding } = useSettings();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(settings.name);
  const [goal, setGoal] = useState(settings.goal);
  const [minutes, setMinutes] = useState(settings.dailyTimeMinutes);

  function finish() {
    update({ name: name.trim() || "friend", goal: goal.trim(), dailyTimeMinutes: minutes });
    completeOnboarding();
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-background via-background to-primary-soft/40">
      <div className="absolute inset-0 bg-dot opacity-40 pointer-events-none" />
      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-12">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Fluent Path · welcome
        </div>
        <Card className="w-full p-7 sm:p-8 fade-up">
          {step === 0 ? (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Hey 👋</h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Six months from now, you&apos;ll speak English with calm and
                  confidence. Let&apos;s set the stage in 30 seconds.
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="name">What should we call you?</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoFocus
                />
              </div>
              <div className="flex justify-end pt-1">
                <Button onClick={() => setStep(1)} disabled={!name.trim()}>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  What&apos;s the dream?
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  One sentence is enough. You can update this any time.
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="goal">Your goal</Label>
                <Textarea
                  id="goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  rows={3}
                  placeholder="e.g. Be fluent enough to lead engineering meetings without rehearsing."
                />
              </div>
              <div className="flex justify-between pt-1">
                <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
                <Button onClick={() => setStep(2)}>
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">How much time per day?</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Pick what&apos;s realistic. You can do more on great days.
                  20–30 minutes is the sweet spot.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[15, 20, 30, 45].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMinutes(m)}
                    className={`h-12 rounded-[var(--radius)] border text-sm font-medium transition-colors ${
                      minutes === m
                        ? "border-primary bg-primary-soft text-primary-soft-foreground"
                        : "border-border bg-surface text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                    }`}
                  >
                    {m} min
                  </button>
                ))}
              </div>
              <div className="rounded-[var(--radius)] border border-border bg-surface-muted/50 p-3 text-xs text-muted-foreground leading-relaxed">
                Tip: open the app once a day. Even 1 task keeps your streak alive. Streaks change everything.
              </div>
              <div className="flex justify-between pt-1">
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={finish}>
                  Start my journey
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : null}
        </Card>
        <p className="mt-6 text-xs text-muted-foreground text-center">
          Everything is saved on your device. No accounts, no tracking.
        </p>
      </div>
    </div>
  );
}
