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

const M = 6;

export const month6: PlanMonth = {
  index: M,
  title: "Month 6 — Real-world Mastery",
  focus: "Interviews, presentations, spontaneous conversation",
  tagline: "Walk into any room. Speak with calm.",
  description:
    "The final stretch. Mock interviews, live presentations, spontaneous talks. By the end, you'll have proof — recordings, journal entries, a confident voice.",
  icon: "Trophy",
  accent: "amber",
  tip: "Confidence isn't 'no nerves'. It's 'show up anyway and speak slowly'. You already do that now.",
  weeks: [
    {
      index: 1,
      title: "Week 1 — Mock interviews",
      focus: "Behavioral + technical + culture-fit",
      objective: "Be calm and clear in the highest-stakes English you'll ever speak.",
      outcomes: [
        "Polish your 'tell me about yourself' to 2 minutes",
        "Have 5 STAR stories on tap",
        "Handle 'why this company / why now' confidently",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Tell me about yourself",
          theme: "Story arc of your career.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 1,
              title: "Draft a 200-word 'about me' script",
              summary: "Past → present → future. End with a why.",
              minutes: 14,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 2,
              title: "Record 3 takes of it",
              minutes: 12,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 3,
              title: "Pick the best take, note 2 improvements",
              minutes: 5,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Behavioral stories (STAR x5)",
          theme: "5 stories you can recombine for any question.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 1,
              title: "Outline 5 STAR stories",
              summary: "Conflict, ownership, failure, leadership, learning.",
              minutes: 14,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 2,
              title: "Tell each in 90s out loud",
              minutes: 14,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 3,
              title: "Note your strongest story",
              minutes: 4,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Tough questions",
          theme: "Strengths, weaknesses, gaps.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 1,
              title: "Draft honest answers to 5 hard questions",
              examples: [
                "What's your biggest weakness?",
                "Tell me about a time you failed.",
                "Why did you leave your last role?",
                "Where do you see yourself in 5 years?",
                "What's a hard piece of feedback you got?",
              ],
              minutes: 14,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 2,
              title: "Record yourself answering each",
              minutes: 12,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 3,
              title: "Note any defensive tone — rewrite",
              minutes: 5,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Why this company",
          theme: "Specific, researched, personal.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 1,
              title: "Pick 3 real companies — write 'why X' for each",
              minutes: 14,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 2,
              title: "Deliver each in 60 seconds — record",
              minutes: 10,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 3,
              title: "Note which one felt most authentic",
              minutes: 4,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Full mock interview",
          theme: "30 minutes, no breaks.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 1,
              title: "Run a 30-min mock interview with Claude/ChatGPT",
              summary: "Have it ask: TMAY, 3 behaviorals, 1 technical, 1 culture, Q&A.",
              minutes: 35,
              bonus: 30,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 2,
              title: "Ask the AI for 3 specific feedback points",
              minutes: 6,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 3,
              title: "Save 5 phrases the AI suggested",
              minutes: 5,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Re-do weakest answer",
          theme: "Iterate, don't ruminate.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 1,
              title: "Re-record your weakest mock answer 3 times",
              minutes: 12,
              bonus: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 2,
              title: "Tighten the script for it",
              minutes: 8,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 3,
              title: "Practice it standing in the mirror",
              minutes: 6,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 1 review",
          theme: "Interview-ready.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 1,
              title: "Run a 15-min mini mock (record)",
              minutes: 16,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 2,
              title: "Review all your interview phrases",
              minutes: 7,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 3,
              title: "Journal: a moment that felt 'I belong here'",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 2,
      title: "Week 2 — Spontaneous speaking",
      focus: "Off-script confidence",
      objective: "Speak fluently on any topic with no prep.",
      outcomes: [
        "Use 'fill space' phrases naturally",
        "Buy thinking time without panic",
        "Talk for 5 mins on a random topic",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Random topic challenge",
          theme: "60 seconds, no notes.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 1,
              title: "Ask AI for 5 random topics — talk 60s on each",
              minutes: 14,
              bonus: 10,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 2,
              title: "Note which 2 freaked you out",
              minutes: 4,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 3,
              title: "Re-do those 2 topics",
              minutes: 8,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Fill space without filler",
          theme: "Curiosity beats 'um'.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 1,
              title: "Replacements for 'um' (8)",
              examples: [
                "Hmm, let me think.",
                "That's a great question.",
                "Where do I even start with this.",
                "Honestly — never thought about it.",
                "Two thoughts: first, ___. Second, ___.",
              ],
              minutes: 7,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 2,
              title: "Practice each phrase 3× — make them natural",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 3,
              title: "Answer 5 surprise questions using only those phrases when stuck",
              minutes: 8,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — 'I don't know' done right",
          theme: "Admit gracefully, propose path forward.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 1,
              title: "Graceful unknowns (6)",
              examples: [
                "Honestly, I don't know — but here's how I'd find out.",
                "I'd want to learn more before answering.",
                "Off the top of my head — ___ — but I might be wrong.",
                "Let me think out loud for a second.",
              ],
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 2,
              title: "Answer 5 questions you don't know — gracefully",
              minutes: 10,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 3,
              title: "Practice your 'I don't know but ___' voice",
              minutes: 6,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — 5-min impromptu",
          theme: "Endurance.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 1,
              title: "Pull 1 random topic — talk 5 mins (record)",
              minutes: 14,
              bonus: 15,
            }),
            listeningTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 2,
              title: "Listen back at 1.25× — note 3 surprises",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 3,
              title: "Journal: how I sounded vs how I felt",
              minutes: 5,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Voice notes to friends",
          theme: "Real recipients.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 1,
              title: "Send 5 English voice notes to 5 different people",
              minutes: 12,
              bonus: 20,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 2,
              title: "Note who replied in English",
              minutes: 5,
            }),
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 3,
              title: "Write 3 follow-up English messages",
              minutes: 8,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Stand-up comedy challenge",
          theme: "Loosen up.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 1,
              title: "Write 3 lines about something absurd in your day",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 2,
              title: "Tell it like a comedian (record)",
              minutes: 10,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 3,
              title: "Shadow 3 min of a clean stand-up clip",
              minutes: 8,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 2 review",
          theme: "Calm in the unknown.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 1,
              title: "10-min open conversation with AI",
              minutes: 14,
              bonus: 15,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 2,
              title: "Review filler-replacements",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 3,
              title: "Journal: my 'unknown' confidence",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 3,
      title: "Week 3 — Body, voice, presence",
      focus: "How you show up",
      objective: "Confident posture and voice make English feel even smoother.",
      outcomes: [
        "Speak from your chest, not your throat",
        "Use deliberate gestures",
        "Project warmth + authority",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Voice projection",
          theme: "Volume is care.",
          tasks: [
            pronunciationTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 1,
              title: "Hum-then-speak warmup",
              summary: "Hum 30s, then speak. Notice the resonance.",
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 2,
              title: "Record a 90s talk standing + projecting",
              minutes: 10,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 3,
              title: "Mirror practice: chest-voice 'good morning'",
              minutes: 6,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Posture",
          theme: "Open chest, relaxed shoulders.",
          tasks: [
            mirrorTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 1,
              title: "Stand tall, deliver a 90s intro 3 times",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 2,
              title: "Record same intro sitting vs standing — compare",
              minutes: 10,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 3,
              title: "Note the difference you hear",
              minutes: 5,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Gestures",
          theme: "Hands tell half the story.",
          tasks: [
            shadowTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 1,
              title: "Watch a 5-min TED — copy 3 gestures",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 2,
              title: "Record a 2-min talk using those gestures",
              minutes: 10,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 3,
              title: "Note when gestures lifted your voice",
              minutes: 5,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Warmth in voice",
          theme: "Smile while speaking.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 1,
              title: "Record same paragraph: neutral / smiling / warm",
              minutes: 10,
            }),
            listeningTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 2,
              title: "Compare — does 'warm' sound different?",
              minutes: 6,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 3,
              title: "Practice greeting with warm voice",
              minutes: 6,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Presence under nerves",
          theme: "Use the body to calm the mind.",
          tasks: [
            mirrorTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 1,
              title: "Box-breathing 4×4 then speak 2 mins",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 2,
              title: "Record a 'high-stakes' moment (e.g. asking for a raise)",
              minutes: 10,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 3,
              title: "Note 1 thing that calmed you",
              minutes: 4,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real-world test (big)",
          theme: "Be 'on' today.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 1,
              title: "Present (5+ mins) something live — at work, with friends, on a call",
              minutes: 16,
              bonus: 35,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 2,
              title: "Journal: what worked, what to do next time",
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 3,
              title: "Cool down with a calming speaker",
              minutes: 8,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 3 review",
          theme: "Presence as a skill.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 1,
              title: "Re-record your Week 1 'about me' — full presence",
              minutes: 14,
              bonus: 15,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 2,
              title: "Journal: how my voice has changed since Month 1",
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 3,
              title: "Write a LinkedIn-ready bio (100 words)",
              minutes: 10,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 4,
      title: "Week 4 — Graduation",
      focus: "Celebrate. Plan what's next.",
      objective: "Finish strong. Lock in the habit forever.",
      outcomes: [
        "Re-record the Month-1 intro and feel proud",
        "Have a real 15-min conversation in English",
        "Choose your post-6-month goal",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Re-record the original intro",
          theme: "Six-month comparison.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 1,
              title: "Re-record your Month 1 Week 1 self-intro",
              summary: "Then listen to both versions back-to-back.",
              minutes: 14,
              bonus: 30,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 2,
              title: "Write 5 differences you can hear",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 3,
              title: "Say one sentence: 'I am proud of ___ because ___'",
              minutes: 4,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — A real long conversation",
          theme: "15 minutes, all English.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 1,
              title: "15-min English conversation with anyone (or AI)",
              minutes: 18,
              bonus: 30,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 2,
              title: "Journal: 3 moments I felt fluent",
              minutes: 8,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 3,
              title: "Save 5 phrases that surprised you",
              minutes: 6,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Write a letter to your past self",
          theme: "Lock in the lessons.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 1,
              title: "Write a 300-word letter to 'Me, 6 months ago'",
              minutes: 18,
              bonus: 20,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 2,
              title: "Read it aloud — slowly, with care",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 3,
              title: "Pick the single sentence that matters most",
              minutes: 5,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Public-facing piece",
          theme: "Ship one thing in English.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 1,
              title: "Publish a short post (LinkedIn / blog / Twitter)",
              minutes: 20,
              bonus: 30,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 2,
              title: "Record a 60s 'why I wrote this' clip",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 3,
              title: "Note your nerves vs your pride",
              minutes: 5,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Pick what's next",
          theme: "Month 7 onwards.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 1,
              title: "Choose 1 next goal: IELTS / interview / public speaking / accent",
              minutes: 12,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 2,
              title: "Record your 'next chapter' announcement",
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 3,
              title: "Update Settings > Goal to the new one",
              minutes: 4,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — A perfect 'normal' day",
          theme: "Use English how you'd use it forever.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 1,
              title: "Do today's tasks like Month 7 already started",
              minutes: 12,
              bonus: 20,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 2,
              title: "Journal: what does my forever-practice look like?",
              minutes: 8,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 3,
              title: "Final vocab review — favorites only",
              minutes: 6,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — GRADUATION",
          theme: "Celebrate. Loud.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 1,
              title: "Record a 5-min 'graduation talk' on your journey",
              minutes: 18,
              bonus: 50,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 2,
              title: "Final journal: 'I am ___ now in English.'",
              minutes: 10,
              bonus: 30,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 3,
              title: "Share something publicly: a photo, a post, a thank-you",
              minutes: 10,
              bonus: 30,
            }),
          ],
        },
      ],
    },
  ],
};
