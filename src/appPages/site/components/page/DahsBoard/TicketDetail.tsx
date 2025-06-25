// "use client";
// import React from "react";
// import { useParams } from "next/navigation";
// import { useTicketDetailQuery } from "@/redux/api/ticket";
// import { getStatusStyle } from "@/hooks/getStatusStyle";

// const TicketDetail = () => {
//   const params = useParams();
//   const ticketId = params?.id as string;

//   const { data: ticket, isLoading, isError, error } = useTicketDetailQuery(ticketId);

//   if (isLoading) return <div>Загрузка тикета...</div>;
//   if (isError || !ticket) return <div>Ошибка: {error?.toString() || "Тикет не найден"}</div>;

//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-xl p-6 border border-gray-200 mt-6">
//       <h1 className="text-2xl font-bold text-gray-900 mb-4">{ticket.title}</h1>

//       <div className="mb-4">
//         <label className="block text-sm text-gray-600">Клиент</label>
//         <p className="text-gray-800 font-medium">{ticket.customerName}</p>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm text-gray-600">Статус</label>
//         <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(ticket.status)}`}>
//           {ticket.status === "OPEN" ? "Открыт" : ticket.status === "IN_PROGRESS" ? "В процессе" : "Закрыт"}
//         </span>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm text-gray-600">Описание</label>
//         <p className="text-gray-700">{ticket.description}</p>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm text-gray-600">Создан</label>
//         {/* <p className="text-gray-500 text-sm">{new Date(ticket.createdAt).toLocaleString()}</p> */}
//       </div>

//       {ticket.assignments.length > 0 && (
//         <div className="mb-4">
//           <label className="block text-sm text-gray-600">Назначенный оператор</label>
//           <p className="text-blue-600">{ticket.assignments[0].assignedTo?.email || "Оператор не назначен"}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TicketDetail;
