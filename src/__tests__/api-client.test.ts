import { describe, it, expect, vi, beforeEach } from "vitest";
import { api, ApiError, fetcher } from "@/lib/api";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

describe("api()", () => {
  it("makes a GET request and parses JSON", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: "hello" }),
    });

    const result = await api<{ data: string }>("/api/test");
    expect(result).toEqual({ data: "hello" });
    expect(mockFetch).toHaveBeenCalledWith("/api/test", expect.objectContaining({
      headers: expect.objectContaining({ "Content-Type": "application/json" }),
      credentials: "same-origin",
    }));
  });

  it("stringifies body for POST requests", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    });

    await api("/api/test", { method: "POST", body: { key: "value" } });
    expect(mockFetch).toHaveBeenCalledWith("/api/test", expect.objectContaining({
      body: '{"key":"value"}',
      method: "POST",
    }));
  });

  it("throws ApiError on non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ error: "Unauthorized" }),
    });

    await expect(api("/api/test")).rejects.toThrow(ApiError);
    try {
      await api("/api/test");
    } catch {
      // Already thrown above, second call will also throw
    }
  });

  it("ApiError contains status and data", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: () => Promise.resolve({ error: "Forbidden" }),
    });

    try {
      await api("/api/test");
      expect.fail("Should have thrown");
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
      const err = e as ApiError;
      expect(err.status).toBe(403);
      expect(err.message).toBe("Forbidden");
    }
  });

  it("handles empty JSON body gracefully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(new Error("no body")),
    });

    const result = await api("/api/test");
    expect(result).toBeNull();
  });

  it("does not send body when body is null", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await api("/api/test");
    const callArgs = mockFetch.mock.calls[0][1];
    expect(callArgs.body).toBeUndefined();
  });
});

describe("fetcher()", () => {
  it("is a function that calls api", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    const result = await fetcher<{ items: string[] }>("/api/data");
    expect(result).toEqual({ items: [] });
  });
});
