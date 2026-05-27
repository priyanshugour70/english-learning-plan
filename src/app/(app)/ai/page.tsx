"use client";

import { useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  Lightbulb,
  Mic,
  PenLine,
  Sparkles,
  Type,
  Wand2,
  X,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/contexts/toast-context";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

interface GrammarIssue {
  text: string;
  suggestion: string;
  rule: string;
  severity: "error" | "warning" | "info";
}

interface GrammarResult {
  issues: GrammarIssue[];
  correctedText: string;
  score: number;
}

interface FluencyResult {
  score: number;
  level: string;
  metrics: {
    avgWordLength: number;
    avgSentenceLength: number;
    vocabularyRichness: number;
    sentenceVariety: number;
    fillerWordCount: number;
    transitionWordCount: number;
  };
  feedback: string[];
}

interface WritingImprovement {
  original: string;
  improved: string;
  grammarResult: GrammarResult;
  fluencyResult: FluencyResult;
  tips: string[];
}

interface PronunciationTip {
  word: string;
  ipa: string;
  tip: string;
  commonMistake: string;
}

// ─── Severity colors ────────────────────────────────────────────────────────

const severityStyles = {
  error: "bg-rose/10 border-rose/30 text-rose",
  warning: "bg-amber/10 border-amber/30 text-amber",
  info: "bg-sky/10 border-sky/30 text-sky",
};

const scoreColor = (score: number) =>
  score >= 80 ? "text-emerald" : score >= 60 ? "text-amber" : "text-rose";

const scoreTone = (score: number): "emerald" | "amber" | "rose" =>
  score >= 80 ? "emerald" : score >= 60 ? "amber" : "rose";

// ─── Component ──────────────────────────────────────────────────────────────

export default function AIPage() {
  const [tab, setTab] = useState("improve");
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  const [grammarResult, setGrammarResult] = useState<GrammarResult | null>(null);
  const [fluencyResult, setFluencyResult] = useState<FluencyResult | null>(null);
  const [improveResult, setImproveResult] = useState<WritingImprovement | null>(null);
  const [pronTips, setPronTips] = useState<PronunciationTip[] | null>(null);

  async function analyze() {
    if (!text.trim()) return;
    setPending(true);
    try {
      if (tab === "grammar") {
        const res = await api<GrammarResult>("/api/ai/grammar", {
          method: "POST",
          body: { text },
        });
        setGrammarResult(res);
      } else if (tab === "fluency") {
        const res = await api<FluencyResult>("/api/ai/fluency", {
          method: "POST",
          body: { text },
        });
        setFluencyResult(res);
      } else if (tab === "improve") {
        const res = await api<WritingImprovement>("/api/ai/improve", {
          method: "POST",
          body: { text },
        });
        setImproveResult(res);
      } else if (tab === "pronunciation") {
        const res = await api<{ tips: PronunciationTip[] }>("/api/ai/pronunciation", {
          method: "POST",
          body: { text },
        });
        setPronTips(res.tips);
      }
    } catch {
      toast({ title: "Analysis failed", variant: "info" });
    } finally {
      setPending(false);
    }
  }

  function clearResults() {
    setGrammarResult(null);
    setFluencyResult(null);
    setImproveResult(null);
    setPronTips(null);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-4xl mx-auto space-y-6 fade-up">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-primary" />
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            AI Coach
          </p>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Writing &amp; Speaking Lab
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
          Paste your English text to get grammar corrections, fluency scoring,
          improved writing, and pronunciation tips.
        </p>
      </div>

      <Tabs
        value={tab}
        onValueChange={(v) => { setTab(v); clearResults(); }}
        variant="underline"
        items={[
          { value: "improve", label: "Improve", icon: <Wand2 className="h-3.5 w-3.5" /> },
          { value: "grammar", label: "Grammar", icon: <Type className="h-3.5 w-3.5" /> },
          { value: "fluency", label: "Fluency", icon: <Zap className="h-3.5 w-3.5" /> },
          { value: "pronunciation", label: "Pronunciation", icon: <Mic className="h-3.5 w-3.5" /> },
        ]}
      />

      <Card>
        <CardContent className="p-5 space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder={
              tab === "pronunciation"
                ? "Paste text to find tricky words, or leave empty for common tips..."
                : "Paste or type your English text here..."
            }
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">
              {text.trim().split(/\s+/).filter(Boolean).length} words
            </span>
            <Button onClick={analyze} disabled={pending || (!text.trim() && tab !== "pronunciation")}>
              {pending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ─── Improve Results ─────────────────────────────────────────── */}
      {tab === "improve" && improveResult && (
        <div className="space-y-4 fade-up">
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <div className={cn("text-3xl font-bold", scoreColor(improveResult.grammarResult.score))}>
                  {improveResult.grammarResult.score}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Grammar Score</div>
                <Progress value={improveResult.grammarResult.score} tone={scoreTone(improveResult.grammarResult.score)} size="sm" className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className={cn("text-3xl font-bold", scoreColor(improveResult.fluencyResult.score))}>
                  {improveResult.fluencyResult.score}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Fluency Score</div>
                <Progress value={improveResult.fluencyResult.score} tone={scoreTone(improveResult.fluencyResult.score)} size="sm" className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {improveResult.improved !== improveResult.original && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <PenLine className="h-4 w-4 text-primary" /> Improved Version
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="rounded-[var(--radius)] border border-primary/20 bg-primary-soft/10 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                  {improveResult.improved}
                </div>
              </CardContent>
            </Card>
          )}

          {improveResult.tips.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber" /> Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {improveResult.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                    <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ─── Grammar Results ─────────────────────────────────────────── */}
      {tab === "grammar" && grammarResult && (
        <div className="space-y-4 fade-up">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Grammar Score</span>
                <span className={cn("text-2xl font-bold", scoreColor(grammarResult.score))}>
                  {grammarResult.score}/100
                </span>
              </div>
              <Progress value={grammarResult.score} tone={scoreTone(grammarResult.score)} size="md" />
            </CardContent>
          </Card>

          {grammarResult.issues.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {grammarResult.issues.length} issue{grammarResult.issues.length > 1 ? "s" : ""} found
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2.5">
                {grammarResult.issues.map((issue, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-[var(--radius)] border px-3 py-2.5",
                      severityStyles[issue.severity],
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {issue.severity === "error" ? (
                        <X className="h-3.5 w-3.5" />
                      ) : issue.severity === "warning" ? (
                        <Lightbulb className="h-3.5 w-3.5" />
                      ) : (
                        <BookOpen className="h-3.5 w-3.5" />
                      )}
                      <Badge tone={issue.severity === "error" ? "danger" : issue.severity === "warning" ? "amber" : "sky"}>
                        {issue.rule}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <span className="line-through opacity-70">{issue.text}</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium">{issue.suggestion}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-5 flex items-center gap-3">
                <Check className="h-5 w-5 text-emerald" />
                <span className="text-sm font-medium">No grammar issues found!</span>
              </CardContent>
            </Card>
          )}

          {grammarResult.correctedText !== text && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Corrected Text</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="rounded-[var(--radius)] border border-emerald/20 bg-emerald/5 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                  {grammarResult.correctedText}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ─── Fluency Results ─────────────────────────────────────────── */}
      {tab === "fluency" && fluencyResult && (
        <div className="space-y-4 fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <div className={cn("text-2xl font-bold", scoreColor(fluencyResult.score))}>
                  {fluencyResult.score}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Overall</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground capitalize">
                  {fluencyResult.level}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Level</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">
                  {fluencyResult.metrics.avgSentenceLength}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Avg Words/Sentence</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(fluencyResult.metrics.vocabularyRichness * 100)}%
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Vocab Richness</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Detailed Metrics</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {[
                { label: "Filler Words", value: fluencyResult.metrics.fillerWordCount, bad: fluencyResult.metrics.fillerWordCount > 2 },
                { label: "Transition Words", value: fluencyResult.metrics.transitionWordCount, bad: false },
                { label: "Sentence Variety", value: `${Math.round(fluencyResult.metrics.sentenceVariety * 100)}%`, bad: fluencyResult.metrics.sentenceVariety < 0.2 },
                { label: "Avg Word Length", value: fluencyResult.metrics.avgWordLength, bad: false },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className={cn("font-medium", m.bad ? "text-amber" : "text-foreground")}>
                    {m.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {fluencyResult.feedback.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber" /> Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {fluencyResult.feedback.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/85">{f}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ─── Pronunciation Results ───────────────────────────────────── */}
      {tab === "pronunciation" && pronTips && (
        <div className="space-y-3 fade-up">
          {pronTips.map((tip) => (
            <Card key={tip.word}>
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose/10 text-rose flex-shrink-0">
                    <Mic className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-semibold">{tip.word}</span>
                      <Badge tone="neutral">{tip.ipa}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-foreground/85">{tip.tip}</p>
                    <div className="mt-2 flex items-start gap-1.5 text-xs text-rose">
                      <X className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                      <span>Common mistake: {tip.commonMistake}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
