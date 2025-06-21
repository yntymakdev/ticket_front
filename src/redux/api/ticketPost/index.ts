import { api as index } from "..";
import { TICKET } from "./types";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    ticketcreate: build.mutation<TICKET.CreateTicketResponse, TICKET.CreateTicketRequest>({
      query: (ticketData) => ({
        url: "/ticket/create",
        method: "POST",
        body: ticketData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["ticket"],
    }),

    // register: build.mutation<AUTH.PostRegisterResponse, AUTH.PostRegisterRequest>({
    //   query: (registerData) => ({
    //     url: "/auth/register",
    //     method: "POST",
    //     body: registerData,
    //   }),
    //   invalidatesTags: ["ticket"],
    // }),
  }),
});

export const { useTicketcreateMutation } = api;
