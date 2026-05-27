import { z } from "zod";

import { withAuth } from "@/lib/auth/server";
import { improveWriting } from "@/lib/ai/engine";

const Schema = z.object({ text: z.string().min(1).max(50000) });

export const POST = withAuth(async (_user, request: Request) => {
  const body = await request.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Text is required" }, { status: 400 });
  }
  const result = improveWriting(parsed.data.text);
  return Response.json(result);
});
