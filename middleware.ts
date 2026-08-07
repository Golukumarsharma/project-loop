import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn");

  const protectedRoutes = [
    "/dashboard",
    "/feedback",
    "/members",
    "/analytics",
    "/settings",
    "/reports",
  ];

  const path = request.nextUrl.pathname;

  if (
    protectedRoutes.some((route) => path.startsWith(route)) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/feedback/:path*",
    "/members/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/reports/:path*",
  ],
};