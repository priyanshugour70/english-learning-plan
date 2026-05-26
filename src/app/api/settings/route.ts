import { z } from "zod";

import { withAuth } from "@/lib/auth/server";
import { settingsCol } from "@/lib/db/collections";
import type { UserSettings } from "@/types";

const DEFAULT_SETTINGS: UserSettings = {
  name: "",
  goal: "Speak comfortable English in meetings, interviews and day-to-day life.",
  dailyTimeMinutes: 25,
  reminderHour: 19,
  theme: "system",
  onboardingCompletedAt: null,
};

const PatchSchema = z.object({
  name: z.string().max(80).optional(),
  goal: z.string().max(500).optional(),
  dailyTimeMinutes: z.number().min(1).max(180).optional(),
  reminderHour: z.number().min(0).max(23).optional(),
  theme: z.enum(["system", "light", "dark"]).optional(),
  onboardingCompletedAt: z.string().nullable().optional(),
});

async function getOrCreate(userId: string): Promise<UserSettings> {
  const col = await settingsCol();
  const doc = await col.findOne({ userId });
  if (doc) {
    const { _id: _ignored, userId: _u, updatedAt: _ts, ...rest } = doc;
    void _ignored;
    void _u;
    void _ts;
    return { ...DEFAULT_SETTINGS, ...rest };
  }
  const now = new Date().toISOString();
  const fresh = { ...DEFAULT_SETTINGS };
  await col.insertOne({
    ...fresh,
    userId,
    updatedAt: now,
  });
  return fresh;
}

export const GET = withAuth(async (user) => {
  const settings = await getOrCreate(user.id);
  return Response.json({ settings });
});

export const PATCH = withAuth(async (user, request: Request) => {
  const body = await request.json().catch(() => null);
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  await getOrCreate(user.id);
  const col = await settingsCol();
  await col.updateOne(
    { userId: user.id },
    {
      $set: {
        ...parsed.data,
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true },
  );
  const settings = await getOrCreate(user.id);
  return Response.json({ settings });
});
