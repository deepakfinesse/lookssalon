import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

/**
 * Why this file exists separately from lib/auth.js:
 *
 * Middleware runs on the Edge runtime — it cannot use:
 *   - next/headers  (Node.js only)
 *   - cookies()     (Node.js only)
 *   - getSession()  (calls cookies() internally)
 *
 * Instead we read cookies directly from `request.cookies`
 * and call jwtVerify from `jose` (Edge-compatible) inline.
 */

const COOKIE_NAME = "dashboard_session";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // ── Protect all /dashboard routes except /dashboard/login ────────────────
  if (pathname.startsWith("/dashboard") && pathname !== "/dashboard/login") {
    if (!token) {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
    const session = await verifySession(token);
    if (!session) {
      // Token present but invalid/expired — clear cookie and redirect
      const res = NextResponse.redirect(
        new URL("/dashboard/login", request.url)
      );
      res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
      return res;
    }
  }

  // ── Redirect already-logged-in users away from login page ────────────────
  if (pathname === "/dashboard/login" && token) {
    const session = await verifySession(token);
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on dashboard routes — skip static files, API, _next
  matcher: ["/dashboard/:path*"],
};
