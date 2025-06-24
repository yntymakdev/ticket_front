// "use client";
// import React, { useState } from "react";
// import { Menu, X, ChevronRight, ChevronDown, ArrowLeft } from "lucide-react";
// import Sidebar from "./Sidebar";
// import { useParams } from "next/navigation";
// import { useTicketDetailQuery } from "@/redux/api/ticket";
// import Link from "next/link";

//? Sidebar Component
// const Sidebar = ({ isOpen, onClose }) => {
//   const menuItems = [
//     { id: 'tickets', label: 'Tickets', active: true },
//     { id: 'dashboard', label: 'Dashboard', active: false }
//   ];

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed top-0 left-0 h-full w-64 sm:w-64 bg-slate-900 text-white z-50 transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//         lg:translate-x-0 lg:static lg:z-auto
//         max-w-[85vw]
//       `}>
//         {/* Mobile Close Button */}
//         <div className="flex items-center justify-between p-4 lg:hidden">
//           <h2 className="text-lg font-semibold">Menu</h2>
//           <button
//             onClick={onClose}
//             className="p-1 rounded-md hover:bg-slate-800"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Menu Items */}
//         <nav className="p-2 sm:p-4 space-y-1 sm:space-y-2">
//           {menuItems.map((item) => (
//             <div
//               key={item.id}
//               className={`
//                 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg cursor-pointer transition-colors text-sm sm:text-base
//                 ${item.active
//                   ? 'bg-slate-800 text-white'
//                   : 'text-slate-300 hover:bg-slate-800 hover:text-white'
//                 }
//               `}
//             >
//               <div className="w-2 h-2 rounded-full bg-current opacity-60 flex-shrink-0" />
//               <span className="font-medium truncate">{item.label}</span>
//             </div>
//           ))}
//         </nav>
//       </div>
//     </>
//   );
// };

// Main Ticket Detail 

"use client";
import React, { useState } from "react";
import { Menu, ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Sidebar from "./Sidebar";
// import { useTicketDetailQuery } from "@/redux/api/ticket";
// import { usePostCommentMutation, useGetCommentsQuery } from "@/redux/api/ticketApi";
// import { IComment } from "@/types/ticket.types";

const TicketDetailPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState("Open");
  const [newComment, setNewComment] = useState("");

  const params = useParams();
  const ticketId = params?.id as string;

  const { data: ticket, isLoading, isError, error } = useTicketDetailQuery(ticketId);
  const { data: comments = [], refetch } = useGetCommentsQuery(ticketId);
  const [postComment, { isLoading: isPosting }] = usePostCommentMutation();

  if (isLoading) return <div>Загрузка тикета...</div>;
  if (isError || !ticket) return <div>Ошибка: {error?.toString() || "Тикет не найден"}</div>;

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await postComment({ id: ticketId, message: newComment }).unwrap();
      setNewComment("");
      refetch(); // Обновить список комментариев
    } catch (e) {
      alert("Ошибка при добавлении комментария");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleAddComment();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
              >
                <Menu size={20} />
              </button>

              <Link href="/tickets/dashboard" className="p-2 rounded-md hover:bg-gray-100">
                <ArrowLeft size={20} />
              </Link>

              <h1 className="text-2xl font-bold text-gray-900 truncate">{ticket.title}</h1>
            </div>

            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Closed</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{ticket.customerName}</h2>
                  <p className="text-base text-gray-700">{ticket.description}</p>
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-gray-900 font-medium">{status}</span>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Комментарии */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Комментарии</h3>

              <div className="space-y-4 mb-6">
                {comments.length === 0 && (
                  <p className="text-sm text-gray-500">Комментариев пока нет.</p>
                )}
                {comments.map((comment: IComment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">{comment.userId}</span>
                      {/* В идеале заменить userId на user.email если доступно */}
                    </div>
                    <p className="text-sm text-gray-700">{comment.message}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Добавьте комментарий..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || isPosting}
                    className="bg-slate-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
                  >
                    {isPosting ? "Отправка..." : "Добавить комментарий"}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Нажмите Ctrl+Enter для отправки</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TicketDetailPage;
