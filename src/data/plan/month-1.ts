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

const M = 1;

export const month1: PlanMonth = {
  index: M,
  title: "Month 1 — Foundations",
  focus: "Sentence structure + speaking confidence",
  tagline: "Stop freezing. Start saying things.",
  description:
    "You'll wake up your speaking muscle with tiny, daily patterns. The goal isn't to be perfect — it's to make English a normal sound in your mouth.",
  icon: "Sparkles",
  accent: "emerald",
  tip: "Mistakes are the path, not the obstacle. Speak slowly. Speak anyway.",
  weeks: [
    {
      index: 1,
      title: "Week 1 — Patterns you'll use every day",
      focus: "Simple subject + verb + object sentences",
      objective:
        "Make 30+ sentences with 5 core patterns so you stop searching for words mid-sentence.",
      outcomes: [
        "Use 'I am / I have / I want / I can / I'll' fluently",
        "Say your name, job, city, and goal without thinking",
        "Build a personal 25-word vocabulary list",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — The first 5 patterns",
          theme: "Set the foundation. Say it out loud.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 1,
              title: "Learn 5 personal words",
              summary: "Pick 5 words you use about yourself daily.",
              how: [
                "Open the Vocabulary page and tap Add.",
                "Choose words about YOU: job, hobby, food, place, feeling.",
                "Write a meaning AND an example sentence for each.",
              ],
              examples: [
                "developer — I am a developer.",
                "coffee — I drink coffee every morning.",
                "tired — I feel tired after long meetings.",
              ],
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 2,
              title: "Master pattern: I am ___ / I have ___",
              summary: "Make 10 sentences out loud, alternating both patterns.",
              how: [
                "Stand up. Phone in airplane mode. No screens.",
                "Say 5 'I am ___' sentences (job, feeling, age, location, status).",
                "Say 5 'I have ___' sentences (item, family, plan, problem, idea).",
              ],
              examples: [
                "I am a frontend developer.",
                "I am 27 years old.",
                "I have two cats.",
                "I have a meeting at 4 PM.",
              ],
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 1, slot: 3,
              title: "Write 3 sentences about today",
              summary: "Open the Journal. Three short sentences. That's it.",
              how: [
                "Pattern: 'Today I ___. I felt ___. Tomorrow I will ___.'",
                "Don't translate from Hindi — write the simplest English version.",
              ],
              minutes: 5,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — I want / I need",
          theme: "Express needs cleanly.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 1,
              title: "Add 5 'verbs of need'",
              summary: "Practical verbs you'll use today.",
              examples: [
                "want, need, like, prefer, choose",
                "I want to learn. I need to focus. I like clear plans.",
              ],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 2,
              title: "10 'I want / I need' sentences",
              summary: "Mix wants with reasons.",
              how: [
                "Pattern: 'I want X because ___.'",
                "Say each sentence twice — first slow, then natural.",
              ],
              examples: [
                "I want to improve my English because I want a better job.",
                "I need 30 minutes of quiet time to focus.",
              ],
              minutes: 8,
            }),
            grammarTask({
              monthIndex: M, weekIndex: 1, dayIndex: 2, slot: 3,
              title: "Mini lesson: 'to + verb' (infinitive)",
              summary: "After want/need/like/try, English uses 'to + verb'.",
              examples: [
                "I want to sleep. (not 'I want sleep')",
                "I need to call my mom.",
                "I like to read at night.",
              ],
              minutes: 6,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — I can / I can't",
          theme: "Talk about ability and limits.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 1,
              title: "Record: 5 things you can, 5 you can't",
              summary: "Use the Practice page recorder. Listen back once.",
              how: [
                "Pattern: 'I can ___ but I can't ___ yet.'",
                "Don't edit. Just speak, listen, and notice.",
              ],
              examples: [
                "I can write code in Python but I can't speak English fast yet.",
                "I can lead a small team but I can't run a big meeting yet.",
              ],
              minutes: 10,
            }),
            listeningTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 2,
              title: "Watch one beginner video (5 minutes)",
              summary: "English with Lucy or BBC Learning English (Level 1).",
              how: [
                "Watch with English subtitles ON.",
                "Pause every 30s. Repeat one full sentence out loud.",
              ],
              resources: [
                { label: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish" },
                { label: "English with Lucy (YouTube)", url: "https://www.youtube.com/@EnglishwithLucy" },
              ],
              minutes: 10,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 3, slot: 3,
              title: "Add 5 ability verbs",
              summary: "Verbs you use at work + life.",
              examples: ["build, fix, lead, explain, design"],
              minutes: 6,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Questions: What / Where / When",
          theme: "Don't just answer. Ask.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 1,
              title: "Question structure: WH + do/does + subject + verb",
              summary: "The skeleton of every English question.",
              examples: [
                "What do you do? Where do you live?",
                "When does the meeting start? What does this mean?",
              ],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 2,
              title: "Ask 6 questions to yourself",
              summary: "Then answer each one in 1 sentence.",
              how: [
                "Look in the mirror. Ask out loud.",
                "Then answer with a full sentence (not just one word).",
              ],
              examples: [
                "What do I do for work? — I work as a developer at ___.",
                "Where do I want to be in 1 year? — I want to be ___.",
              ],
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 4, slot: 3,
              title: "Write 5 'getting to know you' questions",
              summary: "You could ask any new colleague.",
              examples: [
                "What's your name?",
                "Where are you from?",
                "What do you work on?",
                "How long have you been here?",
                "What do you enjoy doing on weekends?",
              ],
              minutes: 6,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Greetings + small talk",
          theme: "The first 60 seconds of any meeting.",
          tasks: [
            mirrorTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 1,
              title: "Mirror practice: morning greeting",
              summary: "Say it as if a colleague just joined the call.",
              how: [
                "Stand. Smile. Use this script: 'Good morning! How's it going? — Pretty good, thanks. How about you?'",
                "Do it 3 times. Try different energy: chill, warm, curious.",
              ],
              minutes: 6,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 2,
              title: "5 small-talk phrases",
              summary: "Add these to your bank.",
              examples: [
                "How's your week going?",
                "Anything exciting today?",
                "Long day, huh?",
                "Hope you had a good weekend.",
                "Catch you later!",
              ],
              minutes: 7,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 5, slot: 3,
              title: "Record a 60-second 'meeting opener'",
              summary: "Imagine joining a stand-up and saying hi to 3 people.",
              minutes: 8,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Numbers, time, dates",
          theme: "The boring stuff that breaks fluency if you skip it.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 1,
              title: "Say 20 numbers, times, and dates aloud",
              summary: "Mix big numbers, decimals, percentages, dates.",
              examples: [
                "Today is Tuesday, May twenty-sixth, twenty twenty-six.",
                "The meeting is at three forty-five PM.",
                "Our team grew from fifteen to twenty-three people.",
              ],
              minutes: 10,
            }),
            grammarTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 2,
              title: "Cardinal vs ordinal (one / first)",
              summary: "Memorize the irregular ones.",
              examples: [
                "1st first, 2nd second, 3rd third, 21st twenty-first",
              ],
              minutes: 6,
            }),
            writingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 6, slot: 3,
              title: "Write your weekly schedule in English",
              summary: "Use full sentences with time markers.",
              examples: [
                "On Mondays, I have a 10 AM stand-up.",
                "Every Friday afternoon, I review pull requests.",
              ],
              minutes: 8,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 1 review + reflect",
          theme: "Lock it in. Notice the wins.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 1,
              title: "2-minute self introduction (record it)",
              summary: "Name, job, where you live, what you're working on, what you want.",
              how: [
                "Record yourself. Listen back. Note 2 things you liked, 1 to improve.",
                "Save this — you'll re-record it in Month 6 and the difference will shock you.",
              ],
              minutes: 12,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 2,
              title: "Review all words from week 1",
              summary: "Open Vocabulary > Review and run through them.",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 1, dayIndex: 7, slot: 3,
              title: "Journal: 5 sentences I can now say",
              summary: "Pick 5 sentences you couldn't comfortably say a week ago.",
              minutes: 7,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 2,
      title: "Week 2 — Talking about your work",
      focus: "Present tense + workplace verbs",
      objective:
        "Be able to explain what you do, what you're working on, and what's blocking you.",
      outcomes: [
        "Use present simple + present continuous correctly",
        "Have 15 work verbs at the tip of your tongue",
        "Give a 2-minute work update without notes",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Present simple vs continuous",
          theme: "'I work' vs 'I am working'.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 1,
              title: "Lesson: simple vs continuous",
              summary: "Simple = habit/fact. Continuous = right now / this period.",
              examples: [
                "I work at a startup. (fact)",
                "I am working on a new feature. (right now / this period)",
                "She speaks three languages. (always true)",
                "She is speaking to the team. (this moment)",
              ],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 2,
              title: "5 'I work...' + 5 'I am working on...' sentences",
              summary: "Out loud. Don't write them first.",
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 1, slot: 3,
              title: "Write 6 sentences about your week",
              summary: "3 facts + 3 'this week' sentences.",
              minutes: 8,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Workplace verbs",
          theme: "Verbs that pull their weight.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 1,
              title: "Add 10 work verbs",
              summary: "Use them in your job today.",
              examples: [
                "ship, review, refactor, debug, sync, align, prioritize, scope, estimate, retro",
              ],
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 2,
              title: "Use 5 of those verbs in real sentences",
              summary: "About something you actually did or will do.",
              examples: [
                "I'm shipping the new dashboard this week.",
                "We'll review the auth flow tomorrow.",
              ],
              minutes: 7,
            }),
            listeningTask({
              monthIndex: M, weekIndex: 2, dayIndex: 2, slot: 3,
              title: "Watch a 6-min product demo on YouTube",
              summary: "Note 5 verbs they use. Add the new ones to vocab.",
              minutes: 8,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Daily standup script",
          theme: "Yesterday / today / blockers.",
          tasks: [
            mirrorTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 1,
              title: "Stand-up format: 60 seconds",
              summary: "The pattern that works in every team.",
              how: [
                "1) Yesterday I worked on ___.",
                "2) Today I'll ___.",
                "3) I'm blocked on ___ — I might need help from ___.",
                "Practice this 3 times in the mirror.",
              ],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 2,
              title: "Record your real stand-up for today",
              summary: "Listen back. Did you sound natural? Add one detail.",
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 3, slot: 3,
              title: "Write 3 sample stand-ups",
              summary: "One easy day, one busy day, one blocked day.",
              minutes: 8,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Talking about problems",
          theme: "Describe what's wrong without panicking.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 1,
              title: "8 'problem' phrases",
              summary: "How real engineers describe bugs and blockers.",
              examples: [
                "It's flaky — it works sometimes.",
                "It's broken on production.",
                "I'm hitting a wall with ___.",
                "There's a race condition.",
                "It silently fails.",
                "I'm not sure why, but ___.",
                "It blew up after the deploy.",
                "It only happens under load.",
              ],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 2,
              title: "Describe a recent bug in 5 sentences",
              summary: "What broke, when, how you noticed, what you tried, what's next.",
              minutes: 10,
            }),
            grammarTask({
              monthIndex: M, weekIndex: 2, dayIndex: 4, slot: 3,
              title: "Past simple of common verbs",
              summary: "Memorize the irregular ones we use most.",
              examples: [
                "do→did, see→saw, run→ran, write→wrote, fix→fixed, build→built, ship→shipped, break→broke, find→found, choose→chose",
              ],
              minutes: 7,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Asking for help politely",
          theme: "Confident, not apologetic.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 1,
              title: "Could / Would / Can — politeness ladder",
              summary: "Same meaning, different temperature.",
              examples: [
                "Can you help me? (informal, direct)",
                "Could you help me? (neutral, professional)",
                "Would you mind helping me? (very polite)",
              ],
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 2,
              title: "Ask for 5 different kinds of help — out loud",
              summary: "Approve a PR, jump on a call, review a design, etc.",
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 5, slot: 3,
              title: "Write 3 Slack-style help messages",
              summary: "Short, polite, gives context.",
              examples: [
                "Hey! Quick one — could you take a look at this PR when you get a sec? No rush.",
              ],
              minutes: 7,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Saying no & pushing back",
          theme: "The hardest English skill. Worth a whole day.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 1,
              title: "10 'push back' phrases",
              summary: "Polite but firm.",
              examples: [
                "I'd love to, but I'm slammed this week.",
                "Can we revisit this next sprint?",
                "Let me think about it and get back to you.",
                "I don't think that's the right call because ___.",
                "Happy to help, but not today.",
              ],
              minutes: 10,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 2,
              title: "Practice 5 'no' scenarios",
              summary: "Say each one twice — once gentle, once firm.",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 6, slot: 3,
              title: "Record a 'no' with a reason",
              summary: "Don't apologize. Give one clean reason and a path forward.",
              minutes: 6,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Week 2 review",
          theme: "Run the full work loop.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 1,
              title: "Record a 3-minute 'state of my week'",
              summary: "What you shipped, what's stuck, what you'll do next.",
              minutes: 12,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 2,
              title: "Review all week 2 words",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 2, dayIndex: 7, slot: 3,
              title: "Journal: hardest thing to say in English at work",
              summary: "Write it. Then write 3 versions you'd actually use.",
              minutes: 8,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 3,
      title: "Week 3 — Short conversations",
      focus: "Listen, react, keep going",
      objective:
        "Hold a 2-minute back-and-forth without panicking when you don't catch a word.",
      outcomes: [
        "Use natural fillers ('right', 'got it', 'makes sense')",
        "Know what to say when you didn't understand",
        "Tell a 4-sentence story about something that happened today",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Reactions & acknowledgments",
          theme: "Sound like you're listening.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 1,
              title: "10 listening reactions",
              summary: "These tiny words make you sound fluent.",
              examples: [
                "Right.  Got it.  Makes sense.  Totally.  Yeah, exactly.  Oh, interesting.  Wait, really?  Mm-hmm.  For sure.  Fair enough.",
              ],
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 2,
              title: "Shadow a 2-min conversation clip",
              summary: "Copy the rhythm, not just the words.",
              how: [
                "Find a short clip from any English podcast or interview.",
                "Play 1 sentence → pause → repeat exactly → resume.",
                "Match the speaker's speed and tone, not just the meaning.",
              ],
              minutes: 12,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 1, slot: 3,
              title: "Use 5 reactions in fake dialogue",
              summary: "Pretend a colleague is talking. React naturally.",
              minutes: 6,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — \"Could you repeat that?\"",
          theme: "Survival kit for missed words.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 1,
              title: "8 'I missed that' phrases",
              summary: "Use them without shame.",
              examples: [
                "Sorry, could you say that again?",
                "Could you repeat the last part?",
                "Sorry, I didn't catch that.",
                "Could you say that a bit slower?",
                "What does ___ mean?",
                "Just to make sure I got it — you mean ___?",
                "Let me say that back to you: ___?",
                "Could you spell that?",
              ],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 2,
              title: "Practice the 8 phrases out loud",
              summary: "Twice each. Make them automatic.",
              minutes: 6,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 3, dayIndex: 2, slot: 3,
              title: "Mirror: confident 'I didn't understand'",
              summary: "No shrinking. No apology spiral.",
              minutes: 6,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Tell a short story",
          theme: "Yesterday I... Then... So... In the end...",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 1,
              title: "Story connectors",
              summary: "Glue words that make a story flow.",
              examples: [
                "First / Then / After that / Suddenly / In the end / So I / That's when / Eventually",
              ],
              minutes: 7,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 2,
              title: "Tell a 4-sentence story about today",
              summary: "Something tiny — even what you ate for lunch.",
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 3, slot: 3,
              title: "Write a 6-sentence story about a weekend memory",
              summary: "Use at least 3 connectors.",
              minutes: 10,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Opinions: I think / I feel / In my view",
          theme: "Start having a take.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 1,
              title: "6 opinion openers",
              summary: "Different levels of certainty.",
              examples: [
                "I think... / I feel like... / In my view... / If you ask me... / Honestly... / It seems to me that...",
              ],
              minutes: 6,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 2,
              title: "Give 5 opinions out loud",
              summary: "About topics you actually care about.",
              examples: [
                "Honestly, I think remote work is better for deep work.",
                "If you ask me, daily standups are too long at most teams.",
              ],
              minutes: 8,
            }),
            writingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 4, slot: 3,
              title: "Write a 5-sentence opinion paragraph",
              summary: "Opener → 2 reasons → 1 example → 1 conclusion.",
              minutes: 8,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Agreeing & disagreeing softly",
          theme: "Push back without picking a fight.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 1,
              title: "Soft disagreement bank",
              summary: "Useful in design reviews and 1:1s.",
              examples: [
                "I see what you mean, but ___.",
                "That makes sense — although ___.",
                "I'd push back gently on that because ___.",
                "Have we considered ___?",
                "What if we tried ___ instead?",
              ],
              minutes: 8,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 2,
              title: "Practice 3 soft disagreement scenarios",
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 5, slot: 3,
              title: "Record yourself disagreeing with a colleague (imagined)",
              summary: "Keep your tone calm and curious.",
              minutes: 6,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Small-talk topics in motion",
          theme: "Weekends, weather, food, plans, shows.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 1,
              title: "12 small-talk go-tos",
              summary: "Topics + 1 question each.",
              examples: [
                "Weekend plans: 'Anything fun this weekend?'",
                "Travel: 'Have you been anywhere lately?'",
                "Food: 'What's your go-to lunch spot?'",
                "Shows: 'Watching anything good lately?'",
              ],
              minutes: 8,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 2,
              title: "Roleplay: 90-second small talk before a meeting",
              summary: "You start it. Keep it light.",
              minutes: 8,
            }),
            listeningTask({
              monthIndex: M, weekIndex: 3, dayIndex: 6, slot: 3,
              title: "Watch any 7-min vlog in English",
              summary: "Notice every small-talk phrase. Add 2 new ones to vocab.",
              minutes: 8,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Conversation simulation",
          theme: "Full back-and-forth.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 1,
              title: "3-minute roleplay: you + a new teammate",
              summary: "Greet, small talk, share what you do, ask 2 questions.",
              minutes: 12,
            }),
            vocabTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 2,
              title: "Review week 3 vocab",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 3, dayIndex: 7, slot: 3,
              title: "Journal: a moment in English that felt easier this week",
              minutes: 7,
              bonus: 10,
            }),
          ],
        },
      ],
    },
    {
      index: 4,
      title: "Week 4 — Slow, clear, confident",
      focus: "Pacing + clarity + review",
      objective:
        "Lock in everything from month 1. Speak slowly enough to be clear, but never robotic.",
      outcomes: [
        "Recognize and correct your top 3 speech 'crutches'",
        "Pace yourself at ~120 words per minute",
        "Re-record your Day-7 intro and feel proud",
      ],
      days: [
        {
          index: 1,
          label: "Day 1 — Find your filler words",
          theme: "Name them, tame them.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 1,
              title: "Record 2 minutes on any topic",
              summary: "Then count: how many 'um', 'like', 'actually' did you use?",
              minutes: 10,
            }),
            mirrorTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 2,
              title: "Practice pausing instead of filling",
              summary: "Silent pauses sound thoughtful. Fillers sound nervous.",
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 1, slot: 3,
              title: "Write down your top 3 fillers",
              summary: "You can only fix what you can name.",
              minutes: 4,
            }),
          ],
        },
        {
          index: 2,
          label: "Day 2 — Slow it down",
          theme: "Slower than feels natural = perfect.",
          tasks: [
            shadowTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 1,
              title: "Shadow a 'slow English' video (5 min)",
              summary: "Search YouTube: 'slow English for beginners'.",
              minutes: 12,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 2,
              title: "Re-record yesterday's 2-min topic — slower",
              summary: "Notice the difference. Slower = clearer, not weaker.",
              minutes: 10,
            }),
            pronunciationTask({
              monthIndex: M, weekIndex: 4, dayIndex: 2, slot: 3,
              title: "Read 1 paragraph aloud — punctuate every comma",
              summary: "Tiny pauses at every comma build natural rhythm.",
              minutes: 6,
            }),
          ],
        },
        {
          index: 3,
          label: "Day 3 — Stress the right words",
          theme: "English speakers emphasize meaning words.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 1,
              title: "Lesson: content vs function words",
              summary: "Stress nouns/verbs/adjectives. Skim through the/a/of/in.",
              examples: [
                "I'm working on the new dashboard for the analytics team.",
                "(Stress: 'working', 'new', 'dashboard', 'analytics', 'team'.)",
              ],
              minutes: 7,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 2,
              title: "Read 5 sentences with marked stress",
              summary: "First flat, then with stress. Hear the difference.",
              minutes: 8,
            }),
            shadowTask({
              monthIndex: M, weekIndex: 4, dayIndex: 3, slot: 3,
              title: "Shadow 3 minutes of a TED talk (beginner-friendly)",
              summary: "Copy where they emphasize.",
              minutes: 10,
            }),
          ],
        },
        {
          index: 4,
          label: "Day 4 — Full revision: weeks 1–3 words",
          theme: "Recall is the real practice.",
          tasks: [
            vocabTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 1,
              title: "Review every word from this month",
              summary: "Use the Review mode in Vocabulary.",
              minutes: 15,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 2,
              title: "Use 10 random month-1 words in fresh sentences",
              summary: "Don't reuse the original examples.",
              minutes: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 4, slot: 3,
              title: "Mini story using 8 of your new words",
              summary: "150 words is plenty.",
              minutes: 10,
            }),
          ],
        },
        {
          index: 5,
          label: "Day 5 — Full revision: grammar",
          theme: "Patterns in motion.",
          tasks: [
            grammarTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 1,
              title: "Recap: present simple vs continuous, infinitives, questions",
              summary: "Skim the 4 mini lessons. Test yourself out loud.",
              minutes: 10,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 2,
              title: "Build 12 sentences using mixed grammar",
              summary: "4 simple, 4 continuous, 4 questions.",
              minutes: 10,
            }),
            writingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 5, slot: 3,
              title: "Write a 1-paragraph 'about me'",
              summary: "Should feel natural in your voice.",
              minutes: 8,
            }),
          ],
        },
        {
          index: 6,
          label: "Day 6 — Real-world test",
          theme: "Use it in your actual day.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 1,
              title: "Have ONE real English exchange today",
              summary: "Slack reply, voice note, comment on a PR. Anything live.",
              minutes: 5,
              bonus: 15,
            }),
            listeningTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 2,
              title: "Listen to a 6-min podcast (beginner)",
              summary: "Don't pause. Try to follow the gist.",
              resources: [
                { label: "6 Minute English (BBC)", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english" },
              ],
              minutes: 8,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 6, slot: 3,
              title: "Journal: my one real-world moment today",
              summary: "What happened? How did it feel?",
              minutes: 6,
            }),
          ],
        },
        {
          index: 7,
          label: "Day 7 — Month 1 graduation",
          theme: "Re-record. Compare. Celebrate.",
          tasks: [
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 1,
              title: "Re-record your Week-1 self introduction",
              summary: "Listen to BOTH versions back-to-back.",
              minutes: 12,
              bonus: 20,
            }),
            reflectionTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 2,
              title: "Journal: 5 sentences I can say now that I couldn't a month ago",
              minutes: 8,
              bonus: 15,
            }),
            speakingTask({
              monthIndex: M, weekIndex: 4, dayIndex: 7, slot: 3,
              title: "Set a public-ish intention for Month 2",
              summary: "Say it out loud, write it in Settings > Goal.",
              minutes: 5,
            }),
          ],
        },
      ],
    },
  ],
};
