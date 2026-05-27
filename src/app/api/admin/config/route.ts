import { z } from "zod";

import { withAdmin } from "@/lib/auth/server";
import { configCol, type AppConfigDoc } from "@/lib/db/collections";

const DEFAULT_CONFIG: Omit<AppConfigDoc, "_id"> = {
  key: "default",
  appName: "Fluent Path",
  appDescription: "6-month English learning journey",
  primaryColor: "#6366f1",
  accentColors: {},
  dashboardMessage: "Welcome to your learning dashboard!",
  enableAI: true,
  updatedAt: new Date().toISOString(),
};

const PatchSchema = z.object({
  appName: z.string().min(1).max(100).optional(),
  appDescription: z.string().max(300).optional(),
  primaryColor: z.string().max(20).optional(),
  accentColors: z.record(z.string(), z.string()).optional(),
  dashboardMessage: z.string().max(500).optional(),
  enableAI: z.boolean().optional(),
});

export const GET = withAdmin(async () => {
  const col = await configCol();
  const doc = await col.findOne(
    { key: "default" },
    { projection: { _id: 0 } },
  );
  if (!doc) {
    return Response.json({ config: { ...DEFAULT_CONFIG } });
  }
  return Response.json({ config: doc });
});

export const PATCH = withAdmin(async (_user, request: Request) => {
  const body = await request.json().catch(() => null);
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const col = await configCol();
  await col.updateOne(
    { key: "default" },
    {
      $set: { ...parsed.data, updatedAt: new Date().toISOString() },
      $setOnInsert: {
        key: "default" as const,
        appName: DEFAULT_CONFIG.appName,
        appDescription: DEFAULT_CONFIG.appDescription,
        primaryColor: DEFAULT_CONFIG.primaryColor,
        accentColors: DEFAULT_CONFIG.accentColors,
        dashboardMessage: DEFAULT_CONFIG.dashboardMessage,
        enableAI: DEFAULT_CONFIG.enableAI,
      },
    },
    { upsert: true },
  );
  const updated = await col.findOne(
    { key: "default" },
    { projection: { _id: 0 } },
  );
  return Response.json({ config: updated });
});
