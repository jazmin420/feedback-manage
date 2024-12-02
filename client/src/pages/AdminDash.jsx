import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import FeedbackStatus from "../components/FeedbackStatus";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function AdminDash() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();
  const TABLE_HEAD = [
    "username",
    "email",
    "mobileNumber",
    "comment",
    "invoice",
    "actions",
  ];

  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/feedbacks",
          {
            withCredentials: true,
          }
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Update status in the parent component's state (locally)
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((feedback) =>
          feedback._id === id ? { ...feedback, status: newStatus } : feedback
        )
      );

      // Optionally, send the updated status to the backend
      await axios.put(
        `http://localhost:3000/api/admin/feedbacks/${id}`,
        { status: newStatus },
        {
          withCredentials: true,
        }
      );
      console.log("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      // Send delete request to the backend
      await axios.delete(`http://localhost:3000/api/admin/feedbacks/${id}`, {
        withCredentials: true,
      });

      // Remove feedback from the state after successful deletion
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback._id !== id)
      );
      console.log("Feedback deleted successfully");
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const handleSignOut = () => {
    Cookies.remove("access_token", {
      path: "/",
      httpOnly: true,
      secure: false,
    });
    localStorage.removeItem("currentUser");
    signOut();
    navigate("/sign-in");
  };

  return (
    <>
      <div className="flex justify-between items-center mx-2 my-3 pb-2 border-b-2 border-b-blue-gray-400">
        <h1 className="text-2xl font-semibold text-blue-gray-900">
          Admin Dashboard
        </h1>
        <Button size="sm" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
      <Card className="h-full w-full overflow-scroll mx-6">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {feedback.username}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {feedback.email}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {feedback.mobileNumber}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {feedback.comment}
                    <span className="mr-2">{feedback.emoji}</span>
                  </Typography>
                </td>
                <td className="p-4">
                  <div>
                    {feedback.invoice && (
                      <a
                        href={feedback.invoice}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {feedback.invoice}
                      </a>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-start gap-3 ">
                    <FeedbackStatus
                      key={feedback._id}
                      feedback={feedback}
                      onStatusChange={handleStatusChange}
                    />
                    <Button
                      className="bg-red-600"
                      onClick={() => handleDeleteFeedback(feedback._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

export default AdminDash;
