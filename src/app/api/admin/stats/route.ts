import { withAdmin } from "@/lib/auth/server";
import {
  usersCol,
  planCol,
  achievementsCol,
  vocabularyCol,
  journalCol,
  recordingsCol,
} from "@/lib/db/collections";

export const GET = withAdmin(async () => {
  const [users, plan, achievements, vocabulary, journal, recordings] =
    await Promise.all([
      usersCol(),
      planCol(),
      achievementsCol(),
      vocabularyCol(),
      journalCol(),
      recordingsCol(),
    ]);

  const [
    userCount,
    achievementCount,
    vocabCount,
    journalCount,
    recordingCount,
  ] = await Promise.all([
    users.countDocuments(),
    achievements.countDocuments(),
    vocabulary.countDocuments(),
    journal.countDocuments(),
    recordings.countDocuments(),
  ]);

  const planDoc = await plan.findOne({ key: "default" });
  let taskCount = 0;
  if (planDoc?.plan) {
    for (const month of planDoc.plan) {
      for (const week of month.weeks) {
        for (const day of week.days) {
          taskCount += day.tasks.length;
        }
      }
    }
  }

  return Response.json({
    users: userCount,
    tasks: taskCount,
    achievements: achievementCount,
    vocabulary: vocabCount,
    journal: journalCount,
    recordings: recordingCount,
  });
});
