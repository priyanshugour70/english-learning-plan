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

const M = 2;

export const month2: PlanMonth = {
  index: M,
  title: "Month 2 — Fluency",
  focus: "Stop translating in your head",
  tagline: "Think in English. Speak without a dictionary tab.",
  description:
    "We'll rewire your brain to skip the Hindi → English step. Daily shadowing, naming everything you see, and 5-minute monologues build instinct.",
  icon: "Languages",
  accent: "sky",
  tip: "Don't aim for the perfect word. Aim for any English word that's 80% right. Speed matters more than precision this month.",
  weeks: [
    {
      index: 1,
      title: "Week 1 — Think in English",
      focus: "Stop the translation loop",
      objective: "Cut translation time from seconds to half-seconds.",
      outcomes: [
        "Name 100+ everyday objects instantly in English",
        "Describe what you see without a mental Hindi step",
        "Do a 5-minute solo monologue without freezing",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Name everything you see",
          theme: "The English label, faster than thought.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 1,
              title: "Add 10 'around the house' words",
              summary: "Things you'll see in the next hour.",
              examples: ["lamp, charger, mug, drawer, mirror, blanket, ceiling fan, switch, balcony, kettle"],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 2,
              title: "Walk around and name 30 objects",
              summary: "Say the English word out loud. NO Hindi in your head.",
              how: [
                "If you blank, say 'that thing' and move on. Don't translate.",
                "Look it up later — never mid-walk.",
              ],
              minutes: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 3,
              title: "Describe your desk in 6 sentences",
              summary: "Use color, location, count.",
              minutes: 6,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Inner monologue",
          theme: "The voice in your head — in English.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 1,
              title: "Narrate your morning out loud (5 min)",
              summary: "I'm walking to the kitchen. I'm pouring water. I'm checking my phone...",
              minutes: 10,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 2,
              title: "Talk through 'what I'll do today'",
              summary: "Use 'I'm going to + verb' or 'I'll + verb'.",
              minutes: 6,
            }),
            grammarTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 3,
              title: "'Going to' vs 'will'",
              summary: "Going to = planned. Will = decided in the moment.",
              examples: [
                "I'm going to finish the design today. (planned)",
                "I'll grab some coffee. (just decided)",
              ],
              minutes: 6,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Describing what you see",
          theme: "Adjectives before nouns.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 1,
              title: "12 vivid adjectives",
              summary: "Replace 'good/bad/nice' with sharper words.",
              examples: ["solid, sharp, clunky, smooth, crisp, dull, neat, messy, slick, rough, bright, dim"],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 2,
              title: "Describe 5 photos on your phone",
              summary: "3+ sentences per photo. Push past 'good'.",
              minutes: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 3,
              title: "Write a 5-sentence scene description",
              summary: "Make a reader 'see' your room.",
              minutes: 8,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Podcast immersion",
          theme: "Bathe your brain in real English.",
          tasks: [
            listeningTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 1,
              title: "Listen to 1 episode of '6 Minute English'",
              summary: "Once with subtitles, once without.",
              resources: [{ label: "BBC 6 Minute English", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english" }],
              minutes: 14,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 2,
              title: "Capture 5 new words from the episode",
              summary: "Add them with the sentence they appeared in.",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 3,
              title: "Summarize the episode in 3 sentences",
              summary: "Out loud, no script.",
              minutes: 6,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Tiny diary",
          theme: "Write what your day was actually like.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 1,
              title: "Write 5 sentences in past tense",
              summary: "What you did this morning.",
              minutes: 8,
            }),
            grammarTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 2,
              title: "Past simple irregulars round 2",
              examples: ["go→went, come→came, get→got, take→took, give→gave, leave→left, sit→sat, stand→stood, think→thought, feel→felt"],
              minutes: 7,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 3,
              title: "Read your diary aloud + add 2 details",
              minutes: 5,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Talk to yourself for 5 minutes straight",
          theme: "No stopping. No translation.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 1,
              title: "5-minute solo monologue (record it)",
              summary: "Pick any topic. If you blank, say 'um, what I mean is...' and keep going.",
              minutes: 12,
              bonus: 10,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 2,
              title: "Note 3 moments you got stuck",
              summary: "What word did you want? Add them to vocab.",
              minutes: 6,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 3,
              title: "Shadow a 2-min clip for cool-down",
              minutes: 8,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 1 review",
          theme: "Lock in 'no translation' habit.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 1,
              title: "Re-record yesterday's 5-minute monologue",
              summary: "Compare. Did you freeze less?",
              minutes: 12,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 2,
              title: "Review all week 1 words",
              minutes: 10,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 3,
              title: "Journal: 'When did I translate, and when did I think?'",
              minutes: 7,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 2,
      title: "Week 2 — Shadowing",
      focus: "Copy the music of English",
      objective: "Sound natural by mimicking real speakers — not just words but rhythm.",
      outcomes: [
        "Shadow 3+ minutes of native speech accurately",
        "Notice and copy intonation patterns",
        "Build muscle memory for natural English flow",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — What is shadowing?",
          theme: "Listen → Pause → Repeat exactly.",
          tasks: [
            shadowTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 1,
              title: "Pick a 'shadowing speaker' for the week",
              summary: "Someone whose accent you like (Lex Fridman, Mark Manson, Vanessa Van Edwards…).",
              how: [
                "Find a 5-minute clip with clear English.",
                "Save the link in Resources or your bookmarks.",
              ],
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 2,
              title: "Shadow 2 minutes — sentence by sentence",
              summary: "Pause after each sentence and repeat exactly.",
              minutes: 14,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 3,
              title: "Note 3 sounds you struggled with",
              minutes: 4,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Shadow with no pause",
          theme: "Match real-time speed.",
          tasks: [
            shadowTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 1,
              title: "Shadow same clip without pausing (3 mins)",
              summary: "Talk over them — speak as they speak.",
              minutes: 14,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 2,
              title: "Record yourself shadowing",
              summary: "Compare side by side.",
              minutes: 8,
            }),
            pronunciationTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 3,
              title: "Pick 3 stuck sounds — drill them",
              minutes: 6,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Workplace vocabulary",
          theme: "Words your peers use every day.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 1,
              title: "Add 10 modern workplace words",
              examples: ["deadline, backlog, scope creep, milestone, blocker, async, kickoff, sync, retro, alignment"],
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 2,
              title: "Use 5 of them in real work sentences",
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 3,
              title: "Write a Slack summary of your morning",
              minutes: 6,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Email English",
          theme: "Clear, polite, short.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 1,
              title: "Email phrase bank (8)",
              examples: [
                "Hope you're doing well. / Quick question — / Following up on ___ / Just to confirm — / Let me know if anything's unclear. / Happy to jump on a quick call. / No rush! / Thanks in advance!",
              ],
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 2,
              title: "Draft a real email you've been postponing",
              minutes: 12,
              bonus: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 3,
              title: "Read it aloud — does it sound natural?",
              minutes: 4,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Speaking under time pressure",
          theme: "5-minute timer, one topic.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 1,
              title: "5-minute talk on 'my biggest work win'",
              summary: "Use the in-app timer. Don't stop.",
              minutes: 12,
            }),
            listeningTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 2,
              title: "Listen back at 1.25× speed",
              summary: "Notice where you trail off.",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 3,
              title: "Note 3 phrases you reused too much",
              summary: "Replace each with a new version next time.",
              minutes: 5,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Explaining work to a non-tech friend",
          theme: "Plain language fluency.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 1,
              title: "Explain what you do to a 'curious cousin'",
              summary: "No jargon. 90 seconds.",
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 2,
              title: "Write the same explanation in 5 sentences",
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 3,
              title: "Shadow your week's speaker for 3 more mins",
              minutes: 10,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 2 review",
          theme: "Compare and celebrate.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 1,
              title: "Re-shadow your Day-1 clip",
              minutes: 12,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 2,
              title: "Review week 2 vocab",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 3,
              title: "Journal: 1 thing that felt easier",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 3,
      title: "Week 3 — Stand-ups & updates",
      focus: "Workplace fluency under live conditions",
      objective: "Speak in real meetings without rehearsing every line.",
      outcomes: [
        "Give a 2-minute live update with zero notes",
        "Use natural connectors (so, anyway, that said)",
        "Ask follow-ups in meetings without freezing",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Connectors in motion",
          theme: "Glue words that keep you moving.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 1,
              title: "12 connector phrases",
              examples: ["so, anyway, that said, on top of that, also, by the way, basically, the thing is, in other words, for example, more importantly, long story short"],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 2,
              title: "Tell a 2-min story using 5 connectors",
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 3,
              title: "Rewrite an old paragraph using 3 connectors",
              minutes: 6,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Update format: status, blockers, asks",
          theme: "The reusable update template.",
          tasks: [
            mirrorTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 1,
              title: "Practice the 3-part update format",
              summary: "Status → Blockers → Asks. 90 seconds.",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 2,
              title: "Give 3 updates as if to 3 different audiences",
              summary: "Same content, different angle: manager / peer / client.",
              minutes: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 3,
              title: "Write your real Friday update for this week",
              minutes: 8,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Meeting English",
          theme: "Joining, leaving, jumping in.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 1,
              title: "Meeting phrase bank (10)",
              examples: [
                "Quick context before we start — / Mind if I jump in? / Sorry, I missed the start. / Could we park that for later? / To circle back on what ___ said — / Just to double-click on that — / Let's take this offline. / I'll follow up in writing. / Got it, that's clear. / I think we're aligned.",
              ],
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 2,
              title: "Roleplay: join a meeting late",
              summary: "Say hi, ask for context, contribute.",
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 3,
              title: "Watch a real product meeting on YouTube (5 min)",
              summary: "Note 5 phrases you'd actually use.",
              minutes: 8,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Disagreeing in meetings",
          theme: "Polite but clear.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 1,
              title: "Disagreement upgrades",
              examples: [
                "I see it slightly differently — / I'd actually push back on that. / What if we flipped it and ___? / I'm not fully sold on ___. / I want to be the contrarian here for a second.",
              ],
              minutes: 8,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 2,
              title: "Roleplay 3 disagreements",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 3,
              title: "Record yourself disagreeing — listen for tone",
              summary: "Calm = persuasive.",
              minutes: 6,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Asking great follow-ups",
          theme: "Questions show you're tracking.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 1,
              title: "Follow-up question stems (8)",
              examples: [
                "Can you say more about ___? / Just to clarify — / What would success look like? / What's the tradeoff? / Who's the user here? / What happens if ___? / What's the timeline? / Who else needs to be in the loop?",
              ],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 2,
              title: "Listen to a 5-min podcast → ask 5 follow-ups",
              minutes: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 3,
              title: "Add 3 follow-up questions to a recent doc",
              minutes: 6,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real-world test",
          theme: "Today, do it for real.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 1,
              title: "Speak up ONCE in a real meeting today",
              summary: "Even one sentence. Then write it down.",
              minutes: 5,
              bonus: 20,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 2,
              title: "Journal: how did that moment feel?",
              minutes: 6,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 3,
              title: "Shadow 3 min of your favorite speaker",
              minutes: 8,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 3 review",
          theme: "Compare your speech to last week.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 1,
              title: "Record a 3-min 'what I shipped this week'",
              minutes: 10,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 2,
              title: "Review week 3 vocab",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 3,
              title: "Journal: a meeting moment I'm proud of",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 4,
      title: "Week 4 — Full conversations",
      focus: "Hold a real 5-minute back-and-forth",
      objective: "Build endurance: longer chats without dropping into Hindi.",
      outcomes: [
        "Sustain 5+ minutes of English conversation",
        "Recover smoothly from missed words",
        "Have a 'go-to' set of fillers and bridges",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Bridge phrases",
          theme: "Buy yourself thinking time.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 1,
              title: "Thinking-time phrases (8)",
              examples: [
                "That's a good question — / Let me think for a sec. / Hmm, where do I start. / It's a bit of both, but ___. / Honestly, I haven't thought about it much, but ___.",
              ],
              minutes: 7,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 2,
              title: "Use each bridge 3× out loud",
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 3,
              title: "Answer 3 surprise questions with a bridge",
              summary: "Set a timer, hit 'random', answer in 60 seconds.",
              minutes: 8,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — 5-min self-interview",
          theme: "Ask + answer 5 questions, alone.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 1,
              title: "Q&A with yourself (record it)",
              summary: "Ask 5 questions, answer each in 60 seconds.",
              minutes: 12,
            }),
            listeningTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 2,
              title: "Listen back at 1× and 1.5×",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 3,
              title: "Note 2 things to fix tomorrow",
              minutes: 4,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Conversation with an AI partner",
          theme: "Free roleplay.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 1,
              title: "Open Claude / ChatGPT — chat for 10 min ONLY in English",
              summary: "Set the topic. No Hindi. Speak responses out loud.",
              minutes: 14,
              bonus: 15,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 2,
              title: "Save 5 new phrases from the chat",
              minutes: 6,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Listening at speed",
          theme: "Train your ear for faster speakers.",
          tasks: [
            listeningTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 1,
              title: "Watch a 6-min YouTube video at 1.25×",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 2,
              title: "Summarize it in 5 sentences out loud",
              minutes: 8,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 3,
              title: "Capture 5 fast-speech phrases",
              minutes: 6,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Telling 'how it happened'",
          theme: "Personal stories build connection.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 1,
              title: "Tell a 3-min story: a time something went wrong",
              minutes: 12,
            }),
            grammarTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 2,
              title: "Past continuous: 'I was working when ___'",
              examples: [
                "I was deploying when the database crashed.",
                "She was presenting when the WiFi died.",
              ],
              minutes: 7,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 3,
              title: "Write a 6-sentence version of the same story",
              minutes: 8,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real-world test",
          theme: "Make today an English day.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 1,
              title: "Send 3 English voice notes in real chats",
              minutes: 8,
              bonus: 15,
            }),
            listeningTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 2,
              title: "Listen-only podcast walk (15 min)",
              minutes: 16,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 3,
              title: "Journal: 'biggest unlock this month'",
              minutes: 6,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Month 2 graduation",
          theme: "Compare. Celebrate. Set the next bar.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 1,
              title: "Re-record the 5-min monologue from Week 1",
              summary: "Listen to both. Smile.",
              minutes: 12,
              bonus: 20,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 2,
              title: "Journal: 10 sentences I now say without translating",
              minutes: 10,
              bonus: 15,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 3,
              title: "Update your Month 3 goal in Settings",
              minutes: 4,
            }),
          ],
        },
      ],
    },
  ],
};
