import { z } from "zod";

import { withAdmin } from "@/lib/auth/server";
import { achievementsCol } from "@/lib/db/collections";

const PatchSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  description: z.string().min(1).max(500).optional(),
  icon: z.string().min(1).max(40).optional(),
  accent: z
    .enum(["emerald", "sky", "amber", "violet", "rose", "orange", "pink"])
    .optional(),
  tier: z
    .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
    .optional(),
});

export const PATCH = withAdmin(
  async (
    _user,
    request: Request,
    ctx: { params: Promise<{ id: string }> },
  ) => {
    const { id } = await ctx.params;
    const body = await request.json().catch(() => null);
    const parsed = PatchSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const col = await achievementsCol();
    const result = await col.updateOne({ id }, { $set: parsed.data });
    if (result.matchedCount === 0) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ ok: true });
  },
);

export const DELETE = withAdmin(
  async (
    _user,
    _req: Request,
    ctx: { params: Promise<{ id: string }> },
  ) => {
    const { id } = await ctx.params;
    const col = await achievementsCol();
    const result = await col.deleteOne({ id });
    if (result.deletedCount === 0) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ ok: true });
  },
);
