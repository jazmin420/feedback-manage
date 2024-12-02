import React, { useContext, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import { Button } from "@material-tailwind/react";
import AuthContext from "../context/AuthContext";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const navigate = useNavigate();

  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    Cookies.remove("access_token");
    localStorage.removeItem("currentUser");
    signOut();
    navigate("/sign-in");
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page!</h1>
        <div className="flex justify-between items-center">
          <Button
            onClick={() => setShowFeedbackForm(true)}
          >
            Give Your Feedback
          </Button>
  
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>

        {showFeedbackForm && (
          <FeedbackForm closeForm={() => setShowFeedbackForm(false)} />
        )}
      </div>
    </>
  );
}

export default Home;
