import { z } from "zod";

import { withAuth } from "@/lib/auth/server";
import { vocabularyCol } from "@/lib/db/collections";

const PatchSchema = z.object({
  word: z.string().min(1).max(80).optional(),
  meaning: z.string().min(1).max(500).optional(),
  exampleSentence: z.string().max(500).optional(),
  partOfSpeech: z.string().max(40).optional(),
  tags: z.array(z.string().max(40)).optional(),
});

export const PATCH = withAuth(
  async (user, request: Request, ctx: { params: Promise<{ id: string }> }) => {
    const { id } = await ctx.params;
    const body = await request.json().catch(() => null);
    const parsed = PatchSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const col = await vocabularyCol();
    const result = await col.updateOne(
      { userId: user.id, id },
      { $set: parsed.data },
    );
    if (result.matchedCount === 0) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ ok: true });
  },
);

export const DELETE = withAuth(
  async (user, _req: Request, ctx: { params: Promise<{ id: string }> }) => {
    const { id } = await ctx.params;
    const col = await vocabularyCol();
    const result = await col.deleteOne({ userId: user.id, id });
    if (result.deletedCount === 0) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ ok: true });
  },
);
