import { api as index } from "..";
import {
  GetAllRequestDeleteTicket,
  GetAllRequestSearch,
  IComment,
  ICommentGet,
  IDeleteTicket,
  IPostCommentRequest,
  ITicket,
  TICKET,
  TicketItem,
} from "./types";

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
    ticketget: build.query<TICKET.GetAllResponse, TICKET.GetAllRequest>({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params?.searchQuery) {
          searchParams.append("searchQuery", params.searchQuery);
        }

        if (params?.status && params.status !== "Status") {
          searchParams.append("status", params.status);
        }

        return {
          url: `/ticket/tickets${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["ticket"],
    }),
    ticketAssign: build.mutation<void, { ticketId: string; operatorId: string }>({
      query: ({ ticketId, operatorId }) => ({
        url: `/ticket/${ticketId}/assign`,
        method: "PATCH",
        body: { operatorId },
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        providesTags: ["ticket"],
      }),
    }),
    UpdateTicketStatus: build.mutation<TICKET.GetStatusResponse, TICKET.UpdateTicketStatusRequest>({
      query: ({ id, status }) => ({
        url: `/ticket/${id}/status`,
        method: "PATCH",
        body: { status },
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        providesTags: ["ticket"],
      }),
    }),
    TicketDetail: build.query<ITicket, string>({
      query: (id) => ({
        url: `/ticket/tickets/${id}`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        providesTags: ["ticket"],
      }),
    }),
    TicketComment: build.mutation<IComment, IPostCommentRequest>({
      query: ({ id, message }) => ({
        url: `/ticket/${id}/comments`,
        method: "POST",
        body: { message },
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        providesTags: ["ticket"],
      }),
    }),
    GetComment: build.query<IComment[], string>({
      query: (ticketId) => ({
        url: `/ticket/${ticketId}/comments`,
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        providesTags: ["ticket"],
      }),
    }),
    DeleteTicket: build.mutation<{ message: string }, string>({
      query: (ticketId) => ({
        url: `/ticket/${ticketId}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["ticket"],
    }),
  }),
});

export const {
  useTicketcreateMutation,
  useUpdateTicketStatusMutation,
  useTicketgetQuery,
  useTicketAssignMutation,
  useTicketDetailQuery,
  useTicketCommentMutation,
  useGetCommentQuery,
  useDeleteTicketMutation,
} = api;
