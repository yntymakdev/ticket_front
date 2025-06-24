import { IUser } from "@/types/user.types";

// Тип статуса тикета
// export type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

// Основной тип одного тикета
export interface ITicket {
  id: string;
  title: string;
  description: string;
  customerName: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  createdBy: IUser;
  assignments: IAssignment[];
}
export interface IComment {
  id: string;
  message: string;
  userId: string;
  ticketId: string;
}

// Назначение тикета
// export interface IAssignment {
//   id: string;
//   assignedTo: string;
//   assignedBy: IUser;
//   createdAt: string;
// }

export interface IPostCommentRequest {
  id: string;
  message: string;
}
export namespace TICKET {
  // --- Запросы ---
  export type GetAllRequest = void;
  export type GetAllResponse = ITicket[];
  export type GetStatusResponse = UpdateTicketStatusRequest[];
  export type GetCommentRequest = IPostCommentRequest[];
  export type GetCommentResponse = IComment[];

  export interface CreateTicketRequest {
    title: string;
    description: string;
    customerName: string;
  }

  export type CreateTicketResponse = ITicket;

  export interface UpdateTicketStatusRequest {
    id: string;
    status: TicketStatus;
  }

  export interface ReassignTicketRequest {
    ticketId: string;
    assignedToId: string;
  }
}
