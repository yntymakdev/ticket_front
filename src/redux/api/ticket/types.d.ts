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
  user: {
    id: string;
    email: string;
    role: string;
  };
}
export interface IDeleteTicket {
  id: string;
  ticketId: string;
}
export interface GetAllRequestDeleteTicket {
  id: string;
  ticketId: string;
}

// Назначение тикета
// export interface IAssignment {
//   id: string;
//   assignedTo: string;
//   assignedBy: IUser;
//   createdAt: string;
// }

export interface ICommentGet {
  id: string;
  message: string;
  userId: string;
  ticketId: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface IPostCommentRequest {
  id: string;
  message: string;
}

export interface TicketItem {
  id: string;
  title: string;
  status: string;
  customerName: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  createdBy: IUser;
  assignments: IAssignment[];
}

export interface GetAllRequestSearch {
  searchQuery?: string;
  status?: string;
}

export namespace TICKET {
  // --- Запросы ---
  export type GetAllRequest = {
    searchQuery?: string;
    status?: string;
  };
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
