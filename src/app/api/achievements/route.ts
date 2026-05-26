import { achievementsCol } from "@/lib/db/collections";
import { withAuth } from "@/lib/auth/server";
import { ACHIEVEMENTS } from "@/data/achievements";

export const GET = withAuth(async () => {
  const col = await achievementsCol();
  const list = await col
    .find({})
    .project({ _id: 0 })
    .toArray();
  if (list.length === 0) {
    // Lazy-seed if the catalog hasn't been bootstrapped yet.
    await col.insertMany(ACHIEVEMENTS);
    return Response.json({ achievements: ACHIEVEMENTS });
  }
  return Response.json({ achievements: list });
});
