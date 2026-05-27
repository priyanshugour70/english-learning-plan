import { describe, it, expect } from "vitest";
import { levelFromXp, nextStreak, EMPTY_SKILL_XP, SKILLS, SKILL_LABELS } from "@/lib/gamification";

describe("levelFromXp", () => {
  it("starts at level 1 with 0 XP", () => {
    const info = levelFromXp(0);
    expect(info.level).toBe(1);
    expect(info.title).toBe("Spark");
    expect(info.intoLevel).toBe(0);
    expect(info.forLevel).toBe(100);
    expect(info.pct).toBe(0);
  });

  it("returns level 1 with 50 XP (50% through)", () => {
    const info = levelFromXp(50);
    expect(info.level).toBe(1);
    expect(info.pct).toBe(50);
    expect(info.intoLevel).toBe(50);
  });

  it("crosses into level 2 at 100 XP", () => {
    const info = levelFromXp(100);
    expect(info.level).toBe(2);
    expect(info.title).toBe("Beginner");
    expect(info.intoLevel).toBe(0);
  });

  it("handles 250 XP correctly", () => {
    const info = levelFromXp(250);
    expect(info.level).toBeGreaterThanOrEqual(2);
    expect(info.pct).toBeGreaterThanOrEqual(0);
    expect(info.pct).toBeLessThanOrEqual(100);
  });

  it("handles very large XP values", () => {
    const info = levelFromXp(100000);
    expect(info.level).toBeGreaterThan(10);
    expect(info.pct).toBeGreaterThanOrEqual(0);
  });

  it("always has a title string", () => {
    for (const xp of [0, 50, 100, 500, 1000, 5000, 50000]) {
      const info = levelFromXp(xp);
      expect(info.title).toBeTruthy();
      expect(typeof info.title).toBe("string");
    }
  });

  it("thresholdStart < thresholdNext for non-maxed levels", () => {
    const info = levelFromXp(500);
    expect(info.thresholdStart).toBeLessThan(info.thresholdNext);
  });
});

describe("nextStreak", () => {
  it("returns 1 for first activity", () => {
    const streak = nextStreak({ streak: 0, lastActiveDate: null }, "2026-05-27");
    expect(streak).toBe(1);
  });

  it("keeps streak on same day", () => {
    const streak = nextStreak({ streak: 5, lastActiveDate: "2026-05-27" }, "2026-05-27");
    expect(streak).toBe(5);
  });

  it("increments streak on consecutive day", () => {
    const streak = nextStreak({ streak: 5, lastActiveDate: "2026-05-26" }, "2026-05-27");
    expect(streak).toBe(6);
  });

  it("resets streak after gap", () => {
    const streak = nextStreak({ streak: 5, lastActiveDate: "2026-05-24" }, "2026-05-27");
    expect(streak).toBe(1);
  });

  it("returns at least 1 for same-day with zero streak", () => {
    const streak = nextStreak({ streak: 0, lastActiveDate: "2026-05-27" }, "2026-05-27");
    expect(streak).toBe(1);
  });
});

describe("EMPTY_SKILL_XP", () => {
  it("has all 7 skills zeroed", () => {
    expect(Object.keys(EMPTY_SKILL_XP)).toHaveLength(7);
    for (const val of Object.values(EMPTY_SKILL_XP)) {
      expect(val).toBe(0);
    }
  });
});

describe("SKILLS metadata", () => {
  it("contains 7 skills", () => {
    expect(SKILLS).toHaveLength(7);
  });

  it("each skill has id, label, emoji, accent", () => {
    for (const skill of SKILLS) {
      expect(skill.id).toBeTruthy();
      expect(skill.label).toBeTruthy();
      expect(skill.emoji).toBeTruthy();
      expect(skill.accent).toBeTruthy();
    }
  });

  it("SKILL_LABELS maps all skill IDs", () => {
    for (const skill of SKILLS) {
      expect(SKILL_LABELS[skill.id]).toBe(skill.label);
    }
  });
});
