import { ObjectId } from "mongodb";

import { withAdmin } from "@/lib/auth/server";
import {
  usersCol,
  progressCol,
  settingsCol,
  vocabularyCol,
  journalCol,
  recordingsCol,
} from "@/lib/db/collections";

export const DELETE = withAdmin(
  async (
    _user,
    _req: Request,
    ctx: { params: Promise<{ id: string }> },
  ) => {
    const { id } = await ctx.params;

    let objectId: ObjectId;
    try {
      objectId = new ObjectId(id);
    } catch {
      return Response.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const [users, progress, settings, vocabulary, journal, recordings] =
      await Promise.all([
        usersCol(),
        progressCol(),
        settingsCol(),
        vocabularyCol(),
        journalCol(),
        recordingsCol(),
      ]);

    const user = await users.findOne({ _id: objectId });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const userId = objectId.toString();
    await Promise.all([
      users.deleteOne({ _id: objectId }),
      progress.deleteOne({ userId }),
      settings.deleteOne({ userId }),
      vocabulary.deleteMany({ userId }),
      journal.deleteMany({ userId }),
      recordings.deleteMany({ userId }),
    ]);

    return Response.json({ ok: true });
  },
);
