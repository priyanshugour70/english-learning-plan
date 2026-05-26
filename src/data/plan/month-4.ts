import type { PlanMonth } from "@/types";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  grammarTask,
  listeningTask,
  mirrorTask,
  pronunciationTask,
  readingTask,
  reflectionTask,
  shadowTask,
  speakingTask,
  vocabTask,
  writingTask,
} from "./helpers";

const M = 4;

export const month4: PlanMonth = {
  index: M,
  title: "Month 4 — Professional Communication",
  focus: "Emails, meetings, Slack, presentations",
  tagline: "The English your team actually rates you on.",
  description:
    "Polished writing + meeting confidence. By end of month, every email, message and update you send sounds intentional.",
  icon: "Briefcase",
  accent: "violet",
  tip: "Clear is more impressive than fancy. Short sentences > clever ones.",
  weeks: [
    {
      index: 1,
      title: "Week 1 — Emails & Slack",
      focus: "Tone, structure, brevity",
      objective: "Write professional, warm, clear messages — first try.",
      outcomes: [
        "5-line email rule mastered",
        "Tone matched to audience",
        "Slack messages people actually read",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Email structure",
          theme: "Subject, hook, ask, sign-off.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 1,
              title: "Subject line patterns (8)",
              examples: [
                "Quick question on ___",
                "Heads up — ___",
                "Decision needed: ___",
                "FYI: ___",
                "Following up on ___",
              ],
              minutes: 7,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 2,
              title: "Draft 3 emails (5-line rule)",
              summary: "Greeting → context → ask → close → sign-off.",
              minutes: 14,
              bonus: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 3,
              title: "Read each email aloud — natural?",
              minutes: 6,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Tone matters",
          theme: "Same content, different temperature.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 1,
              title: "Formal vs friendly vs neutral",
              examples: [
                "Would you mind reviewing this when you have a chance? (formal)",
                "Could you take a look when you get a sec? (friendly)",
                "Please review this. (neutral)",
              ],
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 2,
              title: "Rewrite 1 email in 3 tones",
              minutes: 10,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 3,
              title: "Speak each version aloud",
              minutes: 6,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Slack messages that don't get ignored",
          theme: "Lead with the ask.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 1,
              title: "Slack opener bank (8)",
              examples: [
                "TL;DR: ___",
                "Heads-up — ___",
                "Quick ask: ___",
                "Tagging you on this because ___",
                "Decision needed by EOD: ___",
                "Soft ask, no rush — ___",
                "Loop you in — ___",
                "Want your eyes on ___",
              ],
              minutes: 7,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 2,
              title: "Write 5 short Slack messages from real scenarios",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 3,
              title: "Convert 2 of them into voice notes",
              minutes: 6,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Following up",
          theme: "Persistent, not pushy.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 1,
              title: "Follow-up phrases (6)",
              examples: [
                "Just bumping this. / Following up — / Wanted to circle back. / Quick nudge on ___ / Anything I can do to unblock this? / Happy to jump on a quick call.",
              ],
              minutes: 6,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 2,
              title: "Draft 2 follow-ups — one warm, one firm",
              minutes: 10,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 3,
              title: "Note 1 follow-up you've been avoiding",
              minutes: 4,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Saying sorry without grovelling",
          theme: "Apologize once, then move on.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 1,
              title: "Crisp apology phrases (5)",
              examples: [
                "My bad — ___.",
                "Apologies, that's on me. Here's what I'll do: ___.",
                "Sorry for the delay. Sending ___ now.",
                "I should've caught that earlier.",
                "Thanks for the patience.",
              ],
              minutes: 6,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 2,
              title: "Write 2 apologies — short and forward-looking",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 3,
              title: "Say each apology aloud",
              minutes: 5,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real-world test",
          theme: "Send today.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 1,
              title: "Send 1 real email you've been postponing",
              minutes: 15,
              bonus: 20,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 2,
              title: "Send 1 real Slack voice note",
              minutes: 6,
              bonus: 10,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 3,
              title: "Journal: how it felt to hit send",
              minutes: 6,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 1 review",
          theme: "Polish your templates.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 1,
              title: "Save 5 reusable email templates in Journal",
              minutes: 12,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 2,
              title: "Review week 1 phrases",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 3,
              title: "Journal: my email voice — what is it?",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 2,
      title: "Week 2 — Meetings",
      focus: "Speak with intent, not just on cue",
      objective: "Lead, contribute and close in meetings without freezing.",
      outcomes: [
        "Open + close a meeting cleanly",
        "Summarize a discussion in real time",
        "Interrupt politely when needed",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Meeting openers",
          theme: "First 30 seconds set the tone.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 1,
              title: "Opener bank (8)",
              examples: [
                "Hey everyone, thanks for joining. / Quick agenda — ___ / Let's start with ___ / I'll keep this tight. / Want to flag upfront — ___",
              ],
              minutes: 7,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 2,
              title: "Practice 3 meeting openers",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 3,
              title: "Record a 60-second opener",
              minutes: 6,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Adding value mid-meeting",
          theme: "When + how to contribute.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 1,
              title: "Contribution phrases (8)",
              examples: [
                "Building on what ___ said — / I want to add — / Slightly different angle: ___ / Just to clarify — / I have a small concern — / Quick question — / I agree with ___, and ___",
              ],
              minutes: 7,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 2,
              title: "Roleplay: jump into a fake meeting 3 times",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 3,
              title: "Record 3 contributions",
              minutes: 8,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Summarizing",
          theme: "Lock in the decisions.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 1,
              title: "Summary phrases (6)",
              examples: [
                "So to summarize — / Where I think we landed — / Quick recap — / Actions: ___ / Owners: ___ / Anything I'm missing?",
              ],
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 2,
              title: "Watch a 5-min discussion → summarize in 60 sec",
              minutes: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 3,
              title: "Write a 4-line meeting recap",
              minutes: 6,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Interrupting politely",
          theme: "Take the floor without stepping on toes.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 1,
              title: "Polite interrupt phrases (6)",
              examples: [
                "Sorry — quick thought before we move on. / If I can jump in for a sec — / Mind if I add something? / Pausing for a second — / Sorry to interrupt, but ___",
              ],
              minutes: 6,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 2,
              title: "Practice interrupting in 3 scenarios",
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 3,
              title: "Watch a real podcast — note how guests interrupt",
              minutes: 10,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Closing meetings",
          theme: "End strong.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 1,
              title: "Closing phrases (6)",
              examples: [
                "Let's wrap. / Actions and owners: ___ / I'll send a recap. / Same time next week? / Anything before we end?",
              ],
              minutes: 5,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 2,
              title: "Practice 3 closings — calm and decisive",
              minutes: 7,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 3,
              title: "Record a 30-sec strong meeting close",
              minutes: 5,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real meeting today",
          theme: "Try one technique live.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 1,
              title: "Use 1 'meeting' phrase in a real meeting",
              minutes: 5,
              bonus: 20,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 2,
              title: "Journal: which phrase, which moment?",
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 3,
              title: "Replay the moment in your head, re-deliver out loud",
              minutes: 6,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 2 review",
          theme: "Build your meeting muscle.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 1,
              title: "Roleplay: lead a 5-min mock meeting",
              minutes: 14,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 2,
              title: "Review meeting phrases",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 3,
              title: "Journal: my meeting style",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 3,
      title: "Week 3 — Structured speaking",
      focus: "PRES + STAR + clear endings",
      objective: "Structure transforms 'okay' answers into memorable ones.",
      outcomes: [
        "Use PRES (Point–Reason–Example–Summary) on demand",
        "Tell STAR stories with confidence",
        "Land your points cleanly",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — PRES structure",
          theme: "4 beats. Use forever.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 1,
              title: "Learn PRES",
              examples: [
                "Point: 'I believe X.'",
                "Reason: 'Because ___.'",
                "Example: 'For instance, ___.'",
                "Summary: 'So in short, X.'",
              ],
              minutes: 7,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 2,
              title: "Answer 3 questions in PRES",
              minutes: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 3,
              title: "Write 1 PRES answer in 5 sentences",
              minutes: 6,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — STAR stories",
          theme: "Situation, Task, Action, Result.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 1,
              title: "Learn STAR",
              examples: [
                "Situation: 'We had a flaky deploy pipeline.'",
                "Task: 'I owned reliability for the team.'",
                "Action: 'I rebuilt our CI in 2 weeks.'",
                "Result: 'Deploys went from 30% flaky to 99% green.'",
              ],
              minutes: 7,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 2,
              title: "Tell 2 STAR stories (record)",
              minutes: 12,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 3,
              title: "Write 1 STAR story (~150 words)",
              minutes: 10,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Strong endings",
          theme: "How you stop = how you're remembered.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 1,
              title: "Strong endings (6)",
              examples: [
                "So that's the recap. / Bottom line: ___ / If there's one takeaway — ___ / That's where I'd land. / I'd push for ___",
              ],
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 2,
              title: "Re-record yesterday's STAR — new strong endings",
              minutes: 8,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 3,
              title: "Practice 'land the plane' in 3 scenarios",
              minutes: 6,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Mock 1:1 with your manager",
          theme: "Career conversations.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 1,
              title: "Mock 1:1: 'what I'm proud of + what I want'",
              minutes: 12,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 2,
              title: "Write a 5-line 1:1 prep doc",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 3,
              title: "Note 1 question you'd never ask your manager — but should",
              minutes: 5,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Mini-presentation",
          theme: "5 slides in your head.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 1,
              title: "5-min talk: 'A project I'd ship next quarter'",
              minutes: 14,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 2,
              title: "Write 5 slide titles for it",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 3,
              title: "Note your nervous tells",
              minutes: 4,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real-world test",
          theme: "Live presentation today.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 1,
              title: "Volunteer to present something at work",
              summary: "Even 2 minutes counts. Take the stage.",
              minutes: 10,
              bonus: 25,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 2,
              title: "Journal: what scared me, what worked",
              minutes: 6,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 3,
              title: "Watch a 5-min TED for inspiration",
              minutes: 8,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 3 review",
          theme: "Lock the templates.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 1,
              title: "Re-record your best STAR story",
              minutes: 10,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 2,
              title: "Review week 3 phrases",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 3,
              title: "Journal: 3 'go-to' templates I trust now",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 4,
      title: "Week 4 — Full professional simulation",
      focus: "Day in the life — in English",
      objective: "Run a full work day in English from start to finish.",
      outcomes: [
        "Email + Slack + meeting + writeup, all in English",
        "Comfortable across 3 audiences (peer, manager, exec)",
        "Polished 5-min presentation recorded",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Morning routine (English-only)",
          theme: "From wake-up to lunch.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 1,
              title: "Narrate your morning, English only (10 min)",
              minutes: 14,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 2,
              title: "Write your morning to-do list in English",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 3,
              title: "Note where Hindi slipped in",
              minutes: 5,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Email chain simulation",
          theme: "Ask → reply → respond.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 1,
              title: "Write a 3-email chain about a real work decision",
              minutes: 14,
              bonus: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 2,
              title: "Read all 3 aloud — natural?",
              minutes: 6,
            }),
            grammarTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 3,
              title: "Fix any awkward phrasing",
              minutes: 6,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Manager 1:1 mock",
          theme: "Update + ask + boundary.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 1,
              title: "10-min mock 1:1 (record)",
              summary: "Update + 2 questions + 1 ask + 1 boundary.",
              minutes: 14,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 2,
              title: "Write a 5-line 1:1 follow-up email",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 3,
              title: "Note your favorite line you said",
              minutes: 4,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Cross-team presentation",
          theme: "Different audience, same content.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 1,
              title: "Present a 5-min work update to 'execs'",
              summary: "No jargon. Numbers + impact + decision.",
              minutes: 14,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 2,
              title: "Write a 4-bullet exec summary",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 3,
              title: "Note: did you sell the work or describe it?",
              minutes: 5,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Negotiation prep",
          theme: "Ask for what you want.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 1,
              title: "Negotiation phrases (8)",
              examples: [
                "Where I'd want to land is ___ / What would make this work for me is ___ / I can flex on ___, but not on ___ / Let's find a middle ground / Help me understand ___",
              ],
              minutes: 8,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 2,
              title: "Practice asking for: a raise, time off, scope reduction",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 3,
              title: "Record your strongest ask",
              minutes: 6,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real-world test (big one)",
          theme: "Run your day in English.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 1,
              title: "Hold ALL English meetings + messages today",
              summary: "If you slip, restart in English.",
              minutes: 10,
              bonus: 30,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 2,
              title: "Journal: what felt smooth, what felt sticky",
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 3,
              title: "Cool down: shadow 3 min of a favorite speaker",
              minutes: 8,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Month 4 graduation",
          theme: "Compare your communication.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 1,
              title: "5-min 'my month at work' summary (record)",
              minutes: 14,
              bonus: 15,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 2,
              title: "Write a 'what I want from Month 5' doc",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 3,
              title: "Journal: 3 work moments I'd never have done in Month 1",
              minutes: 6,
              bonus: 15,
            }),
          ],
        },
      ],
    },
  ],
};
