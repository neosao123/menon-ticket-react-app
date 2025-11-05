import React, { useState, useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  // Load tickets from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("dashboard-tickets");
    if (stored) setTickets(JSON.parse(stored));
    setLoading(false);
  }, []);

  const saveTickets = (updated) => {
    setTickets(updated);
    localStorage.setItem("dashboard-tickets", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this ticket?")) {
      const updated = tickets.filter((t) => t.id !== id);
      saveTickets(updated);
    }
  };

  const handleOpen = (id) => {
    navigate(`/takits-details/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/new-takits?edit=${id}`);
  };

  const handleReopenAsNew = (id) => {
    const ticket = tickets.find((t) => t.id === id);
    localStorage.setItem("reopen-ticket", JSON.stringify(ticket));
    navigate("/new-takits");
  };

  const filteredTickets =
    activeTab === "All"
      ? tickets
      : tickets.filter((t) => t.status === activeTab);

  const stats = {
    total: tickets.length,
    completed: tickets.filter((t) => t.status === "Completed").length,
    inProgress: tickets.filter((t) => t.status === "In-Progress").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          All Tickets
        </h2>
      </div>

     

     

      {/* Tickets Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-md">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-orange-500" size={28} />
          </div>
        ) : filteredTickets.length === 0 ? (
          <p className="text-center py-6 text-gray-500">
            No tickets found for this category.
          </p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-orange-50 text-left border-b border-gray-200">
                {[
                  "Ticket No",
                  "Type",
                  "Created At",
                  "Service",
                  "Provider",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th key={h} className="p-4 font-semibold text-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition text-gray-700"
                >
                  <td className="p-4">{t.ticketNo}</td>
                  <td className="p-4">{t.type}</td>
                  <td className="p-4">{t.createdAt}</td>
                  <td className="p-4">{t.service}</td>
                  <td className="p-4">{t.provider}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        t.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : t.status === "In-Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpen(t.id)}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => handleEdit(t.id)}
                        className="text-green-600 hover:underline text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleReopenAsNew(t.id)}
                        className="text-purple-600 hover:underline text-xs"
                      >
                        Reopen as New
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Tickets;
