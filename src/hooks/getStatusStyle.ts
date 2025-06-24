import { TicketStatus } from "@/types/ticket.types";

export const getStatusStyle = (status: TicketStatus) => {
  switch (status) {
    case TicketStatus.OPEN:
      return "bg-green-100 text-green-800";
    case TicketStatus.IN_PROGRESS:
      return "bg-blue-100 text-blue-800";
    case TicketStatus.CLOSED:
      return "bg-gray-200 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
