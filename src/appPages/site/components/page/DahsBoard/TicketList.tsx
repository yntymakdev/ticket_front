"use client";
import React, { useEffect, useState } from "react";
import { ITicket } from "@/redux/api/ticket/types";
import { TicketStatus } from "@/types/ticket.types";
import { useUpdateTicketStatus } from "@/hooks/useUpdateTicketStatus";
import { useRouter } from "next/navigation";

interface Props {
  tickets: ITicket[];
  userRole: string | null;
  operators: any[];
  onReassign: (ticketId: string, operatorId: string) => void;
}

const statusOptions = [
  { value: TicketStatus.OPEN, label: "Открыт", color: "bg-green-100 text-green-800" },
  { value: TicketStatus.IN_PROGRESS, label: "В процессе", color: "bg-blue-100 text-blue-800" },
  { value: TicketStatus.CLOSED, label: "Закрыт", color: "bg-gray-200 text-gray-800" },
  //   { value: "DELETE" as TicketStatus, label: "Удалён", color: "bg-red-100 text-red-800" },
];

const getStatusStyle = (status: TicketStatus) => {
  const found = statusOptions.find((s) => s.value === status);
  return found?.color || "bg-gray-100 text-gray-800";
};

const TicketList: React.FC<Props> = ({ tickets, userRole, operators, onReassign }) => {
  const { updateStatus } = useUpdateTicketStatus();
  const router = useRouter(); // инициализируй

  const handleRowClick = (ticketId: string) => {
    router.push(`/tickets/${ticketId}`); // путь к детальной странице
  };
  // Локальный стейт для мгновенного обновления UI
  const [localTickets, setLocalTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    setLocalTickets(tickets);
  }, [tickets]);

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
    // Обновляем UI сразу
    setLocalTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: newStatus,
            }
          : t
      )
    );

    // Обновляем на сервере
    updateStatus(ticketId, newStatus).catch(() => {
      // При ошибке откатываем изменения
      setLocalTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId
            ? {
                ...t,
                status: tickets.find((orig) => orig.id === ticketId)?.status || t.status,
              }
            : t
        )
      );
      alert("Ошибка при обновлении статуса");
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="max-h-[400px] overflow-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Название</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Клиент</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Статус</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Оператор</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {localTickets.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 px-6 text-center text-gray-500">
                  Тикеты не найдены
                </td>
              </tr>
            ) : (
              localTickets.map((ticket) => (
                <tr
                  onClick={() => handleRowClick(ticket.id)}
                  key={ticket.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-6 text-gray-900">{ticket.title}</td>
                  <td className="py-3 px-6 text-gray-700">{ticket.customerName}</td>
                  <td className="py-3 px-6">
                    <select
                      value={ticket.status}
                      onChange={(e) => handleStatusChange(ticket.id, e.target.value as TicketStatus)}
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(ticket.status)}`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-6">
                    {userRole === "SUPERVISOR" ? (
                      <div className="flex flex-col space-y-1">
                        <select
                          value={ticket.assignments?.[0]?.assignedTo || ""}
                          onChange={(e) => onReassign(ticket.id, e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
                        >
                          <option value="">Не назначен</option>
                          {operators.map((op) => (
                            <option key={op.id} value={op.id}>
                              {op.email}
                            </option>
                          ))}
                        </select>
                        {ticket.assignments?.length > 0 && operators.length > 0 && (
                          <span className="text-green-600 text-sm">
                            Назначено:{" "}
                            {operators.find((op) => op.id === ticket.assignments?.[0]?.assignedTo)?.email ??
                              "Оператор не найден"}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500">Нет доступа</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketList;
