"use client";
import React, { useState } from "react";
import { Menu, X, ChevronRight, ChevronDown, ArrowLeft } from "lucide-react";
import Sidebar from "./Sidebar";

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

// Main Ticket Detail Component
const TicketDetailPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState("Open");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      time: "1 hour ago",
      content: "Could you provide more details?",
    },
  ]);

  const ticket = {
    id: "#123",
    title: "Ticket #123",
    customer: "Jane Smith",
    description: "Issue with product",
    status: "Open",
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Current User",
        time: "Just now",
        content: newComment.trim(),
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleKeyPress = (e: { key: string; ctrlKey: any; metaKey: any }) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleAddComment();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-2 sm:px-4 py-3 sm:py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 lg:hidden flex-shrink-0"
              >
                <Menu size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Back Button */}
              <button className="p-1.5 sm:p-2 rounded-md hover:bg-gray-100 flex-shrink-0">
                <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
              </button>

              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{ticket.title}</h1>
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-2 sm:px-4 py-1.5 sm:py-2 pr-6 sm:pr-8 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Closed</option>
              </select>
              <ChevronDown className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-2 sm:p-4 lg:p-6">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {/* Ticket Info Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{ticket.customer}</h2>
                  <p className="text-sm sm:text-base text-gray-700">{ticket.description}</p>
                </div>

                {/* Status Row */}
                <div className="flex items-center justify-between py-2 sm:py-3 border-t border-gray-100">
                  <span className="text-sm sm:text-base text-gray-900 font-medium">{status}</span>
                  <ChevronRight className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Comments</h3>

              {/* Comments List */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm sm:text-base text-gray-900">{comment.author}</span>
                      <span className="text-xs sm:text-sm text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 break-words">{comment.content}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="space-y-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a comment"
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-slate-900 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Comment
                  </button>
                </div>
              </div>

              {/* Helper Text */}
              <p className="text-xs text-gray-500 mt-2">Press Ctrl+Enter to submit</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TicketDetailPage;
