import { IUser } from "./user.types";

// export interface ITicket {
//   id: string; // Изменил String на string для консистентности
//   title: string;
//   description: string;
//   customerName: string;
//   status: TicketStatus;
//   assignments: IAssignment[];
//   assignedTo?: string; // Сделал опциональным
// }
export interface CreateTicketDto {
  title: string;
  description: string;
  customerName: string;
  status: TicketStatus;
  assignedTo?: string;
}

// export interface IComment {
//   id: string;
//   message: string;
// }
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
