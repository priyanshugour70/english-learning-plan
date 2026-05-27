import { z } from "zod";
import { ObjectId } from "mongodb";

import { withAuth } from "@/lib/auth/server";
import { verifyPassword, hashPassword } from "@/lib/auth/password";
import { usersCol } from "@/lib/db/collections";

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export const POST = withAuth(async (user, request: Request) => {
  const body = await request.json().catch(() => null);
  const parsed = ChangePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { currentPassword, newPassword } = parsed.data;

  const col = await usersCol();
  const doc = await col.findOne({ _id: new ObjectId(user.id) });
  if (!doc) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const valid = await verifyPassword(currentPassword, doc.passwordHash);
  if (!valid) {
    return Response.json(
      { error: "Current password is incorrect" },
      { status: 400 },
    );
  }

  const passwordHash = await hashPassword(newPassword);
  await col.updateOne(
    { _id: new ObjectId(user.id) },
    { $set: { passwordHash } },
  );

  return Response.json({ ok: true });
});
