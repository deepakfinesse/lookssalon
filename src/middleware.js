import { auth } from "@/lib/auth";

/**
 * NextAuth v5 middleware
 *
 * Replaces the entire manual jwtVerify + cookie dance.
 * auth() reads the NextAuth session cookie automatically.
 *
 * Rules:
 *  - /dashboard/login → allow always (but redirect to /dashboard if already signed in)
 *  - /dashboard/*     → require session, redirect to /dashboard/login if missing
 */

export default auth((request) => {
  const { nextUrl, auth: session } = request;
  const isLoggedIn   = !!session;
  const isDashboard  = nextUrl.pathname.startsWith("/dashboard");
  const isLoginPage  = nextUrl.pathname === "/dashboard/login";

  // Already logged in → skip the login page
  if (isLoggedIn && isLoginPage) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  // Not logged in → redirect to login
  if (!isLoggedIn && isDashboard && !isLoginPage) {
    return Response.redirect(new URL("/dashboard/login", nextUrl));
  }
});

export const config = {
  // Only run on dashboard routes — never on static files, _next, or API routes
  matcher: ["/dashboard/:path*"],
};