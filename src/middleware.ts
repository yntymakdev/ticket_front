// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const refreshToken = request.cookies.get("refreshToken")?.value;
//   const { pathname } = request.nextUrl;

//   const isAuth = pathname.startsWith("/auth");
//   const isDashboard = pathname.startsWith("/tickets/dashboard");

//   if (isAuth && refreshToken) {
//     return NextResponse.redirect(new URL("/tickets/dashboard", request.url));
//   }

//   if (isDashboard && !refreshToken) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/auth/:path*", "/tickets/dashboard", "/tickets/dashboard/:path*"],
// };
import { type NextRequest, NextResponse } from "next/server";

import { Role } from "./types/user.types";
import { EnumTokens } from "./services/auth/auth-token.service";
import { userService } from "./services/user.service";
import { ADMIN_URL, DASHBOARD_URL, PUBLIC_URL } from "./config/url.config";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

  const isAuthPage = request.url.includes(PUBLIC_URL.auth());
  const isAdminPage = request.url.includes(ADMIN_URL.root());

  if (isAuthPage) {
    if (refreshToken && accessToken) {
      return NextResponse.redirect(new URL(DASHBOARD_URL.root(), request.url));
    }

    return NextResponse.next();
  }

  if (refreshToken === undefined) {
    return NextResponse.rewrite(new URL(isAdminPage ? "/404" : PUBLIC_URL.auth(), request.url));
  }

  try {
    const profile = await userService.getProfileMiddleware(refreshToken);

    if (profile.role === Role.SUPERVISOR) {
      return NextResponse.next();
    }

    if (isAdminPage) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    request.cookies.delete(EnumTokens.REFRESH_TOKEN);
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url));
  }
}

export const config = {
  matcher: ["/tickets/dashboard/:path*", "/auth/:path*"],
};
