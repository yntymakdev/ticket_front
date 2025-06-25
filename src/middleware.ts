import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth/auth-token.service";
import { DASHBOARD_URL, PUBLIC_URL, ADMIN_URL } from "./config/url.config";
import { userService } from "./services/user.service";
import { Role } from "./types/user.types";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/auth/login");
  const isDashboardPage = pathname.startsWith("/tickets/dashboard");
  const isAdminPage = pathname.startsWith("/tickets/dashboard/admin");

  if (!refreshToken) {
    if (isDashboardPage) {
      return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url));
    }
    return NextResponse.next();
  }

  if (isAuthPage) {
    return NextResponse.redirect(new URL(DASHBOARD_URL.root(), request.url));
  }

  if (!isAdminPage) {
    return NextResponse.next();
  }

  try {
    const profile = await userService.getProfileMiddleware(refreshToken);

    if (profile.role !== Role.SUPERVISOR) {
      //? Токен валиден, но нет прав
      return NextResponse.rewrite(new URL("/404", request.url));
    }
    return NextResponse.next();
  } catch {
    //? Ошибка токена → чистим куку и на /auth
    request.cookies.delete(EnumTokens.REFRESH_TOKEN);
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url));
  }
}

export const config = {
  matcher: ["/auth/:path*", "/tickets/dashboard/:path*"],
};
