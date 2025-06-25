import { api as index } from "..";
import { AUTH } from "./types";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AUTH.PostLoginResponse, AUTH.PostLoginRequest>({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
        credentials: "include",
      }),
      invalidatesTags: ["auth"],
    }),

    register: build.mutation<AUTH.PostRegisterResponse, AUTH.PostRegisterRequest>({
      query: (registerData) => ({
        url: "/auth/register",
        method: "POST",
        body: registerData,
      }),
      invalidatesTags: ["auth"],
    }),
    refresh: build.mutation<AUTH.PostRegisterResponse, AUTH.PostRegisterRequest>({
      query: (refreshData) => ({
        url: "/auth/login/access-token",
        method: "POST",
        body: refreshData,
      }),

      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = api;
