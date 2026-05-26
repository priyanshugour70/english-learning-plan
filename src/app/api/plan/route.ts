import { getPlan, getPlanStats } from "@/lib/db/plan-service";
import { withAuth } from "@/lib/auth/server";

export const GET = withAuth(async () => {
  const [plan, stats] = await Promise.all([getPlan(), getPlanStats()]);
  return Response.json({ plan, stats });
});
