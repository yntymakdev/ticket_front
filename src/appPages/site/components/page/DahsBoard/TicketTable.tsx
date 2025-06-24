"use client";
import React, { useEffect, useState } from "react";
import { useOperatorsQuery } from "@/redux/api/user";
import { TicketStatus } from "@/types/ticket.types";
import { tokenUtils } from "@/hooks/useAuth";
import { useTickets } from "@/hooks/useTickets";
import { useAssignTicket } from "@/hooks/useAssignTicket";
import TicketList from "./TicketList";
import { useUpdateTicketStatus } from "@/hooks/useUpdateTicketStatus";
interface TicketTableProps {
  searchQuery: string;
}
const TicketTable: React.FC<TicketTableProps> = ({ searchQuery }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [roleChecked, setRoleChecked] = useState(false);
  const { token, isLoading, isError, error, refetch, localTickets, setLocalTickets } = useTickets({ searchQuery });

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
  return <TicketList tickets={localTickets} userRole={userRole} operators={operators} onReassign={handleReassign} />;
};

export default TicketTable;
