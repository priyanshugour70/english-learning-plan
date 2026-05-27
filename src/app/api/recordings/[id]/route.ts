import { withAuth } from "@/lib/auth/server";
import { recordingsCol } from "@/lib/db/collections";

export const DELETE = withAuth(
  async (user, _req: Request, ctx: { params: Promise<{ id: string }> }) => {
    const { id } = await ctx.params;
    const col = await recordingsCol();
    const result = await col.deleteOne({ userId: user.id, id });
    if (result.deletedCount === 0) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ ok: true });
  },
);
