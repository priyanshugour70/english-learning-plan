/**
 * Tiny fetch wrapper. Always parses JSON, throws on non-2xx with a useful
 * message, and accepts an optional body that gets JSON-stringified.
 */
export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function api<T>(
  path: string,
  init?: Omit<RequestInit, "body"> & { body?: unknown },
): Promise<T> {
  const { body, headers, ...rest } = init ?? {};
  const res = await fetch(path, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body == null ? undefined : JSON.stringify(body),
    credentials: "same-origin",
  });
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    // ignore — some endpoints return empty bodies
  }
  if (!res.ok) {
    const message =
      (data &&
        typeof data === "object" &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : `Request failed (${res.status})`);
    throw new ApiError(message, res.status, data);
  }
  return data as T;
}

export const fetcher = <T>(path: string): Promise<T> => api<T>(path);
