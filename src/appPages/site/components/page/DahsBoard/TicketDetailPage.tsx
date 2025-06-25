"use client";
import React, { useState } from "react";
import { Menu, ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { useGetCommentQuery, useTicketCommentMutation, useTicketDetailQuery } from "@/redux/api/ticket";
import { IComment } from "@/redux/api/ticket/types";

const TicketDetailPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const params = useParams();
  const ticketId = params?.id as string;

  const { data: ticket, isLoading, isError, error } = useTicketDetailQuery(ticketId);
  const { data: comments = [], refetch } = useGetCommentQuery(ticketId);
  const [postComment, { isLoading: isPosting }] = useTicketCommentMutation();

  if (isLoading) return <div>Загрузка тикета...</div>;
  if (isError || !ticket) return <div>Ошибка: {error?.toString() || "Тикет не найден"}</div>;

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await postComment({ id: ticketId, message: newComment }).unwrap();
      setNewComment("");
      refetch();
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
              <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100 lg:hidden">
                <Menu size={20} />
              </button>

              <Link href="/tickets/dashboard" className="p-2 rounded-md hover:bg-gray-100">
                <ArrowLeft size={20} />
              </Link>

              <h1 className="text-2xl font-bold text-gray-900 truncate">{ticket.title}</h1>
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
                  <span className="text-gray-900 font-medium">{ticket.status}</span>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Комментарии</h3>

              <div className="space-y-4 mb-6">
                {comments.length === 0 && <p className="text-sm text-gray-500">Комментариев пока нет.</p>}
                {comments.map((comment: IComment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">{comment.user.email}</span>

                      <span className="font-medium text-sm text-gray-900">{comment.user.role}</span>
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
