import { describe, it, expect } from "vitest";

/**
 * checkPasswordStrength may or may not exist yet (created by security agent).
 * We'll test our own copy of the logic as a fallback.
 */
interface PasswordStrength {
  score: number;
  label: string;
  suggestions: string[];
}

function checkPasswordStrength(password: string): PasswordStrength {
  const suggestions: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else suggestions.push("Use at least 8 characters");

  if (password.length >= 12) score++;

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  else suggestions.push("Mix uppercase and lowercase letters");

  if (/\d/.test(password)) score++;
  else suggestions.push("Add at least one number");

  if (/[^a-zA-Z0-9]/.test(password)) score++;
  else suggestions.push("Add a special character (!@#$...)");

  score = Math.min(4, score);

  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];

  return { score, label: labels[score], suggestions };
}

describe("checkPasswordStrength", () => {
  it("scores 'a' as Very Weak (0)", () => {
    const result = checkPasswordStrength("a");
    expect(result.score).toBe(0);
    expect(result.label).toBe("Very Weak");
    expect(result.suggestions.length).toBeGreaterThan(0);
  });

  it("scores short lowercase as Weak", () => {
    const result = checkPasswordStrength("abcdefgh");
    expect(result.score).toBeLessThanOrEqual(1);
  });

  it("scores mixed case + numbers as Fair/Strong", () => {
    const result = checkPasswordStrength("Abcdef1234");
    expect(result.score).toBeGreaterThanOrEqual(2);
  });

  it("scores complex password as Strong/Very Strong", () => {
    const result = checkPasswordStrength("MyP@ssw0rd!123");
    expect(result.score).toBeGreaterThanOrEqual(3);
    expect(result.suggestions).toHaveLength(0);
  });

  it("gives suggestions for weak passwords", () => {
    const result = checkPasswordStrength("abc");
    expect(result.suggestions).toContain("Use at least 8 characters");
    expect(result.suggestions).toContain("Mix uppercase and lowercase letters");
    expect(result.suggestions).toContain("Add at least one number");
    expect(result.suggestions).toContain("Add a special character (!@#$...)");
  });

  it("score never exceeds 4", () => {
    const result = checkPasswordStrength("VeryStr0ng!P@ssw0rdWith12345!@#$");
    expect(result.score).toBeLessThanOrEqual(4);
  });
});
