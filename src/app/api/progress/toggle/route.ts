import { z } from "zod";

import { withAuth } from "@/lib/auth/server";
import { toggleTask } from "@/lib/db/progress-service";

const ToggleSchema = z.object({
  taskId: z.string().min(1),
});

export const POST = withAuth(async (user, request: Request) => {
  const body = await request.json().catch(() => null);
  const parsed = ToggleSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid taskId" }, { status: 400 });
  }
  const result = await toggleTask(user.id, parsed.data.taskId);
  if (!result) {
    return Response.json({ error: "Task not found" }, { status: 404 });
  }
  return Response.json(result);
});
