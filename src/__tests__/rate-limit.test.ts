import { describe, it, expect, vi, beforeEach } from "vitest";

describe("rateLimit", () => {
  let rateLimit: (
    ip: string,
    route: string,
    opts?: { windowMs?: number; max?: number },
  ) => { ok: boolean; remaining: number; resetAt: number };

  beforeEach(async () => {
    vi.resetModules();
    const mod = await import("@/lib/rate-limit");
    rateLimit = mod.rateLimit;
  });

  it("allows requests within limit", () => {
    const result = rateLimit("1.2.3.4", "/api/test", { max: 5 });
    expect(result.ok).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("blocks after exceeding limit", () => {
    for (let i = 0; i < 5; i++) {
      rateLimit("1.2.3.5", "/api/test", { max: 5 });
    }
    const result = rateLimit("1.2.3.5", "/api/test", { max: 5 });
    expect(result.ok).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("tracks different IPs independently", () => {
    for (let i = 0; i < 5; i++) {
      rateLimit("1.1.1.1", "/api/test", { max: 5 });
    }
    const result = rateLimit("2.2.2.2", "/api/test", { max: 5 });
    expect(result.ok).toBe(true);
  });

  it("tracks different routes independently", () => {
    for (let i = 0; i < 5; i++) {
      rateLimit("3.3.3.3", "/api/login", { max: 5 });
    }
    const result = rateLimit("3.3.3.3", "/api/other", { max: 5 });
    expect(result.ok).toBe(true);
  });

  it("returns resetAt in the future", () => {
    const result = rateLimit("4.4.4.4", "/api/test", { max: 5 });
    expect(result.resetAt).toBeGreaterThan(Date.now());
  });

  it("decrements remaining correctly", () => {
    const r1 = rateLimit("5.5.5.5", "/api/x", { max: 3 });
    expect(r1.remaining).toBe(2);
    const r2 = rateLimit("5.5.5.5", "/api/x", { max: 3 });
    expect(r2.remaining).toBe(1);
    const r3 = rateLimit("5.5.5.5", "/api/x", { max: 3 });
    expect(r3.remaining).toBe(0);
    const r4 = rateLimit("5.5.5.5", "/api/x", { max: 3 });
    expect(r4.ok).toBe(false);
  });
});
