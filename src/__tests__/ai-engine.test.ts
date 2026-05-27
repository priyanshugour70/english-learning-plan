/**
 * Tests for the AI feedback engine (grammar, fluency, pronunciation).
 * The engine module uses `import "server-only"` so we mock that import.
 */
import { describe, it, expect, beforeAll } from "vitest";

let checkGrammar: typeof import("@/lib/ai/engine").checkGrammar;
let scoreFluency: typeof import("@/lib/ai/engine").scoreFluency;
let improveWriting: typeof import("@/lib/ai/engine").improveWriting;
let getPronunciationTips: typeof import("@/lib/ai/engine").getPronunciationTips;

beforeAll(async () => {
  const mod = await import("@/lib/ai/engine");
  checkGrammar = mod.checkGrammar;
  scoreFluency = mod.scoreFluency;
  improveWriting = mod.improveWriting;
  getPronunciationTips = mod.getPronunciationTips;
});

describe("checkGrammar", () => {
  it("returns a score between 20 and 100", () => {
    const result = checkGrammar("Hello, how are you doing today?");
    expect(result.score).toBeGreaterThanOrEqual(20);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("detects 'alot' as an error", () => {
    const result = checkGrammar("I have alot of books.");
    expect(result.issues.some((i) => i.rule.includes("alot"))).toBe(true);
    expect(result.correctedText).toContain("a lot");
  });

  it("detects 'could of' as an error", () => {
    const result = checkGrammar("I could of done better.");
    expect(result.issues.some((i) => i.rule.includes("of→have"))).toBe(true);
    expect(result.correctedText).toContain("could have");
  });

  it("detects subject-verb agreement errors", () => {
    const result = checkGrammar("He don't like coffee.");
    expect(result.issues.some((i) => i.rule.includes("Subject-verb"))).toBe(true);
    expect(result.correctedText).toContain("doesn't");
  });

  it("detects double comparative", () => {
    const result = checkGrammar("This is more better than that.");
    expect(result.issues.some((i) => i.rule.includes("Double comparative"))).toBe(true);
  });

  it("returns perfect score for clean text", () => {
    const result = checkGrammar("The quick brown fox jumps over the lazy dog.");
    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(result.issues.filter((i) => i.severity === "error")).toHaveLength(0);
  });

  it("returns correctedText", () => {
    const result = checkGrammar("i am happy");
    expect(result.correctedText).toBe("I am happy");
  });

  it("detects spelling mistakes", () => {
    const result = checkGrammar("I recieve packages daily.");
    expect(result.issues.some((i) => i.suggestion === "receive")).toBe(true);
  });
});

describe("scoreFluency", () => {
  it("returns 0 score for empty text", () => {
    const result = scoreFluency("");
    expect(result.score).toBe(0);
    expect(result.level).toBe("beginner");
  });

  it("returns a valid level", () => {
    const result = scoreFluency(
      "However, I believe that practice makes perfect. Furthermore, consistent effort leads to significant improvement over time.",
    );
    expect(["beginner", "intermediate", "advanced", "fluent"]).toContain(result.level);
  });

  it("detects filler words", () => {
    const result = scoreFluency(
      "Like, I basically just wanted to, you know, um, say something. Actually, I literally just like um wanted to um go.",
    );
    expect(result.metrics.fillerWordCount).toBeGreaterThan(0);
  });

  it("detects transition words", () => {
    const result = scoreFluency(
      "First, I want to explain. However, there are challenges. Therefore, we must adapt. Finally, we can conclude.",
    );
    expect(result.metrics.transitionWordCount).toBeGreaterThan(0);
  });

  it("computes vocabulary richness", () => {
    const result = scoreFluency(
      "The cat sat on the mat. The cat ate the food. The cat slept on the mat.",
    );
    expect(result.metrics.vocabularyRichness).toBeLessThan(0.8);
  });

  it("gives feedback array", () => {
    const result = scoreFluency("Hello world. This is a test.");
    expect(Array.isArray(result.feedback)).toBe(true);
    expect(result.feedback.length).toBeGreaterThan(0);
  });

  it("has all required metrics", () => {
    const result = scoreFluency("Testing the metrics output.");
    expect(result.metrics).toHaveProperty("avgWordLength");
    expect(result.metrics).toHaveProperty("avgSentenceLength");
    expect(result.metrics).toHaveProperty("vocabularyRichness");
    expect(result.metrics).toHaveProperty("sentenceVariety");
    expect(result.metrics).toHaveProperty("fillerWordCount");
    expect(result.metrics).toHaveProperty("transitionWordCount");
  });
});

describe("improveWriting", () => {
  it("returns both grammar and fluency results", () => {
    const result = improveWriting("i could of wrote more better.");
    expect(result.grammarResult).toBeDefined();
    expect(result.fluencyResult).toBeDefined();
    expect(result.tips.length).toBeGreaterThan(0);
  });

  it("provides an improved version", () => {
    const result = improveWriting("i could of done it");
    expect(result.improved).not.toBe(result.original);
  });

  it("preserves original text", () => {
    const text = "Hello there.";
    const result = improveWriting(text);
    expect(result.original).toBe(text);
  });
});

describe("getPronunciationTips", () => {
  it("returns tips when no text provided", () => {
    const tips = getPronunciationTips();
    expect(tips.length).toBeGreaterThan(0);
    expect(tips.length).toBeLessThanOrEqual(5);
  });

  it("returns tips for text containing known words", () => {
    const tips = getPronunciationTips("I need to check my schedule for wednesday.");
    expect(tips.some((t) => t.word === "schedule" || t.word === "wednesday")).toBe(true);
  });

  it("returns fallback tips for text with no known words", () => {
    const tips = getPronunciationTips("Hello there.");
    expect(tips.length).toBeGreaterThan(0);
  });

  it("each tip has the required fields", () => {
    const tips = getPronunciationTips();
    for (const tip of tips) {
      expect(tip.word).toBeTruthy();
      expect(tip.ipa).toBeTruthy();
      expect(tip.tip).toBeTruthy();
      expect(tip.commonMistake).toBeTruthy();
    }
  });
});
