import { getDb } from "@/lib/db/mongo";

export const dynamic = "force-dynamic";

export async function GET() {
  const start = Date.now();
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    const latency = Date.now() - start;
    return Response.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      db: { status: "connected", latencyMs: latency },
      version: process.env.npm_package_version || "0.1.0",
    });
  } catch (e) {
    return Response.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        db: { status: "disconnected", error: e instanceof Error ? e.message : "Unknown" },
      },
      { status: 503 },
    );
  }
}
