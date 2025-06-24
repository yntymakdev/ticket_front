"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Menu, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import CustomSelect from "@/ui/CustomSelect";
import AddTicketDialog from "./AddTicket";
import TicketTable from "./TicketTable";

interface TicketsDashboardProps {
  userRole: string;
}

const TicketsDashboard: React.FC<TicketsDashboardProps> = ({ userRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Status");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-0">
              <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100 lg:hidden">
                <Menu size={20} />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Tickets</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* <CustomSelect value={statusFilter} onChange={setStatusFilter} /> */}
              <div className="relative w-40 sm:w-60 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Показываем AddTicketDialog только если роль НЕ SUPERVISOR */}
        {userRole !== "SUPERVISOR" && <AddTicketDialog open={open} setOpen={setOpen} userRole={userRole} />}

        <main className="flex-1 overflow-auto p-4">
          <TicketTable />
        </main>
      </div>
    </div>
  );
};

export default TicketsDashboard;
