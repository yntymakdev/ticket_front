// hooks/useAssignTicket.ts
import { useTicketAssignMutation } from "@/redux/api/ticket";

export const useAssignTicket = () => {
  const [assignTicket] = useTicketAssignMutation();

  const assign = async (
    ticketId: string,
    operatorId: string,
    updateLocalTickets: (ticketId: string, operatorId: string) => void
  ) => {
    try {
      await assignTicket({ ticketId, operatorId }).unwrap();
      updateLocalTickets(ticketId, operatorId);
    } catch (error) {
      console.error("Ошибка при назначении:", error);
    }
  };

  return { assign };
};
