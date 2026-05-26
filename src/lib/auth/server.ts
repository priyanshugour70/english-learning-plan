import "server-only";

import { ObjectId } from "mongodb";

import { usersCol, type UserDoc } from "@/lib/db/collections";
import { readSession, type SessionPayload } from "./session";

export interface AuthedUser {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

function toAuthed(user: UserDoc): AuthedUser {
  return {
    id: user._id!.toString(),
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
  };
}

export async function getCurrentUser(): Promise<AuthedUser | null> {
  const session = await readSession();
  if (!session) return null;
  return getUserFromSession(session);
}

export async function getUserFromSession(
  session: SessionPayload,
): Promise<AuthedUser | null> {
  try {
    const col = await usersCol();
    const user = await col.findOne({ _id: new ObjectId(session.userId) });
    if (!user) return null;
    return toAuthed(user);
  } catch {
    return null;
  }
}

/**
 * Require an authenticated user inside an API route.
 * Throws a Response (caught by the wrapper below).
 */
export async function requireUser(): Promise<AuthedUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return user;
}

/**
 * Convenience wrapper for route handlers that need an authenticated user.
 * Catches the Response thrown by requireUser and returns it.
 */
export function withAuth<TArgs extends unknown[], TResult>(
  handler: (user: AuthedUser, ...args: TArgs) => Promise<TResult>,
) {
  return async (...args: TArgs): Promise<TResult | Response> => {
    try {
      const user = await requireUser();
      return await handler(user, ...args);
    } catch (e) {
      if (e instanceof Response) return e;
      console.error("[withAuth] unexpected error", e);
      return Response.json({ error: "Internal error" }, { status: 500 });
    }
  };
}
