"use client";

import { useMemo, useState } from "react";
import { BookOpen, Brain, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { useVocabulary } from "@/contexts/vocabulary-context";
import { useToast } from "@/contexts/toast-context";
import { format } from "date-fns";

export default function VocabularyPage() {
  const { entries, dueToday, add, remove, markReview } = useVocabulary();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | "due" | "mastered">("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    let list = entries;
    if (tab === "due") list = dueToday;
    if (tab === "mastered") list = entries.filter((e) => e.box >= 4);
    if (!q) return list;
    return list.filter(
      (e) =>
        e.word.toLowerCase().includes(q) ||
        e.meaning.toLowerCase().includes(q) ||
        (e.exampleSentence ?? "").toLowerCase().includes(q),
    );
  }, [entries, dueToday, tab, query]);

  const mastered = entries.filter((e) => e.box >= 4).length;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-5xl mx-auto space-y-6 fade-up">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Vocabulary</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">Your word bank</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {entries.length} words saved · {dueToday.length} due today · {mastered} mastered
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setReviewOpen(true)}
            disabled={dueToday.length === 0}
          >
            <Brain className="h-4 w-4" /> Review ({dueToday.length})
          </Button>
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Add word
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as typeof tab)}
          items={[
            { value: "all", label: `All (${entries.length})` },
            { value: "due", label: `Due (${dueToday.length})` },
            { value: "mastered", label: `Mastered (${mastered})` },
          ]}
        />
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search words…"
            className="pl-9 h-9"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="h-5 w-5" />}
          title="No words yet"
          description="Add words you want to use this week. Even 5 a day builds a strong bank in a month."
          action={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add your first word</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((e) => (
            <Card key={e.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{e.word}</CardTitle>
                  <Badge tone={e.box >= 4 ? "success" : e.box >= 3 ? "primary" : "neutral"}>
                    Box {e.box}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{e.meaning}</p>
              </CardHeader>
              <CardContent className="pt-0">
                {e.exampleSentence ? (
                  <p className="text-[13px] italic text-foreground/80 border-l-2 border-primary/50 pl-3 leading-relaxed">
                    &ldquo;{e.exampleSentence}&rdquo;
                  </p>
                ) : null}
                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Added {format(new Date(e.createdAt), "MMM d")}</span>
                  <button
                    onClick={() => {
                      remove(e.id);
                      toast({ title: "Word removed", variant: "info" });
                    }}
                    className="inline-flex items-center gap-1 hover:text-danger"
                    aria-label={`Delete ${e.word}`}
                  >
                    <Trash2 className="h-3 w-3" /> Delete
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddWordDialog
        open={open}
        onOpenChange={setOpen}
        onAdd={(input) => {
          add(input);
          toast({ title: `Added "${input.word}"`, variant: "success" });
        }}
      />
      <ReviewDialog
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        onMark={(id, knew) => markReview(id, knew)}
      />
    </div>
  );
}

function AddWordDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (input: { word: string; meaning: string; exampleSentence?: string }) => void;
}) {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");

  function submit() {
    if (!word.trim() || !meaning.trim()) return;
    onAdd({ word: word.trim(), meaning: meaning.trim(), exampleSentence: example.trim() || undefined });
    setWord("");
    setMeaning("");
    setExample("");
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add a new word"
      description="A meaning + an example sentence makes it stick 3x better."
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="word">Word</Label>
          <Input id="word" value={word} onChange={(e) => setWord(e.target.value)} placeholder="e.g. align" autoFocus />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="meaning">Meaning</Label>
          <Input id="meaning" value={meaning} onChange={(e) => setMeaning(e.target.value)} placeholder="e.g. agree on a shared direction" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ex">Example sentence (optional)</Label>
          <Textarea id="ex" value={example} onChange={(e) => setExample(e.target.value)} rows={2} placeholder="Let's align on what we ship this week." />
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} disabled={!word.trim() || !meaning.trim()}>Add word</Button>
        </div>
      </div>
    </Dialog>
  );
}

function ReviewDialog({
  open,
  onOpenChange,
  onMark,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMark: (id: string, knew: boolean) => void;
}) {
  const { dueToday } = useVocabulary();
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const current = dueToday[idx];

  function next(knew: boolean) {
    if (!current) return;
    onMark(current.id, knew);
    if (idx + 1 >= dueToday.length) {
      onOpenChange(false);
      setIdx(0);
      setRevealed(false);
    } else {
      setIdx((i) => i + 1);
      setRevealed(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) {
          setIdx(0);
          setRevealed(false);
        }
      }}
      title={current ? `${idx + 1} / ${dueToday.length}` : "All caught up"}
    >
      {!current ? (
        <p className="text-sm text-muted-foreground">No words due. Come back tomorrow.</p>
      ) : (
        <div className="space-y-5">
          <div className="rounded-[var(--radius-lg)] border border-border bg-surface-muted/50 p-6 text-center">
            <div className="text-2xl font-semibold tracking-tight">{current.word}</div>
            {revealed ? (
              <div className="mt-3 space-y-2 fade-up">
                <p className="text-sm text-foreground">{current.meaning}</p>
                {current.exampleSentence ? (
                  <p className="text-[13px] italic text-muted-foreground">
                    &ldquo;{current.exampleSentence}&rdquo;
                  </p>
                ) : null}
              </div>
            ) : (
              <button onClick={() => setRevealed(true)} className="mt-4 text-xs text-primary hover:underline">
                Tap to reveal
              </button>
            )}
          </div>

          {revealed ? (
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => next(false)}>
                Didn&apos;t know
              </Button>
              <Button onClick={() => next(true)}>Got it</Button>
            </div>
          ) : (
            <Button fullWidth onClick={() => setRevealed(true)}>Show answer</Button>
          )}
        </div>
      )}
    </Dialog>
  );
}
