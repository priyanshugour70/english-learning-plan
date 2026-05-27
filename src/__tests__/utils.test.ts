import { describe, it, expect } from "vitest";
import { cn, clamp, percent, formatNumber, pluralize, range, uid } from "@/lib/utils";

describe("cn (class name merger)", () => {
  it("merges simple classes", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("deduplicates conflicting tailwind classes", () => {
    const result = cn("px-4", "px-2");
    expect(result).toBe("px-2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "text-sm")).toBe("base text-sm");
  });

  it("handles null and undefined", () => {
    expect(cn("a", null, undefined, "b")).toBe("a b");
  });
});

describe("clamp", () => {
  it("returns value when within bounds", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("clamps to minimum", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("clamps to maximum", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("handles edge - value equals min", () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it("handles edge - value equals max", () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });
});

describe("percent", () => {
  it("computes correct percentage", () => {
    expect(percent(50, 100)).toBe(50);
  });

  it("returns 0 for 0/0", () => {
    expect(percent(0, 0)).toBe(0);
  });

  it("clamps to 100", () => {
    expect(percent(150, 100)).toBe(100);
  });

  it("rounds correctly", () => {
    expect(percent(1, 3)).toBe(33);
  });

  it("returns 0 for negative total", () => {
    expect(percent(5, -1)).toBe(0);
  });
});

describe("formatNumber", () => {
  it("formats small numbers", () => {
    expect(formatNumber(42)).toBe("42");
  });

  it("adds commas to large numbers", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
  });
});

describe("pluralize", () => {
  it("returns singular for 1", () => {
    expect(pluralize(1, "task")).toBe("1 task");
  });

  it("returns plural for 0", () => {
    expect(pluralize(0, "task")).toBe("0 tasks");
  });

  it("returns plural for > 1", () => {
    expect(pluralize(5, "task")).toBe("5 tasks");
  });

  it("uses custom plural", () => {
    expect(pluralize(2, "person", "people")).toBe("2 people");
  });
});

describe("range", () => {
  it("generates correct range", () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
  });

  it("generates empty for 0", () => {
    expect(range(0)).toEqual([]);
  });
});

describe("uid", () => {
  it("generates unique ids", () => {
    const ids = new Set(Array.from({ length: 100 }, () => uid()));
    expect(ids.size).toBe(100);
  });

  it("uses prefix", () => {
    expect(uid("test").startsWith("test_")).toBe(true);
  });
});
