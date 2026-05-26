# Fluent Path

A production-grade, gamified, full-stack **6-month English fluency** web app — built on **Next.js 16** (App Router + Route Handlers + Proxy, Turbopack, React Compiler), **React 19.2**, **MongoDB Atlas**, and **Tailwind v4**.

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
| **Settings**        | Theme, daily time, profile, **re-seed plan**, **reset progress**, sign out   |
| **Auth**            | Single-creator login (email + password), JWT session cookies, route protection |
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
- **MongoDB Atlas** for all persistence (plan, achievements, progress, vocab, journal, recordings, settings, users)
- **Next.js Route Handlers** (`src/app/api/**`) for the backend — no separate server
- **Proxy** (`src/proxy.ts`, the new name for Middleware in v16) gates protected pages
- **`jose`** JWT in an `httpOnly` `SameSite=Lax` cookie for stateless sessions
- **`bcryptjs`** for password hashing (rounds=12)
- **SWR** + optimistic `mutate` on the client; the static `src/data/plan/*.ts` files are still the seed source but are immediately mirrored into MongoDB
- Strict TypeScript with full domain model in `src/types/`

---

## 🚀 Getting started

```bash
pnpm install
cp .env.example .env.local
# fill in MONGODB_URI, SESSION_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/login`. Sign in with the `ADMIN_*` credentials you configured; the account is created on the first successful login.

After signing in, open `/api/seed` once (GET) to push the plan and achievement catalog into MongoDB. (Subsequent requests are idempotent; `POST /api/seed?force=1` re-pushes the plan from code.)

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
├── contexts/                       # auth, theme, settings, progress, plan, vocabulary, journal, recordings, achievements, toast
├── data/
│   ├── achievements.ts             # seed catalog
│   └── plan/
│       ├── helpers.ts              # task factories per skill
│       ├── month-1.ts ... month-6.ts
│       └── index.ts                # PLAN + lookups (seed source)
├── hooks/
│   └── use-current-plan-position.ts
├── lib/
│   ├── api.ts                      # fetch wrapper + SWR fetcher
│   ├── auth/                       # password, session, server helpers
│   ├── db/                         # mongo client, collection accessors, plan/progress services
│   ├── dates.ts, utils.ts, gamification.ts
│   └── storage.ts                  # (legacy) localStorage helpers
├── proxy.ts                        # route protection (the "middleware" of Next 16)
└── types/                          # all TS types
```

### API surface

```
POST   /api/auth/login         { email, password }   → { user }
POST   /api/auth/logout                              → { ok: true }
GET    /api/auth/me                                  → { user | null }

GET    /api/plan                                     → { plan, stats }
GET    /api/achievements                             → { achievements }

GET    /api/progress                                 → { state }
DELETE /api/progress                                 → reset XP/streak/history
POST   /api/progress/toggle    { taskId }            → { state, unlocks, xpDelta }

GET    /api/vocabulary
POST   /api/vocabulary         { word, meaning, ... }
PATCH  /api/vocabulary/:id     { ...patch }
DELETE /api/vocabulary/:id
POST   /api/vocabulary/:id/review  { knew: boolean }

GET    /api/journal
POST   /api/journal            { text, mood?, prompt? }  → upserts today
DELETE /api/journal/:id

GET    /api/recordings
POST   /api/recordings         { prompt, duration, selfRating?, notes? }
DELETE /api/recordings/:id

GET    /api/settings
PATCH  /api/settings           { name?, goal?, theme?, ... }

GET    /api/seed                                     → idempotent first-time seed
POST   /api/seed?force=1                             → re-push plan + achievements
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

## 🔒 Privacy & auth

- Single-creator account, gated by email + password.
- Passwords are hashed with bcrypt (cost 12) before they ever touch the database.
- Sessions are stateless JWTs signed with `SESSION_SECRET`, delivered as an httpOnly, SameSite=Lax cookie that expires after 30 days.
- Every API route re-validates the session — the proxy is only a fast optimistic check (see `node_modules/next/dist/docs/01-app/02-guides/authentication.md`).
- All user data lives in your MongoDB Atlas cluster, scoped by `userId`.

---

## 📜 License

MIT — fork it, remix it, build your own version.
