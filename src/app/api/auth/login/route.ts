import { z } from "zod";

import { ensureIndexes, usersCol } from "@/lib/db/collections";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { setSessionCookie } from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit";

const LoginSchema = z.object({
  email: z.string().email().transform((s) => s.toLowerCase().trim()),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const limit = rateLimit(ip, "/api/auth/login", { windowMs: 60_000, max: 5 });

    if (!limit.ok) {
      const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
      return Response.json(
        { error: `Too many login attempts. Try again in ${retryAfter} seconds.` },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(limit.resetAt),
          },
        },
      );
    }

    const body = await request.json().catch(() => null);
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }
    const { email, password } = parsed.data;

    await ensureIndexes();
    const users = await usersCol();

    let user = await users.findOne({ email });

    // Bootstrap: if no users exist at all and credentials match the admin
    // env-var values, create the admin account on the fly. This means the
    // very first login from the configured admin email seeds the account.
    if (!user) {
      const userCount = await users.countDocuments({});
      const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
      const adminPassword = process.env.ADMIN_PASSWORD;
      const adminName = process.env.ADMIN_NAME || "Creator";

      if (
        userCount === 0 &&
        adminEmail &&
        adminPassword &&
        email === adminEmail &&
        password === adminPassword
      ) {
        const passwordHash = await hashPassword(password);
        const now = new Date().toISOString();
        const insert = await users.insertOne({
          email,
          passwordHash,
          name: adminName,
          isAdmin: true,
          role: "admin",
          createdAt: now,
        });
        user = await users.findOne({ _id: insert.insertedId });
      }
    }

    if (!user) {
      return Response.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return Response.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    await users.updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date().toISOString() } },
    );

    await setSessionCookie({
      userId: user._id!.toString(),
      email: user.email,
      name: user.name,
    });

    return Response.json(
      {
        user: {
          id: user._id!.toString(),
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        },
      },
      {
        headers: {
          "X-RateLimit-Remaining": String(limit.remaining),
          "X-RateLimit-Reset": String(limit.resetAt),
        },
      },
    );
  } catch (e) {
    console.error("[POST /api/auth/login]", e);
    return Response.json(
      { error: "Login failed. Check the server logs." },
      { status: 500 },
    );
  }
}
