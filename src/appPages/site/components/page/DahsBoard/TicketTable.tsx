"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useTicketAssignMutation, useTicketgetQuery } from "@/redux/api/ticket";
import { useOperatorsQuery } from "@/redux/api/user";
import { tokenUtils } from "@/hooks/useAuth";
import { ITicket } from "@/redux/api/ticket/types";
import { TicketStatus } from "@/types/ticket.types";

const TicketTable = () => {
  const token = Cookies.get("accessToken");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [roleChecked, setRoleChecked] = useState(false); // флаг, что роль уже получена

  const {
    data: tickets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useTicketgetQuery(undefined, {
    skip: !token || !tokenUtils.isTokenValid(),
    refetchOnMountOrArgChange: true,
  });

  const { data: operators = [] } = useOperatorsQuery();
  const [assignTicket] = useTicketAssignMutation();

  // При загрузке компонента и изменении токена — достаём роль из токена
  useEffect(() => {
    if (token && tokenUtils.isTokenValid()) {
      const role = tokenUtils.getUserRole();
      console.log("Роль пользователя из токена:", role);
      setUserRole(role);
      setRoleChecked(true);
      refetch();
    } else {
      setUserRole(null);
      setRoleChecked(true);
    }
  }, [token, refetch]);

  const statusOptions = [
    { value: TicketStatus.OPEN, label: "Открыт", color: "bg-green-100 text-green-800" },
    { value: TicketStatus.IN_PROGRESS, label: "В процессе", color: "bg-blue-100 text-blue-800" },
    { value: TicketStatus.CLOSED, label: "Закрыт", color: "bg-gray-200 text-gray-800" },
  ];

  const handleReassign = async (ticketId: string, operatorId: string) => {
    try {
      await assignTicket({ ticketId, operatorId }).unwrap();
      alert("Оператор назначен успешно");
    } catch (err) {
      console.error("Ошибка при назначении:", err);
      alert("Ошибка при назначении");
    }
  };

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
    console.log(`Изменение статуса: тикет ${ticketId} → ${newStatus}`);
    // Здесь реализуйте мутацию, если нужно
  };

  const getStatusStyle = (status: TicketStatus) => {
    const found = statusOptions.find((s) => s.value === status);
    return found?.color || "bg-gray-100 text-gray-800";
  };

  if (!token) return <div>Требуется авторизация</div>;
  if (!tokenUtils.isTokenValid()) return <div>Токен истёк, обновляем...</div>;
  if (!roleChecked) return <div>Загрузка данных пользователя...</div>;
  if (isLoading) return <div>Загрузка билетов...</div>;
  if (isError) return <div>Ошибка при загрузке: {error?.toString()}</div>;

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
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 px-6 text-center text-gray-500">
                  Тикеты не найдены
                </td>
              </tr>
            ) : (
              tickets.map((ticket: ITicket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
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
                      <select
                        value={ticket.assignments?.[0]?.assignedTo || ""}
                        onChange={(e) => handleReassign(ticket.id, e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
                      >
                        <option value="">Не назначен</option>
                        {operators.map((op: any) => (
                          <option key={op.id} value={op.id}>
                            {op.email}
                          </option>
                        ))}
                      </select>
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

export default TicketTable;
