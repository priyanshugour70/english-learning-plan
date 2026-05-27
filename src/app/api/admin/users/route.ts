import { z } from "zod";

import { withAdmin } from "@/lib/auth/server";
import { hashPassword } from "@/lib/auth/password";
import { usersCol, progressCol } from "@/lib/db/collections";

export const GET = withAdmin(async () => {
  const [users, progress] = await Promise.all([usersCol(), progressCol()]);
  const allUsers = await users
    .find({})
    .project({ passwordHash: 0 })
    .toArray();
  const allProgress = await progress.find({}).toArray();

  const progressMap = new Map(allProgress.map((p) => [p.userId, p]));

  const result = allUsers.map((u) => {
    const p = progressMap.get(u._id!.toString());
    return {
      id: u._id!.toString(),
      name: u.name,
      email: u.email,
      isAdmin: u.isAdmin,
      createdAt: u.createdAt,
      lastLoginAt: u.lastLoginAt ?? null,
      totalXp: p?.totalXp ?? 0,
      streak: p?.streak ?? 0,
      completedTasks: p?.completedTaskIds?.length ?? 0,
    };
  });

  return Response.json({ users: result });
});

const CreateUserSchema = z.object({
  email: z.string().email().transform((s) => s.toLowerCase().trim()),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["admin", "learner"]),
});

export const POST = withAdmin(async (_user, request: Request) => {
  const body = await request.json().catch(() => null);
  const parsed = CreateUserSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { email, password, name, role } = parsed.data;
  const col = await usersCol();

  const existing = await col.findOne({ email });
  if (existing) {
    return Response.json(
      { error: "A user with this email already exists" },
      { status: 409 },
    );
  }

  const passwordHash = await hashPassword(password);
  const now = new Date().toISOString();

  const result = await col.insertOne({
    email,
    passwordHash,
    name,
    isAdmin: role === "admin",
    role,
    createdAt: now,
  });

  return Response.json({
    user: {
      id: result.insertedId.toString(),
      email,
      name,
      role,
      isAdmin: role === "admin",
    },
  });
});
