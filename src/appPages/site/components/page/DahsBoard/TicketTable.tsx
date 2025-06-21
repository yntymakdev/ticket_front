"use client";

import React from "react";

const TicketTable = ({ tickets, setTickets }: { tickets: any[]; setTickets: (value: any[]) => void }) => {
  const allOperators = ["Айбек", "Светлана", "Нурислам", "Адилет"];
  const statusOptions = [
    { value: "open", label: "Открыт", color: "bg-green-100 text-green-800" },
    { value: "in_progress", label: "В процессе", color: "bg-blue-100 text-blue-800" },
    { value: "closed", label: "Закрыт", color: "bg-gray-200 text-gray-800" },
  ];

  const handleReassign = (ticketId: number, newOperator: string) => {
    const updated = tickets.map((ticket) => (ticket.id === ticketId ? { ...ticket, assignedTo: newOperator } : ticket));
    setTickets(updated);
  };

  const handleStatusChange = (ticketId: number, newStatus: string) => {
    const updated = tickets.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket));
    setTickets(updated);
  };

  const getStatusStyle = (status: string) => {
    const found = statusOptions.find((s) => s.value === status);
    return found?.color || "bg-gray-100 text-gray-800";
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
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-6 text-gray-900">{ticket.title}</td>
                <td className="py-3 px-6 text-gray-700">{ticket.customer}</td>
                <td className="py-3 px-6">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
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
                  <select
                    value={ticket.assignedTo}
                    onChange={(e) => handleReassign(ticket.id, e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
                  >
                    {allOperators.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;
