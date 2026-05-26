"use client";

import { useMemo, useState } from "react";
import { NotebookPen, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { useJournal } from "@/contexts/journal-context";
import { useToast } from "@/contexts/toast-context";
import { format } from "date-fns";
import type { JournalEntry } from "@/types";

const PROMPTS = [
  "What did you do today, in 5 simple English sentences?",
  "Describe a moment when English felt easier than yesterday.",
  "What's one thing you want to be able to say but can't yet?",
  "Tell a 4-sentence story about something that happened today.",
  "What would you say to your past-self from a month ago?",
  "Describe your perfect workday — in English.",
  "What's a word you used today that surprised you?",
];

const MOODS: { id: JournalEntry["mood"]; label: string; emoji: string }[] = [
  { id: "great", label: "Great", emoji: "🔥" },
  { id: "good", label: "Good", emoji: "🙂" },
  { id: "ok", label: "Okay", emoji: "😐" },
  { id: "tough", label: "Tough", emoji: "😬" },
  { id: "struggling", label: "Struggling", emoji: "🥲" },
];

export default function JournalPage() {
  const { entries, todayEntry, upsertToday, remove } = useJournal();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [mood, setMood] = useState<JournalEntry["mood"]>("good");
  const [prompt, setPrompt] = useState(PROMPTS[0]);

  // Hydrate the form from today's saved entry the first time it appears
  // (React 19 "adjusting state on prop change" pattern — preferable to
  // syncing via useEffect).
  const [lastHydratedId, setLastHydratedId] = useState<string | null>(null);
  if (todayEntry && lastHydratedId !== todayEntry.id) {
    setLastHydratedId(todayEntry.id);
    setText(todayEntry.text);
    if (todayEntry.mood) setMood(todayEntry.mood);
    if (todayEntry.prompt) setPrompt(todayEntry.prompt);
  }

  function save() {
    if (!text.trim()) return;
    upsertToday(text, mood, prompt);
    toast({ title: "Saved", description: `${text.trim().split(/\s+/).length} words`, variant: "success" });
  }

  const recent = useMemo(() => entries.slice(0, 8), [entries]);
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-4xl mx-auto space-y-6 fade-up">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Journal</p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">Write in English daily</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          5 sentences a day is enough to rewire how you think.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Prompt</Label>
            <div className="flex flex-wrap gap-1.5">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPrompt(p)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                    prompt === p
                      ? "bg-primary-soft border-primary/30 text-primary-soft-foreground"
                      : "bg-surface border-border text-muted-foreground hover:bg-surface-muted"
                  }`}
                >
                  {p.length > 60 ? `${p.slice(0, 55)}…` : p}
                </button>
              ))}
            </div>
          </div>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Write your thoughts in English..."
            className="min-h-[180px]"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  className={`h-9 w-9 rounded-full text-base transition-all ${
                    mood === m.id
                      ? "bg-primary-soft ring-2 ring-primary scale-110"
                      : "bg-surface-muted hover:bg-surface-hover"
                  }`}
                  aria-label={m.label}
                >
                  {m.emoji}
                </button>
              ))}
              <span className="ml-2 text-[11px] text-muted-foreground">How was today?</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground">{wordCount} words</span>
              <Button onClick={save} disabled={!text.trim()}>
                <Save className="h-4 w-4" /> Save entry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-sm font-semibold">Past entries</h2>
        {recent.length === 0 ? (
          <EmptyState
            icon={<NotebookPen className="h-5 w-5" />}
            title="No entries yet"
            description="Write today's entry above to start your journal."
          />
        ) : (
          <div className="space-y-2.5">
            {recent.map((e) => (
              <Card key={e.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{format(new Date(`${e.date}T00:00:00`), "EEEE, MMM d")}</div>
                      {e.prompt ? (
                        <p className="mt-0.5 text-xs text-muted-foreground italic line-clamp-1">
                          &ldquo;{e.prompt}&rdquo;
                        </p>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone="neutral">{e.wordCount} words</Badge>
                      <button
                        onClick={() => remove(e.id)}
                        className="text-muted-foreground hover:text-danger"
                        aria-label="Delete entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-foreground/85 whitespace-pre-wrap leading-relaxed">
                    {e.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
