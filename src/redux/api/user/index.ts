import { api as index } from "..";
import { USER } from "./types";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    operators: build.query<USER.GetAllResponse, USER.GetAllRequest>({
      query: (userData) => ({
        url: "/user/operators",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["user"],
      }),
    }),
  }),
});

export const { useOperatorsQuery } = api;
