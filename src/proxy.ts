import { NextResponse, type NextRequest } from "next/server";

import { decryptSession, SESSION_COOKIE } from "@/lib/auth/session";

// Optimistic auth check at the edge. The actual authorization for protected
// resources happens again inside each route handler / server component via
// requireUser() (this is the Next.js 16 recommended pattern — Proxy should not
// be the sole gatekeeper).

const PUBLIC_PATHS = new Set<string>(["/login"]);

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  if (pathname.startsWith("/api/auth/login")) return true;
  if (pathname.startsWith("/api/auth/logout")) return true;
  if (pathname.startsWith("/api/seed")) return true;
  return false;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isPublic(pathname)) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await decryptSession(token);

  if (!session) {
    // For API routes, return 401 JSON so the client can react.
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run on every route EXCEPT:
     *   - _next internal assets
     *   - favicon / icons / images
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)",
  ],
};
