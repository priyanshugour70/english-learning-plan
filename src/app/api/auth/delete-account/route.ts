import { ObjectId } from "mongodb";

import { withAuth } from "@/lib/auth/server";
import { clearSessionCookie } from "@/lib/auth/session";
import {
  usersCol,
  progressCol,
  settingsCol,
  vocabularyCol,
  journalCol,
  recordingsCol,
} from "@/lib/db/collections";

export const DELETE = withAuth(async (user) => {
  const userId = user.id;
  const oid = new ObjectId(userId);

  const [users, progress, settings, vocabulary, journal, recordings] =
    await Promise.all([
      usersCol(),
      progressCol(),
      settingsCol(),
      vocabularyCol(),
      journalCol(),
      recordingsCol(),
    ]);

  await Promise.all([
    users.deleteOne({ _id: oid }),
    progress.deleteMany({ userId }),
    settings.deleteMany({ userId }),
    vocabulary.deleteMany({ userId }),
    journal.deleteMany({ userId }),
    recordings.deleteMany({ userId }),
  ]);

  await clearSessionCookie();

  return Response.json({ ok: true });
});
