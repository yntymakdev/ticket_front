"use client";
import { X } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};
const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { id: "tickets", label: "Tickets", active: true },
    { id: "dashboard", label: "Dashboard", active: false },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-64 sm:w-64 bg-slate-900 text-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
        max-w-[85vw]
      `}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-800">
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-2 sm:p-4 space-y-1 sm:space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`
                flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg cursor-pointer transition-colors text-sm sm:text-base
                ${item.active ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}
              `}
            >
              <div className="w-2 h-2 rounded-full bg-current opacity-60 flex-shrink-0" />
              <span className="font-medium truncate">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
