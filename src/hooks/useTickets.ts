import { useEffect, useState, useMemo } from "react";
import { useTicketgetQuery } from "@/redux/api/ticket";
import { TicketItem } from "@/redux/api/ticket/types";
import Cookies from "js-cookie";
import { tokenUtils } from "@/hooks/useAuth";

interface UseTicketsProps {
  searchQuery?: string;
  statusFilter?: string;
}

export const useTickets = (props?: UseTicketsProps) => {
  const { searchQuery = "", statusFilter = "Status" } = props || {};
  const token = Cookies.get("accessToken");

  const apiParams = useMemo(() => {
    const params: any = {};

    if (searchQuery.trim()) {
      params.searchQuery = searchQuery.trim();
    }

    if (statusFilter && statusFilter !== "Status") {
      params.status = statusFilter;
    }

    return Object.keys(params).length > 0 ? params : undefined;
  }, [searchQuery, statusFilter]);

  const {
    data: tickets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useTicketgetQuery(apiParams, {
    skip: !token || !tokenUtils.isTokenValid(),
    refetchOnMountOrArgChange: true,
  });

  const [localTickets, setLocalTickets] = useState<TicketItem[]>([]);

  useEffect(() => {
    const same = localTickets.length === tickets.length && localTickets.every((t, i) => t.id === tickets[i]?.id);

    if (!same) {
      setLocalTickets(tickets || []);
    }
  }, [tickets, localTickets]);

  return {
    token,
    isLoading,
    isError,
    error,
    refetch,
    localTickets,
    setLocalTickets,
  };
};
