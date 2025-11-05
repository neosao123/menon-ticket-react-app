import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import { addTicket, updateTicket, loadTickets } from '../redux/slices/ticketsSlice';

const NewTakits = () => {
  const [formData, setFormData] = useState({
    type: "",
    service: "",
    status: "Open",
    details: "",
    provider: "",
    documents: [],
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);

  const serviceOptions = [
    { value: "Cleaning", label: "Cleaning" },
    { value: "Plumbing", label: "Plumbing" },
    { value: "Electrical", label: "Electrical" },
    { value: "Painting", label: "Painting" },
  ];

  const providerOptions = [
    { value: "John Doe", label: "John Doe" },
    { value: "Ravi Kumar", label: "Ravi Kumar" },
    { value: "A1 Services", label: "A1 Services" },
    { value: "BrightFix Co.", label: "BrightFix Co." },
  ];

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId) {
      const ticket = tickets.find((t) => t.id === editId);
      if (ticket) {
        setFormData({
          type: ticket.type,
          service: ticket.service,
          status: ticket.status,
          details: ticket.details,
          provider: ticket.provider,
          documents: ticket.documents || [],
        });
        setEditingId(editId);
      }
    } else {
      const reopenTicket = localStorage.getItem("reopen-ticket");
      if (reopenTicket) {
        const ticket = JSON.parse(reopenTicket);
        setFormData({
          type: ticket.type,
          service: ticket.service,
          status: "Open",
          details: ticket.details,
          provider: ticket.provider,
          documents: ticket.documents || [],
        });
        localStorage.removeItem("reopen-ticket");
      }
    }
  }, [searchParams, tickets]);

  // Load existing tickets from localStorage if Redux is empty
  useEffect(() => {
    if (tickets.length === 0) {
      const stored = localStorage.getItem("dashboard-tickets");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            dispatch(loadTickets(parsed));
          }
        } catch (error) {
          console.error("Error parsing stored tickets:", error);
        }
      }
    }
  }, [tickets.length, dispatch]);

  // Sync tickets to localStorage whenever tickets change
  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem("dashboard-tickets", JSON.stringify(tickets));
    }
  }, [tickets]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can only upload up to 5 files.");
      return;
    }

    const fileData = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setFormData({ ...formData, documents: fileData });
  };

  const handleSubmit = () => {
    if (!formData.type || !formData.service || !formData.provider) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingId) {
      // Update existing ticket
      dispatch(updateTicket({ id: editingId, ...formData }));
      alert("Ticket updated successfully!");
    } else {
      // Create new ticket with sequential ticketNo
      let maxTicketNum = 0;
      tickets.forEach((t) => {
        const num = parseInt(t.ticketNo.replace('TKT-', ''), 10);
        if (!isNaN(num) && num > maxTicketNum) {
          maxTicketNum = num;
        }
      });
      const newTicketNum = maxTicketNum + 1;
      const newTicket = {
        id: Date.now().toString(),
        ticketNo: `TKT-${newTicketNum}`,
        createdAt: new Date().toLocaleDateString(),
        ...formData,
      };
      dispatch(addTicket(newTicket));
      alert("Ticket created successfully!");
    }

    // Reset form and navigate back
    setFormData({
      type: "",
      service: "",
      status: "Open",
      details: "",
      provider: "",
      documents: [],
    });
    setEditingId(null);
    navigate("/");

  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {editingId ? "Edit Ticket" : "Create New Ticket"}
      </h2>

      {/* 2 Column Layout */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <label className="block ">
              <span className="font-medium text-gray-700">Type</span>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2 px-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="">Select Type</option>
                <option value="REQ">REQ</option>
                <option value="BUG">BUG</option>
                <option value="TASK">TASK</option>
              </select>
            </label>

            <label className="block">
              <span className="font-medium text-gray-700">Service Provider</span>
              <Select
                options={providerOptions}
                value={providerOptions.find(
                  (opt) => opt.value === formData.provider
                )}
                onChange={(selected) =>
                  setFormData({ ...formData, provider: selected?.value || "" })
                }
                className="w-full"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    padding: '0.125rem',
                    '&:hover': { borderColor: '#f97316' },
                    '&:focus-within': { borderColor: '#f97316', boxShadow: '0 0 0 1px #f97316' },
                  }),
                }}
                placeholder="Select or Search Provider"
                isSearchable
              />
            </label>
            <label className="block">
              <span className="font-medium text-gray-700">Service</span>
              <Select
                options={serviceOptions}
                value={serviceOptions.find(
                  (opt) => opt.value === formData.service
                )}
                onChange={(selected) =>
                  setFormData({ ...formData, service: selected?.value || "" })
                }
                className="w-full"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    padding: '0.125rem',
                    '&:hover': { borderColor: '#f97316' },
                    '&:focus-within': { borderColor: '#f97316', boxShadow: '0 0 0 1px #f97316' },
                  }),
                }}
                placeholder="Select or Search Service"
                isSearchable
              />
            </label>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <label className="block">
              <span className="font-medium text-gray-700">Details</span>
              <textarea
                rows="4"
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Enter details about the ticket..."
              />
            </label>

            <label className="block">
              <span className="font-medium text-gray-700">Upload Documents (max 5)</span>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              {formData.documents?.length > 0 && (
                <ul className="mt-2 text-sm text-gray-600 list-disc pl-4">
                  {formData.documents.map((file, i) => (
                    <li key={i}>{file.name}</li>
                  ))}
                </ul>
              )}
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Submit
          </button>
          <button
            onClick={() =>
              setFormData({
                type: "",
                service: "",
                status: "Open",
                details: "",
                provider: "",
                documents: [],
              })
            }
            className="border border-gray-300 py-2 px-6 rounded-lg font-semibold hover:bg-gray-100"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTakits;
