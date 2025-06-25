"use client";
import React, { useCallback, useEffect, useState } from "react";
import { TicketItem } from "@/redux/api/ticket/types";
import { TicketStatus } from "@/types/ticket.types";
import { useUpdateTicketStatus } from "@/hooks/useUpdateTicketStatus";
import { useDeleteTicketMutation } from "@/redux/api/ticket";
import { useRouter } from "next/navigation";
import CustomSelect from "@/ui/CustomSelect";
import toast from "react-hot-toast";

interface Props {
  tickets: TicketItem[];
  userRole: string | null;
  operators: any[];
  onReassign: (ticketId: string, operatorId: string) => void;
}

const statusOptions = [
  { value: "ALL", label: "Все статусы", color: "bg-gray-200 text-gray-800" },
  { value: TicketStatus.OPEN, label: "Открыт", color: "bg-green-100 text-green-800" },
  { value: TicketStatus.IN_PROGRESS, label: "В процессе", color: "bg-blue-100 text-blue-800" },
  { value: TicketStatus.CLOSED, label: "Закрыт", color: "bg-gray-200 text-gray-800" },
];

const getStatusStyle = (status: string) => {
  const found = statusOptions.find((s) => s.value === status);
  return found?.color || "bg-gray-100 text-gray-800";
};

const TicketList: React.FC<Props> = ({ tickets, userRole, operators, onReassign }) => {
  const { updateStatus } = useUpdateTicketStatus();
  const router = useRouter();
  const [deleteTicket] = useDeleteTicketMutation();

  const [localTickets, setLocalTickets] = useState<TicketItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    setLocalTickets(tickets);
  }, [tickets]);

  const handleFilterChange = useCallback((val: string) => {
    setFilterStatus(val);
  }, []);

  const filteredTickets = filterStatus === "ALL" ? localTickets : localTickets.filter((t) => t.status === filterStatus);

  const handleRowClick = (ticketId: string) => {
    router.push(`/tickets/${ticketId}`);
  };

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
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

    updateStatus(ticketId, newStatus).catch(() => {
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

  const handleDelete = (ticketId: string) => {
    deleteTicket(ticketId)
      .unwrap()
      .then(() => {
        setLocalTickets((prev) => prev.filter((t) => t.id !== ticketId));
        toast.success("Тикет успешно удалён ");
      })
      .catch(() => {
        toast.error("Ошибка при удалении ");
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4">
        <CustomSelect value={filterStatus} onChange={handleFilterChange} />
      </div>

      {/* Десктопная версия - таблица */}
      <div className="hidden md:block max-h-[400px] overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Название</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Клиент</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Статус</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Оператор</th>
              {userRole === "SUPERVISOR" && (
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Действия</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 px-6 text-center text-gray-500">
                  Тикеты не найдены
                </td>
              </tr>
            ) : (
              filteredTickets.map((ticket) => (
                <tr
                  onClick={() => handleRowClick(ticket.id)}
                  key={ticket.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-6 text-gray-900">{ticket.title}</td>
                  <td onClick={(e) => e.stopPropagation()} className="py-3 px-6 text-gray-700">
                    {ticket.customerName}
                  </td>
                  <td className="py-3 px-6">
                    <select
                      onClick={(e) => e.stopPropagation()}
                      value={ticket.status}
                      onChange={(e) => handleStatusChange(ticket.id, e.target.value as TicketStatus)}
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(ticket.status)}`}
                    >
                      {statusOptions
                        .filter((s) => s.value !== "ALL")
                        .map((status) => (
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
                          onClick={(e) => e.stopPropagation()}
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
                  {userRole === "SUPERVISOR" && (
                    <td onClick={(e) => e.stopPropagation()} className="py-3 px-6">
                      <button onClick={() => handleDelete(ticket.id)} className="text-red-600 hover:underline text-sm">
                        Удалить
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Мобильная версия - карточки */}
      <div className="md:hidden max-h-[400px] overflow-auto">
        {filteredTickets.length === 0 ? (
          <div className="py-8 px-4 text-center text-gray-500">Тикеты не найдены</div>
        ) : (
          <div className="space-y-3 p-4">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => handleRowClick(ticket.id)}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                {/* Заголовок и клиент */}
                <div className="mb-3">
                  <h3 className="font-medium text-gray-900 mb-1">{ticket.title}</h3>
                  <p className="text-sm text-gray-600">Клиент: {ticket.customerName}</p>
                </div>

                {/* Статус */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Статус:</label>
                  <select
                    onClick={(e) => e.stopPropagation()}
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket.id, e.target.value as TicketStatus)}
                    className={`w-full rounded-md px-3 py-2 text-sm font-medium ${getStatusStyle(
                      ticket.status
                    )} border-0`}
                  >
                    {statusOptions
                      .filter((s) => s.value !== "ALL")
                      .map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Оператор */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Оператор:</label>
                  {userRole === "SUPERVISOR" ? (
                    <div className="space-y-2">
                      <select
                        onClick={(e) => e.stopPropagation()}
                        value={ticket.assignments?.[0]?.assignedTo || ""}
                        onChange={(e) => onReassign(ticket.id, e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                      >
                        <option value="">Не назначен</option>
                        {operators.map((op) => (
                          <option key={op.id} value={op.id}>
                            {op.email}
                          </option>
                        ))}
                      </select>
                      {ticket.assignments?.length > 0 && operators.length > 0 && (
                        <div className="text-green-600 text-xs">
                          Назначено:{" "}
                          {operators.find((op) => op.id === ticket.assignments?.[0]?.assignedTo)?.email ??
                            "Оператор не найден"}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">Нет доступа</div>
                  )}
                </div>

                {/* Действия для супервизора */}
                {userRole === "SUPERVISOR" && (
                  <div className="pt-2 border-t border-gray-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(ticket.id);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Удалить тикет
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketList;
