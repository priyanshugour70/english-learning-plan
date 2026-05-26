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

const M = 3;

export const month3: PlanMonth = {
  index: M,
  title: "Month 3 — Pronunciation",
  focus: "Sound clear, calm and confident",
  tagline: "People stop asking 'sorry, what?'",
  description:
    "Targeted drills on the sounds Hindi speakers stumble on (V/W, TH, R, P/B endings), plus stress, rhythm and pace.",
  icon: "Mic",
  accent: "rose",
  tip: "You don't need a 'native' accent. You need a clear one. Slow + steady wins every meeting.",
  weeks: [
    {
      index: 1,
      title: "Week 1 — Mouth mechanics",
      focus: "How your mouth makes the hard sounds",
      objective: "Drill V/W, TH, R and P/B endings until they feel normal.",
      outcomes: [
        "Make a clean V vs W distinction",
        "Produce both TH sounds (think / this)",
        "End P/B/T/D words crisply (not swallowed)",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — V vs W",
          theme: "Lower lip touches teeth (V) vs round lips (W).",
          tasks: [
            pronunciationTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 1,
              title: "V vs W drill (50 words)",
              summary: "Mirror practice — watch your lip.",
              examples: ["very / wary, vine / wine, vest / west, vet / wet, vile / while, vow / wow"],
              minutes: 12,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 2,
              title: "Shadow a clip with many V/W words",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 3,
              title: "Record 10 V/W minimal pairs",
              summary: "Listen back. Can you hear the difference?",
              minutes: 8,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — TH sounds",
          theme: "Tongue between teeth. Yes, really.",
          tasks: [
            pronunciationTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 1,
              title: "Voiceless TH (think)",
              examples: ["think, thank, thumb, thin, three, thread, thirty, throw"],
              minutes: 8,
            }),
            pronunciationTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 2,
              title: "Voiced TH (this)",
              examples: ["this, that, the, they, them, then, those, brother, mother"],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 3,
              title: "Tongue-twister: 'Three thin thieves thought a thousand thoughts'",
              minutes: 8,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — R sound",
          theme: "Tongue back, lips slightly rounded.",
          tasks: [
            pronunciationTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 1,
              title: "R drill: start of word",
              examples: ["right, room, run, red, ready, real, river, route"],
              minutes: 8,
            }),
            pronunciationTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 2,
              title: "R in the middle/end",
              examples: ["very, sorry, story, far, your, here, more, before"],
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 3,
              title: "Shadow 3 min focusing on R",
              minutes: 10,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Ending consonants (P/B/T/D)",
          theme: "Don't swallow your endings.",
          tasks: [
            pronunciationTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 1,
              title: "Crisp endings drill",
              examples: ["stop, hop, cab, lab, bit, bat, bid, bed, sad, glad"],
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 2,
              title: "Read 8 sentences emphasizing endings",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 3,
              title: "Record — listen for swallowed endings",
              minutes: 6,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Short vs long vowels",
          theme: "Sheet vs shit. Beach vs bitch. Get it right.",
          tasks: [
            pronunciationTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 1,
              title: "Long /iː/ vs short /ɪ/ pairs",
              examples: ["sheep / ship, leave / live, feel / fill, peel / pill, seat / sit"],
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 2,
              title: "Record 10 vowel-pair sentences",
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 3,
              title: "Shadow 2 min with vowel focus",
              minutes: 8,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Mini-essay aloud",
          theme: "Apply everything you drilled.",
          tasks: [
            readingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 1,
              title: "Read a 200-word article aloud (record)",
              summary: "Slow. Crisp. Every ending heard.",
              minutes: 12,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 2,
              title: "Mark 3 sentences you'd like to redo",
              minutes: 5,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 3,
              title: "Re-record those 3 sentences",
              minutes: 6,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 1 review",
          theme: "Compare your day 1 and day 7 recordings.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 1,
              title: "Re-do V/W + TH + R drills (record)",
              minutes: 12,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 2,
              title: "Add 5 new words with tricky sounds",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 3,
              title: "Journal: clearest 'I sound better' moment",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 2,
      title: "Week 2 — Word stress",
      focus: "PREsent vs preSENT",
      objective: "Hit the right syllable so listeners catch the meaning instantly.",
      outcomes: [
        "Master stress in 2-syllable nouns vs verbs",
        "Notice and copy stress in longer words",
        "Use stress to highlight key meaning",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — 2-syllable rules",
          theme: "Nouns ↓ stress 1st, verbs ↓ stress 2nd.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 1,
              title: "Noun/verb stress pairs",
              examples: [
                "PREsent (noun) / preSENT (verb)",
                "REcord (noun) / reCORD (verb)",
                "PROject (noun) / proJECT (verb)",
                "OBject (noun) / obJECT (verb)",
                "PROduce (noun) / proDUCE (verb)",
              ],
              minutes: 8,
            }),
            pronunciationTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 2,
              title: "Say each pair 5 times",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 3,
              title: "Make 5 sentences using both forms",
              minutes: 8,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Longer-word stress",
          theme: "Find the loud syllable.",
          tasks: [
            pronunciationTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 1,
              title: "Drill 15 longer words",
              examples: [
                "DEvelop, deVELoper, developMENtal",
                "PHOtograph, phoTOgrapher, photoGRAPHic",
                "TECHnical, techNIcian",
              ],
              minutes: 10,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 2,
              title: "Shadow a clip with technical words",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 3,
              title: "Record 8 sentences with technical words",
              minutes: 8,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Sentence stress",
          theme: "Stress the meaning word.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 1,
              title: "How meaning changes with stress",
              examples: [
                "I didn't say SHE took the file. (someone else did)",
                "I didn't say she TOOK the file. (she did something else with it)",
                "I didn't say she took the FILE. (she took something else)",
              ],
              minutes: 7,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 2,
              title: "Read each variation aloud",
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 3,
              title: "Compose 5 sentences and mark stress points",
              minutes: 8,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Pacing + pausing",
          theme: "Pauses ≠ silence. They're emphasis.",
          tasks: [
            shadowTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 1,
              title: "Shadow a TED Talk for pacing only",
              summary: "Don't worry about words. Copy the rhythm.",
              minutes: 12,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 2,
              title: "Re-tell a 2-min topic with deliberate pauses",
              minutes: 10,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 3,
              title: "Note where pauses changed how you sounded",
              minutes: 5,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Speed control",
          theme: "Go slower than feels right.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 1,
              title: "Record same sentence 3 ways",
              summary: "Slow / normal / fast. Listen for clarity loss.",
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 2,
              title: "Shadow a fast speaker — slow yourself down",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 3,
              title: "Do a 90-second monologue at 'half speed'",
              minutes: 6,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Read a news article aloud",
          theme: "Real text, real stress.",
          tasks: [
            readingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 1,
              title: "Read a 300-word article (record)",
              summary: "Mark 10 stress points before reading.",
              minutes: 14,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 2,
              title: "Listen back — were you clear?",
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 3,
              title: "Re-read the article focusing on weak spots",
              minutes: 8,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 2 review",
          theme: "Layer stress + sound + pace.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 1,
              title: "3-min talk: pick a topic — apply all 3",
              minutes: 12,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 2,
              title: "Review week 2 tricky words",
              minutes: 6,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 3,
              title: "Journal: my 'before vs after' clarity",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 3,
      title: "Week 3 — Technical clarity",
      focus: "Explain technical things clearly",
      objective: "Teach a concept so a 5th grader could follow.",
      outcomes: [
        "Use 'analogy + structure + example' to explain anything",
        "Drop jargon when it's not needed",
        "Sound confident on technical recordings",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — The analogy muscle",
          theme: "Hard idea = familiar comparison.",
          tasks: [
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 1,
              title: "Write 5 analogies for tech concepts",
              examples: [
                "Cache is like a sticky note — fast to grab.",
                "A database index is like the index in a book — jump straight to the page.",
              ],
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 2,
              title: "Explain 1 concept using an analogy out loud",
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 3,
              title: "Shadow a 'simply explained' video (5 min)",
              minutes: 8,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Tell me what it is, why, how",
          theme: "Reusable structure.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 1,
              title: "Explain a tool/library in 90s",
              summary: "What it is → Why it matters → How it works.",
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 2,
              title: "Write the same in 5 sentences",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 3,
              title: "Record + listen — would a junior follow?",
              minutes: 6,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Walk through code",
          theme: "Voice-over your own pull request.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 1,
              title: "Pick a PR — narrate the diff out loud",
              summary: "Pretend it's a Loom for a teammate.",
              minutes: 14,
              bonus: 10,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 2,
              title: "5 code-review phrases",
              examples: ["I went with X over Y because ___, There's a small refactor in ___, This is a temporary fix — we should revisit when ___"],
              minutes: 6,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 3,
              title: "Write a 6-sentence PR description in English",
              minutes: 8,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Trade-offs out loud",
          theme: "Show your reasoning.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 1,
              title: "Trade-off phrase bank (8)",
              examples: [
                "On one hand ___, on the other ___",
                "The trade-off is ___",
                "It's faster but harder to maintain.",
                "We're optimizing for ___ over ___",
              ],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 2,
              title: "Talk through 2 real trade-offs from your work",
              minutes: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 3,
              title: "Write a 6-sentence decision note",
              minutes: 8,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Whiteboard explanations",
          theme: "Imagine drawing while you talk.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 1,
              title: "Explain a system with hand gestures (record)",
              summary: "Even on audio, gestures change your pacing.",
              minutes: 12,
            }),
            listeningTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 2,
              title: "Watch a system design walkthrough",
              minutes: 12,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 3,
              title: "Summarize what you learned in 4 sentences",
              minutes: 6,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real-world test",
          theme: "Loom or voice note today.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 1,
              title: "Record a real 3-min Loom/voice note for work",
              minutes: 12,
              bonus: 20,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 2,
              title: "Listen back — was it clear AND human?",
              minutes: 6,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 3,
              title: "Capture 3 new phrases you used naturally",
              minutes: 5,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 3 review",
          theme: "Pull it all together.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 1,
              title: "5-min talk: explain anything you're proud of",
              minutes: 14,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 2,
              title: "Review month 3 vocab so far",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 3,
              title: "Journal: a moment when clarity mattered this week",
              minutes: 6,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 4,
      title: "Week 4 — Pronunciation review",
      focus: "Put it all together",
      objective: "Combine sounds + stress + pace in real conversations.",
      outcomes: [
        "Sustained 5-minute talks with clean pronunciation",
        "Compare month 1 vs month 3 recordings",
        "Pick 3 'forever drills' to keep doing",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Compare past recordings",
          theme: "Hear the difference.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 1,
              title: "Re-record your Month 1 intro",
              summary: "Listen to both versions back-to-back.",
              minutes: 12,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 2,
              title: "Journal: 3 specific things that improved",
              minutes: 6,
              bonus: 10,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 3,
              title: "Shadow your favorite speaker 5 min",
              minutes: 10,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Drill the weakest sound",
          theme: "Target one weak spot.",
          tasks: [
            pronunciationTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 1,
              title: "Pick 1 sound — 15 min focused drill",
              minutes: 15,
              bonus: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 2,
              title: "10 sentences featuring that sound",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 3,
              title: "Record + compare to your start-of-month",
              minutes: 6,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Tongue twisters",
          theme: "Fun, fast, sharpening.",
          tasks: [
            pronunciationTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 1,
              title: "5 tongue twisters — slow then fast",
              examples: [
                "She sells seashells by the seashore.",
                "Red lorry, yellow lorry.",
                "How can a clam cram in a clean cream can?",
              ],
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 2,
              title: "Record a tongue-twister marathon",
              minutes: 6,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 3,
              title: "Shadow a comedian (chosen for clarity)",
              minutes: 8,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Mock interview",
          theme: "Apply pronunciation under pressure.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 1,
              title: "Answer 5 mock interview questions (record)",
              summary: "Use STAR. Mind your pace and sounds.",
              minutes: 14,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 2,
              title: "Note 2 sounds that slipped under pressure",
              minutes: 5,
            }),
            pronunciationTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 3,
              title: "Drill those 2 sounds again",
              minutes: 6,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Speak with a partner (or AI)",
          theme: "Real conversation > scripts.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 1,
              title: "Voice conversation with Claude/ChatGPT — 12 min",
              summary: "Topic: 'walk me through your last project'.",
              minutes: 14,
              bonus: 15,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 2,
              title: "Note the moments you sounded great",
              minutes: 5,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 3,
              title: "Write 5 phrases you want to keep using",
              minutes: 6,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Public-style monologue",
          theme: "As if presenting to 50 people.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 1,
              title: "5-min monologue (record): 'one thing I believe'",
              minutes: 14,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 2,
              title: "Shadow a TED-style opener",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 3,
              title: "Note 3 strong moments in your recording",
              minutes: 5,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Month 3 graduation",
          theme: "Decide your 'forever drills'.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 1,
              title: "Record final 3-min pronunciation showcase",
              minutes: 12,
              bonus: 20,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 2,
              title: "Pick 3 drills you'll do once a week forever",
              minutes: 6,
              bonus: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 3,
              title: "Set Month 4 intention in Settings",
              minutes: 4,
            }),
          ],
        },
      ],
    },
  ],
};
