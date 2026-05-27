import "server-only";

export function logRequest(method: string, path: string, status: number, durationMs: number) {
  if (process.env.NODE_ENV !== "production") {
    const color = status >= 400 ? "\x1b[31m" : status >= 300 ? "\x1b[33m" : "\x1b[32m";
    const reset = "\x1b[0m";
    console.log(`${color}${method} ${path} ${status}${reset} ${durationMs}ms`);
  }
}
