"use client";

import { useState } from "react";
import { Mic, Shuffle, Star, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Recorder } from "@/components/practice/recorder";
import { useRecordings } from "@/contexts/recordings-context";
import { format } from "date-fns";

const PROMPTS = {
  speaking: [
    "Tell me about your last great work day.",
    "Explain something you built recently — to a 10-year-old.",
    "Describe your morning routine in detail.",
    "What's the hardest decision you've made at work? Why?",
    "Walk me through your week ahead.",
    "Tell me about a teammate you admire — and why.",
    "Convince me that your favorite tool is the best.",
    "What would you change about your current role?",
  ],
  interview: [
    "Tell me about yourself in 2 minutes.",
    "Walk me through a recent project you're proud of.",
    "Describe a time you disagreed with a teammate.",
    "What's the toughest feedback you've received?",
    "Why do you want to work here?",
    "Where do you see yourself in 3 years?",
    "Tell me about a time you failed.",
    "What's a strength others under-rate in you?",
  ],
  story: [
    "A time something at work went really right.",
    "A small moment from childhood you still remember.",
    "Your most embarrassing tech mistake.",
    "A time you surprised yourself.",
    "A trip that changed how you think.",
    "Your weirdest learning moment.",
  ],
  opinion: [
    "Is remote work better than office work? Defend it.",
    "What's an unpopular opinion you hold about your industry?",
    "Should everyone learn to code?",
    "Is AI making work better or worse?",
    "What deserves more attention than it gets?",
  ],
};

type Tab = keyof typeof PROMPTS;

export default function PracticePage() {
  const [tab, setTab] = useState<Tab>("speaking");
  const [prompt, setPrompt] = useState(PROMPTS.speaking[0]);
  const { sessions } = useRecordings();

  function shuffle() {
    const list = PROMPTS[tab];
    const next = list[Math.floor(Math.random() * list.length)];
    setPrompt(next);
  }

  function changeTab(v: Tab) {
    setTab(v);
    setPrompt(PROMPTS[v][0]);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-4xl mx-auto space-y-6 fade-up">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Practice studio</p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
          Record. Listen. Improve.
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a category, get a prompt, hit record. Your future self will thank you.
        </p>
      </div>

      <Tabs
        value={tab}
        onValueChange={(v) => changeTab(v as Tab)}
        items={[
          { value: "speaking", label: "Speaking", icon: <Mic className="h-3.5 w-3.5" /> },
          { value: "interview", label: "Interview", icon: <Star className="h-3.5 w-3.5" /> },
          { value: "story", label: "Story" },
          { value: "opinion", label: "Opinion" },
        ]}
        variant="underline"
      />

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-base">Your prompt</CardTitle>
              <p className="mt-2 text-lg font-medium leading-snug text-foreground">
                {prompt}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={shuffle}>
              <Shuffle className="h-3.5 w-3.5" /> Shuffle
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Recorder prompt={prompt} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session history</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {sessions.length} sessions logged · {sessions.reduce((acc, s) => acc + s.duration, 0)} seconds total
          </p>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sessions yet. Record one to start tracking.</p>
          ) : (
            <ul className="space-y-2">
              {sessions.slice(0, 10).map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-border bg-surface px-3.5 py-2.5">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{s.prompt}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {format(new Date(s.createdAt), "EEE, MMM d · h:mm a")}
                    </p>
                  </div>
                  <Badge tone="primary">
                    <Timer className="h-3 w-3" /> {Math.floor(s.duration / 60)}m {s.duration % 60}s
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
