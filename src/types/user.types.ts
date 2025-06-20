import { IAssignment, IComment, ITicket } from "./ticket.types";

export enum Role {
  OPERATOR = "OPERATOR",
  SUPERVISOR = "SUPERVISOR",
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: Role;
  tickets?: ITicket[];
  comments?: IComment[];
  assigned?: IAssignment[];
  assignedBy?: IAssignment[];
}
export interface IUserEditInput extends Pick<IUser, "email" | "role"> {}
