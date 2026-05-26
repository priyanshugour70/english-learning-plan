"use client";

import { useState } from "react";
import { Download, Save, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { useSettings } from "@/contexts/settings-context";
import { useProgress } from "@/contexts/progress-context";
import { useToast } from "@/contexts/toast-context";
import { useTheme } from "@/contexts/theme-context";
import { clearAllAppStorage, exportAllData, importAllData } from "@/lib/storage";

const TIME_OPTIONS = [10, 15, 20, 25, 30, 45, 60];

export default function SettingsPage() {
  const { settings, update } = useSettings();
  const { resetAll } = useProgress();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const [name, setName] = useState(settings.name);
  const [goal, setGoal] = useState(settings.goal);
  const [resetOpen, setResetOpen] = useState(false);

  function save() {
    update({ name: name.trim() || "friend", goal: goal.trim() });
    toast({ title: "Saved", variant: "success" });
  }

  function exportJson() {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fluent-path-export-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "Your data has been downloaded.", variant: "success" });
  }

  function importJson(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(reader.result as string);
        importAllData(obj);
        toast({ title: "Imported", description: "Reload to see changes.", variant: "success" });
        setTimeout(() => window.location.reload(), 800);
      } catch {
        toast({ title: "Import failed", description: "Invalid file.", variant: "info" });
      }
    };
    reader.readAsText(file);
  }

  function hardReset() {
    clearAllAppStorage();
    resetAll();
    setResetOpen(false);
    toast({ title: "Reset complete", description: "Reloading...", variant: "info" });
    setTimeout(() => window.location.reload(), 600);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-3xl mx-auto space-y-6 fade-up">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Settings</p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">Make it yours</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="goal">Your goal</Label>
            <Textarea id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} rows={3} />
          </div>
          <div className="flex justify-end">
            <Button onClick={save}>
              <Save className="h-4 w-4" /> Save changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Practice rhythm</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Sets your daily XP goal. Pick what you can actually do today.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {TIME_OPTIONS.map((m) => (
              <button
                key={m}
                onClick={() => {
                  update({ dailyTimeMinutes: m });
                  toast({ title: "Updated", description: `${m} min/day`, variant: "success" });
                }}
                className={`h-12 rounded-[var(--radius)] border text-sm font-medium transition-colors ${
                  settings.dailyTimeMinutes === m
                    ? "border-primary bg-primary-soft text-primary-soft-foreground"
                    : "border-border bg-surface text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {(["system", "light", "dark"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`h-12 rounded-[var(--radius)] border text-sm font-medium capitalize transition-colors ${
                  theme === t
                    ? "border-primary bg-primary-soft text-primary-soft-foreground"
                    : "border-border bg-surface text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your data</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Everything is saved locally on your device. Export to keep a backup.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={exportJson}>
              <Download className="h-4 w-4" /> Export data
            </Button>
            <label>
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) importJson(file);
                  e.target.value = "";
                }}
              />
              <span className="inline-flex h-10 px-4 items-center justify-center gap-2 rounded-[var(--radius)] border border-border bg-transparent text-sm font-medium cursor-pointer hover:bg-surface-muted">
                <Upload className="h-4 w-4" /> Import data
              </span>
            </label>
            <Button variant="danger" onClick={() => setResetOpen(true)}>
              <Trash2 className="h-4 w-4" /> Reset everything
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        title="Reset all data?"
        description="Wipes progress, vocabulary, journal entries and recordings. Cannot be undone."
      >
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setResetOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={hardReset}>Yes, reset everything</Button>
        </div>
      </Dialog>
    </div>
  );
}
