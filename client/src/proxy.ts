import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard", "/profile"];
  const publicAuthRoutes = ["/login", "/signup"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = publicAuthRoutes.includes(pathname);

  // if (isProtectedRoute && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // if (isAuthRoute && token) {
  //   return NextResponse.redirect(new URL("/dashboard/newchats", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/signup"],
};
