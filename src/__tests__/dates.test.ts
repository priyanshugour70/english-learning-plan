import { describe, it, expect } from "vitest";
import { todayKey, formatDayLabel, shortDay, DAY_MS } from "@/lib/dates";

describe("todayKey", () => {
  it("returns YYYY-MM-DD format", () => {
    const key = todayKey(new Date("2026-05-27T10:30:00"));
    expect(key).toBe("2026-05-27");
  });

  it("handles midnight correctly", () => {
    const key = todayKey(new Date("2026-01-01T00:00:00"));
    expect(key).toBe("2026-01-01");
  });

  it("returns today when no arg", () => {
    const key = todayKey();
    expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("formatDayLabel", () => {
  it("formats date to readable label", () => {
    const label = formatDayLabel(new Date("2026-05-27T10:00:00"));
    expect(label).toContain("May");
    expect(label).toContain("27");
  });
});

describe("shortDay", () => {
  it("returns 3-letter day name", () => {
    const result = shortDay(new Date("2026-05-27T10:00:00"));
    expect(result.length).toBeLessThanOrEqual(3);
  });
});

describe("DAY_MS", () => {
  it("equals 86400000", () => {
    expect(DAY_MS).toBe(1000 * 60 * 60 * 24);
  });
});
