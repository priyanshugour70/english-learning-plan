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

const M = 5;

export const month5: PlanMonth = {
  index: M,
  title: "Month 5 — Complex ideas",
  focus: "Explain, argue, persuade",
  tagline: "Have a take. Defend it. Connect the dots.",
  description:
    "Move from describing to discussing. You'll explain systems, tell stories, hold opinions, and disagree without dropping into Hindi.",
  icon: "Brain",
  accent: "orange",
  tip: "Advanced speakers aren't fancier — they connect ideas. Focus on flow, not vocabulary.",
  weeks: [
    {
      index: 1,
      title: "Week 1 — Explaining systems",
      focus: "Make complexity feel simple",
      objective: "Take a complex system and explain it in a way anyone can follow.",
      outcomes: [
        "Use linking words to connect ideas",
        "Explain a system in 200 words written + 3 min spoken",
        "Translate jargon to plain English",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Linking words",
          theme: "Glue ideas together.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 1,
              title: "12 linking words",
              examples: ["Furthermore, however, in contrast, as a result, therefore, on top of that, similarly, on the flip side, that said, ultimately, in essence, more importantly"],
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 2,
              title: "Rewrite a 5-sentence paragraph using 4 linkers",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 3,
              title: "Talk for 90s using 5 linkers",
              minutes: 8,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Big-picture intros",
          theme: "Set the stage in 3 sentences.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 1,
              title: "Intro template: what + why + how",
              examples: [
                "I'll talk about ___. It matters because ___. Here's how it works: ___.",
              ],
              minutes: 6,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 2,
              title: "Write 3 different intros for the same topic",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 3,
              title: "Record the best one + 90s of body",
              minutes: 8,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Diagrams in words",
          theme: "Describe a system, no slides.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 1,
              title: "Explain how a website loads (record, 3 min)",
              minutes: 14,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 2,
              title: "Write a 150-word version",
              minutes: 10,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 3,
              title: "5 'system' verbs",
              examples: ["routes, parses, hashes, queues, broadcasts"],
              minutes: 6,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Jargon translation",
          theme: "Same idea, smaller words.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 1,
              title: "List 5 jargon words → rewrite in plain English",
              examples: [
                "Eventual consistency → 'it catches up after a moment'.",
                "Latency → 'wait time'.",
              ],
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 2,
              title: "Re-explain something from your work to a 10-year-old",
              minutes: 10,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 3,
              title: "Which jargon do you use without thinking?",
              minutes: 5,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Tech blog draft",
          theme: "Write like you teach.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 1,
              title: "Draft a 250-word tech post on something you know",
              minutes: 18,
              bonus: 15,
            }),
            readingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 2,
              title: "Read it aloud — edit anything clunky",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 3,
              title: "Record a 'video version' of the same post (2 min)",
              minutes: 8,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real-world test",
          theme: "Teach someone today.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 1,
              title: "Explain something tricky to a teammate in English",
              minutes: 10,
              bonus: 20,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 2,
              title: "Send a 4-line written version after",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 3,
              title: "Journal: did they get it?",
              minutes: 5,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 1 review",
          theme: "Connect everything you taught.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 1,
              title: "3-min 'lecture' on your favorite topic",
              minutes: 12,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 2,
              title: "Review week 1 linkers and tech words",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 3,
              title: "Journal: clearest moment teaching this week",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 2,
      title: "Week 2 — Storytelling",
      focus: "Become memorable",
      objective: "Tell stories that pull people in — at work and beyond.",
      outcomes: [
        "Structure stories with STAR + sensory detail",
        "Build emotional arcs",
        "Tell a 3-minute story without filler",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — The hook",
          theme: "First line earns the next 30 seconds.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 1,
              title: "10 strong hooks",
              examples: [
                "I was about to give up when ___",
                "The whole team thought I was crazy.",
                "Three days before the launch, everything broke.",
                "I'll never forget the day ___",
              ],
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 2,
              title: "Write 3 hooks for the same story",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 3,
              title: "Record each hook + the next 30 seconds",
              minutes: 8,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Sensory detail",
          theme: "Show, don't list.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 1,
              title: "Sense verbs",
              examples: ["see, hear, smell, taste, feel, notice, spot, sense"],
              minutes: 6,
            }),
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 2,
              title: "Write 1 paragraph with 5 sensory details",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 3,
              title: "Re-tell it out loud, leaning into the senses",
              minutes: 8,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Arc + tension + resolution",
          theme: "Setup → twist → landing.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 1,
              title: "Story arc template",
              examples: [
                "Everything was going fine. Then ___. We tried ___, but ___. Eventually, ___. The lesson: ___.",
              ],
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 2,
              title: "Tell a 3-min story with the template (record)",
              minutes: 14,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 3,
              title: "Note your favorite line you said",
              minutes: 4,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Personal anecdotes at work",
          theme: "Bring yourself in.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 1,
              title: "Share a 90-second personal story in any work topic",
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 2,
              title: "Write a 120-word version",
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 3,
              title: "Watch a TED 'story segment' (5 min)",
              minutes: 8,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Disaster + recovery",
          theme: "Show how you bounced back.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 1,
              title: "Tell a 'time something went wrong' story",
              summary: "Use STAR. End with the lesson.",
              minutes: 12,
            }),
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 2,
              title: "Write 5 different lessons you could end it with",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 3,
              title: "Pick the most honest lesson",
              minutes: 5,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real-world test",
          theme: "Tell ONE story today.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 1,
              title: "Drop a 90-second story into a real chat or call",
              minutes: 8,
              bonus: 20,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 2,
              title: "Journal: did they react?",
              minutes: 5,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 3,
              title: "Shadow 3 min of a master storyteller",
              minutes: 8,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 2 review",
          theme: "Polish 3 stories you'll reuse forever.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 1,
              title: "Record 3 'pocket stories' (60-90s each)",
              minutes: 14,
              bonus: 15,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 2,
              title: "Save 8 story phrases in Vocab",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 3,
              title: "Journal: my story voice",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 3,
      title: "Week 3 — Technical discussions",
      focus: "Defend decisions",
      objective: "Hold your ground in tech debates with calm clarity.",
      outcomes: [
        "Frame trade-offs out loud",
        "Use 'I chose X because Y' templates",
        "Stay calm and curious under push-back",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Choice templates",
          theme: "I chose X over Y because Z.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 1,
              title: "Decision sentence patterns",
              examples: [
                "I went with X because ___, even though ___.",
                "X is the right call here because ___, but if ___ changes we should revisit.",
              ],
              minutes: 7,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 2,
              title: "Defend 3 real choices you made (record)",
              minutes: 12,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 3,
              title: "Write each as a 3-line ADR (architecture decision record)",
              minutes: 10,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Pros and cons aloud",
          theme: "Show the weighing.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 1,
              title: "Pros/cons phrase bank",
              examples: [
                "The upside is ___. The downside is ___.",
                "What I like: ___. What worries me: ___.",
                "Best case: ___. Worst case: ___.",
              ],
              minutes: 7,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 2,
              title: "Talk through 2 options for a real decision",
              minutes: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 3,
              title: "Write a 4-bullet comparison",
              minutes: 8,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Stay calm under push-back",
          theme: "Curious, not defensive.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 1,
              title: "Calm response phrases (6)",
              examples: [
                "Good push. Let me think.",
                "Help me understand where you're coming from.",
                "What part are you worried about?",
                "Fair point. Let me update my thinking.",
                "I might be wrong — walk me through it.",
              ],
              minutes: 7,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 2,
              title: "Roleplay 3 push-backs — answer calmly",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 3,
              title: "Record one heated scenario — keep voice steady",
              minutes: 6,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Tech presentation",
          theme: "5 minutes, no slides, all voice.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 1,
              title: "Present a real tech decision in 5 mins",
              minutes: 14,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 2,
              title: "Write a 4-bullet TL;DR for it",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 3,
              title: "Note what could've been tighter",
              minutes: 5,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Code review English",
          theme: "Disagree without making it personal.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 1,
              title: "Code review phrases (8)",
              examples: [
                "Nit — ___ / Small suggestion — ___ / Curious — why ___? / What do you think about ___? / This works! Maybe also ___? / Concern: ___ / Strong suggestion: ___ / Blocking — ___",
              ],
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 2,
              title: "Leave 5 review comments on a fake PR",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 3,
              title: "Read them aloud — kind but clear?",
              minutes: 5,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real debate",
          theme: "Live disagreement today.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 1,
              title: "Push back on something in a meeting today",
              minutes: 8,
              bonus: 25,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 2,
              title: "Journal: how did it go?",
              minutes: 6,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 3,
              title: "Watch a calm tech debate (Lex, JRE)",
              minutes: 10,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 3 review",
          theme: "Defend, debate, decide.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 1,
              title: "5-min talk: 'A tech opinion I'd defend'",
              minutes: 14,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 2,
              title: "Review week 3 phrases",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 3,
              title: "Journal: my debate style",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 4,
      title: "Week 4 — Opinions & debate",
      focus: "Take a stance",
      objective: "Hold strong opinions, expressed gently. Be persuasive without being pushy.",
      outcomes: [
        "Take a clear stance and defend it",
        "Use Steel-manning to handle opposition",
        "Talk on broad topics, not just work",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Opinion patterns",
          theme: "Stake the claim.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 1,
              title: "Strong opinion openers (8)",
              examples: [
                "I'd argue that ___",
                "My view is ___",
                "Honestly, I think ___",
                "Hot take: ___",
                "I'm convinced that ___",
                "I'd push back on the idea that ___",
              ],
              minutes: 7,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 2,
              title: "Take a stance on 3 topics out loud",
              minutes: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 3,
              title: "Write a 6-sentence opinion essay",
              minutes: 8,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Steel-manning",
          theme: "State the strongest opposing view first.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 1,
              title: "Steel-man template",
              examples: [
                "The strongest version of the other side is ___. I still think ___ because ___.",
              ],
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 2,
              title: "Steel-man + rebut on 2 topics",
              minutes: 12,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 3,
              title: "Write a 5-sentence steel-man + your view",
              minutes: 8,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Debate roleplay",
          theme: "AI opponent.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 1,
              title: "Debate Claude/ChatGPT for 10 mins on any topic",
              minutes: 14,
              bonus: 15,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 2,
              title: "Save 5 lines you nailed",
              minutes: 6,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 3,
              title: "Save 5 phrases you wish you'd used",
              minutes: 6,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Broad-topic monologue",
          theme: "Not work — current events, books, ethics.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 1,
              title: "5-min talk on a non-work topic (record)",
              minutes: 14,
            }),
            readingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 2,
              title: "Read 1 short essay (~500 words) on the topic",
              minutes: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 3,
              title: "Write a 100-word personal take",
              minutes: 8,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Persuasion patterns",
          theme: "Logic + emotion + example.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 1,
              title: "3-part persuasion",
              examples: [
                "Here's the logic: ___.",
                "Here's the human side: ___.",
                "Here's a real example: ___.",
              ],
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 2,
              title: "Persuade someone of something you care about (record)",
              minutes: 12,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 3,
              title: "Note: which part landed strongest?",
              minutes: 5,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real-world test",
          theme: "Have ONE real opinion convo today.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 1,
              title: "Have a 10-min English chat about anything you care about",
              minutes: 12,
              bonus: 25,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 2,
              title: "Journal: where I sounded most 'me'",
              minutes: 6,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 3,
              title: "Shadow 3 min of a great interviewer",
              minutes: 8,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Month 5 graduation",
          theme: "Showcase your range.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 1,
              title: "Record 3 short monologues: explain, story, opinion",
              minutes: 14,
              bonus: 20,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 2,
              title: "Journal: ideas I now connect that I couldn't in Month 1",
              minutes: 8,
              bonus: 15,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 3,
              title: "Set Month 6 (final!) intention",
              minutes: 4,
            }),
          ],
        },
      ],
    },
  ],
};
