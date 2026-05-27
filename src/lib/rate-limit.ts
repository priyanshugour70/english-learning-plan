import "server-only";

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

let lastCleanup = Date.now();
function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < 60_000) return;
  lastCleanup = now;
  const cutoff = now - windowMs;
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}

export function rateLimit(
  ip: string,
  route: string,
  opts?: { windowMs?: number; max?: number },
): { ok: boolean; remaining: number; resetAt: number } {
  const windowMs = opts?.windowMs ?? 60_000;
  const max = opts?.max ?? 30;
  const key = `${ip}:${route}`;
  const now = Date.now();

  cleanup(windowMs);

  let entry = store.get(key);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  entry.timestamps = entry.timestamps.filter((t) => t > now - windowMs);

  if (entry.timestamps.length >= max) {
    const oldest = entry.timestamps[0];
    return { ok: false, remaining: 0, resetAt: oldest + windowMs };
  }

  entry.timestamps.push(now);
  return { ok: true, remaining: max - entry.timestamps.length, resetAt: now + windowMs };
}
