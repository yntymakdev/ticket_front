import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.SERVER_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn = async (args, api, extraOptions) => {
  console.log("Выполняется запрос:", args);

  const result = await baseQuery(args, api, extraOptions);

  console.log("Результат запроса:", result);

  if (result.data && (result.data as any).accessToken && (result.data as any).refreshToken) {
    const { accessToken, refreshToken } = result.data as any;

    Cookies.set("accessToken", accessToken, {
      path: "/",
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    Cookies.set("refreshToken", refreshToken, {
      path: "/",
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    console.log("✅ Токены сохранены в cookie");
  }

  if (result.error?.status === 401) {
    console.error("Ошибка авторизации 401:", result.error);
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  tagTypes: ["auth", "ticket", "user"],
  endpoints: () => ({}),
});
