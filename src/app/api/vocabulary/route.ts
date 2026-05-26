import { z } from "zod";

import { withAuth } from "@/lib/auth/server";
import { vocabularyCol } from "@/lib/db/collections";
import { uid } from "@/lib/utils";
import type { VocabularyEntry } from "@/types";

const REVIEW_GAPS: Record<VocabularyEntry["box"], number> = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16,
};

export function dueDateFor(
  box: VocabularyEntry["box"],
  from: Date = new Date(),
): string {
  const d = new Date(from);
  d.setDate(d.getDate() + REVIEW_GAPS[box]);
  return d.toISOString();
}

const CreateSchema = z.object({
  word: z.string().min(1).max(80),
  meaning: z.string().min(1).max(500),
  exampleSentence: z.string().max(500).optional(),
  partOfSpeech: z.string().max(40).optional(),
  tags: z.array(z.string().max(40)).optional(),
});

export const GET = withAuth(async (user) => {
  const col = await vocabularyCol();
  const entries = await col
    .find({ userId: user.id })
    .sort({ createdAt: -1 })
    .project<VocabularyEntry>({ _id: 0, userId: 0 })
    .toArray();
  return Response.json({ entries });
});

export const POST = withAuth(async (user, request: Request) => {
  const body = await request.json().catch(() => null);
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const now = new Date();
  const entry: VocabularyEntry = {
    id: uid("v"),
    word: parsed.data.word.trim(),
    meaning: parsed.data.meaning.trim(),
    exampleSentence: parsed.data.exampleSentence?.trim() || undefined,
    partOfSpeech: parsed.data.partOfSpeech,
    tags: parsed.data.tags,
    box: 1,
    lastReviewedAt: undefined,
    nextReviewAt: dueDateFor(1, now),
    reviewCount: 0,
    createdAt: now.toISOString(),
  };
  const col = await vocabularyCol();
  await col.insertOne({ ...entry, userId: user.id });
  return Response.json({ entry });
});
