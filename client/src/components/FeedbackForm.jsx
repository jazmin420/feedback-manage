import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Input, Button } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import EmojiRating from "./EmojiRating";
import MediaUpload from "./MediaUpload";
import { useNavigate } from "react-router-dom";

const FeedbackForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    mobileNumber: "",
    email: "",
    comment: "",
    emoji: "",
    video: "",
    image: "",
    invoice: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: { file: files[0], preview: URL.createObjectURL(files[0]) },
      });
    } else {
      const { value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      toast.error("Please fill in all required fields for this step.");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleEmojiSelect = (emoji) => {
    setFormData({ ...formData, emoji });
  };

  //console.log(formData)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      setFormData({
        ...formData,
        username: currentUser.username,
        email: currentUser.email,
      });
    }
  }, []);

  const handleSubmit = async () => {
    const data = new FormData();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Append text fields
    data.append("username", formData.username);
    data.append("mobileNumber", formData.mobileNumber);
    data.append("email", formData.email);
    data.append("comment", formData.comment);
    data.append("emoji", formData.emoji);

    // Append files if available
    if (formData.video?.file) {
      data.append("video", formData.video.file);
    }
    if (formData.image?.file) {
      data.append("image", formData.image.file);
    }
    if (formData.invoice?.file) {
      data.append("invoice", formData.invoice.file);
    }

    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/feedback/submit",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      //console.log(response);

      if (response.status === 201) {
        toast.success("Feedback submitted successfully!");
        resetForm();
        setTimeout(() => {
          navigate("/thank-you");
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred while submitting feedback.");
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      mobileNumber: "",
      email: "",
      comment: "",
      emoji: "",
      video: "",
      image: "",
      invoice: "",
    });
    setStep(1);
  };

  const validateStep = (currentStep) => {
    const { username, mobileNumber, email, comment, emoji, invoice } = formData;
    switch (currentStep) {
      case 1:
        return username && mobileNumber && email;
      case 2:
        return comment && emoji;
      case 3:
        return invoice;
      default:
        return true;
    }
  };

  return (
    <div className="p-6 border-2 border-blue-gray-200 m-auto w-3/4 ">
      <ToastContainer />

      {step === 1 && (
        <div className="w-3/4 m-auto py-2">
          <div className="flex justify-center flex-col gap-6 items-center">
            <h2 className="text-center mb-3 text-3xl text-gray-800 font-bold">
              User Details
            </h2>
            <Input
              type="text"
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleInputChange}
              disabled
            />
            <Input
              label="mobileNumber"
              type="number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
            />
            <Input
              label="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
            />
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="w-3/4 m-auto py-2">
          <h2 className="text-center mb-6 text-3xl text-gray-800 font-bold">
            Feedback Details
          </h2>
          <Textarea
            name="comment"
            label="comment here"
            value={formData.comment}
            onChange={handleInputChange}
          />
          <EmojiRating handleEmojiSelect={handleEmojiSelect} />
        </div>
      )}
      {step === 3 && (
        <MediaUpload
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      {step === 4 && (
        <div className="w-full m-auto py-2">
          <h2 className="text-center mb-6 text-3xl text-gray-800 font-bold">
            Review and Submit
          </h2>
          <div className="mb-6 flex flex-col lg:flex-row gap-6 justify-center items-center">
            <h3 className="text-lg font-semibold text-blue-gray-700">
              User Details:
            </h3>
            <p>
              <strong>Username:</strong> {formData.username}
            </p>
            <p>
              <strong>Mobile Number:</strong> {formData.mobileNumber}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
          </div>
          <div className="mb-6 flex flex-col lg:flex-row gap-6 justify-center items-center">
            <h3 className="text-lg font-semibold text-blue-gray-700">
              Feedback:
            </h3>
            <p>
              <strong>Comment:</strong> {formData.comment}
            </p>
            <p>
              <strong>Emoji Rating:</strong> {formData.emoji}
            </p>
          </div>
          <div className="mb-6 flex flex-col lg:flex-row gap-6 justify-center items-center">
            <h3 className="text-lg font-semibold text-blue-gray-700">Media:</h3>
            {/* Video Preview */}
            <div className="text-center">
              <h4 className="font-medium">Video:</h4>
              {formData.video?.preview ? (
                <video
                  src={formData.video.preview}
                  controls
                  className="w-40 h-auto border rounded"
                />
              ) : (
                <p>No video uploaded</p>
              )}
            </div>
            {/* Image Preview */}
            <div className="text-center">
              <h4 className="font-medium">Image:</h4>
              {formData.image?.preview ? (
                <img
                  src={formData.image.preview}
                  alt="Uploaded"
                  className="w-40 h-auto border rounded"
                />
              ) : (
                <p>No image uploaded</p>
              )}
            </div>
            {/* Invoice Preview */}
            <div className="text-center">
              <h4 className="font-medium">Invoice:</h4>
              {formData.invoice.preview &&
                (formData.invoice.file.type === "application/pdf" ? (
                  <p>PDF file uploaded: {formData.invoice.file.name}</p>
                ) : (
                  <img
                    src={formData.invoice.preview}
                    alt="Uploaded Invoice"
                    className="w-40 h-auto border rounded"
                  />
                ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button onClick={handleSubmit} className="mt-4">
              Submit
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3 items-center mt-3">
        {step > 1 && (
          <Button onClick={handleBack} className="">
            Back
          </Button>
        )}
        {step < 4 && (
          <Button onClick={handleNext} className="">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
