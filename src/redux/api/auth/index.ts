import { api as index } from "..";
import { AUTH } from "./types";

const api = index.injectEndpoints({
  endpoints: (build) => ({
   login: build.mutation<AUTH.PostLoginResponse, AUTH.PostLoginRequest>({
  query: (loginData) => ({
    url: "/auth/login",  // или "/auth/sign-in"
    method: "POST",
    body: loginData,
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

  }),
});

export const {  useLoginMutation, useRegisterMutation } = api;
