// hooks/useTickets.ts
import { useEffect, useState } from "react";
import { useTicketgetQuery } from "@/redux/api/ticket";
import { ITicket } from "@/redux/api/ticket/types";
import Cookies from "js-cookie";
import { tokenUtils } from "@/hooks/useAuth";

export const useTickets = () => {
  const token = Cookies.get("accessToken");
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

  const [localTickets, setLocalTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    if (tickets.length > 0) {
      setLocalTickets(tickets);
    }
  }, [tickets]);

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
