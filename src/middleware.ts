import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sela_session_token")?.value;

  // 1. Protect all /app routes
  if (pathname.startsWith("/app")) {
    if (!sessionToken) {
      const loginUrl = new URL("/masuk", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Redirect authenticated users away from login/register
  if (pathname === "/masuk" || pathname === "/daftar") {
    if (sessionToken) {
      return NextResponse.redirect(new URL("/app", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/masuk", "/daftar"],
};
