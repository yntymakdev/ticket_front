import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include", // обязательно для cookie!
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

  if (result.error?.status === 401) {
    console.error("Ошибка авторизации 401:", result.error);
    // Можно тут добавить логику редиректа или обновления токена
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  tagTypes: ["auth", "ticket"],
  endpoints: () => ({}),
});
