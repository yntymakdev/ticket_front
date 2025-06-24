import TicketsDashboard from "@/appPages/site/components/page/DahsBoard/TicketDashboard ";
import TicketDashboard from "@/appPages/site/components/page/DahsBoard/TicketDashboard ";
import React from "react";
const userRole = "SUPERVISOR";
const page = () => {
  return (
    <div>
      <TicketsDashboard userRole={userRole} />
    </div>
  );
};

export default page;
