import "server-only";

import type { Collection, IndexDescription, ObjectId } from "mongodb";

import { getDb } from "./mongo";
import type {
  AchievementDef,
  CompletedTaskRecord,
  JournalEntry,
  Plan,
  RecordingSession,
  SkillId,
  UserSettings,
  VocabularyEntry,
} from "@/types";

// =================== Document types ===================

export interface UserDoc {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  isAdmin: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface PlanMetaDoc {
  _id?: ObjectId;
  // Single document — there's only one canonical plan per user/install.
  key: "default";
  plan: Plan;
  updatedAt: string;
}

export interface AchievementDoc extends AchievementDef {
  _id?: ObjectId;
}

export interface SettingsDoc extends UserSettings {
  _id?: ObjectId;
  userId: string;
  updatedAt: string;
}

export interface ProgressDoc {
  _id?: ObjectId;
  userId: string;
  totalXp: number;
  skillXp: Record<SkillId, number>;
  completedTaskIds: string[];
  activeDays: string[];
  history: CompletedTaskRecord[];
  streak: number;
  bestStreak: number;
  lastActiveDate: string | null;
  unlockedAchievementIds: string[];
  startedAt: string;
  updatedAt: string;
}

export interface VocabularyDoc extends VocabularyEntry {
  _id?: ObjectId;
  userId: string;
}

export interface JournalDoc extends JournalEntry {
  _id?: ObjectId;
  userId: string;
}

export interface RecordingDoc extends RecordingSession {
  _id?: ObjectId;
  userId: string;
}

// =================== Collection accessors ===================

export async function usersCol(): Promise<Collection<UserDoc>> {
  return (await getDb()).collection<UserDoc>("users");
}

export async function planCol(): Promise<Collection<PlanMetaDoc>> {
  return (await getDb()).collection<PlanMetaDoc>("plan");
}

export async function achievementsCol(): Promise<Collection<AchievementDoc>> {
  return (await getDb()).collection<AchievementDoc>("achievements");
}

export async function settingsCol(): Promise<Collection<SettingsDoc>> {
  return (await getDb()).collection<SettingsDoc>("settings");
}

export async function progressCol(): Promise<Collection<ProgressDoc>> {
  return (await getDb()).collection<ProgressDoc>("progress");
}

export async function vocabularyCol(): Promise<Collection<VocabularyDoc>> {
  return (await getDb()).collection<VocabularyDoc>("vocabulary");
}

export async function journalCol(): Promise<Collection<JournalDoc>> {
  return (await getDb()).collection<JournalDoc>("journal");
}

export async function recordingsCol(): Promise<Collection<RecordingDoc>> {
  return (await getDb()).collection<RecordingDoc>("recordings");
}

// =================== Index management ===================
// Called by /api/seed and on first use to make sure required indexes exist.

let indexesEnsured = false;

export async function ensureIndexes(): Promise<void> {
  if (indexesEnsured) return;

  const users = await usersCol();
  const plan = await planCol();
  const achievements = await achievementsCol();
  const settings = await settingsCol();
  const progress = await progressCol();
  const vocabulary = await vocabularyCol();
  const journal = await journalCol();
  const recordings = await recordingsCol();

  const u: IndexDescription[] = [
    { key: { email: 1 }, name: "email_unique", unique: true },
  ];
  const p: IndexDescription[] = [
    { key: { key: 1 }, name: "key_unique", unique: true },
  ];
  const a: IndexDescription[] = [
    { key: { id: 1 }, name: "id_unique", unique: true },
  ];
  const s: IndexDescription[] = [
    { key: { userId: 1 }, name: "userId_unique", unique: true },
  ];
  const pr: IndexDescription[] = [
    { key: { userId: 1 }, name: "userId_unique", unique: true },
  ];
  const v: IndexDescription[] = [
    { key: { userId: 1, id: 1 }, name: "user_id_unique", unique: true },
    { key: { userId: 1, nextReviewAt: 1 }, name: "user_due" },
  ];
  const j: IndexDescription[] = [
    { key: { userId: 1, id: 1 }, name: "user_id_unique", unique: true },
    { key: { userId: 1, date: 1 }, name: "user_date" },
  ];
  const r: IndexDescription[] = [
    { key: { userId: 1, id: 1 }, name: "user_id_unique", unique: true },
    { key: { userId: 1, createdAt: -1 }, name: "user_created" },
  ];

  await Promise.all([
    users.createIndexes(u),
    plan.createIndexes(p),
    achievements.createIndexes(a),
    settings.createIndexes(s),
    progress.createIndexes(pr),
    vocabulary.createIndexes(v),
    journal.createIndexes(j),
    recordings.createIndexes(r),
  ]);

  indexesEnsured = true;
}
