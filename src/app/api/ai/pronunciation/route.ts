import { z } from "zod";

import { withAuth } from "@/lib/auth/server";
import { getPronunciationTips } from "@/lib/ai/engine";

const Schema = z.object({ text: z.string().max(50000).optional() });

export const POST = withAuth(async (_user, request: Request) => {
  const body = await request.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  const tips = getPronunciationTips(parsed.success ? parsed.data.text : undefined);
  return Response.json({ tips });
});
