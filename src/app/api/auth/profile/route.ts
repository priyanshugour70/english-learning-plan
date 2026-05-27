import { z } from "zod";
import { ObjectId } from "mongodb";

import { withAuth } from "@/lib/auth/server";
import { usersCol } from "@/lib/db/collections";

const ProfileSchema = z.object({
  name: z.string().min(1).optional(),
  avatarUrl: z.string().url().optional(),
});

export const PATCH = withAuth(async (user, request: Request) => {
  const body = await request.json().catch(() => null);
  const parsed = ProfileSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const updates: Record<string, string> = {};
  if (parsed.data.name !== undefined) updates.name = parsed.data.name.trim();
  if (parsed.data.avatarUrl !== undefined)
    updates.avatarUrl = parsed.data.avatarUrl;

  if (Object.keys(updates).length === 0) {
    return Response.json({ error: "No fields to update" }, { status: 400 });
  }

  const col = await usersCol();
  await col.updateOne({ _id: new ObjectId(user.id) }, { $set: updates });

  const updated = await col.findOne({ _id: new ObjectId(user.id) });
  if (!updated) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json({
    user: {
      id: updated._id!.toString(),
      email: updated.email,
      name: updated.name,
      isAdmin: updated.isAdmin,
      role: updated.role ?? (updated.isAdmin ? "admin" : "learner"),
      avatarUrl: updated.avatarUrl,
    },
  });
});
