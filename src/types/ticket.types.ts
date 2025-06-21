import { IUser } from "./user.types";

export interface ITicket {
  id: String;
  title: String;
  description: String;
  customerName: String;
  status: TicketStatus;
  // createdById: String;
  // createdBy: IUser;
  // comments: IComment[];
  assignments: IAssignment[];
  assignedTo: string;
}
export interface CreateTicketDto {
  title: string;
  description: string;
  customerName: string;
  status: TicketStatus;
  assignedTo?: string;
}

export interface IComment {
  id: string;
  message: string;
}
export interface IAssignment {
  id: string;
  ticketId: string;
  assignedToId: string;
  assignedById: string;
}

export enum TicketStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}
