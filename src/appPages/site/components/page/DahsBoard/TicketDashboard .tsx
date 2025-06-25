"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Menu, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import AddTicketDialog from "./AddTicket";
import TicketTable from "./TicketTable";
import { removeFromStorage } from "@/services/auth/auth-token.service";
import { PUBLIC_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface TicketsDashboardProps {
  userRole: string;
}

const TicketsDashboard: React.FC<TicketsDashboardProps> = ({ userRole }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { push } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [statusFilter, setStatusFilter] = useState("Status");
  const [open, setOpen] = useState(false);
  const logout = () => {
    removeFromStorage();
    push(PUBLIC_URL.auth());
  };
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto mt-4 sm:mt-0">
              <div className="relative w-full sm:w-60 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <Button variant="outline" onClick={logout} className="w-full sm:w-auto">
                Выйти
              </Button>
            </div>
          </div>
        </header>
        <AddTicketDialog open={open} setOpen={setOpen} userRole={userRole} />

        <main className="flex-1 overflow-auto p-4">
          <TicketTable searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  );
};

export default TicketsDashboard;
