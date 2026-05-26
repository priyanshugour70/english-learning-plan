import { z } from "zod";

import { withAuth } from "@/lib/auth/server";
import { recordingsCol } from "@/lib/db/collections";
import { todayKey } from "@/lib/dates";
import { uid } from "@/lib/utils";
import type { RecordingSession } from "@/types";

const CreateSchema = z.object({
  prompt: z.string().min(1).max(500),
  duration: z.number().min(0).max(60 * 60 * 4),
  selfRating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional(),
  notes: z.string().max(2000).optional(),
});

export const GET = withAuth(async (user) => {
  const col = await recordingsCol();
  const sessions = await col
    .find({ userId: user.id })
    .sort({ createdAt: -1 })
    .project<RecordingSession>({ _id: 0, userId: 0 })
    .toArray();
  return Response.json({ sessions });
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
  const session: RecordingSession = {
    id: uid("r"),
    date: todayKey(),
    prompt: parsed.data.prompt,
    duration: parsed.data.duration,
    selfRating: parsed.data.selfRating,
    notes: parsed.data.notes,
    createdAt: new Date().toISOString(),
  };
  const col = await recordingsCol();
  await col.insertOne({ ...session, userId: user.id });
  return Response.json({ session });
});
