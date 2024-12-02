import React, { useState } from "react";
import axios from "axios";

function FeedbackStatus({ feedback, onStatusChange }) {
  const [status, setStatus] = useState(feedback.status);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onStatusChange(feedback._id, newStatus); // Pass updated status to parent
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500"; // Green for approved
      case "rejected":
        return "bg-red-500"; // Red for rejected
      case "pending":
      default:
        return "bg-orange-500"; // Orange for pending
    }
  };

  return (
    <>
      <div>
        {/* Status Select Dropdown */}
        <select
          value={status}
          onChange={handleStatusChange}
          className={`w-full ${getStatusBgColor(
            status
          )} text-white p-2 rounded`}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </>
  );
}

export default FeedbackStatus;
