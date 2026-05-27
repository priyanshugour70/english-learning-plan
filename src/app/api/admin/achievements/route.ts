import { z } from "zod";

import { withAdmin } from "@/lib/auth/server";
import { achievementsCol } from "@/lib/db/collections";

const CreateSchema = z.object({
  id: z.string().min(1).max(80),
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(500),
  icon: z.string().min(1).max(40),
  accent: z.enum(["emerald", "sky", "amber", "violet", "rose", "orange", "pink"]),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
});

export const GET = withAdmin(async () => {
  const col = await achievementsCol();
  const list = await col.find({}).project({ _id: 0 }).toArray();
  return Response.json({ achievements: list });
});

export const POST = withAdmin(async (_user, request: Request) => {
  const body = await request.json().catch(() => null);
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const col = await achievementsCol();
  const existing = await col.findOne({ id: parsed.data.id });
  if (existing) {
    return Response.json(
      { error: "Achievement with this ID already exists" },
      { status: 409 },
    );
  }
  await col.insertOne(parsed.data);
  return Response.json({ achievement: parsed.data }, { status: 201 });
});
