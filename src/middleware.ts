import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth/auth-token.service";
import { DASHBOARD_URL, PUBLIC_URL, ADMIN_URL } from "./config/url.config";
import { userService } from "./services/user.service";
import { Role } from "./types/user.types";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/auth");
  const isDashboardPage = pathname.startsWith("/tickets/dashboard");
  const isAdminPage = pathname.startsWith("/tickets/dashboard/admin");

  /* ───────── 1. Гость ───────── */
  if (!refreshToken) {
    if (isDashboardPage) {
      // Без токена пытается попасть в дэшборд → на /auth
      return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url));
    }
    // Публичные страницы пропускаем
    return NextResponse.next();
  }

  /* ───────── 2. Уже вошёл ───────── */
  if (isAuthPage) {
    // Попытка открыть /auth → на дэшборд
    return NextResponse.redirect(new URL(DASHBOARD_URL.root(), request.url));
  }

  // Обычный дэшборд открыт для всех авторизованных
  if (!isAdminPage) {
    return NextResponse.next();
  }

  /* ───────── 3. Админ‑роут ───────── */
  try {
    const profile = await userService.getProfileMiddleware(refreshToken);

    if (profile.role !== Role.SUPERVISOR) {
      // Токен валиден, но нет прав
      return NextResponse.rewrite(new URL("/404", request.url));
    }
    return NextResponse.next();
  } catch {
    // Ошибка токена → чистим куку и на /auth
    request.cookies.delete(EnumTokens.REFRESH_TOKEN);
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url));
  }
}

export const config = {
  matcher: ["/auth/:path*", "/tickets/dashboard/:path*"],
};
