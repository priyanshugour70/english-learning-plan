# Fluent Path

A production-grade, gamified, offline-first **6-month English fluency** web app — built on **Next.js 16** (App Router, Turbopack, React Compiler), **React 19.2**, and **Tailwind v4**.

> "Six months from now, you'll walk into any room and speak with calm."

---

## ✨ What's inside

A complete, opinionated daily plan you can actually follow:

- **6 months · 24 weeks · 168 daily plans · 500+ micro-tasks**
- Each day has 3–4 micro-tasks across **Speaking, Listening, Reading, Writing, Vocabulary, Grammar, Pronunciation**
- Every task includes title + summary + step-by-step "how to do it" + examples + (often) resources
- Tasks are short (5–18 min), concrete, and tied to real-world moments (work, meetings, interviews, daily life)

### Core features

| Feature             | What it does                                                                 |
| ------------------- | ---------------------------------------------------------------------------- |
| **Dashboard**       | Today snapshot, level, streak, XP, skill rings, 21-day calendar, achievements |
| **Today**           | The current day's tasks with progress bar, expandable details, and navigation |
| **Roadmap**         | 6 months → drill into months → weeks → individual days                       |
| **Vocabulary**      | Add words, search, spaced repetition (5 boxes), review mode                  |
| **Journal**         | Daily English diary with prompts, mood, word count                           |
| **Practice studio** | Browser-based recorder (MediaRecorder), 4 prompt categories, session history |
| **Achievements**    | 19 badges across 4 tiers — streak, XP, skill, and milestones                 |
| **Settings**        | Theme, daily time, profile, **export / import / hard-reset** all data        |
| **Onboarding**      | 3-step gentle welcome the first time                                         |

### Gamification

- **XP** per task, weighted by skill and minutes (e.g. speaking is 5 XP/min, listening 4)
- **Levels** with named tiers (Spark → Beginner → Builder → Fluent → Eloquent → Master)
- **Streak** tracking with auto-recovery & best-streak record
- **Daily goal** auto-scaled to your "minutes per day" setting
- **Skill rings** visualize XP per skill (Speaking 🗣️ Listening 🎧 Vocab 🧠 …)
- **19 achievements** with toast notifications on unlock

### Design

- Modern, friendly, Linear/Duolingo-inspired UI
- **Light + dark mode** with no-flash hydration
- Mobile-first with sticky bottom nav; desktop sidebar
- Emerald primary, 7 accent colors per skill
- Tailwind v4 `@theme inline` with HSL tokens
- Custom shadcn-style primitives (no Radix dep) — Button, Card, Badge, Progress, Checkbox, Dialog, Tabs, Input/Textarea, Tooltip, EmptyState

### Architecture

- **Next.js 16 App Router** with route groups (`(app)`) and Next-16-correct **async `params`** unwrapped via `React.use()`
- **React Compiler** enabled — components auto-memoized
- **Turbopack** dev & build (default in v16)
- **localStorage** persistence with SSR-safe hydration pattern (each context tracks `hydrated`)
- **No backend, no auth, no tracking** — your data lives only on your device
- Strict TypeScript with full domain model in `src/types/`
- Zero runtime dependencies beyond `lucide-react`, `clsx`, `tailwind-merge`, `date-fns`

---

## 🚀 Getting started

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build   # production build (Turbopack)
pnpm start   # serve production
pnpm lint    # eslint
```

---

## 📁 Folder structure

```
src/
├── app/
│   ├── (app)/                       # route group with sidebar + topbar
│   │   ├── layout.tsx
│   │   ├── app-shell.tsx           # gates onboarding, mounts shell
│   │   ├── page.tsx                # Dashboard
│   │   ├── today/page.tsx
│   │   ├── plan/
│   │   │   ├── page.tsx            # Roadmap
│   │   │   └── month/[month]/
│   │   │       ├── page.tsx        # Month detail
│   │   │       └── week/[week]/
│   │   │           ├── page.tsx    # Week detail
│   │   │           └── day/[day]/page.tsx
│   │   ├── vocabulary/page.tsx
│   │   ├── journal/page.tsx
│   │   ├── practice/page.tsx
│   │   ├── achievements/page.tsx
│   │   ├── settings/page.tsx
│   │   └── loading.tsx
│   ├── layout.tsx                  # root layout + theme init script
│   ├── globals.css                 # design tokens & utilities
│   ├── providers.tsx               # all context providers
│   └── not-found.tsx
├── components/
│   ├── ui/                         # base primitives
│   ├── layout/                     # sidebar, topbar, mobile-nav, theme toggle
│   ├── dashboard/                  # stat-card, skill-rings, streak-calendar
│   ├── plan/                       # task-item
│   ├── practice/                   # recorder
│   └── onboarding/                 # onboarding-screen
├── contexts/                       # theme, settings, progress, vocabulary, journal, recordings, toast
├── data/
│   ├── achievements.ts
│   └── plan/
│       ├── helpers.ts              # task factories per skill
│       ├── month-1.ts ... month-6.ts
│       └── index.ts                # PLAN + lookups
├── hooks/
│   └── use-current-plan-position.ts
├── lib/                            # utils, dates, storage, gamification
└── types/                          # all TS types
```

---

## 🎓 The plan philosophy

- **Speak slowly** > speak fast.
- **Show up daily** > go hard sometimes.
- **Tiny wins** > perfect lessons.
- **Real-world tests** every week force English into your actual day.
- **Re-record monthly** so you literally hear the improvement.

Month 1 lays the foundation. Month 6 graduates you with mock interviews, presentations, and a real long English conversation.

---

## 🔒 Privacy

Everything — progress, XP, vocabulary, journal, recordings metadata, achievements — is stored **only in your browser** (`localStorage`). There is no account, no server, no tracking. Export anytime from Settings.

---

## 📜 License

MIT — fork it, remix it, build your own version.
