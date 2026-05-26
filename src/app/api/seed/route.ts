import {
  achievementsCol,
  ensureIndexes,
  planCol,
  usersCol,
} from "@/lib/db/collections";
import { hashPassword } from "@/lib/auth/password";
import { PLAN } from "@/data/plan";
import { ACHIEVEMENTS } from "@/data/achievements";

/**
 * Idempotent seed endpoint.
 *
 * - Creates the singleton plan document (or upserts when ?force=1)
 * - Upserts the achievements catalog
 * - Creates the admin user from ADMIN_EMAIL / ADMIN_PASSWORD env vars if no
 *   user exists yet
 *
 * GET  /api/seed         — seed only if collections are empty
 * POST /api/seed         — same
 * POST /api/seed?force=1 — re-seed plan & achievements (does NOT touch user data)
 */

async function runSeed(force: boolean) {
  await ensureIndexes();

  const planCollection = await planCol();
  const achievementsCollection = await achievementsCol();
  const users = await usersCol();

  const summary = {
    plan: "skipped" as "seeded" | "updated" | "skipped",
    achievements: { upserted: 0, total: ACHIEVEMENTS.length },
    user: "skipped" as "created" | "exists" | "skipped" | "missing-env",
  };

  const existingPlan = await planCollection.findOne({ key: "default" });
  if (!existingPlan || force) {
    await planCollection.updateOne(
      { key: "default" },
      {
        $set: {
          key: "default",
          plan: PLAN,
          updatedAt: new Date().toISOString(),
        },
      },
      { upsert: true },
    );
    summary.plan = existingPlan ? "updated" : "seeded";
  }

  for (const a of ACHIEVEMENTS) {
    const result = await achievementsCollection.updateOne(
      { id: a.id },
      { $set: a },
      { upsert: true },
    );
    if (result.upsertedCount > 0 || result.modifiedCount > 0) {
      summary.achievements.upserted += 1;
    }
  }

  const userCount = await users.countDocuments({});
  if (userCount === 0) {
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || "Creator";

    if (!adminEmail || !adminPassword) {
      summary.user = "missing-env";
    } else {
      const passwordHash = await hashPassword(adminPassword);
      await users.insertOne({
        email: adminEmail,
        passwordHash,
        name: adminName,
        isAdmin: true,
        createdAt: new Date().toISOString(),
      });
      summary.user = "created";
    }
  } else {
    summary.user = "exists";
  }

  return summary;
}

export async function GET() {
  try {
    const summary = await runSeed(false);
    return Response.json({ ok: true, summary });
  } catch (e) {
    console.error("[GET /api/seed]", e);
    return Response.json(
      { ok: false, error: e instanceof Error ? e.message : "Seed failed" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const force = url.searchParams.get("force") === "1";
    const summary = await runSeed(force);
    return Response.json({ ok: true, summary });
  } catch (e) {
    console.error("[POST /api/seed]", e);
    return Response.json(
      { ok: false, error: e instanceof Error ? e.message : "Seed failed" },
      { status: 500 },
    );
  }
}
