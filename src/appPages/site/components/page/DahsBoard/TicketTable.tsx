// components/TicketTable.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useOperatorsQuery } from "@/redux/api/user";
import { TicketStatus } from "@/types/ticket.types";
import { tokenUtils } from "@/hooks/useAuth";
import { useTickets } from "@/hooks/useTickets";
import { useAssignTicket } from "@/hooks/useAssignTicket";
import TicketList from "./TicketList";
import { useUpdateTicketStatus } from "@/hooks/useUpdateTicketStatus";

const TicketTable = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [roleChecked, setRoleChecked] = useState(false);

  const { token, isLoading, isError, error, refetch, localTickets, setLocalTickets } = useTickets();

  const { data: operators = [] } = useOperatorsQuery();
  const { assign } = useAssignTicket();

  useEffect(() => {
    if (token && tokenUtils.isTokenValid()) {
      const role = tokenUtils.getUserRole();
      setUserRole(role);
      setRoleChecked(true);
      refetch();
    } else {
      setUserRole(null);
      setRoleChecked(true);
    }
  }, [token, refetch]);

  const handleReassign = (ticketId: string, operatorId: string) => {
    assign(ticketId, operatorId, (id: any, opId: any) => {
      setLocalTickets((prev: any[]) =>
        prev.map((ticket) =>
          ticket.id === id
            ? {
                ...ticket,
                assignments: [
                  {
                    id: "temp-id",
                    assignedTo: opId,
                    assignedBy: "supervisor",
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : ticket
        )
      );
    });
  };

  // const handleStatusChange = (ticketId: string, status: TicketStatus) => {
  //   console.log(`Изменение статуса тикета ${ticketId} → ${status}`);
  //   // можно добавить обновление статуса через API
  // };

  if (!token) return <div>Требуется авторизация</div>;
  if (!tokenUtils.isTokenValid()) return <div>Токен истёк, обновляем...</div>;
  if (!roleChecked) return <div>Загрузка данных пользователя...</div>;
  if (isLoading) return <div>Загрузка билетов...</div>;
  if (isError) return <div>Ошибка при загрузке: {error?.toString()}</div>;

  return (
    <TicketList
      tickets={localTickets}
      userRole={userRole}
      operators={operators}
      onReassign={handleReassign}
      // onStatusChange={handleStatusChange}
    />
  );
};

export default TicketTable;
