import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Попробуйте получить токен из разных источников
    const state = getState() as any;
    let token = state.auth?.token || state.auth?.accessToken;

    // Если токена нет в Redux, попробуйте cookies
    if (!token) {
      token = getCookie("token") || getCookie("authToken") || getCookie("access_token");
    }

    // Если токена нет в cookies, попробуйте localStorage
    if (!token && typeof window !== "undefined") {
      token = localStorage.getItem("token") || localStorage.getItem("authToken");
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    console.log("Финальные заголовки:", Object.fromEntries(headers.entries()));
    return headers;
  },
});

// prepareHeaders: (headers) => {
// 	let token = null;
// 	const localStorageData = JSON.parse(localStorage.getItem('tokens')!);
// 	if (localStorageData) {
// 		const { accessToken } = localStorageData;
// 		token = accessToken;
// 	}
// 	if (token) {
// 		headers.set('Authorization', `Bearer ${token}`);
// 	}
// 	return headers;
// }

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  tagTypes: ["auth", "ticket"],
  endpoints: () => ({}),
});
function getCookie(arg0: string): any {
  throw new Error("Function not implemented.");
}
