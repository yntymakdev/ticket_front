// hooks/useUpdateTicketStatus.ts
import { useUpdateTicketStatusMutation } from "@/redux/api/ticket";
import { TicketStatus } from "@/types/ticket.types";

export const useUpdateTicketStatus = () => {
  const [updateTicketStatusMutation, meta] = useUpdateTicketStatusMutation();

  const updateStatus = async (id: string, status: TicketStatus) => {
    try {
      await updateTicketStatusMutation({ id, status }).unwrap();
      console.log(`Статус тикета ${id} обновлён на ${status}`);
    } catch (error) {
      console.error("Ошибка обновления статуса:", error);
    }
  };

  return {
    updateStatus, // ✅ возвращается сюда
    ...meta,
  };
};
