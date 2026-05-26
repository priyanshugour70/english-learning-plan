import { z } from "zod";

import { withAuth } from "@/lib/auth/server";
import { journalCol } from "@/lib/db/collections";
import { todayKey } from "@/lib/dates";
import { uid } from "@/lib/utils";
import type { JournalEntry } from "@/types";

const MoodEnum = z.enum(["great", "good", "ok", "tough", "struggling"]);

const UpsertSchema = z.object({
  text: z.string().min(1).max(20000),
  mood: MoodEnum.optional(),
  prompt: z.string().max(500).optional(),
});

function countWords(s: string): number {
  return s.trim().length === 0 ? 0 : s.trim().split(/\s+/).length;
}

export const GET = withAuth(async (user) => {
  const col = await journalCol();
  const entries = await col
    .find({ userId: user.id })
    .sort({ date: -1 })
    .project<JournalEntry>({ _id: 0, userId: 0 })
    .toArray();
  return Response.json({ entries });
});

/**
 * Upsert today's journal entry. One entry per day per user.
 */
export const POST = withAuth(async (user, request: Request) => {
  const body = await request.json().catch(() => null);
  const parsed = UpsertSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const day = todayKey();
  const now = new Date().toISOString();
  const wordCount = countWords(parsed.data.text);

  const col = await journalCol();
  const existing = await col.findOne({ userId: user.id, date: day });

  if (existing) {
    const updated: JournalEntry = {
      id: existing.id,
      date: existing.date,
      text: parsed.data.text,
      mood: parsed.data.mood ?? existing.mood,
      prompt: parsed.data.prompt ?? existing.prompt,
      wordCount,
      createdAt: existing.createdAt,
      updatedAt: now,
    };
    await col.updateOne(
      { userId: user.id, id: existing.id },
      { $set: updated },
    );
    return Response.json({ entry: updated });
  }

  const fresh: JournalEntry = {
    id: uid("j"),
    date: day,
    text: parsed.data.text,
    mood: parsed.data.mood,
    prompt: parsed.data.prompt,
    wordCount,
    createdAt: now,
    updatedAt: now,
  };
  await col.insertOne({ ...fresh, userId: user.id });
  return Response.json({ entry: fresh });
});
