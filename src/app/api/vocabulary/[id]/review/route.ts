import { z } from "zod";

import { withAuth } from "@/lib/auth/server";
import { vocabularyCol } from "@/lib/db/collections";
import type { VocabularyEntry } from "@/types";

import { dueDateFor } from "../../route";

const ReviewSchema = z.object({ knew: z.boolean() });

export const POST = withAuth(
  async (
    user,
    request: Request,
    ctx: RouteContext<"/api/vocabulary/[id]/review">,
  ) => {
    const { id } = await ctx.params;
    const body = await request.json().catch(() => null);
    const parsed = ReviewSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "Invalid body" }, { status: 400 });
    }
    const col = await vocabularyCol();
    const entry = await col.findOne({ userId: user.id, id });
    if (!entry) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    const now = new Date();
    const newBox = (
      parsed.data.knew
        ? Math.min(5, entry.box + 1)
        : Math.max(1, entry.box - 1)
    ) as VocabularyEntry["box"];
    await col.updateOne(
      { userId: user.id, id },
      {
        $set: {
          box: newBox,
          reviewCount: (entry.reviewCount ?? 0) + 1,
          lastReviewedAt: now.toISOString(),
          nextReviewAt: dueDateFor(newBox, now),
        },
      },
    );
    return Response.json({ ok: true });
  },
);
