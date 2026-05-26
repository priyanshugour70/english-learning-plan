import { withAuth } from "@/lib/auth/server";
import { getProgress, resetProgress } from "@/lib/db/progress-service";

export const GET = withAuth(async (user) => {
  const state = await getProgress(user.id);
  return Response.json({ state });
});

export const DELETE = withAuth(async (user) => {
  const state = await resetProgress(user.id);
  return Response.json({ state });
});
