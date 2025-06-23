import { IUser } from "@/types/user.types";

export interface IOperator {
  id: string;
  email: string;
}

export interface IAssignment {
  id: string;
  assignedTo: string;
  assignedBy: IUser;
  createdAt: string;
}

export namespace USER {
  export type GetAllRequest = void;
  export type GetAllResponse = IOperator[];

  export type GetOperatorsReponse = IOperator;

  export interface UpdateTicketStatusRequest {
    id: string;
    status: TicketStatus;
  }

  export interface ReassignTicketRequest {
    ticketId: string;
    assignedToId: string;
  }
}
